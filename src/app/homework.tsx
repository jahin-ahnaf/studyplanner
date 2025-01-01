"use client";

import React, { JSX } from "react";
import pb from "./pocketbase";

type HomeworkItem = {
    id: string;
    subject: string;
    task: string;
    [key: string]: any; // Allow additional fields if your schema has more properties
};

const handleEdit = async (id: string) => {
    try {
        const subject = prompt("Enter new subject:", "");
        const task = prompt("Enter new task:", "");
        
        if (subject !== null && task !== null) {
            await pb.collection('homeworks').update(id, {
                subject: subject,
                task: task
            });
            window.location.reload();
        }
    } catch (err) {
        console.error("Error updating homework:", err);
        alert("Failed to update homework. Please try again.");
    }
}

const handleDelete = async (id: string) => {
    try {
        await pb.collection('homeworks').delete(id);
        window.location.reload();
    } catch (err) {
        console.error("Error deleting homework:", err);
    }
}

const handleAdd = async () => {
    try {
        const subject = prompt("Enter new subject:", "");
        const task = prompt("Enter new task:", "");
        
        if (subject !== null && task !== null) {
            await pb.collection('homeworks').create({
                subject: subject,
                task: task
            });
            window.location.reload();
        }
    } catch (err) {
        console.error("Error adding homework:", err);
        alert("Failed to add homework. Please try again.");
    }
}

export default function homeworks(): JSX.Element {
    const [homeworks, setHomeworks] = React.useState<HomeworkItem[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchHomeworks = async () => {
            try {
                const result = await pb.collection("homeworks").getList<HomeworkItem>(1, 50);
                setHomeworks(result.items);
            } catch (err) {
                console.error("Error fetching homeworks:", err);
                setError("Failed to load homework data. Please try again later.");
            }
        };

        fetchHomeworks();
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
            <h2 className="text-xl font-bold mt-20">Homework</h2>

            <ul className="mt-5">
                {homeworks.length > 0 ? (
                    homeworks.map((cw) => (
                        <li className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-5 bg-zinc-900 rounded-md mt-2 hover:bg-zinc-800 transition-colors duration-300 space-y-2 sm:space-y-0 mr-20" key={cw.id}>
                            <p className="text-sm text-gray-500 mr-20">{new Date(cw.created).toLocaleDateString()}</p>
                            <h2 className="w-40 text-lg font-bold">{cw.subject}</h2>
                            <p className="text-md w-full pl-5 hidden sm:block">{cw.task.length > 100 ? `${cw.task.slice(0, 100)}...` : cw.task}</p>
                            <p className="text-md w-full pl-5 sm:hidden">{cw.task.length > 40 ? `${cw.task.slice(0, 40)}...` : cw.task}</p>
                            <div className="flex flex-row space-x-2 ml-20">
                                <button onClick={() => handleEdit(cw.id)} className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md px-3 py-1 transition-colors duration-300">Edit</button>
                                <button onClick={() => handleDelete(cw.id)} className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded-md px-3 py-1 transition-colors duration-300">Completed</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>Add some homeworks to your planner!</p>
                )}
            </ul>

            <button onClick={() => handleAdd()} className="mt-2 float-right mr-20 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md px-3 py-1 transition-colors duration-300">Add Homework</button>
        </div>
    );
}