import connectDB from "@/config/db";
import { getSessionUser } from "@/utils/getSessionUser";
import User from "@/models/User";

// while hosting on vercel there was an error so we export dynamic as forced dynamic
export const dynamic = "force-dynamic";

// POST /api/bookmarks
export const POST = async (req, res) => {
  try {
    await connectDB();

    const { propertyId } = await req.json();

    // session and user
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { userId } = sessionUser;

    const user = await User.findById(userId);

    let isBookmarked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
