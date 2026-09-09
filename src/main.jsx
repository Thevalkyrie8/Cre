import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/palette.css'
import './styles.css'
import App from './App.jsx'

// Debug logging
console.log('🚀 Main.jsx loaded');
console.log('📍 Root element:', document.getElementById('root'));
console.log('🌐 Current URL:', window.location.href);
console.log('🏠 Base URL:', window.location.origin);

// Check if root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ Root element not found!');
  document.body.textContent = '';

  const errorBox = document.createElement('div');
  errorBox.style.cssText = 'padding: 20px; text-align: center; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: #f8f9fa; font-family: Arial, sans-serif;';

  const title = document.createElement('h1');
  title.style.color = '#dc3545';
  title.textContent = '❌ Không tìm thấy Root Element';

  const desc = document.createElement('p');
  desc.style.color = '#555';
  desc.textContent = 'Không thể tìm thấy phần tử root để hiển thị ứng dụng React.';

  const reloadBtn = document.createElement('button');
  reloadBtn.textContent = 'Tải lại trang';
  reloadBtn.style.cssText = 'padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 15px; font-weight: bold;';
  reloadBtn.onclick = () => window.location.reload();

  errorBox.append(title, desc, reloadBtn);
  document.body.appendChild(errorBox);
} else {
  console.log('✅ Root element found, creating React root...');
  try {
    const root = createRoot(rootElement);
    console.log('✅ React root created, rendering App...');
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
    console.log('🎉 App rendered successfully!');
  } catch (error) {
  console.error('💥 Error rendering app:', error);

  // Xóa nội dung cũ an toàn
  rootElement.textContent = '';

  const errorBox = document.createElement('div');
  errorBox.style.cssText = 'padding: 20px; text-align: center; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: #f8f9fa; font-family: Arial, sans-serif;';

  const title = document.createElement('h1');
  title.style.color = '#dc3545';
  title.textContent = '❌ Đã xảy ra sự cố hiển thị';

  const desc = document.createElement('p');
  desc.style.color = '#555';
  desc.textContent = 'Vui lòng tải lại trang hoặc liên hệ với đội ngũ kỹ thuật nếu sự cố vẫn tiếp diễn.';

  const reloadBtn = document.createElement('button');
  reloadBtn.textContent = 'Tải lại trang';
  reloadBtn.style.cssText = 'padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 15px; font-weight: bold;';
  reloadBtn.onclick = () => window.location.reload();

  errorBox.append(title, desc, reloadBtn);
  rootElement.appendChild(errorBox);
}
}
