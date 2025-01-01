import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Blank Home Page</h1>
      <Link className="mt-5" href="/tasks">Tasks</Link>
    </div>
  );
}
