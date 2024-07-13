import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectSidebar from "./components/ProjectsSidebar.jsx";
import Modal from "./components/Modal.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });
  function handleSelectProject(id) {
    setProjectsState((prevProjects) => {
      return {
        ...prevProjects,
        selectedProjectId: id,
      };
    });
  }
  function handleStartAddProject() {
    setProjectsState((prevProjects) => {
      return {
        ...prevProjects,
        selectedProjectId: null,
      };
    });
  }
  function handleCancelAddProjet() {
    setProjectsState((prevProjects) => {
      return {
        ...prevProjects,
        selectedProjectId: undefined,
      };
    });
  }
  function handleFinishAddProject(project) {
    setProjectsState((prevProjects) => {
      const projectId = Math.random();
      const newProject = {
        ...project,
        id: projectId,
      };

      return {
        ...prevProjects,
        selectedProjectId: projectId,
        projects: [...prevProjects.projects, newProject],
      };
    });
  }
  function handleDeleteProject() {
    setProjectsState((prevProjects) => {
      return {
        ...prevProjects,
        selectedProjectId: undefined,
        projects: prevProjects.projects.filter((project) => {
          project.id !== prevProjects.selectedProjectId;
        }),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );
  let content = (
    <SelectedProject project={selectedProject} onDelete={handleDeleteProject} />
  );
  if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onAdd={handleFinishAddProject}
        onCancel={handleCancelAddProjet}
      />
    );
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
