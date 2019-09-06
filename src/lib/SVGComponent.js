import React from 'react';

const SVGComponent = ({children, childRef, ...rest}) => {
    return (
        <svg style={{position: 'absolute', zIndex: 9000}} {...rest} ref={(svgRef) => childRef(svgRef)}>
            {children}
        </svg>
    );
};

export default React.memo(SVGComponent);
