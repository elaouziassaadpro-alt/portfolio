import React from 'react';
import { Mail, MessageCircle, Phone } from 'lucide-react';

const Button = () => {
  return (
    <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent:'center' }}>
      <a
        href="mailto:elaouzi.assaadpro@gmail.com"
        target="_blank"
        className="btn-premium"
        style={{ padding: "0.8rem 1.5rem", fontSize: "1rem" }}
      >
        <Mail size={18} />
        <span>Email</span>
      </a>
      
      <a
        href="https://wa.me/212645609313"
        target="_blank"
        className="btn-premium"
        style={{ 
          padding: "0.8rem 1.5rem", 
          fontSize: "1rem",
          background: "linear-gradient(135deg, #25D366, #128C7E)"
        }}
      >
        <MessageCircle size={18} />
        <span>WhatsApp</span>
      </a>

      <a
        href="tel:+212645609313"
        className="btn-premium"
        style={{ 
          padding: "0.8rem 1.5rem", 
          fontSize: "1rem",
          background: "linear-gradient(135deg, #3b82f6, #1d4ed8)"
        }}
      >
        <Phone size={18} />
        <span>Call Me</span>
      </a>
    </div>
  );
};
export default Button;
