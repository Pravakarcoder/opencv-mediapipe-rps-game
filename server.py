import cv2
import base64
import numpy as np
import mediapipe as mp
import asyncio
import websockets
import json

# Initialize MediaPipe hands
mp_hands = mp.solutions.hands
mp_draw = mp.solutions.drawing_utils

# Function to classify rock, paper, scissors
def classify_gesture(hand_landmarks):
    tips = [8, 12, 16, 20]  # Fingertips: Index, Middle, Ring, Pinky
    bases = [6, 10, 14, 18]  # Base joints

    finger_states = []
    for tip, base in zip(tips, bases):
        if hand_landmarks.landmark[tip].y < hand_landmarks.landmark[base].y:
            finger_states.append(1)
        else:
            finger_states.append(0)

    # Thumb check (simple horizontal check)
    thumb_open = 1 if hand_landmarks.landmark[4].x < hand_landmarks.landmark[3].x else 0

    # Classification rules
    if sum(finger_states) == 0:
        return "Rock"
    elif sum(finger_states) == 4:
        return "Paper"
    elif finger_states[0] == 1 and finger_states[1] == 1 and finger_states[2] == 0 and finger_states[3] == 0:
        return "Scissors"
    else:
        return "Unknown"

# WebSocket handler
async def handler(websocket):
    hands = mp_hands.Hands(
        static_image_mode=False,
        max_num_hands=2,
        min_detection_confidence=0.6,
        min_tracking_confidence=0.5
    )

    async for message in websocket:
        try:
            data = json.loads(message)
            image_data = data.get("image", "")

            if not image_data:
                print("No image data received")
                await websocket.send(json.dumps({"gesture": "No Image"}))
                continue

            # Decode base64 image safely
            try:
                if "," in image_data:
                    img_bytes = base64.b64decode(image_data.split(",")[1])
                else:
                    img_bytes = base64.b64decode(image_data)
            except Exception as e:
                print("Base64 decode error:", e)
                await websocket.send(json.dumps({"gesture": "Decode Error"}))
                continue

            np_img = np.frombuffer(img_bytes, np.uint8)
            if np_img.size == 0:
                print("Empty image buffer")
                await websocket.send(json.dumps({"gesture": "Empty Image"}))
                continue

            frame = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
            if frame is None:
                print("Failed to decode image")
                await websocket.send(json.dumps({"gesture": "Decode Failed"}))
                continue

            # Process with MediaPipe
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = hands.process(frame_rgb)

            gesture = "No Hand"
            if results.multi_hand_landmarks:
                for hand_landmarks in results.multi_hand_landmarks:
                    gesture = classify_gesture(hand_landmarks)

            # Send back gesture result
            await websocket.send(json.dumps({"gesture": gesture}))

        except json.JSONDecodeError:
            print("Invalid JSON received")
            await websocket.send(json.dumps({"gesture": "Invalid JSON"}))
        except Exception as e:
            print("Unexpected error:", e)
            await websocket.send(json.dumps({"gesture": "Error"}))

# Start WebSocket server
async def main():
    async with websockets.serve(handler, "localhost", 8765):
        print("WebSocket server running at ws://localhost:8765")
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())
