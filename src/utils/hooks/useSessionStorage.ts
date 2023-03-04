import { useState, useEffect, useMemo } from 'react';

const useSessionStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return useMemo(() => [value, setValue] as const, [value]);
};

export default useSessionStorage;
