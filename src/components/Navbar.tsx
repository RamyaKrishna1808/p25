import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, LogOut } from 'lucide-react';
import '../styles/navbar.css';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <a href="#" className="navbar-logo">
          📚 AssignHub
        </a>
        <div className="navbar-menu">
          {user && (
            <>
              <span className="navbar-link">{user.name} ({user.role})</span>
              <button className="theme-toggle" onClick={toggleTheme} title="Toggle dark mode">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button className="btn btn-secondary" onClick={onLogout}>
                <LogOut size={18} />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
