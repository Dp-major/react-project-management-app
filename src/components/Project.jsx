import { useRef, useImperativeHandle } from "react";

export default function Project({
  ref,
  projectItem,
  deleteProjectHandle,
  index,
  addTaskHandle,
  clearTaskHandle,
}) {
  const taskInput = useRef();
  console.log(projectItem);
  useImperativeHandle(ref, () => {
    return {
      getTaskItem() {
        return taskInput.current.value;
      },
    };
  });

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {projectItem.title}
          </h1>
          <button
            onClick={() => deleteProjectHandle(index)}
            className="text-stone-600 hover:text-stone-950"
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{projectItem.dueDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {projectItem.description}
        </p>
      </header>
      <section>
        <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
        <div className="flex items-center gap-4">
          <input
            ref={taskInput}
            className="w-64 px-2 py-1 rounded-sm bg-stone-200"
            type="text"
          />
          <button
            onClick={() => addTaskHandle(index)}
            className="text-stone-700 hover:text-stone-950"
          >
            Add Task
          </button>
        </div>
        {projectItem.tasks.length === 0 && (
          <p className="text-stone-800 my-4">
            This project does not have any tasks yet.
          </p>
        )}
        {projectItem.tasks.length !== 0 && (
          <ul className="p-4 mt-8 rounded-md bg-stone-100">
            {projectItem.tasks.map((task, taskIndex) => (
              <li key={taskIndex} className="flex justify-between my-4">
                <span>{task}</span>
                <button
                  onClick={() => clearTaskHandle(taskIndex, index)}
                  className="text-stone-700 hover:text-red-500"
                >
                  Clear
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
