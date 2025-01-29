import { createClient } from "@sanity/client";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const {
  NEXT_PUBLIC_SANITY_PROJECT_ID, // Sanity project ID
  NEXT_PUBLIC_SANITY_DATASET, // Sanity dataset (e.g., "production")
  SANITY_API_TOKEN, // Sanity API token
  NEXT_PUBLIC_SANITY_API_VERSION,
} = process.env;

// Check if the required environment variables are provided
if (!NEXT_PUBLIC_SANITY_PROJECT_ID || !SANITY_API_TOKEN) {
  console.error(
    "Missing required environment variables. Please check your .env.local file."
  );
  process.exit(1); // Stop execution if variables are missing
}

const client = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET || "production",
  token: SANITY_API_TOKEN,
  apiVersion: NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-15",
  useCdn: false,
});

// Function to upload images to Sanity
async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading Image: ${imageUrl}`);
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);
    const asset = await client.assets.upload("image", buffer, {
      filename: imageUrl.split("/").pop(),
    });
    console.log(`Image Uploaded Successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error("Failed to Upload Image:", imageUrl, error);
    return null;
  }
}

// Function to fetch tag references from Sanity
async function fetchTagReferences(tags) {
  try {
    // Query to find tags matching the provided array
    const query = `*[_type == "tag" && name in $tags]{_id}`;
    const existingTags = await client.fetch(query, { tags });

    return existingTags.map((tag) => ({
      _type: "reference",
      _ref: tag._id,
      _key:tag._id
    }));
  } catch (error) {
    console.error("Error fetching tag references array:", error);
    return [];
  }
}

async function fetchCategoryReference(category) {
  try {
    const query = `*[_type == "category" && name == $category]{_id}`;
    const existingCategory = await client.fetch(query, { category });
    return { _type: "reference", _ref: existingCategory[0]?._id };
  } catch (error) {
    console.error("Error fetching category references:", error);
    return [];
  }
}

async function fetchBrandReference(brand) {
  try {
    const query = `*[_type == "brand" && name == $brand]{_id}`;
    const existingBrand = await client.fetch(query, { brand });
    return { _type: "reference", _ref: existingBrand[0]?._id };
  } catch (error) {
    console.error("Error fetching brand reference:", error);
    return [];
  }
}

// Function to import product data and upload to Sanity
async function importData() {
  try {
    console.log("Fetching Product Data From API...");

    const response = await axios.get("http://localhost:3000/api/product");
    const products = response.data.products;

    for (const item of products) {
      console.log(`Processing Item: ${item.name}`);

      // Handle image upload if imagePath exists
      let imageRef = null;
      if (item.imagePath) {
        imageRef = await uploadImageToSanity(item.imagePath);
      }

      const tagReferences = item.tags
        ? await fetchTagReferences(item.tags)
        : [];
      console.log("the tag references after fetch are : ", tagReferences);
      let categoryRef = await fetchCategoryReference(item.category);
      let brandRef = await fetchBrandReference(item.brand);
      const sanityItem = {
        _type: "product", // Corrected tag
        name: item.name,
        price: item.price,
        description: item.description || "",
        discountPercentage: item.discountPercentage || 0,
        stockLevel: item.stockLevel || 0,
        isFeaturedProduct: item.isFeaturedProduct,
        rating: item.rating || 1,
        image: imageRef
          ? {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: imageRef,
              },
            }
          : undefined,
        category: categoryRef,
        brand: brandRef,
        tags: tagReferences,
      };

      const result = await client.create(sanityItem);
      console.log(`Uploaded Successfully: ${result._id}`);
      console.log("----------------------------------------------------------");
      console.log("\n\n");
    }

    console.log("Data Import Completed Successfully!");
  } catch (error) {
    console.error("Error Importing Data:", error);
  }
}

importData();
