import PaletteIcon from "../assets/image/palette-solid.svg";

import { useTranslation } from 'react-i18next';

// Complete
const FooterComp = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <footer className="py-12 px-6 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                <img src={PaletteIcon} alt="Palette Icon" className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white">
                Creative Studio
              </span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>
                &copy; 2024 Creative Studio. {t('footer.text')}
              </p>
              <p className="text-sm mt-1">
                {t('footer.subtext')}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterComp;
