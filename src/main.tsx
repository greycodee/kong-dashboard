import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter ,useRoutes} from "react-router-dom";
import 'antd/dist/reset.css';
import './index.css'
import KongStatus from './status/KongStatus';
import KongServices from './services/KongServices';
import KongRouter from './router/KongRouter';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const routeData = [
  {
    path:"/",
    element: <App />,
    children:[
      {
        path: "/status",
        element: <KongStatus />
      },
      {
        path: "/services",
        element: <KongServices />
      },
      {
        path: "/router",
        element: <KongRouter />
      }
    ]
  }
]


const MyRoutes = ()=>{
  let routes = useRoutes(routeData)
  return routes
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
