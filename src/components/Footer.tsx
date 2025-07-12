
import React from 'react';

const Footer = () => {
  const productLinks = ['Events', 'Clubs', 'AI Advisor'];
  const companyLinks = ['About', 'Careers', 'Blog'];
  const supportLinks = ['Help Center', 'Contact', 'Privacy'];

  return (
    <footer className="bg-primary py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
          {/* Logo & Tagline */}
          <div className="mb-8 lg:mb-0">
            <h3 className="text-[32px] font-semibold text-primary-foreground mb-2">
              ClubMate
            </h3>
            <p className="text-base font-normal text-gray-400">
              Smart campus club companion
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div>
              <h4 className="text-base font-medium text-primary-foreground mb-4">Product</h4>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-base font-medium text-gray-400 hover:text-primary-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-base font-medium text-primary-foreground mb-4">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-base font-medium text-gray-400 hover:text-primary-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-base font-medium text-primary-foreground mb-4">Support</h4>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-base font-medium text-gray-400 hover:text-primary-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-600 text-center">
          <p className="text-sm font-normal text-muted-foreground">
            © 2024 ClubMate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
