import React from 'react';
import HelloFunction from "./HelloFunction";
import HelloClass from "./HelloClass";

const HelloContainer: React.FC = () => {
    return (
        <>
            <HelloFunction/>
            <HelloClass/>
        </>
    );
};

export default HelloContainer;
