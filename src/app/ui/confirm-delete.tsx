import React from "react";

interface ConfirmDeleteProps {
    onConfirm: () => void;
    onCancel: () => void;
    message?: string;
}

export default function ConfirmDelete({ onConfirm, onCancel, message }: ConfirmDeleteProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-zinc-800 rounded-md shadow-lg p-5 w-96"
            style={{ animation: "zoomIn 0.5s ease-in-out" }}>
                <p className="text-lg text-white">{message}</p>
                <div className="flex justify-end gap-4 mt-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
