import { FaBoxOpen } from "react-icons/fa";

const packages = [
  {
    name: "Starter Package",
    content: "Setup Web/App system or e-commerce store",
    cycle: "One-time"
  },
  {
    name: "Multi-channel Sales Package",
    content: "Fanpage + Ads + Shopee/TikTok Shop + Amazon",
    cycle: "Monthly / Quarterly"
  },
  {
    name: "Image & Video Package",
    content: "Photography, 3D rendering, advertising/viral video",
    cycle: "Per product"
  },
  {
    name: "Social & Content Package",
    content: "Content writing, image design, scheduled social posting",
    cycle: "Monthly"
  },
  {
    name: "Conversion Ads Package",
    content: "Run Facebook / TikTok / Google Ads + continuous optimization",
    cycle: "Monthly"
  },
  {
    name: "Affiliate Builder Package",
    content: "Build affiliate system, tracking links, commission dashboard",
    cycle: "One-time + maintenance"
  },
  {
    name: "Full Operation Package",
    content: "Combine all services for sales growth and retention goals",
    cycle: "Monthly / Quarterly"
  }
];

const ServicePackages = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-white to-gray-50 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <FaBoxOpen className="text-purple-600 text-3xl" />
          <h2 className="text-3xl font-bold text-gray-900">
            Service Packages On Demand
          </h2>
        </div>

        <div className="overflow-x-auto shadow-lg rounded-2xl bg-white">
          <table className="min-w-full border-collapse">
            <thead className="bg-gradient-to-r from-purple-50 to-pink-50">
              <tr>
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Service Package</th>
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Main Content</th>
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Cycle</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg, idx) => (
                <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{pkg.name}</td>
                  <td className="px-6 py-4 text-gray-600">{pkg.content}</td>
                  <td className="px-6 py-4 text-gray-600">{pkg.cycle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ServicePackages;
