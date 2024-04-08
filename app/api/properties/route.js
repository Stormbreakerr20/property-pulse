import connectDB from "@/config/db";

export const GET = async (req, res) => {
  try {
    await connectDB();

    return new Response(JSON.stringify({ message: "hello world" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
