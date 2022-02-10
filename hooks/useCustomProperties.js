import { useRef, useState, useEffect, useMemo } from "react";

const useCustomProperties = (properties) => {
  const elRef = useRef(null);
  const [customProperties, setCustomProperties] = useState(null);

  useEffect(() => {
    const extractCustomProperties = () => {
      if (elRef.current) {
        const style = global.getComputedStyle(elRef.current);
        const propertyValues = {};

        properties.forEach(
          (property) =>
            (propertyValues[property] = style.getPropertyValue(property))
        );

        setCustomProperties(propertyValues);
      }
    };
    const mql = global.window.matchMedia("(prefers-color-scheme: dark)");
    extractCustomProperties(mql.matches);

    mql.onchange = (e) => {
      extractCustomProperties(e.matches);
    };
  }, []);

  return useMemo(() => ({
    ref: elRef,
    customProperties,
  }));
};

export default useCustomProperties;
