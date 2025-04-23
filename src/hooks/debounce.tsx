import { useCallback, useEffect, useRef } from "react";

// Custom debounce hook
export const useDebounce = <T extends (...args: any[]) => any>(
    callback: T,
    delay: number
  ) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);
  
    return useCallback(
      (...args: Parameters<T>) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          callback(...args);
        }, delay);
      },
      [callback, delay]
    );
  };