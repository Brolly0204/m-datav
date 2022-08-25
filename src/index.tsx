import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.less'
import 'normalize.css'
import Routes from '@components/Routes'
var a = 123
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode> // 开发环境 严格模式下 useEffect会执行两次
    <Routes />
  // </React.StrictMode>
);
