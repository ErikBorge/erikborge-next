import { useState, useEffect, useRef } from "react";
import styles from "./project.module.scss";
import Image from "next/image";
import imageUrlFor from "../../src/imageUrlFor";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNextSanityImage } from "next-sanity-image";
import sanityClient from "../../src/sanity-client";
import { Navigation } from "swiper";

import SlideNavButtonTwo from "../slide-nav-button/slide-nav-button-two";

import "swiper/css";
import "swiper/css/navigation";

const Project = ({ project, setCurrentProject }) => {
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  // const [images, setImages] = useState(
  //   project.images.map((image) => {
  //     return useNextSanityImage(sanityClient, image);
  //   })
  // );
  let image = useNextSanityImage(sanityClient, project.images[0]);
  // useEffect(() => {
  //   let newImages = [];
  //   project.images.forEach((image) => {
  //     let newImage = useNextSanityImage(sanityClient, image);
  //     newImages.push(newImage);
  //   });
  //   setImages(newImages);
  // }, []);
  return (
    <div className={styles.project}>
      <button
        className={styles["project__back-button"]}
        onClick={() => setCurrentProject(false)}
      >
        &#60;- back to work
      </button>
      <div className={styles["project__image"]}>
        <Swiper
          // spaceBetween={50}
          spaceBetween={30}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          centeredSlides={true}
          modules={[Navigation]}
          navigation={{
            nextEl: nextRef.current,
            prevEl: prevRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.params.navigation.prevEl = prevRef.current;

            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {project.images.length >= 2 && <SlideNavButtonTwo isPrev={true} />}
          {project.images?.map((image, key) => {
            console.log(image.url);
            return (
              <SwiperSlide key={key}>
                <img key={key} src={image.asset.url} alt="" />
              </SwiperSlide>
            );
          })}
          {project.images.length >= 2 && <SlideNavButtonTwo isPrev={false} />}
        </Swiper>
      </div>
      <h1 className={styles["project__title"]}>{project.title}</h1>
      <div className={styles["project__content"]}>
        <div className={styles["project__intro"]}>{project.intro}</div>
        {/* <div className={styles["project__intro"]}>{description}</div> */}
        {project.technologies && project.technologies.length >= 1 && (
          <div className={styles["project__technologies"]}>
            Bygd med:
            {project.technologies &&
              project.technologies.map((tech, key) => {
                return (
                  <div key={key}>
                    <a
                      href={tech.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {tech.title}
                    </a>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;
