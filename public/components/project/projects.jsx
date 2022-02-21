import { useRef } from "react";
import useSWR from "swr";
import client from "../../src/sanity-client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper from "react-id-swiper";
import { Pagination, Navigation } from "swiper";

import SlideNavButton from "../slide-nav-button/slide-nav-button";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./project.module.scss";
import Project from "./project";

const projectsQuery = `
    *[_type == "project"]{
        _id,
        title,
        image,
        "imageUrl": image.asset->url,
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

const Projects = () => {
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  const swiperRef = useRef(null);

  const { data: projects, error } = useSWR(projectsQuery, (query) =>
    client.fetch(query)
  );
  console.log(projects);
  if (error) {
    return <div>Were sorry, something wrong happened.</div>;
  }

  //   const params = {
  //     // pagination: {
  //     //   el: ".swiper-pagination",
  //     //   type: "bullets",
  //     //   clickable: true,
  //     // },
  //     navigation: {
  //       nextEl: styles["projects__nav-next"],
  //       prevEl: styles["projects__nav-prev"],
  //     },
  //     spaceBetween: 30,
  //     // slidesPerView: "3",
  //     // centeredSlides: true,
  //     modules: [Navigation, Pagination],
  //   };
  //   console.log("swiperRef", swiperRef);

  return (
    <div className={styles.projects}>
      <Swiper
        ref={swiperRef}
        centeredSlides={true}
        pagination={{
          clickable: true,
          //   el: styles["projects__swiper-pagination"],
          type: "bullets",
          bulletClass: styles["projects__swiper-bullet"],
          //   bulletActiveClass: styles["projects__swiper-bullet-active"],
          renderBullet: function (index, className) {
            return `<button class=${className}></button>`;
          },
        }}
        modules={[Pagination, Navigation]}
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
        slidesPerView="auto"
        spaceBetween={30}
        speed={1000}
        // onBeforeInit={(swiper) => {

        // }}
        onInit={(swiper) => {
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.params.navigation.prevEl = prevRef.current;

          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        <SlideNavButton isPrev={true} />
        {projects &&
          projects.map((project, key) => {
            return (
              <SwiperSlide key={key}>
                <Project
                  title={project.title}
                  imageUrl={project.imageUrl}
                  url={project.url}
                  intro={project.intro}
                  description={project.description}
                  technologies={project.technologies}
                />
              </SwiperSlide>
            );
          })}
        <SlideNavButton isPrev={false} />
      </Swiper>
      <button ref={nextRef} className={styles["projects__nav-next"]}>
        <div className={styles["projects__nav-inner"]} />
        <div className={styles["projects__nav-arrow"]} />
      </button>
    </div>
  );
};

export default Projects;
