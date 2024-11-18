"use client";

import { useRef, useState, useEffect } from "react";

export default function TurboLazy({
  children,
  loading,
  config,
}: {
  children: React.ReactNode;
  loading: React.ReactNode;
  config?: IntersectionObserverInit;
}) {
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
}
