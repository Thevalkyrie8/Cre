import Badge from '../ui/Badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import CheckIcon from '../assets/image/check.png';

const services = [
    {
      icon: <i className="fa-solid fa-palette fa-lg"></i>,
      title: "Thiết kế ấn phẩm truyền thông",
      description: "Logo, bao bì, menu, banner, catalogue và các ấn phẩm marketing chuyên nghiệp",
      features: ["Logo Design", "Print Design", "Marketing Materials"],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    },
    {
      icon: <i className="fa-solid fa-cube fa-lg"></i>,
      title: "Bộ nhận diện thương hiệu",
      description: "Xây dựng hệ thống nhận diện thương hiệu hoàn chỉnh và nhất quán",
      features: ["Brand Identity", "Style Guide", "Mockup Design"],
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    },
    {
      icon: <i className="fa-solid fa-phone fa-lg"></i>,
      title: "Thiết kế Social Media",
      description: "Content visual thu hút cho các nền tảng mạng xã hội và quảng cáo",
      features: ["Social Posts", "Stories", "Ad Creatives"],
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-50",
    },
    {
      icon: <i className="fa-solid fa-video fa-lg"></i>,
      title: "Chỉnh sửa video chuyên nghiệp",
      description: "Sản xuất video chất lượng cao cho mọi nền tảng và mục đích",
      features: ["Video Editing", "Motion Graphics", "Color Grading"],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
    },
    {
      icon: <i className="fa-solid fa-bullhorn fa-lg"></i>,
      title: "Video thương hiệu & sản phẩm",
      description: "Storytelling qua video để xây dựng thương hiệu mạnh mẽ",
      features: ["Brand Videos", "Product Showcase", "Corporate Videos"],
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-gradient-to-br from-orange-50 to-amber-50",
    },
    {
      icon: <i className="fa-solid fa-bolt fa-lg"></i>,
      title: "Công nghệ AI & Automation",
      description: "Ứng dụng AI trong sản xuất video và tối ưu hóa quy trình",
      features: ["AI Video", "Auto Subtitles", "S-Log Grading"],
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
    },
  ]

const ServiceSection = () => {
    return (
        <>
        <section id="services" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-blue-700 border-blue-200">
              Dịch vụ chuyên nghiệp
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Giải pháp sáng tạo{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                toàn diện
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Từ thiết kế thương hiệu đến sản xuất video, tôi cung cấp dịch vụ chất lượng cao giúp doanh nghiệp phát
              triển và tạo ấn tượng mạnh mẽ
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 bg-white"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 rounded-2xl ${service.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className={`text-transparent bg-clip-text bg-gradient-to-r ${service.color}`}>
                      {service.icon}
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
