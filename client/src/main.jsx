import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import './index.css'

// Import css files slideshow
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import App from './App.jsx'
import ThemContext from './Context/ThemContext'
import { AppContextProvider } from './Context/Appcontext.jsx';

createRoot(document.getElementById('root')).render(

  <ThemContext>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>

      <ToastContainer />
    </BrowserRouter>
  </ThemContext>


)
