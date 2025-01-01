import pb from "../pocketbase";
import Classwork from "../classwork";
import Homework from "../homework";

export default async function Tasks() {
  const classworks = await pb.collection('classworks').getList(1, 50);
  return (
    <div className="ml-20 mt-20">
      <h1 className="text-2xl font-bold">Tasks</h1>
      <div className="mt-5">
        <Classwork/>
        <Homework/>
      </div>
    </div>
    
  );
}
