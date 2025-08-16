import React, { useState, useEffect } from "react";
import { Play, Github, ArrowDown } from "lucide-react";

const HeroSection: React.FC = () => {
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const emojis = ["✊", "✋", "✌️"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % emojis.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToDemo = () => {
    const demoElement = document.getElementById("demo");
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,191,255,0.1),transparent_50%)]"></div>

      {/* Floating Animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-cyan-300/30 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="relative container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Hero Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-8 animate-in fade-in-50 duration-700">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm text-gray-300">Live Hand Tracking</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-in slide-in-from-bottom-8 duration-700 delay-200">
            <span className="text-white">Rock</span>
            <span className="text-cyan-400 mx-2">•</span>
            <span className="text-white">Paper</span>
            <span className="text-purple-400 mx-2">•</span>
            <span className="text-white">Scissors</span>
          </h1>

          {/* Animated Subtitle */}
          <div className="text-xl md:text-3lg lg:text-3xl mb-8 animate-in slide-in-from-bottom-8 duration-700 delay-400">
            <p className="text-gray-300 mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-semibold">
                in Real-Time
              </span>
            </p>
            <div className="text-6xl md:text-8lg mb-4 transition-all duration-500 transform hover:scale-110">
              {emojis[currentEmoji]}
            </div>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-in slide-in-from-bottom-8 duration-700 delay-600">
            Hand-tracked gestures with{" "}
            <span className="text-cyan-400 font-semibold">
              OpenCV + MediaPipe
            </span>
            . Play against the computer.{" "}
            <span className="text-purple-400 font-semibold">
              First to 5 wins
            </span>
            .
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-in slide-in-from-bottom-8 duration-700 delay-800">
            <button
              onClick={handleScrollToDemo}
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Play in Your Browser
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            </button>

            <button
              onClick={() =>
                window.open(
                  "https://github.com/Pravakarcoder/opencv-mediapipe-rps-game",
                  "_blank"
                )
              }
              className="group inline-flex items-center px-8 py-4 bg-gray-800/50 backdrop-blur-sm border-2 border-gray-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:border-cyan-400 hover:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900"
            >
              <Github className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              View on GitHub
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-in fade-in duration-700 delay-1000">
            <button
              onClick={handleScrollToDemo}
              className="text-gray-500 hover:text-cyan-400 transition-colors group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 rounded-full"
              aria-label="Scroll to demo"
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-sm">Try the Demo</span>
                <ArrowDown className="w-6 h-6 animate-bounce group-hover:text-cyan-400" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
