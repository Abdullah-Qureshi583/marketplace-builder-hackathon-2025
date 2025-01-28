import { createClient } from "@sanity/client";
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

async function deleteData(productType) {
  try {
    const deletedData = await client.delete({
      query: `*[_type == "${productType}"][0...999]`,
    });
    
    console.log("The deleted data is : ", deletedData);
    console.log("Data Deletion Completed Successfully!");
  } catch (error) {
    console.error("Error Deleting Data:", error);
  }
}

deleteData("product");
// product
// brand
// tag
// category