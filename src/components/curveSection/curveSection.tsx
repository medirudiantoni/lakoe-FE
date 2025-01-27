import React, { useEffect, useState } from 'react';

interface CurveSectionProps {
  color?: string;
}

const CurveSection: React.FC<CurveSectionProps> = ({ color = '#ffffff' }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const section1Height = window.innerHeight;
      const progress = Math.min(scrollPosition / section1Height, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const curveHeight = 300 - scrollProgress * 300;
  return (
    <section className="relative w-full">
      <div
        className="absolute top-full -translate-y-5 left-0 w-full overflow-hidden scale-y-[-1]"
        style={{
          height: `${curveHeight}px`,
          transition: 'height 0.1s ease-out',
        }}
      >
        <svg
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
          style={{
            transform: `scaleY(${1 - scrollProgress * 0.5})`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <path
            fill={color}
            d="M0,300 C480,0 960,0 1440,300 L1440,300 L0,300 Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default CurveSection;
