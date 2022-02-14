export default {
  name: "home",
  title: "Home",
  type: "document",
  fields: [
    {
      name: "work",
      title: "Work",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
    },
  ],
};
