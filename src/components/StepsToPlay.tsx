import React from 'react';
import { Camera, Hand, Trophy, Play } from 'lucide-react';

const StepsToPlay: React.FC = () => {
  const steps = [
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Click Start Camera",
      description: "Allow camera access to begin hand tracking",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      icon: <Hand className="w-6 h-6" />,
      title: "Show one gesture to the camera", 
      description: "Make ✊ Rock, ✋ Paper, or ✌️ Scissors",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Play className="w-6 h-6" />,
      title: "Watch the scoreboard update",
      description: "See results instantly after each round",
      color: "from-cyan-500 to-purple-600"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "First to 5 points wins",
      description: "Beat the computer to claim victory!",
      color: "from-yellow-500 to-orange-600"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Steps to Play
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get started in seconds with these simple steps
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step Number */}
                <div className="flex items-center justify-center w-12 h-12 bg-gray-800 border-2 border-cyan-400 text-cyan-400 rounded-full font-bold text-lg mb-4 mx-auto group-hover:scale-110 transition-transform duration-200">
                  {index + 1}
                </div>

                {/* Card */}
                <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 text-center h-full transition-all duration-300 hover:border-cyan-400/50 hover:bg-gray-800/50">
                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-lg flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connection Arrow (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 -right-3 w-6 h-6 text-cyan-400/50">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <button 
              onClick={() => {
                const demoElement = document.getElementById('demo');
                if (demoElement) {
                  demoElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900"
            >
              <Play className="w-5 h-5 mr-2" />
              Try it Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsToPlay;