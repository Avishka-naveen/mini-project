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
import Reviews from '../Components/customer/Reviews';

function LandingPage() {

  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div
      className="min-h-screen bg-white dark:bg-[#1e1e1e] text-black dark:text-white relative overflow-hidden"
      
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
        {/* customer review section */}
        <div>
          <Reviews />
        </div>
        {/* footer section */}
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;