import connectDB from "@/config/db";
import Property from "@/models/Property";

// GET /api/properties
export const GET = async (req, res) => {
  try {
    await connectDB();

    // Get all properties
    const properties = await Property.find({});
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
