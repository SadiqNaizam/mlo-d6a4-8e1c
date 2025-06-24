import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, Home, UtensilsCrossed } from 'lucide-react';
import AnimatedCartIcon from '@/components/AnimatedCartIcon';

const Header: React.FC = () => {
  console.log('Header loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-full px-4 py-2 transition-colors duration-300 font-heading font-semibold text-lg ${
      isActive
        ? 'bg-primary text-primary-foreground shadow-md'
        : 'text-foreground/70 hover:bg-secondary hover:text-foreground'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Bell className="h-8 w-8 text-yellow-400 group-hover:animate-swing" style={{ transformOrigin: 'top center' }} />
          <span className="font-heading text-2xl font-bold text-primary-dark">
            Doraemon's Delights
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <NavLink to="/" className={navLinkClasses}>
            <Home className="h-5 w-5" />
            Home
          </NavLink>
          <NavLink to="/menu" className={navLinkClasses}>
            <UtensilsCrossed className="h-5 w-5" />
            Menu
          </NavLink>
        </nav>
        <div className="flex items-center">
          {/* A dummy item count is passed for demonstration */}
          <AnimatedCartIcon itemCount={3} />
        </div>
      </div>
    </header>
  );
};

// Add keyframes for the swing animation if not already in global CSS
const style = document.createElement('style');
style.innerHTML = `
  @keyframes swing {
    20% { transform: rotate3d(0, 0, 1, 15deg); }
    40% { transform: rotate3d(0, 0, 1, -10deg); }
    60% { transform: rotate3d(0, 0, 1, 5deg); }
    80% { transform: rotate3d(0, 0, 1, -5deg); }
    100% { transform: rotate3d(0, 0, 1, 0deg); }
  }
  .animate-swing {
    animation: swing 1s ease-in-out;
  }
`;
document.head.appendChild(style);


export default Header;