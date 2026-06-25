import { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const elRef = useRef(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    let destroyed = false;

    function loadVanta() {
      if (destroyed || !window.VANTA?.FOG) return;
      vantaRef.current = window.VANTA.FOG({
        el,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        highlightColor: 0xef00ff,
        midtoneColor: 0x3cff,
        lowlightColor: 0x95ff00,
      });
    }

    if (window.THREE && window.VANTA?.FOG) {
      loadVanta();
    } else {
      const threeScript = document.createElement('script');
      threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
      threeScript.onload = () => {
        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.fog.min.js';
        vantaScript.onload = loadVanta;
        document.body.appendChild(vantaScript);
      };
      document.body.appendChild(threeScript);
    }

    return () => {
      destroyed = true;
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={elRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
}
