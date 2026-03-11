import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export default function Earth() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800,
      height: 800,
      phi: 0,
      theta: 0.1,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        // Example marker locations
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.05 },
        { location: [51.5072, 0.1276], size: 0.05 },
        { location: [48.8566, 2.3522], size: 0.04 },
        { location: [34.0086, -6.8416], size: 0.06 }, // Morocco (assuming user location based on profile context)
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005; // speed of rotation
      }
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div style={{
      width: '100%',
      maxWidth: '400px',
      aspectRatio: '1/1',
      margin: '0 auto',
      position: 'relative'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          contain: 'layout paint size',
          cursor: 'grab',
        }}
      />
    </div>
  );
}
