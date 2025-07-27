import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header style={{
      backgroundColor: 'var(--white)',
      padding: '1rem 2rem',
      boxShadow: 'var(--shadow-sm)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ 
            margin: 0, 
            color: 'var(--primary-dark)',
            fontSize: '1.8rem',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span role="img" aria-label="jar" style={{ marginRight: '0.5rem', fontSize: '2rem' }}>🏺</span>
            <span>Memory Jar</span>
          </h1>
        </Link>
        
        <nav>
          <ul style={{ 
            display: 'flex',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            gap: '1.5rem'
          }}>
            <li>
              <Link 
                to="/" 
                style={{ 
                  color: location.pathname === '/' ? 'var(--primary)' : 'var(--text)',
                  fontWeight: location.pathname === '/' ? 'bold' : 'normal',
                  fontSize: '1rem',
                  textDecoration: 'none',
                  padding: '0.5rem 0',
                  borderBottom: location.pathname === '/' ? '2px solid var(--primary)' : '2px solid transparent'
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/timeline" 
                style={{ 
                  color: location.pathname === '/timeline' ? 'var(--primary)' : 'var(--text)',
                  fontWeight: location.pathname === '/timeline' ? 'bold' : 'normal',
                  fontSize: '1rem',
                  textDecoration: 'none',
                  padding: '0.5rem 0',
                  borderBottom: location.pathname === '/timeline' ? '2px solid var(--primary)' : '2px solid transparent'
                }}
              >
                Timeline
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 