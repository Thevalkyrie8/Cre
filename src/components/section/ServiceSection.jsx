import Badge from '../ui/Badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import CheckIcon from '../assets/image/check.png';
import { useTranslation } from "react-i18next";

const ServiceSection = () => {

  const { t } = useTranslation();

  const title = t("services.title");
  const words = title.split(" ");
  const firstPart = words.slice(0, -2).join(" ");
  const lastPart = words.slice(-2).join(" ");

  const serviceItems = t("services.items", { returnObjects: true });

    return (
        <>
        <section id="services" className="scroll-mt-24 py-24 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-blue-700 border-blue-200">
              {t("services.badge")}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {firstPart + " "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {lastPart}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t("services.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceItems.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 bg-white"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 rounded-2xl ${service.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className={`text-transparent bg-clip-text bg-gradient-to-r ${service.color}`}>
                      <i className={`fa fa-${service.icon} fa-lg`}></i>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-3">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-500">
                        <img src={CheckIcon} alt="Check Icon" className="w-4 h-4 mr-2"/>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
        </>
    )
}

export default ServiceSection;