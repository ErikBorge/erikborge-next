import { useState, useEffect, useRef } from "react";
import SanityBlockContent from "@sanity/block-content-to-react";
import styles from "./project.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Link from "next/link";
import SlideNavButtonTwo from "../../public/components/slide-nav-button/slide-nav-button-two";
import client from "../../public/src/sanity-client";

import "swiper/css";
import "swiper/css/navigation";

const Project = ({
  title,
  images,
  url,
  intro,
  description,
  technologies,
  setIsInTransit,
}) => {
  const nextRef = useRef(null);
  const prevRef = useRef(null);

  return (
    <div className={styles.project}>
      <Link href={"/work"}>
        <a
          onClick={() => setIsInTransit(true)}
          className={styles["project__back-button"]}
        >
          &#60;- back to work
        </a>
      </Link>
      <div className={styles["project__image"]}>
        <Swiper
          // spaceBetween={50}
          spaceBetween={30}
          slidesPerView={1}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
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
          {images?.length >= 2 && <SlideNavButtonTwo isPrev={true} />}
          {images?.map((image, key) => {
            return (
              <SwiperSlide key={key}>
                <img key={key} src={image.asset.url} alt="" />
              </SwiperSlide>
            );
          })}
          {images?.length >= 2 && <SlideNavButtonTwo isPrev={false} />}
        </Swiper>
      </div>
      <h1 className={styles["project__title"]}>{title}</h1>
      <div className={styles["project__content"]}>
        <div className={styles["project__intro"]}>
          {intro}
          <SanityBlockContent blocks={description} />
        </div>
        {technologies && technologies.length >= 1 && (
          <div className={styles["project__technologies"]}>
            Bygd med:
            {technologies &&
              technologies.map((tech, key) => {
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

const getAllProjects = async () => {
  const projects = await client.fetch(`*[_type == "project"]`);
  return projects.flatMap((project) => [
    {
      params: {
        project: project.title,
      },
    },
  ]);
};

export async function getStaticPaths() {
  const paths = await getAllProjects();
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const project = await client.fetch(`
  *[_type == "project" && title == "${params.project}"][0]{
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
`);

  return { props: { page: { ...project } } };
}
