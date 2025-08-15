import { Button } from "../ui/Button";
import Badge from "../ui/Badge";
import CheckIcon from "../assets/image/check.png";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation()

  return (
    <section className="relative h-[700px] flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="container mx-auto max-w-4xl px-6 relative z-10">
        <div className="space-y-8">
          <div className="flex items-center justify-center space-x-3">
            <Badge
              variant="outline"
              className="flex items-center px-4 py-1 text-sm font-medium border-blue-200 text-blue-700 bg-white"
            > <i className="fa-solid fa-globe w-4 h-4 mr-2 mt-2"></i>
              {t("hero.location")}
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-green-200 text-green-700 bg-white">
           <img
                      src={CheckIcon}
                      alt="Check Icon"
                      className="w-4 h-4 mr-2"
                    />
              {t("hero.status")}
            </Badge>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
           {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            All-in-One Solutions
            </span>
            <br />for Web, App, Marketing & E-Commerce
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-xl mx-auto">{t("hero.description")}</p>

          <div className="flex flex-col sm:flex-row gap-1 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
              asChild
            >
              <a href={t("hero.srcStartPro")} className="flex items-center gap-2">
                <i className="fa-solid fa-circle-play w-5 h-5 mt-2"></i>
                {t("hero.startProject")}
               
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-semibold border-2 border-gray-300 bg-white text-gray-800 hover:bg-gray-100 shadow-lg"
              asChild
            >
              <a href={t("hero.srcViewPo")} className="flex items-center gap-2">
                <i className="fa-solid fa-circle-play w-5 h-5 mt-2"></i>
                {t("hero.viewPortfolio")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection