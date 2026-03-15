import { motion } from "framer-motion";

const ScrollReveal = ({ 
  children, 
  delay = 0, 
  direction = "up", 
  duration = 0.8,
  distance = 30
}) => {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ 
        duration: duration, 
        delay: delay,
        ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for professional feel
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
