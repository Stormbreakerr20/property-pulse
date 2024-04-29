import connectDB from "@/config/db";
import Property from "@/models/Property";

// GET /api/properties/user/:userid
export const GET = async (req, {params}) => {
  try {
    await connectDB();

    const userId = params.userId;
    
    if (!userId) {
      return new Response("Userid is required", { status: 400 });
    }

    // Get all properties
    const properties = await Property.find({ owner: userId });
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
