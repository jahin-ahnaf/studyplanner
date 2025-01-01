import React, { useState } from "react";

interface EditModalProps {
    onSave: (updatedData: { subject: string; task: string }) => void;
    onCancel: () => void;
    initialData: { subject: string; task: string };
}

export default function EditModal({ onSave, onCancel, initialData }: EditModalProps) {
    const [subject, setSubject] = useState(initialData.subject);
    const [task, setTask] = useState(initialData.task);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                className="bg-zinc-800 rounded-md shadow-lg p-5 w-96"
                style={{ animation: "zoomIn 0.5s ease-in-out" }}
            >
                <h2 className="text-lg font-bold text-white mb-4">Edit Classwork</h2>
                <div className="mb-4">
                    <label className="block text-sm text-gray-400 mb-2">Subject</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full rounded-md px-3 py-2 bg-zinc-700 outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm text-gray-400 mb-2">Task</label>
                    <textarea
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="w-full rounded-md px-3 py-2 bg-zinc-700 outline-none"
                        rows={3}
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={!subject || !task || (subject === initialData.subject && task === initialData.task)}
                        onClick={() => onSave({ subject, task })}
                        className="disabled:bg-blue-900 disabled:hover:bg-blue-900 px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
