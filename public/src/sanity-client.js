import sanityClient from "@sanity/client";

export default sanityClient({
  // Find your project ID and dataset in `sanity.json` in your studio project
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECTID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2022-03-25",
  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible
  // data always (potentially slightly slower and a bit more expensive).
});
