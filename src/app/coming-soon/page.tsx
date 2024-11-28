'use client';

import { useState, useEffect } from 'react';

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2518,
    hours: 6,
    minutes: 8,
    seconds: 8,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        clearInterval(timer);
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#3f3d7d] text-white relative overflow-hidden">
      {/* Grid Background */}
      <div
        className="absolute inset-0 bg-[url('https://code-theme.com/html/findhouses/images/bg/coming-soon.jpg')] opacity-20"
        aria-hidden="true"
      />

      {/* Blueprint Background */}
      <div
        className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-center bg-cover opacity-10"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl font-bold mb-8">WE ARE COMING SOON</h1>

        {/* Countdown Timer */}
        <div className="flex justify-center gap-2 md:p-5 space-x-4 mb-8">
          <div>
            <span className="text-4xl font-bold">{timeLeft.days}</span>
            <p className="text-sm">Days</p>
          </div>
          <div>
            <span className="text-4xl font-bold">
              {timeLeft.hours.toString().padStart(2, '0')}
            </span>
            <p className="text-sm">Hours</p>
          </div>
          <div>
            <span className="text-4xl font-bold">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </span>
            <p className="text-sm">Minutes</p>
          </div>
          <div>
            <span className="text-4xl font-bold">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </span>
            <p className="text-sm">Seconds</p>
          </div>
        </div>

        {/* Subscription Form */}
        <form className="flex justify-center mb-8">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="px-4 py-2 w-64 text-black"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#ff3366] text-white font-bold"
          >
            Subscribe
          </button>
        </form>

        <p className="text-lg max-w-2xl mx-auto">
          Sorry.... We are improving and fixing problems of our website. We will
          be back very soon....
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
