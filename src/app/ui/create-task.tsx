import { useState } from "react";

interface AddTaskModalProps {
    onSave: (task: { category: string; subject: string; task: string }) => void;
    onCancel: () => void;
}

export default function AddTaskModal({ onSave, onCancel }: AddTaskModalProps) {
    const [category, setCategory] = useState("classworks");
    const [subject, setSubject] = useState("");
    const [task, setTask] = useState("");

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                style={{
                    animation: "zoomIn 0.5s ease-in-out"
                }}
                className="bg-zinc-800 rounded-md shadow-lg p-5 w-96"
            >
                <h2 className="text-lg font-bold text-white mb-4">Add New Task</h2>
                <div className="mb-4">
                    <label className="block text-sm text-gray-400 mb-2">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="bg-zinc-700 outline-none w-full rounded-md px-3 py-2"
                    >
                        <option value="classworks">Classwork</option>
                        <option value="homeworks">Homework</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm text-gray-400 mb-2">Subject</label>
                    <input
                        placeholder="Science"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-zinc-700 outline-none rounded-md px-3 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm text-gray-400 mb-2">Task</label>
                    <textarea
                        placeholder="Some random stuffs..."
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="w-full bg-zinc-700 outline-none rounded-md px-3 py-2"
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
                        disabled={!subject || !task}
                        onClick={() => {
                            onSave({ category, subject, task });
                            window.location.reload();
                        }}
                        className="disabled:bg-blue-900 disabled:hover:bg-blue-900 px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        Create {category === "classwork" ? "Classwork" : "Homework"}
                    </button>
                </div>
            </div>
        </div>
    );
}
