import React, { useEffect, useState } from 'react';
import { useMemory } from '../../contexts/MemoryContext';

// Create SVG jar image
const JarSVG = () => (
  <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    {/* Jar lid */}
    <path d="M55 40 L145 40 L140 55 L60 55 Z" fill="#a67c52" />
    <ellipse cx="100" cy="40" rx="45" ry="10" fill="#d4b996" />
    
    {/* Jar top rim */}
    <path d="M60 55 L140 55 L135 65 L65 65 Z" fill="#d4b996" />
    
    {/* Jar body */}
    <path d="M65 65 L135 65 L145 260 L55 260 Z" fill="none" stroke="#d4b996" strokeWidth="3" />
    
    {/* Jar bottom */}
    <ellipse cx="100" cy="260" rx="45" ry="12" fill="#d4b996" opacity="0.7" />
    
    {/* Jar shine */}
    <path d="M75 70 Q85 150 80 250" fill="none" stroke="white" strokeWidth="2" opacity="0.5" />
  </svg>
);

interface JarAnimationProps {
  size?: 'small' | 'medium' | 'large';
}

const JarAnimation: React.FC<JarAnimationProps> = ({ size = 'medium' }) => {
  const { memories } = useMemory();
  const [fillHeight, setFillHeight] = useState(0);
  
  // Set jar dimensions based on size prop
  const getDimensions = () => {
    switch (size) {
      case 'small':
        return { width: '150px', height: '200px' };
      case 'large':
        return { width: '300px', height: '400px' };
      case 'medium':
      default:
        return { width: '200px', height: '300px' };
    }
  };
  
  // Calculate fill level based on number of memories
  useEffect(() => {
    const maxMemories = 365; // One year of memories
    const percentage = Math.min((memories.length / maxMemories) * 100, 95);
    
    // Animate filling the jar
    const animateFill = () => {
      let current = 0;
      const target = percentage;
      const increment = target / 50; // Increase by smaller increments for smooth animation
      
      const fillInterval = setInterval(() => {
        current += increment;
        setFillHeight(current);
        
        if (current >= target) {
          clearInterval(fillInterval);
          setFillHeight(target);
        }
      }, 20);
      
      return () => clearInterval(fillInterval);
    };
    
    const timer = setTimeout(animateFill, 500); // Delay start of animation
    
    return () => clearTimeout(timer);
  }, [memories.length]);
  
  const dimensions = getDimensions();
  
  // Calculate memory items to display in jar (just for visual effect)
  const memoryItems = memories.slice(0, 30).map((memory, index) => {
    const randomX = 65 + Math.random() * 60; // Random X position within jar
    const randomY = 240 - (index / 30) * (fillHeight * 1.7); // Y position based on index and fill height
    const randomRotation = Math.random() * 360; // Random rotation
    const randomSize = 8 + Math.random() * 15; // Random size
    const randomDelay = Math.random() * 5; // Random animation delay
    
    return (
      <div
        key={memory.id}
        style={{
          position: 'absolute',
          left: `${randomX}px`,
          top: `${randomY}px`,
          width: `${randomSize}px`,
          height: `${randomSize}px`,
          backgroundColor: `var(--primary-light)`,
          opacity: 0.6,
          borderRadius: '50%',
          transform: `rotate(${randomRotation}deg)`,
          animation: `float 5s ease-in-out infinite`,
          animationDelay: `${randomDelay}s`,
          zIndex: 1
        }}
      />
    );
  });
  
  return (
    <div className="jar-container" style={{ width: dimensions.width, height: dimensions.height, position: 'relative' }}>
      {/* Memory particles */}
      {memoryItems}
      
      {/* Fill effect */}
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          left: '28%',
          right: '28%',
          height: `${fillHeight}%`,
          backgroundColor: 'rgba(212, 185, 150, 0.3)',
          borderBottomLeftRadius: '100px 50px',
          borderBottomRightRadius: '100px 50px',
          transition: 'height 0.5s ease-in-out',
          zIndex: 0
        }}
      />
      
      {/* Jar SVG */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
        <JarSVG />
      </div>
      
      {/* Memory count */}
      <div
        style={{
          position: 'absolute',
          bottom: '-40px',
          left: '0',
          right: '0',
          textAlign: 'center',
          color: 'var(--primary-dark)',
          fontWeight: 'bold'
        }}
      >
        {memories.length} {memories.length === 1 ? 'memory' : 'memories'}
      </div>
    </div>
  );
};

export default JarAnimation; 