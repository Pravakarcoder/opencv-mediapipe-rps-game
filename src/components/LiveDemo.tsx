// import React, { useState, useRef, useEffect } from "react";
// import {
//   Camera,
//   CameraOff,
//   Volume2,
//   VolumeX,
//   RotateCcw,
//   RefreshCw,
// } from "lucide-react";
// import { useToast } from "./ToastProvider";

// const LiveDemo: React.FC = () => {
//   const [cameraActive, setCameraActive] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isMirrored, setIsMirrored] = useState(true);
//   const [playerScore, setPlayerScore] = useState(0);
//   const [cpuScore, setCpuScore] = useState(0);

//   const [currentGesture, setCurrentGesture] = useState<string | null>(null);
//   const [gameStatus, setGameStatus] = useState<
//     "waiting" | "ready" | "playing" | "winner"
//   >("waiting");
//   const [lastRound, setLastRound] = useState<{
//     player: string;
//     cpu: string;
//     winner: string;
//   } | null>(null);

//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const wsRef = useRef<WebSocket | null>(null);
//   const sendIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   const { showToast } = useToast();
//   const gestureNames = ["Rock", "Paper", "Scissors"];

//   useEffect(() => {
//     if (playerScore >= 5 || cpuScore >= 5) {
//       setGameStatus("winner");
//     }
//   }, [playerScore, cpuScore]);

//   useEffect(() => {
//     if (gameStatus === "winner") {
//       // Stop the camera after 1 second so the user can see the final round
//       const timer = setTimeout(() => {
//         stopCamera();
//       }, 1000);

//       return () => clearTimeout(timer);
//     }
//   }, [gameStatus]);

