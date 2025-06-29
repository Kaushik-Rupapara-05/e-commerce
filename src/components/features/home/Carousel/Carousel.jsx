import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const Carousel = ({
  images = [],
  autoPlay = true,
  interval = 4000,
  showDots = true,
  showArrows = true,
  showPlayPause = true,
  className = "",
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const defaultImages = [
    {
      url: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&h=600&fit=crop",
      title: "Premium Coffee Experience",
      subtitle: "Discover our finest coffee blends from around the world",
    },
    {
      url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&h=600&fit=crop",
      title: "Artisan Roasted",
      subtitle: "Carefully crafted by our expert roasters",
    },
    {
      url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=600&fit=crop",
      title: "Fresh Daily",
      subtitle: "Roasted fresh every morning for optimal flavor",
    },
    {
      url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=600&fit=crop",
      title: "Coffee Culture",
      subtitle: "Join our community of coffee enthusiasts",
    },
  ];

  const slides = images.length > 0 ? images : defaultImages;

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, interval, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className={`relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl group ${className}`}
    >
      {/* Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out`}
          style={{
            transform: `translateX(${(index - currentSlide) * 100}%)`,
            opacity: index === currentSlide ? 1 : 0,
          }}
        >
          <img
            src={slide.url || slide}
            alt={slide.title || `Slide ${index + 1}`}
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 font-display leading-tight">
                {slide.title || "Premium Coffee Experience"}
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl opacity-90 mb-6">
                {slide.subtitle ||
                  "Discover our finest coffee blends from around the world"}
              </p>

              {/* Slide indicator */}
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-sm font-medium">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(slides.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Play/Pause Button */}
      {showPlayPause && (
        <button
          onClick={togglePlayPause}
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>
      )}

      {/* Dots Navigation */}
      {showDots && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default Carousel;
