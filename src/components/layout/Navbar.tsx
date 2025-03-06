
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Car, BarChart3, ClipboardCheck, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isAdminPath = location.pathname.startsWith('/admin');

  const navLinks = isAdminPath
    ? [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <BarChart3 className="h-5 w-5" /> },
        { name: 'Vistoria Entrada', path: '/admin/vistoria-entrada', icon: <ClipboardCheck className="h-5 w-5" /> },
        { name: 'Atualizações', path: '/admin/atualizacoes', icon: <RefreshCw className="h-5 w-5" /> },
      ]
    : [
        { name: 'Home', path: '/', icon: null},
        { name: 'Consulta', path: '/consulta', icon: <Search className="h-5 w-5"/> },
      ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm dark:bg-gray-900/80" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-primary font-semibold text-lg transition duration-150 ease-in-out animate-fade-in"
          >
            <Car className="h-6 w-6" />
            <span>Feedback Ativo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center space-x-8">
            {navLinks.map((link) => (
              <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center space-x-1 text-sm font-medium transition-colors duration-200",
                link.name === "Home"
                  ? "text-red-500" // Força a cor vermelha para "Home"
                  : location.pathname === link.path 
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white"
              )}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>            
            ))}
            {!isAdminPath && (
              <Button asChild variant="outline" className="ml-4">
                <Link to="/admin/dashboard">Área Administrativa</Link>
              </Button>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden py-4 bg-white dark:bg-gray-900 shadow-md animate-slide-down">
          <div className="container mx-auto px-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center space-x-2 py-2 text-base font-medium transition-colors duration-200",
                  location.pathname === link.path 
                    ? "text-primary" 
                    : "text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white"
                )}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            {!isAdminPath && (
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/admin/dashboard">Área Administrativa</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
