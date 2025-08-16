import React from "react";
import {
  Github,
  Twitter,
  Mail,
  Heart,
  Star,
  Play,
  Linkedin,
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/Pravakarcoder",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/pravakar-adhikari-3a7a12379/",
      label: "LinkedIn",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      href: "https://x.com/pravakar60",
      label: "Twitter",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:pravakaradhikari11@gmail.com",
      label: "Email",
    },
  ];

  const handleScrollToDemo = () => {
    const demoElement = document.getElementById("demo");
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-20 border-t border-gray-800/50">
      <div className="container mx-auto px-4">
        {/* CTA Section */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Play?
            </h3>
            <p className="text-white mb-8 text-lg">
              Experience real-time hand tracking and put your Rock Paper
              Scissors skills to the test!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleScrollToDemo}
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Try the Demo
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
                <Star className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Star on GitHub
              </button>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div className="text-center md:text-left">
            <button
              onClick={handleScrollToTop}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent hover:from-cyan-300 hover:to-purple-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 rounded-px"
            >
              RPS • OpenCV
            </button>
            <p className="text-gray-400 mt-2 max-w-xs mx-auto md:mx-0">
              Real-time hand tracking meets classic Rock Paper Scissors
              gameplay.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: "Play Demo", id: "demo" },
                { label: "How It Works", id: "how-it-works" },
                { label: "Tech Stack", id: "tech-stack" },
                { label: "FAQ", id: "faq" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    const element = document.getElementById(link.id);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="block text-gray-400 hover:text-cyan-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 rounded-px mx-auto"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="text-center md:text-right">
            <h4 className="text-white font-semibold mb-4">Connect with me</h4>
            <div className="flex items-center justify-center md:justify-end space-x-4 mb-4">
              {socialLinks.map((social) => (
                <button
                  key={social.label}
                  onClick={() => window.open(social.href, "_blank")}
                  className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900"
                  aria-label={social.label}
                >
                  {social.icon}
                </button>
              ))}
            </div>
            <p className="text-gray-400 text-sm">hello@rps-opencv.demo</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-300">
            <div className="flex items-center mb-4 md:mb-0">
              <span>© {currentYear} RPS • OpenCV. Made by </span>
              <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
              <span>Pravakar Adhikari.</span>
            </div>

            <div className="flex items-center space-x-6">
              <button className="hover:text-cyan-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 rounded-px">
                Privacy Policy
              </button>
              <button className="hover:text-cyan-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 rounded-px">
                Terms of Service
              </button>
              <button className="hover:text-cyan-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 rounded-px">
                Open Source
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
