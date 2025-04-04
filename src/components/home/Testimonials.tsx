
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { testimonials } from "@/utils/data";
import { Button } from "@/components/ui/button";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"
        }`}
      />
    ));
  };

  return (
    <section className="section-padding bg-realty-800 text-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 h-64 w-64 bg-realty-gold/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 h-64 w-64 bg-realty-gold/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-semibold mb-2">
            Client Testimonials
          </h2>
          <p className="text-realty-300 max-w-2xl mx-auto">
            Hear from our satisfied clients who found their dream homes with HomePulse Realty.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Quote icon */}
            <div className="absolute -top-10 left-0 md:-left-10 text-realty-gold/20">
              <Quote size={80} />
            </div>
            
            {/* Testimonial card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 md:p-10">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6">
                  <img
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    className="h-20 w-20 rounded-full object-cover border-4 border-realty-gold/30"
                  />
                </div>
                
                <div className="flex mb-4">{renderStars(testimonials[activeIndex].rating)}</div>
                
                <blockquote className="mb-6 text-lg md:text-xl italic">
                  "{testimonials[activeIndex].testimonial}"
                </blockquote>
                
                <div>
                  <p className="font-heading font-semibold text-lg">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-realty-400">{testimonials[activeIndex].location}</p>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-center mt-8 space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                className="rounded-full border-realty-600 text-realty-300 hover:bg-realty-700 hover:text-white"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center space-x-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === activeIndex 
                        ? "w-8 bg-realty-gold" 
                        : "w-2 bg-realty-700"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="rounded-full border-realty-600 text-realty-300 hover:bg-realty-700 hover:text-white"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
