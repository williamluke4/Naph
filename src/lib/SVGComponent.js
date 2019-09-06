import React from 'react';

const SVGComponent = ({children, ...rest}) => {
    return (
        <svg style={{position: 'absolute', zIndex: 9000}} {...rest} ref="svg">
            {children}
        </svg>
    );
};

export default React.memo(SVGComponent);
