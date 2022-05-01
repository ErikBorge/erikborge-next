import { tjafsObjects } from "../../public/src/tjafsObjects";
import Navigation from "../../public/components/Navigation/Navigation";

const getTjafRenderComponent = (href) => {
  return tjafsObjects.find((el) => el.href === href).renderComponent;
};

const Tjaf = (props) => {
  const RenderComponent = getTjafRenderComponent(props.tjaf);
  if (!RenderComponent) return null;
  return (
    <>
      <Navigation
        nextItemHref={props.nextTjaf ? `/tjafs/${props.nextTjaf}` : null}
        prevItemHref={props.prevTjaf ? `/tjafs/${props.prevTjaf}` : null}
      />
      <RenderComponent {...props} />
    </>
  );
};

export default Tjaf;

export async function getStaticPaths() {
  const paths = tjafsObjects.map((tjaf) => {
    return {
      params: {
        tjaf: tjaf.href,
      },
    };
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const tjafIndex = tjafsObjects.findIndex((tjaf) => tjaf.href === params.tjaf);
  const tjaf = tjafsObjects[tjafIndex];
  const prevTjaf = tjafsObjects[tjafIndex - 1] || null;
  const nextTjaf = tjafsObjects[tjafIndex + 1] || null;

  return {
    props: {
      page: {
        tjaf: tjaf.href,
        nextTjaf: nextTjaf?.href || null,
        prevTjaf: prevTjaf?.href || null,
      },
      layoutProps: tjaf.layoutProps || null,
    },
  };
}
