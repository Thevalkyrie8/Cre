import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import SimpleApp from './SimpleApp.jsx'

console.log('SimpleMain.jsx loaded');
console.log('Root element:', document.getElementById('root'));

const createErrorScreen = (titleText, descText) => {
  const box = document.createElement('div');
  box.style.cssText = 'padding: 20px; text-align: center; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: #f8f9fa; font-family: Arial, sans-serif;';

  const title = document.createElement('h1');
  title.style.color = '#dc3545';
  title.textContent = titleText;

  const desc = document.createElement('p');
  desc.style.color = '#555';
  desc.textContent = descText;

  const reloadBtn = document.createElement('button');
  reloadBtn.textContent = 'Tải lại trang';
  reloadBtn.style.cssText = 'padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 15px; font-weight: bold;';
  reloadBtn.onclick = () => window.location.reload();

  box.append(title, desc, reloadBtn);
  return box;
};

// Check if root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
  document.body.textContent = '';
  document.body.appendChild(createErrorScreen('❌ Không tìm thấy Root Element', 'Không thể tìm thấy phần tử root để hiển thị ứng dụng.'));
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <SimpleApp />
      </StrictMode>,
    );
    console.log('SimpleApp rendered successfully');
  } catch (error) {
    console.error('Error rendering SimpleApp:', error);
    rootElement.textContent = '';
    rootElement.appendChild(createErrorScreen('❌ Đã xảy ra sự cố hiển thị', 'Vui lòng tải lại trang hoặc liên hệ quản trị viên.'));
  }
}
