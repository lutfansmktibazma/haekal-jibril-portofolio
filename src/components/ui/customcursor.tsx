import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const isTouchDevice = () =>
    window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  useEffect(() => {
    if (isTouchDevice()) return;

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleEnter = () => setIsHovered(true);
    const handleLeave = () => setIsHovered(false);

    window.addEventListener('mousemove', handleMove);

    const clickables = document.querySelectorAll('a, button');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && isTouchDevice()) return null;
  if (!isVisible) return null;

  return (
    <>
      {/* Dot kecil */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{ x: position.x - 4, y: position.y - 4 }}
        transition={{ duration: 0, ease: 'linear' }}
      />

      {/* Lingkaran besar yang ngikut lebih lambat */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference border border-white"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          width: isHovered ? 60 : 40,
          height: isHovered ? 60 : 40,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </>
  );
}