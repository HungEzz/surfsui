import React from "react";
import { motion } from "framer-motion";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Heart,
  ArrowUp,
  Zap,
  Shield,
  TrendingUp
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    product: [
      { name: "Dashboard", href: "/dashboard" },
      { name: "Analytics", href: "#" },
      { name: "Rankings", href: "#" },
      { name: "API", href: "#" }
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Press", href: "#" }
    ],
    resources: [
      { name: "Documentation", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Community", href: "#" },
      { name: "Status", href: "#" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Disclaimer", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-blue-400" },
    { icon: Github, href: "#", label: "GitHub", color: "hover:text-gray-300" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-500" },
    { icon: Mail, href: "#", label: "Email", color: "hover:text-green-400" }
  ];

  const features = [
    { icon: Zap, text: "Real-time Data", color: "text-yellow-400" },
    { icon: Shield, text: "Secure & Reliable", color: "text-green-400" },
    { icon: TrendingUp, text: "Advanced Analytics", color: "text-blue-400" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 border-t border-gray-700/50">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 mb-12">
          
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">🏄</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  SurfSui
                </h3>
                <p className="text-sm text-gray-400">Sui DApp Analytics Platform</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Discover, analyze, and track the most innovative decentralized applications on the Sui blockchain. 
              Get real-time insights and make informed decisions in the Sui ecosystem.
            </p>

            {/* Features */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <feature.icon className={`w-4 h-4 ${feature.color}`} />
                  <span className="text-gray-300 text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h4 className="text-white font-semibold text-lg mb-4 capitalize">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated with Sui Ecosystem
            </h3>
            <p className="text-gray-300 mb-6">
              Get the latest insights, market analysis, and Sui DApp updates delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-black/30 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
              />
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-700/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Copyright */}
          <div className="flex items-center space-x-2 text-gray-400 text-sm mb-4 md:mb-0">
            <span>© 2024 SurfSui. Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-400 fill-current" />
            </motion.div>
            <span>for the Sui community</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className={`p-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-400 ${social.color} transition-all duration-200 hover:bg-gray-700/50 hover:border-gray-600/50`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
            
            {/* Scroll to Top Button */}
            <motion.button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-400 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-200"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
    </footer>
  );
};

export default Footer; 