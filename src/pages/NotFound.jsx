import React from 'react';
function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            <h1 className="text-4xl font-bold text-red-500">404</h1>
            <p className="mt-4 text-lg">Oops! Page not found.</p>
        </div>
    );
}
export default NotFound;
