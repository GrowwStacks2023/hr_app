import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const navigation: any[] = [
    // { name: 'Process', href: '/process' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          {
            isAdminRoute && isAuthenticated ? (
              <>

                <Link to="/admin" className="flex items-center space-x-2 group">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg group-hover:scale-105 transition-transform duration-200">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Growwstacks
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/careers" className="flex items-center space-x-2 group">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg group-hover:scale-105 transition-transform duration-200">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Growwstacks
                  </span>
                </Link>
              </>
            )
          }

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {!isAdminRoute && navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive(item.href)
                    ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
              >
                {item.name}
              </Link>
            ))}

            {isAdminRoute && isAuthenticated && (
              <>
                {/* <Link
                  to="/admin"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${location.pathname === '/admin'
                      ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/candidates"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${location.pathname === '/admin/candidates'
                      ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                >
                  Candidates
                </Link>
                <Link
                  to="/admin/jobs"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${location.pathname === '/admin/jobs'
                      ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                >
                  Jobs
                </Link> */}
              </>
            )}
          </nav>

          {/* CTA Button / Admin Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span>{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                {/* {!isAdminRoute && (
                  <Link
                    to="/careers"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Join Our Team
                  </Link>
                )} */}
                <Link
                  to="/admin/login"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {!isAdminRoute && navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                >
                  {item.name}
                </Link>
              ))}

              {isAdminRoute && isAuthenticated && (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/candidates"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  >
                    Candidates
                  </Link>
                  <Link
                    to="/admin/jobs"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  >
                    Jobs
                  </Link>
                </>
              )}

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg font-medium text-center"
                >
                  Logout
                </button>
              ) : (
                <>
                  {!isAdminRoute && (
                    <Link
                      to="/careers"
                      onClick={() => setIsMenuOpen(false)}
                      className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium text-center"
                    >
                      Join Our Team
                    </Link>
                  )}
                  <Link
                    to="/admin/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 mt-2 text-gray-600 hover:text-blue-600"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Admin Login</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;