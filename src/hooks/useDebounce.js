import { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState();

  useEffect(() => {
    const debouncer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearInterval(debouncer);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
