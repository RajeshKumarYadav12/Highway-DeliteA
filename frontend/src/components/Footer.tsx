import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                <span className="text-2xl">📍</span>
              </div>
              <div>
                <h3 className="text-white text-lg font-bold">Highway</h3>
                <p className="text-xs text-gray-400 -mt-1">delite</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted partner for unforgettable travel experiences and adventure activities across India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="/search" className="hover:text-primary transition-colors">Browse Experiences</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Contact</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Blog</a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">Water Sports</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Trekking</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Adventure Sports</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Wildlife</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Nature Walk</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 flex-shrink-0 text-primary" />
                <span>123 Adventure Street, Bangalore, Karnataka 560001</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-primary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-primary" />
                <span>support@highwaydelite.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-sm text-gray-400 text-center md:text-left">
              © 2025 Highway Delite. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0">
              <ul className="flex justify-center md:justify-end space-x-6 text-sm">
                <li>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    Cancellation Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
