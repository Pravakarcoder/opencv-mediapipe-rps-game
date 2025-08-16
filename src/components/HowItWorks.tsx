import React from 'react';
import { Eye, Hand, Cpu } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const features = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Real-time Hand Tracking",
      description: "Powered by OpenCV + MediaPipe.",
      details: "Advanced computer vision algorithms detect and track your hand movements in real-time with high precision."
    },
    {
      icon: <Hand className="w-8 h-8" />,
      title: "Gesture Recognition", 
      description: "Detects ✊ Rock, ✋ Paper, ✌️ Scissors.",
      details: "Machine learning models trained to recognize classic Rock Paper Scissors hand gestures with 95%+ accuracy."
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "CPU Opponent",
      description: "Computer picks random moves—beat it to 5!",
      details: "Fair gameplay with truly random computer moves. No cheating algorithms, just pure luck and skill."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Cutting-edge computer vision technology brings the classic game to your browser
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Card */}
              <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 h-full transition-all duration-300 hover:border-cyan-400/50 hover:bg-gray-800/50">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-cyan-400 font-medium mb-4">
                  {feature.description}
                </p>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.details}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Connection Lines for Desktop */}
              {index < features.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-cyan-400/50 to-transparent"></div>
              )}
            </div>
          ))}
        </div>

        {/* Feature List */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Key Features</h3>
            <ul className="space-y-3">
              {[
                "Real-time hand tracking using OpenCV and MediaPipe",
                "Gesture recognition to detect ✊, ✋, or ✌️", 
                "Computer opponent with random moves",
                "First to score 5 wins",
                "Fully responsive web interface with camera controls"
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-4 flex-shrink-0"></div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;