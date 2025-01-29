export const product = {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule: any) => Rule.required().error("Name is required"),
    },
    {
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
      description: "Upload an image of the product.",
    },
    {
      name: "price",
      type: "number",
      title: "Price",
      validation: (Rule: any) => Rule.required().error("Price is required"),
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      validation: (Rule: any) =>
        Rule.max(150).warning("Keep the description under 150 characters."),
    },
    {
      name: "discountPercentage",
      type: "number",
      title: "Discount Percentage",
      validation: (Rule: any) =>
        Rule.min(0).max(100).warning("Discount must be between 0 and 100."),
    },
    {
      name: "isFeaturedProduct",
      type: "boolean",
      title: "Is Featured Product",
    },
    {
      name: "rating",
      type: "number",
      title: "Rating",
      validation: (Rule: any) =>
        Rule.min(0)
          .error("Stock level must be a positive number.")
          .max(5)
          .error("Stock level must under 1 - 5 "),
    },
    {
      name: "stockLevel",
      type: "number",
      title: "Stock Level",
      validation: (Rule: any) =>
        Rule.min(0).error("Stock level must be a positive number."),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule: any) => Rule.required().error("Category is required"),
    },
    {
      name: "brand",
      type: "reference",
      title: "Brand Name",
      to: [{ type: "brand" }], // Referencing the `brand` type
      description: "Select a brand for this product. Only one can be selected.",
    },
    
    

    {
      name: "tags",
      type: "array",
      title: "Tags",

      of: [{ type: "reference", to: [{ type: "tag" }] }],
      options: {
        layout: "tags", // This makes the tags look like small badges
      }

      
    },
  ],
};
