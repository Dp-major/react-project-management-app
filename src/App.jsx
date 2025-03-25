import { useState, useRef } from "react";
import Sidebar from "./components/Sidebar";
import NoProject from "./components/NoProject";
import CreateProject from "./components/CreateProject";
import Project from "./components/Project";

function App() {
  const project = useRef();
  const projectTask = useRef();

  const [projectList, setProjectList] = useState([]);
  const [createProject, setCreateProject] = useState(false);
  const [projectItem, setProjectItem] = useState({
    open: false,
    data: {},
  });

  function openCreateProjectForm() {
    setCreateProject(true);
    setProjectItem((prevProjectItem) => {
      return {
        ...prevProjectItem,
        open: false,
        data: {},
      };
    });
  }

  function closeCreateProjectForm() {
    setCreateProject(false);
  }

  function closeEditProject() {
    setProjectItem((prevProjectItem) => {
      return {
        ...prevProjectItem,
        open: false,
        data: {},
      };
    });
  }

  function saveProject() {
    const newProjectDetails = project.current.getProjectDetails();
    setProjectList((prevProjectList) => {
      return [...prevProjectList, newProjectDetails];
    });
    closeCreateProjectForm();
  }

  function editProject(index) {
    closeCreateProjectForm();
    setProjectItem((prevProjectItem) => {
      const selectedProjectItem = projectList[index];
      return {
        ...prevProjectItem,
        open: true,
        data: selectedProjectItem,
        index: index,
      };
    });
  }

  function deleteProject(index) {
    setProjectList((prevProjectList) => {
      const updatedProjectList = [...prevProjectList];
      updatedProjectList.splice(index, 1);
      return updatedProjectList;
    });
    closeEditProject();
  }

  function addTaskToProject(index) {
    setProjectList((prevProjectList) => {
      const updatedProjectList = [...prevProjectList];
      const newTask = projectTask.current.getTaskItem();
      updatedProjectList[index].tasks.push(newTask);
      return updatedProjectList;
    });
  }

  function clearTaskFromProject(taskIndex, projectIndex) {
    setProjectList((prevProjectList) => {
      const updatedProjectList = [...prevProjectList];
      const projectItemToUpdate = updatedProjectList[projectIndex];
      projectItemToUpdate.tasks.splice(taskIndex, 1);
      return updatedProjectList;
    });
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <Sidebar
          projectList={projectList}
          addProjectHandle={openCreateProjectForm}
          editProjectHandle={editProject}
        />
        {!createProject && !projectItem.open && (
          <NoProject createProjectHandle={openCreateProjectForm} />
        )}
        {createProject && (
          <CreateProject
            ref={project}
            saveBtnHandle={saveProject}
            cancelBtnHandle={closeCreateProjectForm}
          />
        )}
        {projectItem.open && (
          <Project
            ref={projectTask}
            projectItem={projectItem.data}
            deleteProjectHandle={deleteProject}
            index={projectItem.index}
            addTaskHandle={addTaskToProject}
            clearTaskHandle={clearTaskFromProject}
          />
        )}
      </main>
    </>
  );
}

export default App;
