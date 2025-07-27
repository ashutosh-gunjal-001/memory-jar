import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={{
      backgroundColor: 'var(--primary-light)',
      color: 'var(--primary-dark)',
      padding: '2rem',
      marginTop: '3rem',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h3 className="handwritten" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
          Capture the little moments that make life beautiful
        </h3>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          margin: '1.5rem 0'
        }}>
          <span role="img" aria-label="Sparkles" style={{ fontSize: '1.5rem' }}>✨</span>
          <span role="img" aria-label="Jar" style={{ fontSize: '1.5rem' }}>🏺</span>
          <span role="img" aria-label="Heart" style={{ fontSize: '1.5rem' }}>❤️</span>
        </div>
        
        <p style={{ fontSize: '0.9rem', marginBottom: '0' }}>
          &copy; {currentYear} Memory Jar - Your Year in a Jar
        </p>
        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-light)' }}>
          Made with love and React
        </p>
      </div>
    </footer>
  );
};

export default Footer; 