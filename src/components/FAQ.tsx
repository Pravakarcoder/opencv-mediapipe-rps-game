import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Shield,
  Smartphone,
  Zap,
  Code,
  Chrome,
  Camera,
} from "lucide-react";

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      icon: <Shield className="w-5 h-5" />,
      question: "Is my camera feed uploaded?",
      answer:
        "No, processed locally in your browser. All hand tracking and gesture recognition happens entirely on your device. No video data is ever transmitted to our servers or stored anywhere. Your privacy is completely protected.",
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      question: "Does it work on mobile?",
      answer:
        "Yes—fully responsive. The game is optimized for all devices including smartphones, tablets, and desktop computers. The interface adapts seamlessly to different screen sizes and touch interactions.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      question: "How accurate is the hand tracking?",
      answer:
        "Our OpenCV + MediaPipe implementation achieves 95%+ accuracy in ideal lighting conditions. The system can detect and classify Rock, Paper, and Scissors gestures in real-time with minimal latency.",
    },
    {
      icon: <Code className="w-5 h-5" />,
      question: "Can I use this code in my project?",
      answer:
        "Absolutely! This project is open source. You can find the complete source code on GitHub, including detailed documentation on how to integrate OpenCV hand tracking into your own applications.",
    },
    {
      icon: <Chrome className="w-5 h-5" />,
      question: "What browsers are supported?",
      answer:
        "All modern browsers that support WebRTC and WebAssembly, including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of Chrome or Firefox.",
    },
    {
      icon: <Camera className="w-5 h-5" />,
      question: "Why might the camera not work?",
      answer:
        "Common issues include: camera permissions denied, camera in use by another app, outdated browser, or insufficient lighting. Make sure to allow camera access when prompted and ensure you have adequate lighting for optimal hand detection.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to know about the Rock Paper Scissors OpenCV
            game
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-400/50"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
                  aria-expanded={openIndex === index}
                >
                  <div className="flex items-center space-x-3">
                    {faq.icon && (
                      <div className="text-cyan-400">{faq.icon}</div>
                    )}
                    <span className="text-white font-semibold text-lg">
                      {faq.question}
                    </span>
                  </div>

                  <div className="text-cyan-400 transition-transform duration-200">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-4 animate-in slide-in-from-top-2 duration-200">
                    <div className="pt-2 border-t border-gray-700/30">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Help */}
          <div className="mt-12 text-center">
            <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-400 mb-6">
                Check out our detailed documentation or reach out to our
                community for help.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://github.com/Pravakarcoder/opencv-mediapipe-rps-game?tab=readme-ov-file#opencv-mediapipe-rps-game"
                  target="_blank"
                >
                  <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900">
                    {" "}
                    View Documentation
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
