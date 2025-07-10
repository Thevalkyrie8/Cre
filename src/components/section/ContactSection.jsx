import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import Badge from '../ui/Badge';

const ContactSection = () => {
    return (
        <>
        <section id="contact" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-blue-700 border-blue-200">
              Liên hệ
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Sẵn sàng{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                hợp tác
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hãy liên hệ để thảo luận về dự án của bạn. Tôi luôn sẵn sàng lắng nghe và tạo ra những sản phẩm tuyệt vời
              cùng nhau.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <i className="fa-solid fa-phone fa-lg"></i>,
                title: "Zalo",
                info: "[Số điện thoại]",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: <i className="fa-solid fa-envelope fa-lg"></i>,
                title: "Gmail",
                info: "[Email]",
                color: "from-blue-500 to-cyan-500",
              },
              {

                icon: <i className="fa-brands fa-facebook-f fa-lg"></i>,
                title: "Facebook",
                info: "[Link profile]",
                color: "from-blue-600 to-indigo-600",
              },
            ].map((contact, index) => (
              <Card
                key={index}
                className="group text-center p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${contact.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
                >
                  <div className="text-white">{contact.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{contact.title}</h3>
                <p className="text-gray-600">{contact.info}</p>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold"
            >
              Bắt đầu dự án ngay
              <i className="fa-solid fa-arrow-right w-5 h-5 mt-2 text-white"></i>
            </Button>
          </div>
        </div>
      </section>
        </>
    )
}

export default ContactSection;