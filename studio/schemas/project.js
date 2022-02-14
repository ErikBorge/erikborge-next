export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description:
        'F.eks. "Viken Fylkeskommune", eller "www.vikendesignverktøy.no"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: "active",
      title: "Active?",
      type: "boolean",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    },
  ],
};
