import React from 'react';

const LoadingIndicator: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="absolute top-0 mt-20 text-xl">Loading...</div>
        </div>
    );
};

export default LoadingIndicator;