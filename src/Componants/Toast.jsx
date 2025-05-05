import React from 'react';

const Toast = ({ message, show, isSuccess }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white text-black px-6 py-4 rounded-xl shadow-xl text-center text-lg font-semibold w-80">
                {message}
                <div className="w-full h-1 bg-gray-300 mt-3 overflow-hidden rounded">
                    <div
                        className={`h-full ${isSuccess ? 'bg-green-500' : 'bg-red-500'} animate-toast-progress`}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Toast;