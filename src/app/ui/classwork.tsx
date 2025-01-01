"use client";
import React, { useEffect, useState } from "react";
import pb from "../pocketbase";
import ConfirmDelete from "./confirm-delete";
import EditModal from "./edit-alert";

interface ClassworkItem {
    id: string;
    subject: string;
    task: string;
    created: string;
}

interface ClassworkProps {
    tasks: any[];
}

export default function Classwork({ tasks }: ClassworkProps) {
    const [classworks, setClassworks] = useState<ClassworkItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<string | null>(null); // Track which item to delete
    const [editItem, setEditItem] = useState<ClassworkItem | null>(null); // Track which item to edit

    useEffect(() => {
        pb.collection("classworks")
            .getFullList<ClassworkItem>()
            .then((classworks) => {
                setClassworks(classworks);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching classworks:", err);
                setLoading(false);
            });
    }, []);

    function formatDate(date: string) {
        return new Date(date).toDateString();
    }

    function confirmDelete(id: string) {
        setDeleteId(id); // Set the ID of the item to delete
    }

    function handleDelete() {
        if (deleteId) {
            pb.collection("classworks")
                .delete(deleteId)
                .then(() => {
                    setClassworks((prev) => prev.filter((cw) => cw.id !== deleteId));
                    setDeleteId(null); // Close the confirmation dialog
                })
                .catch((err) => {
                    console.error("Error deleting classwork:", err);
                    setDeleteId(null); // Close the confirmation dialog even on error
                });
        }
    }

    function startEdit(item: ClassworkItem) {
        setEditItem(item); // Set the item to edit
    }

    function handleEdit(updatedData: { subject: string; task: string }) {
        if (editItem) {
            const updatedItem = { ...editItem, ...updatedData };
            pb.collection("classworks")
                .update(editItem.id, updatedItem)
                .then(() => {
                    setClassworks((prev) =>
                        prev.map((cw) => (cw.id === editItem.id ? updatedItem : cw))
                    );
                    setEditItem(null); // Close the edit modal
                })
                .catch((err) => {
                    console.error("Error updating classwork:", err);
                    setEditItem(null); // Close the edit modal even on error
                });
        }
    }

    if (loading) return <div>Loading classworks...</div>;

    return (
        <div className="mt-10">
            <h1 className="text-xl font-bold">Classwork</h1>
            {classworks.length === 0 ? <div className="mt-5">No classworks found</div> : null}
            {classworks.map((classwork) => (
                <div
                    className="items-center mt-5 flex bg-zinc-800 rounded-md p-2 justify-between p-5"
                    key={classwork.id}
                >
                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-5 sm:items-center sm:justify-between">
                        <p className="text-sm text-gray-400">{formatDate(classwork.created)}</p>
                        <div className="flex flex-col gap-2 sm:gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <h2 className="font-bold text-lg">
                                {classwork.subject.charAt(0).toUpperCase() + classwork.subject.slice(1)}
                            </h2>
                            <p>{classwork.task}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:flex-row flex-col">
                        <button
                            onClick={() => startEdit(classwork)}
                            className="w-20 transition-all duration-300 hover:bg-blue-500 hover:text-white border border-blue-500 text-blue-500 px-2 py-1 rounded-md"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => confirmDelete(classwork.id)}
                            className="w-20 transition-all duration-300 hover:bg-red-500 hover:text-white border border-red-500 text-red-500 px-2 py-1 rounded-md"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            {deleteId && (
                <ConfirmDelete
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteId(null)}
                    message="Are you sure you want to delete this classwork?"
                />
            )}
            {editItem && (
                <EditModal
                    onSave={handleEdit}
                    onCancel={() => setEditItem(null)}
                    initialData={{
                        subject: editItem.subject,
                        task: editItem.task,
                    }}
                />
            )}
        </div>
    );
}
