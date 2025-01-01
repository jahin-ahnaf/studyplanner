'use client'

import { useState, useEffect } from "react";
import pb from "../pocketbase"; // Ensure this is properly configured
import Classwork from "../ui/classwork";
import Homework from "../ui/homework";
import AddTaskModal from "../ui/create-task";

export default function Tasks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<{ classwork: any[]; homework: any[] }>({
    classwork: [],
    homework: [],
  });

  // Function to fetch tasks
  const fetchTasks = async () => {
    try {
      const classwork = await pb.collection('classworks').getFullList();
      const homework = await pb.collection('homeworks').getFullList();
      setTasks({ classwork, homework });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []); // Fetch tasks on initial render

  const handleSave = async (task: { category: string; subject: string; task: string }) => {
    try {
      // Use the `category` as the collection name
      const record = await pb.collection(task.category).create({
        subject: task.subject,
        task: task.task,
      });
      console.log("Task created in", task.category, "collection:", record);

      // Reload tasks after saving
      fetchTasks();

      // Close the modal after successful creation
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating task in", task.category, "collection:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close modal on cancel
  };

  return (
    <div className="ml-10 mt-20 mr-10 sm:ml-20 sm:mr-20">
      <h1 className="text-3xl font-bold">Tasks</h1>
      <div className="mt-5">
        <Classwork tasks={tasks.classwork} />
        <Homework tasks={tasks.homework} />
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer transition-all duration-300"
        >
          Add Task
        </button>
      </div>

      {isModalOpen && (
        <AddTaskModal onSave={handleSave} onCancel={handleCancel} />
      )}
    </div>
  );
}
