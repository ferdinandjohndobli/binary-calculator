'use client';

import { useEffect, useRef } from 'react';

// Cursor trail effect for different themes
export default function useCursorEffects(theme) {
  // Track previous theme to detect changes
  const prevThemeRef = useRef(null);
  
  // Apply one-time transition animation when theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Skip on initial render
    if (prevThemeRef.current && prevThemeRef.current !== theme) {
      // Apply transition animation based on the new theme
      if (theme === 'synthwave' || theme === 'retro') {
        const body = document.body;
        const cursor = document.createElement('div');
        cursor.className = `theme-transition-${theme}`;
        cursor.style.position = 'fixed';
        cursor.style.width = '100%';
        cursor.style.height = '100%';
        cursor.style.top = '0';
        cursor.style.left = '0';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '9999';
        body.appendChild(cursor);
        
        // Remove after animation completes
        setTimeout(() => {
          if (cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
          }
        }, 1000);
      }
    }
    
    // Update previous theme reference
    prevThemeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    // Skip on server-side rendering
    if (typeof window === 'undefined') return;

    // Clean up any existing effects
    const existingTrail = document.getElementById('cursor-trail');
    if (existingTrail) {
      existingTrail.remove();
    }

    // Create container for the cursor trail
    const trailContainer = document.createElement('div');
    trailContainer.id = 'cursor-trail';
    trailContainer.style.position = 'fixed';
    trailContainer.style.pointerEvents = 'none';
    trailContainer.style.zIndex = '9999';
    trailContainer.style.top = '0';
    trailContainer.style.left = '0';
    trailContainer.style.width = '100%';
    trailContainer.style.height = '100%';
    trailContainer.style.overflow = 'hidden';
    document.body.appendChild(trailContainer);

    // Store trail particles
    const particles = [];
    const maxParticles = 20;

    // Color and effect configurations for different themes
    const themeConfig = {
      cyber: {
        colors: ['#3b82f6', '#8b5cf6', '#2563eb'],
        size: 8,
        decay: 0.95,
        effectName: 'pulse'
      },
      neon: {
        colors: ['#ec4899', '#facc15', '#f472b6'],
        size: 10,
        decay: 0.92,
        effectName: 'glow'
      },
      future: {
        colors: ['#06b6d4', '#4f46e5', '#0284c7'],
        size: 6,
        decay: 0.96,
        effectName: 'fade'
      },
      matrix: {
        colors: ['#10b981', '#047857', '#059669'],
        size: 12,
        decay: 0.9,
        effectName: 'matrix'
      },
      retro: {
        colors: ['#f97316', '#fbbf24', '#ea580c'],
        size: 8,
        decay: 0.92,
        effectName: 'pixelate'
      },
      midnight: {
        colors: ['#2563eb', '#7e22ce', '#1d4ed8'],
        size: 7,
        decay: 0.94,
        effectName: 'trail'
      },
      candy: {
        colors: ['#f472b6', '#60a5fa', '#e879f9'],
        size: 9,
        decay: 0.91,
        effectName: 'bubble'
      },
      synthwave: {
        colors: ['#c026d3', '#4f46e5', '#7c3aed'],
        size: 10,
        decay: 0.9,
        effectName: 'waves'
      }
    };

    // Default to cyber theme if the theme is not recognized
    const config = themeConfig[theme] || themeConfig.cyber;

    // Mouse move handler to create trail particles
    function handleMouseMove(e) {
      const x = e.clientX;
      const y = e.clientY;
      
      // Create particle based on theme
      createParticle(x, y, config);
    }

    // Create a particle element
    function createParticle(x, y, config) {
      // Remove oldest particle if we've reached the maximum
      if (particles.length >= maxParticles) {
        const oldest = particles.shift();
        if (oldest && oldest.element && oldest.element.parentNode) {
          oldest.element.parentNode.removeChild(oldest.element);
        }
      }

      // Create a new particle element
      const particle = document.createElement('div');
      particle.className = `cursor-particle cursor-${config.effectName}`;
      
      // Basic styles for all particles
      particle.style.position = 'absolute';
      particle.style.pointerEvents = 'none';
      
      // Randomize color from theme colors
      const color = config.colors[Math.floor(Math.random() * config.colors.length)];
      particle.style.backgroundColor = color;
      particle.style.boxShadow = `0 0 ${config.size}px ${color}`;
      
      // Apply specific effects based on theme
      switch (config.effectName) {
        case 'matrix':
          // Matrix theme shows binary digits
          particle.textContent = Math.random() > 0.5 ? '1' : '0';
          particle.style.color = color;
          particle.style.backgroundColor = 'transparent';
          particle.style.fontSize = `${config.size * 1.5}px`;
          particle.style.fontFamily = 'monospace';
          particle.style.textShadow = `0 0 5px ${color}`;
          break;
          
        case 'pixelate':
          // Retro theme creates pixel blocks
          particle.style.width = `${config.size}px`;
          particle.style.height = `${config.size}px`;
          break;
          
        case 'bubble':
          // Candy theme creates bubbles
          particle.style.width = `${config.size}px`;
          particle.style.height = `${config.size}px`;
          particle.style.borderRadius = '50%';
          particle.style.border = `1px solid ${color}`;
          break;
          
        case 'waves':
          // Synthwave theme creates wave patterns - fixed to prevent endless loop
          particle.style.width = `${config.size * 2}px`;
          particle.style.height = `${config.size / 2}px`;
          particle.style.borderRadius = `${config.size}px`;
          break;
          
        default:
          // Default circular particles
          particle.style.width = `${config.size}px`;
          particle.style.height = `${config.size}px`;
          particle.style.borderRadius = '50%';
      }
      
      // Position particle
      particle.style.left = `${x - (config.size / 2)}px`;
      particle.style.top = `${y - (config.size / 2)}px`;
      
      // Add to container
      trailContainer.appendChild(particle);
      
      // Store particle with its properties
      const newParticle = {
        element: particle,
        x: x,
        y: y,
        size: config.size,
        decay: config.decay,
        opacity: 1,
        speedX: (Math.random() - 0.5) * 4,
        speedY: (Math.random() - 0.5) * 4 - 1 // Slight upward bias
      };
      
      particles.push(newParticle);
    }

    // Animation loop for particles
    let animationFrame;
    function animateParticles() {
      // Update each particle
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Update opacity based on decay rate
        particle.opacity *= particle.decay;
        
        // Apply updates to the element
        if (particle.element) {
          particle.element.style.left = `${particle.x - (particle.size / 2)}px`;
          particle.element.style.top = `${particle.y - (particle.size / 2)}px`;
          particle.element.style.opacity = particle.opacity;
          
          // Apply theme-specific animations
          switch (config.effectName) {
            case 'pulse':
              particle.size *= 0.98;
              particle.element.style.width = `${particle.size}px`;
              particle.element.style.height = `${particle.size}px`;
              break;
              
            case 'matrix':
              // Matrix digits fall downward
              particle.speedY = 2;
              particle.speedX = 0;
              break;
              
            case 'waves':
              // Fixed: Synthwave particles now fade out without endless movements
              particle.opacity *= 0.95; // Faster opacity decay
              particle.speedY += 0.05; // Gentle downward movement
              break;
          }
        }
        
        // Remove particles when they're no longer visible
        if (particle.opacity < 0.05) {
          if (particle.element && particle.element.parentNode) {
            particle.element.parentNode.removeChild(particle.element);
          }
          particles.splice(index, 1);
        }
      });
      
      // Continue animation loop
      animationFrame = requestAnimationFrame(animateParticles);
    }

    // Start the mouse tracking and animation
    window.addEventListener('mousemove', handleMouseMove);
    animationFrame = requestAnimationFrame(animateParticles);

    // Clean up when component unmounts or theme changes
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
      if (trailContainer && trailContainer.parentNode) {
        trailContainer.parentNode.removeChild(trailContainer);
      }
    };
  }, [theme]);
}