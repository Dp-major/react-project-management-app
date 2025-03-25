import { useRef, useImperativeHandle } from "react";

export default function CreateProject({ ref, saveBtnHandle, cancelBtnHandle }) {
  const projectTitle = useRef();
  const projectDesc = useRef();
  const projectDueDate = useRef();

  useImperativeHandle(ref, () => {
    return {
      getProjectDetails() {
        return {
          title: projectTitle.current.value,
          description: projectDesc.current.value,
          dueDate: projectDueDate.current.value,
          tasks: [],
        };
      },
    };
  });
  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button
            onClick={cancelBtnHandle}
            className="text-stone-800 hover:text-stone-950"
          >
            Cancel
          </button>
        </li>
        <li>
          <button
            onClick={saveBtnHandle}
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
          >
            Save
          </button>
        </li>
      </menu>
      <div>
        <p className="flex flex-col gap-1 my-4">
          <label className="text-sm font-bold uppercase text-stone-500">
            Title
          </label>
          <input
            ref={projectTitle}
            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
            type="text"
          />
        </p>
        <p className="flex flex-col gap-1 my-4">
          <label className="text-sm font-bold uppercase text-stone-500">
            Description
          </label>
          <textarea
            ref={projectDesc}
            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
          ></textarea>
        </p>
        <p className="flex flex-col gap-1 my-4">
          <label className="text-sm font-bold uppercase text-stone-500">
            Due Date
          </label>
          <input
            ref={projectDueDate}
            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
            type="date"
          />
        </p>
      </div>
    </div>
  );
}
