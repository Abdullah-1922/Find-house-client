import React from 'react';

const UnderConstruction = () => {
    return (
        <div>
              <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 bg-[url('https://code-theme.com/html/findhouses/images/bg/bg-under.jpg')] bg-repeat relative">
      {/* Warning Stripes */}
     
      
      <div className="flex flex-col items-center justify-center px-4 space-y-8 text-center">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider drop-shadow-lg">
          UNDER CONSTRUCTION
        </h1>

        {/* Email Subscription Form */}
        <form className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-pink-500 text-white font-semibold rounded hover:bg-pink-600 transition-colors"
          >
            Subscribe
          </button>
        </form>

        {/* Message */}
        <p className="text-white/90 text-lg max-w-2xl">
          Sorry... We are improving and fixing problems of our website. We will be back very soon....
        </p>
      </div>
    </div>
        </div>
    );
};

export default UnderConstruction;