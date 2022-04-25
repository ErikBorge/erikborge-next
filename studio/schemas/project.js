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
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "url",
      title: "URL",
      type: "string",
    },
    {
      name: "intro",
      title: "Intro",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "reference", to: [{ type: "technology" }] }],
    },
  ],
};
