import { useEffect, useRef } from "react";
export function useInterval(callback, delay, other) {
    const savedCallback = useRef();

    // remembering the latest callback function
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        let count = setInterval(() => {
            savedCallback.current();
        }, delay);
        return () => clearInterval(count);
    }, [delay, other]);
}
