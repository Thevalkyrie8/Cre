import Badge from "../ui/Badge";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/Card";
import { useTranslation } from "react-i18next";

const PortfolioSection = () => {
  const { t } = useTranslation();

  const title = t("portfolio.title"); // Lấy chuỗi dịch
  const words = title.split(" ");
  const firstPart = words.slice(0, -2).join(" ");
  const lastPart = words.slice(-2).join(" ");

  const porPlatforms = t("portfolio.platforms", { returnObjects: true });

  return (
    <>
      <section
        id="portfolio"
        className="py-24 px-6 bg-gradient-to-br from-gray-900 to-blue-900"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 px-4 py-2 text-blue-300 border-blue-300"
            >
              {t("portfolio.badge")}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {firstPart + " "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {lastPart}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t("portfolio.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {porPlatforms.map((link, index) => (
              <Card
                key={index}
                className="group bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              >
                <CardHeader className="text-center p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <div className="text-white">
                      <i className={`fa-solid fa-${link.icon}`}></i>
                    </div>
                  </div>
                  <CardTitle className="text-xl text-white mb-2">
                    {link.platform}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {link.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioSection;
