import { Button } from "../ui/Button";
import Badge from "../ui/Badge";
import CheckIcon from "../assets/image/check.png";
import PlaceholderIcon from "../assets/image/placeholder.svg";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="pt-24 pb-20 px-6 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Badge
                    variant="outline"
                    className="flex items-center px-4 py-1 text-sm font-medium border-blue-200 text-blue-700"
                  >
                    <i className="fa-solid fa-globe w-4 h-4 mr-2 mt-2"></i>
                    {t("hero.location")}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="px-4 py-2 text-sm font-medium border-green-200 text-green-700"
                  >
                    <img
                      src={CheckIcon}
                      alt="Check Icon"
                      className="w-4 h-4 mr-2"
                    />
                    {t("hero.status")}
                  </Badge>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Creative{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                    Designer
                  </span>
                  <br />& Video Editor
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  {t("hero.description")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold"
                >
                  <a href={t("hero.srcStartPro")} className="flex items-center gap-2">
                    {t("hero.startProject")}
                    <i className="fa-solid fa-arrow-right w-5 h-5 mt-2 text-white"></i>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold border-2 bg-transparent"
                >
                  <a href={t("hero.srcViewPo")} className="flex items-center gap-2">
                    <i className="fa-solid fa-circle-play w-5 h-5 mt-2"></i>
                    {t("hero.viewPortfolio")}
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8">
                  <img
                    src={PlaceholderIcon}
                    alt="Creative workspace"
                    className="w-full max-w-[600px] h-[400px] object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl opacity-80 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-60 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
