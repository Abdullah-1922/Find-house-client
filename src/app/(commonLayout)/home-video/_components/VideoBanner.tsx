import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VideoBanner() {
  return (
    <section className="relative min-h-[650px] w-full overflow-hidden -mt-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://media.architecturaldigest.com/photos/61b0ce48dccdb75fa170f8f7/16:9/w_2560%2Cc_limit/PurpleCherry_Williams_0012.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-900/70" />

      {/* Angled Bottom Edge */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
          height="200"
        >
          <path
            fill="white"
            d="M0,0 C300 590 440,200 1440,0 L1440,320 Q720,400 0,420 Z"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[600px] max-w-7xl flex-col items-start justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            THE BEST WAY TO FIND YOUR DREAM HOME
          </h1>
          <p className="mb-8 text-lg text-white/90 sm:text-xl">
            With over 400,000 active listings, FindHouses has the largest
            inventory of apartments in the United States.
          </p>
          <Button size="lg" variant="secondary" className="rounded-full">
            Get Started
          </Button>
        </div>

        {/* Play Button */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute -inset-4 animate-ping rounded-full bg-white/20" />
            <Button
              size="icon"
              variant="secondary"
              className="h-16 w-16 rounded-full"
            >
              <Play className="h-6 w-6" />
              <span className="sr-only">Play video</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
