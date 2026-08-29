import React, { useEffect, useState } from 'react';

export const CustomCursor = ({ isDark }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop/mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const onMouseMove = (e) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target;
      const computedCursor = window.getComputedStyle(target).cursor;
      const isClickable =
        computedCursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null;

      setIsPointer(isClickable);
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    // Smooth trailing animation loop
    let animationFrame;
    const animateTrailer = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.25,
        y: prev.y + (position.y - prev.y) * 0.25
      }));
      animationFrame = requestAnimationFrame(animateTrailer);
    };
    animationFrame = requestAnimationFrame(animateTrailer);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, [position.x, position.y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? '6px' : '4px',
          height: isPointer ? '6px' : '4px',
          backgroundColor: isDark ? '#38bdf8' : '#2563eb'
        }}
      />

      {/* Trailing Cybernetic Ring */}
      <div
        className={`fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-150 ease-out hidden md:block ${
          isPointer
            ? 'scale-150 border-cyan-400 bg-cyan-500/15'
            : isMouseDown
            ? 'scale-90 border-blue-500 bg-blue-500/20'
            : isDark
            ? 'border-cyan-500/40'
            : 'border-blue-500/50'
        }`}
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: '28px',
          height: '28px'
        }}
      />
    </>
  );
};
