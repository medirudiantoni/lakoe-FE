import React, { ReactNode, useRef, useState } from 'react';

interface RippleButtonProps {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  rippleColor?: string;
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  onClick,
  className = '',
  rippleColor = 'rgba(255, 255, 255, 0.2)',
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;

    // Pastikan buttonRef.current tidak null
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple: Ripple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples((prevRipples) => [...prevRipples, newRipple]);

    // Hapus ripple setelah animasi selesai
    setTimeout(() => {
      setRipples((prevRipples) =>
        prevRipples.filter((ripple) => ripple.id !== newRipple.id)
      );
    }, 600);

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`relative overflow-hidden cursor-pointer ${className}`}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: rippleColor,
          }}
        />
      ))}
    </button>
  );
};

export default RippleButton;
