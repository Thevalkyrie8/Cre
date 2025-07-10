import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import PaletteIcon from '../assets/image/palette-solid.svg';

const HeaderComp = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 bg-white/95 backdrop-blur-lg border-b border-gray-100">
      <div className="container mx-auto py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              <img src={PaletteIcon} alt="Palette Icon" className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-gray-900">Creative Studio</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="#services" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Dịch vụ
            </Link>
            <Link to="#process" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Quy trình
            </Link>
            <Link to="#portfolio" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Portfolio
            </Link>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              Liên hệ
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default HeaderComp;
