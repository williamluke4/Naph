import {useState} from 'react';

/* not bound to style, should be computed */
export function computeInOffsetByIndex(x, y, index) {
    let outx = x + 15;
    let outy = y + 47 + (index * 20);

    return {x: outx, y: outy};
}

export function computeOutOffsetByIndex(x, y, index) {

    let outx = x + 166;
    let outy = y + 49 + (index * 22);

    return {x: outx, y: outy};
}

export function useObjectState(initialState) {
    const [state, setState] = useState(initialState);
    const setSafeState = async (newState, callback) => {
        if (typeof newState === 'function') {
            await setState((prevState) => ({
                ...prevState,
                ...newState(prevState),
            }));
        } else {
            await setState((prevState) => ({
                ...prevState,
                ...newState,
            }));
        }

        if (callback) {
            callback();
        }
    };

    return [state, setSafeState];
}
