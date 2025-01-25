import { createClient } from "@sanity/client";
import axios from "axios";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2025-01-15",
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

// Function to import product data and upload to Sanity
async function importData() {
  try {
    console.log("Fetching Product Data From API...");

    const response = await axios.get(
      "https://next-ecommerce-template-4.vercel.app/api/product"
    );
    const products = response.data.products;

    for (const item of products) {
      console.log(`Processing Item: ${item.name}`);

      // Handle image upload if imagePath exists
      let imageRef = null;
      if (item.imagePath) {
        imageRef = await uploadImageToSanity(item.imagePath);
      }

      // Fetch the brand reference if the brand name exists
      let brandRef = null;
      if (item.brand) {
        const brandQuery = `*[_type == "brand" && name == "${item.brand}"][0]`;
        const brandResult = await client.fetch(brandQuery);
        if (brandResult) {
          brandRef = {
            _type: "reference",
            _ref: brandResult._id, // Reference the brand by its ID
          };
        }
      }

      // Prepare the product data to be uploaded to Sanity
      const sanityItem = {
        _type: "product",
        name: item.name,
        category: item.category || null,
        price: item.price,
        description: item.description || "",
        discountPercentage: item.discountPercentage || 0,
        stockLevel: item.stockLevel || 0,
        isFeaturedProduct: item.isFeaturedProduct,
        image: imageRef
          ? {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: imageRef,
              },
            }
          : undefined,
        tags: item.tags
          ? item.tags.map((tagId) => ({
              _type: "reference",
              _ref: tagId,
            }))
          : [], // Default to an empty array if no tags
        brand: brandRef, // Add the brand reference to the product data
      };

      console.log(`Uploading ${sanityItem.category} - ${sanityItem.name} to Sanity!`);
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