//   //Add this new effect here
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (gameStatus === "ready" && currentGesture) {
//         playRound(currentGesture);
//         setCurrentGesture(null); // reset after using it
//       }
//     }, 500); // faster interval for responsiveness

//     return () => clearInterval(interval);
//   }, [gameStatus, currentGesture]);

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { width: 640, height: 480, facingMode: "user" },
//       });

//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }

//       setCameraActive(true);
//       setGameStatus("ready");

//       connectWebSocket();

//       showToast({
//         type: "success",
//         title: "Camera Started",
//         message: "Show your hand gesture to play!",
//       });
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//       showToast({
//         type: "error",
//         title: "Camera Access Denied",
//         message: "Please allow camera access to play the game.",
//       });
//     }
//   };

//   const stopCamera = () => {
//     if (videoRef.current?.srcObject) {
//       (videoRef.current.srcObject as MediaStream)
//         .getTracks()
//         .forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//     }
//     if (wsRef.current) wsRef.current.close();
//     if (sendIntervalRef.current) clearInterval(sendIntervalRef.current);

//     setCameraActive(false);
//     setGameStatus("waiting");
//     setCurrentGesture(null);
//   };

//   const connectWebSocket = () => {
//     const ws = new WebSocket("ws://localhost:8765");
//     wsRef.current = ws;

//     ws.onopen = () => {
//       console.log("Connected to WebSocket server");

//       sendIntervalRef.current = setInterval(() => {
//         if (videoRef.current) {
//           const canvas = document.createElement("canvas");
//           canvas.width = videoRef.current.videoWidth;
//           canvas.height = videoRef.current.videoHeight;
//           const ctx = canvas.getContext("2d");
//           if (ctx) {
//             ctx.drawImage(videoRef.current, 0, 0);
//             const imageData = canvas.toDataURL("image/jpeg", 0.5);
//             ws.send(JSON.stringify({ image: imageData }));
//           }
//         }
//       }, 200);
//     };

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.gesture && gestureNames.includes(data.gesture)) {
//         setCurrentGesture(data.gesture);
//         if (gameStatus === "ready") {
//           playRound(data.gesture);
//         }
//       }
//     };

//     ws.onclose = () => {
//       console.log("WebSocket disconnected, retrying...");
//       if (sendIntervalRef.current) clearInterval(sendIntervalRef.current);
//       setTimeout(connectWebSocket, 2000);
//     };
//   };

//   const toggleMute = () => {
//     if (videoRef.current) {
//       videoRef.current.muted = !isMuted;
//       setIsMuted(!isMuted);
//     }
//   };

//   const toggleMirror = () => setIsMirrored(!isMirrored);

//   const resetScore = () => {
//     setPlayerScore(0);
//     setCpuScore(0);
//     setGameStatus(cameraActive ? "ready" : "waiting");
//     setLastRound(null);
//     setCurrentGesture(null);
//   };

//   const playRound = (playerGesture: string) => {
//     const cpuChoice = Math.floor(Math.random() * 3);
//     const cpuGesture = gestureNames[cpuChoice];

//     let winner = "";
//     if (playerGesture === cpuGesture) {
//       winner = "tie";
//     } else if (
//       (playerGesture === "Rock" && cpuGesture === "Scissors") ||
//       (playerGesture === "Paper" && cpuGesture === "Rock") ||
//       (playerGesture === "Scissors" && cpuGesture === "Paper")
//     ) {
//       winner = "player";
//       setPlayerScore((prev) => prev + 1);
//     } else {
//       winner = "cpu";
//       setCpuScore((prev) => prev + 1);
//     }

//     setLastRound({ player: playerGesture, cpu: cpuGesture, winner });
//     setGameStatus("playing");

//     setTimeout(() => {
//       setGameStatus(playerScore >= 4 || cpuScore >= 4 ? "winner" : "ready");
//     }, 2000);
//   };

//   const getStatusMessage = () => {
//     switch (gameStatus) {
//       case "waiting":
//         return "Waiting for camera permission...";
//       case "ready":
//         return `Tracking: ${currentGesture || "Show your hand gesture"}`;
//       case "playing":
//         return lastRound
//           ? `You: ${lastRound.player} vs CPU: ${lastRound.cpu}`
//           : "Playing...";
//       case "winner":
//         return playerScore >= 5 ? "🎉 You Win! 🎉" : "🎉 CPU Wins! 🎉";
//     }
//   };

//   return (
//     <section id="demo" className="py-20 relative">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//             Live Demo
//           </h2>
//           <p className="text-gray-400 text-lg max-w-2xl mx-auto">
//             Start your camera and show hand gestures. The AI will detect your
//             moves in real-time.
//           </p>
//         </div>

//         <div className="max-w-4xl mx-auto">
//           <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 mb-8">
//             <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden mb-6">
//               <video
//                 ref={videoRef}
//                 autoPlay
//                 playsInline
//                 muted={isMuted}
//                 className={`w-full h-full object-cover ${
//                   isMirrored ? "scale-x-[-1]" : ""
//                 }`}
//                 style={{ display: cameraActive ? "block" : "none" }}
//               />
//               <canvas
//                 ref={canvasRef}
//                 className="absolute inset-0 w-full h-full"
//                 style={{ display: cameraActive ? "block" : "none" }}
//               />

//               {!cameraActive && (
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="text-center">
//                     <Camera className="w-16 h-16 text-gray-600 mx-auto mb-4" />
//                     <p className="text-gray-500 text-lg">
//                       Click "Start Camera" to begin
//                     </p>
//                   </div>
//                 </div>
//               )}

//               <div className="absolute bottom-4 left-4 right-4">
//                 <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
//                   <p className="text-white font-medium">{getStatusMessage()}</p>
//                 </div>
//               </div>

//               {currentGesture && gameStatus !== "winner" && (
//                 <div className="absolute top-4 right-4">
//                   <div className="bg-cyan-500/20 backdrop-blur-sm rounded-lg px-4 py-2">
//                     <p className="text-cyan-300 font-bold text-lg">
//                       {currentGesture}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
//               <button
//                 onClick={cameraActive ? stopCamera : startCamera}
//                 className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 ${
//                   cameraActive
//                     ? "bg-red-500 hover:bg-red-600 text-white"
//                     : "bg-cyan-500 hover:bg-cyan-600 text-white"
//                 }`}
//               >
//                 {cameraActive ? (
//                   <CameraOff className="w-4 h-4 mr-2" />
//                 ) : (
//                   <Camera className="w-4 h-4 mr-2" />
//                 )}
//                 {cameraActive ? "Stop Camera" : "Start Camera"}
//               </button>

//               <button
//                 onClick={toggleMute}
//                 disabled={!cameraActive}
//                 className="flex items-center px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900"
//               >
//                 {isMuted ? (
//                   <VolumeX className="w-4 h-4 mr-2" />
//                 ) : (
//                   <Volume2 className="w-4 h-4 mr-2" />
//                 )}
//                 {isMuted ? "Unmute" : "Mute"}
//               </button>

//               <button
//                 onClick={toggleMirror}
//                 disabled={!cameraActive}
//                 className="flex items-center px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900"
//               >
//                 <RotateCcw className="w-4 h-4 mr-2" />
//                 Toggle Mirror
//               </button>

//               <button
//                 onClick={resetScore}
//                 className="flex items-center px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900"
//               >
//                 <RefreshCw className="w-4 h-4 mr-2" />
//                 Reset Score
//               </button>
//             </div>

//             <div className="bg-gray-900/50 rounded-xl p-6 mb-6">
//               <div className="text-center mb-4">
//                 <p className="text-cyan-400 font-semibold text-lg">
//                   First to 5 wins
//                 </p>
//               </div>
//               <div className="flex items-center justify-between max-w-md mx-auto">
//                 <div className="text-center">
//                   <p className="text-white font-bold text-2xl">{playerScore}</p>
//                   <p className="text-gray-400">You</p>
//                 </div>
//                 <div className="text-white text-3xl font-bold">—</div>
//                 <div className="text-center">
//                   <p className="text-white font-bold text-2xl">{cpuScore}</p>
//                   <p className="text-gray-400">CPU</p>
//                 </div>
//               </div>
//             </div>

//             <div className="text-center mt-6">
//               <p className="text-sm text-gray-500">
//                 🔒 <strong>Privacy:</strong> No data leaves your device. All
//                 processing happens locally in your browser.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LiveDemo;

//TODO: In This Code , Added CPU is Thinking Feature , only added CPU is thinking
import React, { useState, useRef, useEffect } from "react";
import {
  Camera,
  CameraOff,
  Volume2,
  VolumeX,
  RotateCcw,
  RefreshCw,
} from "lucide-react";
import { useToast } from "./ToastProvider";

const LiveDemo: React.FC = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMirrored, setIsMirrored] = useState(true);
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);

  const [currentGesture, setCurrentGesture] = useState<string | null>(null);
  const [gameStatus, setGameStatus] = useState<
    "waiting" | "ready" | "playing" | "winner" | "thinking"
  >("waiting");
  const [lastRound, setLastRound] = useState<{
    player: string;
    cpu: string;
    winner: string;
  } | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const sendIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { showToast } = useToast();
  const gestureNames = ["Rock", "Paper", "Scissors"];

  useEffect(() => {
    if (playerScore >= 5 || cpuScore >= 5) {
      setGameStatus("winner");
    }
  }, [playerScore, cpuScore]);

  useEffect(() => {
    if (gameStatus === "winner") {
      // Stop the camera after 1 second so the user can see the final round
      const timer = setTimeout(() => {
        stopCamera();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameStatus]);

  // Play round when a new gesture is detected
  useEffect(() => {
    if (currentGesture && gameStatus === "ready") {
      setGameStatus("thinking"); // CPU thinking state
      setTimeout(() => {
        playRound(currentGesture);
        setCurrentGesture(null); // reset for next gesture
      }, 2000); // 2 seconds CPU thinking
    }
  }, [currentGesture, gameStatus]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraActive(true);
      setGameStatus("ready");

      connectWebSocket();

      showToast({
        type: "success",
        title: "Camera Started",
        message: "Show your hand gesture to play!",
      });
    } catch (error) {
      console.error("Error accessing camera:", error);
      showToast({
        type: "error",
        title: "Camera Access Denied",
        message: "Please allow camera access to play the game.",
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    if (wsRef.current) wsRef.current.close();
    if (sendIntervalRef.current) clearInterval(sendIntervalRef.current);

    setCameraActive(false);
    setGameStatus("waiting");
    setCurrentGesture(null);
  };

  const connectWebSocket = () => {
    const ws = new WebSocket("ws://localhost:8765");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Connected to WebSocket server");

      sendIntervalRef.current = setInterval(() => {
        if (videoRef.current) {
          const canvas = document.createElement("canvas");
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(videoRef.current, 0, 0);
            const imageData = canvas.toDataURL("image/jpeg", 0.5);
            ws.send(JSON.stringify({ image: imageData }));
          }
        }
      }, 200);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.gesture && gestureNames.includes(data.gesture)) {
        setCurrentGesture(data.gesture);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected, retrying...");
      if (sendIntervalRef.current) clearInterval(sendIntervalRef.current);
      setTimeout(connectWebSocket, 2000);
    };
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleMirror = () => setIsMirrored(!isMirrored);

  const resetScore = () => {
    setPlayerScore(0);
    setCpuScore(0);
    setGameStatus(cameraActive ? "ready" : "waiting");
    setLastRound(null);
    setCurrentGesture(null);
  };

  const playRound = (playerGesture: string) => {
    const cpuChoice = Math.floor(Math.random() * 3);
    const cpuGesture = gestureNames[cpuChoice];

    let winner = "";
    if (playerGesture === cpuGesture) winner = "tie";
    else if (
      (playerGesture === "Rock" && cpuGesture === "Scissors") ||
      (playerGesture === "Paper" && cpuGesture === "Rock") ||
      (playerGesture === "Scissors" && cpuGesture === "Paper")
    ) {
      winner = "player";
      setPlayerScore((prev) => prev + 1);
    } else {
      winner = "cpu";
      setCpuScore((prev) => prev + 1);
    }

    setLastRound({ player: playerGesture, cpu: cpuGesture, winner });
    setGameStatus("playing");

    setTimeout(() => {
      setGameStatus(playerScore >= 5 || cpuScore >= 5 ? "winner" : "ready");
    }, 2000);
  };

  const getStatusMessage = () => {
    if (gameStatus === "thinking")
      return (
        <span className="text-red-600 font-semibold">CPU is thinking...</span>
      );

    switch (gameStatus) {
      case "waiting":
        return "Waiting for camera permission...";
      case "ready":
        return `Tracking: ${currentGesture || "Show your hand gesture"}`;
      case "playing":
        return lastRound
          ? `You: ${lastRound.player} vs CPU: ${lastRound.cpu}`
          : "Playing...";

      case "winner":
        return playerScore >= 5 ? "🎉 You Win! 🎉" : "🎉 CPU Wins! 🎉";
    }
  };

  return (
    <section id="demo" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Live Demo
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Start your camera and show hand gestures. The AI will detect your
            moves in real-time.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 mb-8">
            <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden mb-6">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={isMuted}
                className={`w-full h-full object-cover ${
                  isMirrored ? "scale-x-[-1]" : ""
                }`}
                style={{ display: cameraActive ? "block" : "none" }}
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ display: cameraActive ? "block" : "none" }}
              />

              {!cameraActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">
                      Click "Start Camera" to begin
                    </p>
                  </div>
                </div>
              )}

              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg px-6 py-9 text-center">
                  <p className="text-white font-medium text-lg">
                    {getStatusMessage()}
                  </p>
                </div>
              </div>

              {currentGesture && gameStatus !== "winner" && (
                <div className="absolute top-4 right-4">
                  <div className="bg-cyan-500/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <p className="text-cyan-300 font-bold text-lg">
                      {currentGesture}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <button
                onClick={cameraActive ? stopCamera : startCamera}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 ${
                  cameraActive
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-cyan-500 hover:bg-cyan-600 text-white"
                }`}
              >
                {cameraActive ? (
                  <CameraOff className="w-4 h-4 mr-2" />
                ) : (
                  <Camera className="w-4 h-4 mr-2" />
                )}
                {cameraActive ? "Stop Camera" : "Start Camera"}
              </button>

              <button
                onClick={toggleMute}
                disabled={!cameraActive}
                className="flex items-center px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 mr-2" />
                ) : (
                  <Volume2 className="w-4 h-4 mr-2" />
                )}
                {isMuted ? "Unmute" : "Mute"}
              </button>

              <button
                onClick={toggleMirror}
                disabled={!cameraActive}
                className="flex items-center px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Toggle Mirror
              </button>

              <button
                onClick={resetScore}
                className="flex items-center px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Score
              </button>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-6 mb-6">
              <div className="text-center mb-4">
                <p className="text-cyan-400 font-semibold text-lg">
                  First to 5 wins
                </p>
              </div>
              <div className="flex items-center justify-between max-w-md mx-auto">
                <div className="text-center">
                  <p className="text-white font-bold text-2xl">{playerScore}</p>
                  <p className="text-gray-400">You</p>
                </div>
                <div className="text-white text-3xl font-bold">—</div>
                <div className="text-center">
                  <p className="text-white font-bold text-2xl">{cpuScore}</p>
                  <p className="text-gray-400">CPU</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                🔒 <strong>Privacy:</strong> No data leaves your device. All
                processing happens locally in your browser.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;
