import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();

  const handleChangeLang = (lang) => {
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  // Hiển thị ngôn ngữ hiện tại
  const currentLang = i18n.language;
  const currentLabel = currentLang === "vi" ? "🇻🇳 Vietnamese" : "🇺🇸 English";

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
      >
        {currentLabel}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1 text-sm">
            <button
              onClick={() => handleChangeLang("vi")}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              🇻🇳 Vietnamese
            </button>
            <button
              onClick={() => handleChangeLang("en")}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              🇺🇸 English
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
