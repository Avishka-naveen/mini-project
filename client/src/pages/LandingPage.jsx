import React, { useContext } from 'react';
import { ThemeContext } from '../Context/ThemContext';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/customer/NavBar';
import Banner from '../Components/customer/Banner';
import { BanknoteArrowDown } from 'lucide-react';
import SubBanner from '../Components/customer/SubBanner';
import Footer from '../Components/customer/Footer';
import Services from '../Components/customer/Services';
import About from '../Components/customer/About';

function LandingPage() {

  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div
      className="min-h-screen bg-white dark:bg-[#1e1e1e] text-black dark:text-white relative overflow-hidden"
      style={{
        backgroundImage: `
        radial-gradient(circle 88vw at var(--blob1-x, 20%) var(--blob1-y, 30%), rgba(255, 151, 0, 0.5) 0, transparent 90%),
          radial-gradient(circle 95vw at var(--blob2-x, 80%) var(--blob2-y, 70%), rgba(114, 0, 186, 0.7)  0 , transparent 90%)
     
        `,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',

        animation: 'float-blobs 10s cubic-bezier(0.37, 0, 0.63, 1) infinite',
        willChange: 'background-position',
      }}
    >
      
      <NavBar />
      <div className='lg:mx-15 mx-5 mt-5'>
        {/* landing page slideshow */}
        <Banner />
        {/* about section */}
        <div id='about'>
          <About />
        </div>
        {/* subbanner section */}
        <SubBanner />
        {/* services section */}
        <div id='services'>
          <Services />
        </div>
        {/* footer section */}
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;