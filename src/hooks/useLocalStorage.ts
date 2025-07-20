
import { useState, useEffect, Dispatch, SetStateAction } from "react";

/**
 * Custom hook for managing state with localStorage persistence.
 *
 * @param key The localStorage key to use
 * @param initialValue The initial value to set (if not already stored)
 * @returns A tuple of [value, setValue], mimicking useState behavior
 */
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored === null) return initialValue;

      return JSON.parse(stored) as T;
    } catch (error) {
      console.warn("Invalid JSON from localStorage, falling back to raw value:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
