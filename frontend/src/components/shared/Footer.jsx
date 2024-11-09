import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'contact@talentspot.com' },
    { icon: Phone, text: '+1 (555) 123-4567' },
    { icon: MapPin, text: '123 Job Street, Career City, 12345' },
  ];

  const footerLinks = [
    { title: 'For Job Seekers', links: ['Browse Jobs', 'Career Advice', 'Resume Builder', 'Job Alerts'] },
    { title: 'For Employers', links: ['Post a Job', 'Browse Candidates', 'Pricing Plans', 'Recruitment Solutions'] },
    { title: 'Company', links: ['About Us', 'Our Team', 'Press', 'Contact Us'] },
  ];

  return (
    <footer className="bg-gradient-to-br from-green-600 to-green-800 text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and Social Links */}
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold"
            >
              TalentSpot
            </motion.h2>
            <p className="text-sm opacity-80">Connecting talent with opportunity</p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white hover:text-green-200 transition-colors duration-200"
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <a href="#" className="text-sm hover:text-green-200 transition-colors duration-200">
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-8 md:mt-12 pt-8 border-t border-green-400 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="space-y-2 mb-4 md:mb-0">
            {contactInfo.map((info, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-center space-x-2 text-sm"
              >
                <info.icon size={16} />
                <span>{info.text}</span>
              </motion.div>
            ))}
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm"
          >
            © 2024 TalentSpot. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;