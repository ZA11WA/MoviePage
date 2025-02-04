import { Client } from "@gradio/client";

export default async function Recommend() {
  try {
    // Connect to Gradio
    const client = await Client.connect("http://127.0.0.1:7877");

    // Send the movie name and number of recommendations to Gradio
    const result = await client.predict([
      "batman",  // Movie name
      "5"        // Number of recommendations
    ]);

    // Log the result to check the output
    console.log(result.data);

  } catch (error) {
    console.error("Error:", error);
  }
}
