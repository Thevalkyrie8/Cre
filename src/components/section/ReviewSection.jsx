import Badge from "../ui/Badge";
import { Button } from "../ui/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ReviewSection = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <>
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 px-4 py-2 text-green-700 border-green-200"
            >
              {t("testimonials.badge")}
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("testimonials.title")}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t("testimonials.subtitle")}
            </p>
          </div>

          {/* Horizontal Scrollable Reviews */}
          <div className="relative mb-12">
            <div
              id="testimonials-slider"
              className="overflow-x-auto pb-4 cursor-grab active:cursor-grabbing scroll-smooth"
              style={{
                scrollbarWidth: "none" /* Firefox */,
                msOverflowStyle: "none" /* Internet Explorer 10+ */,
              }}
              onScroll={(e) => {
                const slider = e.currentTarget;
                const slideWidth = 320 + 24; // width + gap
                const newIndex = Math.round(slider.scrollLeft / slideWidth);
                setCurrentSlide(newIndex);
              }}
              onMouseDown={(e) => {
                const slider = e.currentTarget;
                let isDown = false;
                let startX;
                let scrollLeft;

                const handleMouseDown = (e) => {
                  isDown = true;
                  slider.classList.add("active");
                  startX = e.pageX - slider.offsetLeft;
                  scrollLeft = slider.scrollLeft;
                };

                const handleMouseLeave = () => {
                  isDown = false;
                  slider.classList.remove("active");
                };

                const handleMouseUp = () => {
                  isDown = false;
                  slider.classList.remove("active");
                };

                const handleMouseMove = (e) => {
                  if (!isDown) return;
                  e.preventDefault();
                  const x = e.pageX - slider.offsetLeft;
                  const walk = (x - startX) * 2;
                  slider.scrollLeft = scrollLeft - walk;
                };

                slider.addEventListener("mousedown", handleMouseDown);
                slider.addEventListener("mouseleave", handleMouseLeave);
                slider.addEventListener("mouseup", handleMouseUp);
                slider.addEventListener("mousemove", handleMouseMove);

                return () => {
                  slider.removeEventListener("mousedown", handleMouseDown);
                  slider.removeEventListener("mouseleave", handleMouseLeave);
                  slider.removeEventListener("mouseup", handleMouseUp);
                  slider.removeEventListener("mousemove", handleMouseMove);
                };
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
                .active {
                  cursor: grabbing !important;
                }
              `}</style>
              <div className="flex gap-6" style={{ width: "max-content" }}>
                {/* Review Images */}
                {[
                  "/img/review1.png",
                  "/img/review2.png",
                  "/img/review3.png",
                  "/img/review4.png",
                  "/img/review5.png",
                ].map((src, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[calc(100vw-3rem)] sm:w-[560px] rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 select-none"
                  >
                    <img
                      src={src || "/placeholder.svg"}
                      alt={`Fiverr Review ${index + 1}`}
                      width={560}
                      height={300}
                      className="w-full h-auto"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {[0, 1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  onClick={() => {
                    const slider = document.getElementById(
                      "testimonials-slider"
                    );
                    const slideWidth = 320 + 24; // width + gap
                    slider.scrollTo({
                      left: index * slideWidth,
                      behavior: "smooth",
                    });
                    setCurrentSlide(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                    currentSlide === index
                      ? "bg-blue-600 shadow-lg"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* View More Button */}
          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg border-2 border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 bg-transparent"
            >
              <a
                href="https://www.fiverr.com/trux_nguyen?public_mode=true"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <i className="fa-solid fa-arrow-up-right-from-square"></i>{" "}
                {t("testimonials.viewMore")}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReviewSection;
