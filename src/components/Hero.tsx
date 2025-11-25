import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Truck, Wrench } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import video1 from "@/assets/iphone-1.mp4";
import video2 from "@/assets/iphone-2.mp4";
import video3 from "@/assets/iphone-3.mp4";
import video4 from "@/assets/iphone-4.mp4";
import video5 from "@/assets/iphone-5.mp4";
import video6 from "@/assets/iphone-6.mp4";

export const Hero = () => {
  const heroVideos = [video1, video2, video3, video4, video5, video6];

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
      
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-32">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-sm text-accent border border-accent/20">
                Premium Phones & Expert Repairs
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                Your Trusted Phone Partner in  Los Angeles
              </h1>
              <p className="text-lg text-primary-foreground/80 max-w-xl">
                Hollywood Phone Spot offers premium phones, expert repairs, quality accessories, and fast delivery across Los Angeles and beyond.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground group"
              >
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <p className="text-sm text-primary-foreground/80">1 Year Warranty</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Truck className="h-6 w-6 text-accent" />
                </div>
                <p className="text-sm text-primary-foreground/80">Fast Delivery</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Wrench className="h-6 w-6 text-accent" />
                </div>
                <p className="text-sm text-primary-foreground/80">Expert Repairs</p>
              </div>
            </div>
          </div>

          <div className="relative lg:block hidden animate-slide-up">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full transform scale-75"></div>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 3000,
                  }),
                ]}
                className="relative rounded-2xl shadow-2xl overflow-hidden"
              >
                <CarouselContent>
                  {heroVideos.map((video, index) => (
                    <CarouselItem key={index}>
                      <video
                        src={video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-[500px] object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
