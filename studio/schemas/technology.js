export default {
  name: "technology",
  title: "Technology",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "url",
      title: "URL",
      type: "string",
    },
  ],
};
