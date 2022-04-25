import { useState } from "react";
import Head from "next/head";
import client from "../../public/src/sanity-client";
import styles from "../../styles/work.module.scss";

import Project from "./[project]";
import Link from "next/link";

const Work = ({ projects, setIsInTransit }) => {
  const [currentProject, setCurrentProject] = useState(false);
  return (
    <>
      <Head>
        <title>Erik Borge - Work</title>
        <meta name="description" content="Created by Erik Borge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles["work"]}>
        {!currentProject ? (
          <div className={styles["work__projects"]}>
            {projects &&
              projects.map((project, key) => {
                return (
                  <Link href={`/work/${project.title}`} key={key}>
                    <a
                      onClick={() => setIsInTransit(true)}
                      className={styles["work__project"]}
                    >
                      {project.title}
                    </a>
                  </Link>
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
    </>
  );
};

export default Work;

export async function getStaticProps({ params }) {
  const projects = await client.fetch(`*[_type == "project"]`);
  return { props: { page: { projects: projects } } };
}
