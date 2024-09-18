import { useEffect, useRef, useState } from 'react';

function useValueChanged<T = any>(value: T, shouldNull = false, callback?: () => void) {
  const previousValueRef = useRef(value);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const hasChanged = value !== previousValueRef.current;

    if (hasChanged) {
      callback?.();
      previousValueRef.current = value;
    }
    setChanged(hasChanged);
  }, [value, shouldNull, callback]);

  return changed;
}

export default useValueChanged;
