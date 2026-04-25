import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// إعدادات اللغة العربية
 document.documentElement.lang = 'ar';
document.documentElement.dir = 'rtl';

// إخفاء مؤشر التحميل الأولي
const initialLoader = document.querySelector('.initial-loader');
if (initialLoader) {
  initialLoader.remove();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
