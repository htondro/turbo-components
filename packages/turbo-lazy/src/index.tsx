"use client";
import { useRef, useState, useEffect } from "react";

export interface TurboLazyProps {
  children: React.ReactNode;
  loading: React.ReactNode;
  config?: IntersectionObserverInit;
}

export const TurboLazy: React.FC<TurboLazyProps> = ({
  children,
  loading,
  config,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        ...config,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [config]);

  return <div ref={ref}>{isVisible ? children : loading}</div>;
};

// Default export
export default TurboLazy;
