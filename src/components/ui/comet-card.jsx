import * as React from 'react';
import { useState, useRef, useCallback } from 'react';
import { cn } from '../../lib/utils';

/**
 * CometCard 컴포넌트
 *
 * 마우스 움직임에 따라 3D 회전 효과를 제공하는 인터랙티브 카드
 * Aceternity UI의 CometCard를 기반으로 구현
 *
 * Props:
 * @param {number} rotateDepth - 3D 회전 효과 깊이 [Optional, 기본값: 17.5]
 * @param {number} translateDepth - 이동 효과 깊이 [Optional, 기본값: 20]
 * @param {string} className - 추가 CSS 클래스 [Optional]
 * @param {React.ReactNode} children - 카드 내용 [Required]
 *
 * Example usage:
 * <CometCard rotateDepth={15} translateDepth={25}>
 *   <div>Card Content</div>
 * </CometCard>
 */
function CometCard({
  rotateDepth = 17.5,
  translateDepth = 20,
  className,
  children
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    translateX: 0,
    translateY: 0
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = (mouseY / (rect.height / 2)) * -rotateDepth;
    const rotateY = (mouseX / (rect.width / 2)) * rotateDepth;

    const translateX = (mouseX / (rect.width / 2)) * translateDepth;
    const translateY = (mouseY / (rect.height / 2)) * translateDepth;

    setTransform({ rotateX, rotateY, translateX, translateY });
  }, [rotateDepth, translateDepth]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTransform({ rotateX: 0, rotateY: 0, translateX: 0, translateY: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative transition-transform duration-200 ease-out',
        className
      )}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) translateX(${transform.translateX}px) translateY(${transform.translateY}px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
          transformStyle: 'preserve-3d'
        }}
      >
        {children}
      </div>
      {/* Comet glow effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${50 + (transform.translateX / translateDepth) * 30}% ${50 + (transform.translateY / translateDepth) * 30}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            opacity: isHovered ? 1 : 0
          }}
        />
      )}
    </div>
  );
}

export { CometCard };
