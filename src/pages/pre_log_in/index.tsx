import React from "react";

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gray-50 min-h-screen flex flex-col">
      <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0">
        <img
          className="w-auto h-full"
          src="https://d33wubrfki0l68.cloudfront.net/1e0fc04f38f5896d10ff66824a62e466839567f8/699b5/images/hero/3/background-pattern.png"
          alt="Background pattern"
        />
      </div>

      <header className="relative py-4 md:py-6">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0">
              <a href="#" className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                <img
                  className="w-auto h-8"
                  src="src/assets/images/logo.svg"
                  alt="Logo"
                />
              </a>
            </div>

            <div className="flex lg:hidden">
              <button type="button" className="text-gray-900">
                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>


          </div>
        </div>
      </header>

      <section className="relative flex-grow py-12 sm:py-16 lg:pt-20 lg:pb-36">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 gap-y-8 lg:items-center lg:grid-cols-2 sm:gap-y-20 xl:grid-cols-5">
            <div className="text-center xl:col-span-2 lg:text-left md:px-16 lg:px-0">
              <div className="max-w-sm mx-auto sm:max-w-md md:max-w-full">
              <div className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                <h1> Splits bill </h1>
                <h1 > Not Friendship </h1>
                </div>
                <div className="mt-8 lg:mt-12 lg:flex lg:items-center">
                  
                  <p className="mt-4 text-lg text-gray-900 lg:mt-0 lg:ml-4">
                    Join with <span className="font-bold">4600+ Developers</span> and start getting feedback now
                  </p>
                </div>
              </div>
              <div className="mt-8 sm:flex sm:items-center sm:justify-center lg:justify-start sm:space-x-5 lg:mt-12">
                <a
                  href="#"
                  className="inline-flex items-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-xl hover:bg-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  Get feedback
                </a>
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-4 mt-4 text-lg font-bold transition-all duration-200 bg-transparent border sm:mt-0 rounded-xl hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                >
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download iOS App
                </a>
              </div>
            </div>
            <div className="xl:col-span-3">
              <img className="w-full mx-auto scale-110" src="https://d33wubrfki0l68.cloudfront.net/29c501c64b21014b3f2e225abe02fe31fd8f3a5c/f866d/images/hero/3/illustration.png" alt="Illustration" />
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default HeroSection;

