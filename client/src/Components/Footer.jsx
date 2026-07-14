import React from "react";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-[#0f172a] text-gray-700 dark:text-gray-300 pt-16">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-purple-400">
              Quick<span className="text-gray-900 dark:text-white">Hire</span>
            </h3>

            <p className="mt-3 text-sm">
              Your trusted platform for skilled home service professionals.
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Sri Lanka
              </p>
              <p className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPhone} /> +94 000 000 000
              </p>
              <p className="flex items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} /> support@quickhire.com
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <li key={item} className="flex items-center gap-2 hover:text-blue-500 dark:hover:text-purple-400 cursor-pointer">
                  <FontAwesomeIcon icon={faChevronRight} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              {["FAQ", "Privacy", "Terms", "Help"].map((item) => (
                <li key={item} className="flex items-center gap-2 hover:text-blue-500 dark:hover:text-purple-400 cursor-pointer">
                  <FontAwesomeIcon icon={faChevronRight} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Services</h4>
            <ul className="space-y-2 text-sm">
              {["Plumber", "Electrician", "Carpenter", "Painter"].map((item) => (
                <li key={item} className="flex items-center gap-2 hover:text-blue-500 dark:hover:text-purple-400 cursor-pointer">
                  <FontAwesomeIcon icon={faChevronRight} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Newsletter</h4>

            <p className="text-sm mb-3">
              Get updates on new services
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 rounded-l-lg bg-white dark:bg-[#1e293b] border border-gray-300 dark:border-gray-700 outline-none"
              />
              <button className="bg-blue-600 dark:bg-purple-600 text-white px-4 rounded-r-lg">
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-4">
              <div className="p-2 bg-gray-200 dark:bg-[#1e293b] rounded-full cursor-pointer">
                <FontAwesomeIcon icon={faFacebookF} />
              </div>
              <div className="p-2 bg-gray-200 dark:bg-[#1e293b] rounded-full cursor-pointer">
                <FontAwesomeIcon icon={faTwitter} />
              </div>
              <div className="p-2 bg-gray-200 dark:bg-[#1e293b] rounded-full cursor-pointer">
                <FontAwesomeIcon icon={faInstagram} />
              </div>
              <div className="p-2 bg-gray-200 dark:bg-[#1e293b] rounded-full cursor-pointer">
                <FontAwesomeIcon icon={faWhatsapp} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p>© {currentYear} QuickHire. All rights reserved.</p>

          <div className="flex gap-3 mt-3 sm:mt-0">
            <span>Visa</span>
            <span>MasterCard</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;