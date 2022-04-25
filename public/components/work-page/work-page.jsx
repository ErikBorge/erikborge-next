import { useState, useEffect, useRef } from "react";
import styles from "./work-page.module.scss";

import useSWR from "swr";
import client from "../../src/sanity-client";

import Project from "../project/project";

const projectsQuery = `
    *[_type == "project"]{
        _id,
        title,
        images[]{
          asset->{url}
        },
        url,
        intro,
        description,
        technologies[]->{
            title,
            image,
            url
        },
    }
`;

const WorkPage = () => {
  const [currentProject, setCurrentProject] = useState(false);

  const { data: projects, error } = useSWR(projectsQuery, (query) =>
    client.fetch(query)
  );
  console.log(projects);
  if (error) {
    return <div>Were sorry, something wrong happened.</div>;
  }

  return (
    <div className={styles["workpage"]}>
      {!currentProject ? (
        <div className={styles["workpage__projects"]}>
          {projects &&
            projects.map((project, key) => {
              return (
                <button
                  key={key}
                  className={styles["workpage__project"]}
                  onClick={() => setCurrentProject(project)}
                >
                  {project.title}
                </button>
              );
            })}
        </div>
      ) : (
        <Project
          project={currentProject}
          setCurrentProject={setCurrentProject}
        />
      )}
    </div>
  );
};

export default WorkPage;
