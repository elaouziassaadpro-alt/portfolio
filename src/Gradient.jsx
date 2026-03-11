import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { Liquid } from '@/components/ui/liquid-gradient';
const COLORS = {
  color1: '#FFFFFF',
  color2: '#1E10C5',
  color3: '#9089E2',
  color4: '#FCFCFE',
  color5: '#F9F9FD',
  color6: '#B2B8E7',
  color7: '#0E2DCB',
  color8: '#0017E9',
  color9: '#4743EF',
  color10: '#7D7BF4',
  color11: '#0B06FC',
  color12: '#C5C1EA',
  color13: '#1403DE',
  color14: '#B6BAF6',
  color15: '#C1BEEB',
  color16: '#290ECB',
  color17: '#3F4CC0',
};
const Button = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="flex justify-center" style={{ width: "200px", height: "60px", margin: "0 auto", position: "relative" }}>
      <a
        href="mailto:elaouzi.assaadpro@gmail.com"
        target="_blank"
        className="group relative inline-block w-full h-full rounded-xl"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          borderRadius: "12px",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          overflow: "hidden",
          textDecoration: "none"
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
          <Liquid isHovered={isHovered} colors={COLORS} />
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}></div>
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "white",
            fontSize: "1.2rem",
            fontWeight: "bold",
            fontFamily: "Outfit",
            pointerEvents: "none"
          }}
        >
          <Mail size={20} />
          <span>Say Hello</span>
        </div>
      </a>
    </div>
  );
};
export default Button;
