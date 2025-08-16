import React from "react";

const TechStack: React.FC = () => {
  const technologies = [
    {
      name: "OpenCV",
      color: "bg-blue-500",
      description: "Computer Vision for image processing",
    },
    {
      name: "MediaPipe",
      color: "bg-green-500",
      description: "Real-time hand tracking",
    },
    {
      name: "TypeScript",
      color: "bg-yellow-500",
      description: "Core logic and type safety",
    },
    {
      name: "WebRTC",
      color: "bg-purple-500",
      description: "Camera access and streaming",
    },
    {
      name: "Vite",
      color: "bg-orange-500",
      description: "Project bundler and dev server",
    },
    {
      name: "Tailwind CSS",
      color: "bg-cyan-500",
      description: "Styling and layout",
    },
    {
      name: "Python",
      color: "bg-red-500",
      description: "Backend server for gesture detection",
    },
    {
      name: "WebSockets",
      color: "bg-pink-500",
      description: "Real-time communication between frontend and backend",
    },
    {
      name: "React",
      color: "bg-indigo-500",
      description: "Frontend UI framework",
    },
  ];

  return (
    <section id="tech-stack" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Tech Stack
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Built with cutting-edge technologies for optimal performance and
            reliability
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Technology Badges */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="group relative bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 text-center transition-all duration-300 hover:border-cyan-400/50 hover:bg-gray-800/50"
              >
                {/* Icon/Badge */}
                <div
                  className={`w-12 h-12 ${tech.color} rounded-lg flex items-center justify-center text-white font-bold text-sm mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}
                >
                  {tech.name.slice(0, 2).toUpperCase()}
                </div>

                {/* Name */}
                <h3 className="text-white font-bold mb-1 group-hover:text-cyan-400 transition-colors">
                  {tech.name}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm">{tech.description}</p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Tech Details */}
          <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8">
            {/* <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Frontend Technologies
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>
                      <strong>JavaScript ES6+</strong> - Modern syntax and
                      features
                    </span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                    <span>
                      <strong>CSS3 & Animations</strong> - Smooth user
                      interactions
                    </span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                    <span>
                      <strong>HTML5 Canvas</strong> - Real-time video processing
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Computer Vision
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span>
                      <strong>OpenCV.js</strong> - Computer vision library
                    </span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span>
                      <strong>MediaPipe</strong> - Hand landmark detection
                    </span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    <span>
                      <strong>WebRTC</strong> - Camera stream access
                    </span>
                  </li>
                </ul>
              </div>
            </div> */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Frontend Technologies */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Frontend Technologies
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>
                      <strong>TypeScript & React</strong> - Core logic and UI
                      components
                    </span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                    <span>
                      <strong>Tailwind CSS</strong> - Styling and responsive
                      design
                    </span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                    <span>
                      <strong>HTML5 Canvas</strong> - Real-time video frame
                      rendering
                    </span>
                  </li>
                </ul>
              </div>

              {/* Computer Vision */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Computer Vision
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span>
                      <strong>OpenCV</strong> - Image processing & computer
                      vision
                    </span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span>
                      <strong>MediaPipe</strong> - Real-time hand landmark
                      tracking
                    </span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    <span>
                      <strong>WebRTC</strong> - Camera and microphone stream
                      access
                    </span>
                  </li>
                </ul>
              </div>

              {/* Backend */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Backend</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                    <span>
                      <strong>Python</strong> - Backend server for gesture
                      recognition
                    </span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                    <span>
                      <strong>WebSockets</strong> - Real-time gesture data
                      transfer
                    </span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></div>
                    <span>
                      <strong>API Integration</strong> - Smooth frontend-backend
                      communication
                    </span>
                  </li>
                </ul>
              </div>

              {/* Development Tools */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Development Tools
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-green-300 rounded-full mr-3"></div>
                    <span>
                      <strong>Vite</strong> - Lightning-fast dev server &
                      bundler
                    </span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                    <span>
                      <strong>ESLint & Prettier</strong> - Code quality &
                      formatting
                    </span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                    <span>
                      <strong>Git & GitHub</strong> - Version control &
                      collaboration
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
