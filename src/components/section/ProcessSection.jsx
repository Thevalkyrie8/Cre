import Badge from '../ui/Badge';

const workingProcess = [
    {
      step: "01",
      title: "Tư vấn & Lắng nghe",
      description: "Tìm hiểu chi tiết yêu cầu, mục tiêu và vision của khách hàng",
      icon: <i className="fa-solid fa-users fa-lg"></i>,
    },
    {
      step: "02",
      title: "Concept & Ý tưởng",
      description: "Phát triển ý tưởng sáng tạo phù hợp với thương hiệu",
      icon: <i className="fa-solid fa-bolt fa-lg"></i>,
    },
    {
      step: "03",
      title: "Thiết kế & Sản xuất",
      description: "Thực hiện dự án với chất lượng cao và attention to detail",
      icon: <i className="fa-solid fa-palette fa-lg"></i>,
    },
    {
      step: "04",
      title: "Review & Hoàn thiện",
      description: "Chỉnh sửa theo feedback và giao hàng đúng timeline",
      icon: <i className="fa-solid fa-circle-check fa-lg"></i>,
    },
  ]


const ProcessSection = () => {
    return (
        <>
<section id="process" className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-purple-700 border-purple-200">
              Quy trình làm việc
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Phương pháp{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                chuyên nghiệp
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quy trình làm việc được tối ưu hóa để đảm bảo chất lượng cao và sự hài lòng của khách hàng
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workingProcess.map((process, index) => (
              <div key={index} className="relative group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                  <div className="text-6xl font-bold text-gray-100 mb-4">{process.step}</div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <div className="text-white">{process.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{process.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{process.description}</p>
                </div>
                {index < workingProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
        </>
    )
}

export default ProcessSection;