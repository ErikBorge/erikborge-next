import { useState, useEffect, useRef } from "react";
import styles from "./project.module.scss";
import Image from "next/image";
import imageUrlFor from "../../src/imageUrlFor";

const Project = ({
  title,
  imageUrl,
  url,
  intro,
  description,
  technologies,
}) => {
  return (
    <div className={styles.project}>
      <div className={styles["project__image"]}>
        <Image
          objectFit="contain"
          layout="fill"
          //   width="400"
          //   height="300"
          src={imageUrl}
          alt="s"
        />
      </div>
      <div className={styles["project__title"]}>{title}</div>
      <div className={styles["project__intro"]}>{intro}</div>
      {/* <div className={styles["project__intro"]}>{description}</div> */}
      <div className={styles["project__technologies"]}>
        {technologies &&
          technologies.map((tech, key) => {
            return <div key={key}>{tech.title}</div>;
          })}
      </div>
    </div>
  );
};

export default Project;
