import Badge from "../ui/Badge";
import { useTranslation } from "react-i18next";

const ProcessSection = () => {
  const { t } = useTranslation();

  const title = t("process.title");
  const words = title.split(" ");
  const firstPart = words.slice(0, -2).join(" ");
  const lastPart = words.slice(-2).join(" ");

  const procesSteps = t("process.steps", { returnObjects: true });

  return (
    <>
      <section
        id="process"
        className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <Badge
              variant="outline"
              className="mb-4 px-4 py-2 text-purple-700 border-purple-200"
            >
              {t("process.badge")}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {firstPart + " "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                {lastPart}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("process.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {procesSteps.map((process, index) => (
              <div key={index} className="relative group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center h-full flex flex-col justify-between min-h-[320px]">
                  <div className="text-6xl font-bold text-gray-100 mb-4">
                    {process.step}
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <div className="text-white">
                      <i className={`fa-solid fa-${process.icon} fa-lg`}></i>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {process.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {process.description}
                  </p>
                </div>
                {index < procesSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProcessSection;
