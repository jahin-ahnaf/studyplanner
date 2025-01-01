"use client";

import React, { JSX } from "react";
import pb from "./pocketbase";

type ClassworkItem = {
    id: string;
    subject: string;
    task: string;
    created: string;
    [key: string]: any; // Allow additional fields if your schema has more properties
};

const handleEdit = async (id: string) => {
    try {
        const subject = prompt("Enter new subject:", "");
        const task = prompt("Enter new task:", "");
        
        if (subject !== null && task !== null) {
            await pb.collection('classworks').update(id, {
                subject: subject,
                task: task
            });
            window.location.reload();
        }
    } catch (err) {
        console.error("Error updating classwork:", err);
        alert("Failed to update classwork. Please try again.");
    }
}

const handleDelete = async (id: string) => {
    try {
        await pb.collection('classworks').delete(id);
        window.location.reload();
    } catch (err) {
        console.error("Error deleting classwork:", err);
    }
}

const handleAdd = async () => {
    try {
        const subject = prompt("Enter new subject:", "");
        const task = prompt("Enter new task:", "");
        
        if (subject !== null && task !== null) {
            await pb.collection('classworks').create({
                subject: subject,
                task: task
            });
            window.location.reload();
        }
    } catch (err) {
        console.error("Error adding classwork:", err);
        alert("Failed to add classwork. Please try again.");
    }
}

export default function Classwork(): JSX.Element {
    const [classworks, setClassworks] = React.useState<ClassworkItem[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchClassworks = async () => {
            try {
                const result = await pb.collection("classworks").getList<ClassworkItem>(1, 50);
                setClassworks(result.items);
            } catch (err) {
                console.error("Error fetching classworks:", err);
                setError("Failed to load classwork data. Please try again later.");
            }
        };

        fetchClassworks();
    }, []);

    if (error) {
        return (
            <div>
                <h1>Error</h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-bold">Classwork</h2>

            <ul className="mt-5">
                {classworks.length > 0 ? (
                    classworks.map((cw) => (
                        <li className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-5 bg-zinc-900 rounded-md mt-2 hover:bg-zinc-800 transition-colors duration-300 space-y-2 sm:space-y-0 mr-20" key={cw.id}>
                            <p className="text-sm text-gray-500 mr-20">{new Date(cw.created).toLocaleDateString()}</p>
                            <h2 className="w-40 text-lg font-bold">{cw.subject}</h2>
                            <p className="text-md w-full pl-5 hidden sm:block">{cw.task.length > 100 ? `${cw.task.slice(0, 100)}...` : cw.task}</p>
                            <p className="text-md w-full pl-5 sm:hidden">{cw.task.length > 40 ? `${cw.task.slice(0, 40)}...` : cw.task}</p>
                            <div className="flex flex-row space-x-2 ml-20">
                                <button onClick={() => handleEdit(cw.id)} className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md px-3 py-1 transition-colors duration-300">Edit</button>
                                <button onClick={() => handleDelete(cw.id)} className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-md px-3 py-1 transition-colors duration-300">Delete</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>Add some classworks to your planner!</p>
                )}
            </ul>
            <button onClick={() => handleAdd()} className="mt-2 float-right mr-20 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md px-3 py-1 transition-colors duration-300">Add Classwork</button>
        </div>
    );
}