import React from 'react';
import MemoryList from '../components/memories/MemoryList';
import JarAnimation from '../components/jar/JarAnimation';

const HomePage: React.FC = () => {
  return (
    <div className="container">
      <div className="home-layout">
        <div className="jar-container">
          <JarAnimation size="large" />
        </div>
        <div className="memories-container">
          <MemoryList />
        </div>
      </div>
    </div>
  );
};

export default HomePage; 