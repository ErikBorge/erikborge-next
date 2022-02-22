import { useState, useEffect, useRef } from "react";
import styles from "./project.module.scss";
import Image from "next/image";
import imageUrlFor from "../../src/imageUrlFor";

const Project = ({ project, setCurrentProject }) => {
  return (
    <div className={styles.project}>
      <button
        className={styles["project__back-button"]}
        onClick={() => setCurrentProject(false)}
      >
        &#60;- back to work
      </button>
      <div className={styles["project__image"]}>
        <Image
          objectFit="contain"
          layout="fill"
          //   width="400"
          //   height="300"
          src={project.imageUrl}
          alt="s"
        />
      </div>
      <div className={styles["project__title"]}>{project.title}</div>
      <div className={styles["project__intro"]}>{project.intro}</div>
      {/* <div className={styles["project__intro"]}>{description}</div> */}
      <div className={styles["project__technologies"]}>
        {project.technologies &&
          project.technologies.map((tech, key) => {
            return <div key={key}>{tech.title}</div>;
          })}
      </div>
    </div>
  );
};

export default Project;
