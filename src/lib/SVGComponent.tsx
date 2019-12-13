import React from "react";

const SVGComponent: React.FC<{
  childRef: any;
  children?: React.ReactNode;
} & React.SVGProps<SVGSVGElement>> = ({ children, childRef, ...rest }) => {
  return (
    <svg
      style={{ position: "absolute", zIndex: 9000 }}
      {...rest}
      ref={svgRef => (childRef.current = svgRef)}
    >
      {children}
    </svg>
  );
};

export default React.memo(SVGComponent);
