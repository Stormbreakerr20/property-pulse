import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import User from "@/models/User";

// while hosting on vercel there was an error so we export dynamic as forced dynamic
export const dynamic = "force-dynamic";

// GET /api/bookmarks
export const GET = async (req, res) => {
  try {
    await connectDB();

    // session and user
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { userId } = sessionUser;

    const user = await User.findById(userId);

    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(bookmarks), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

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
    let message;

    if (isBookmarked) {
      user.bookmarks = user.bookmarks.pull(propertyId);
      message = "Bookmark removed";
      isBookmarked = false;
    } else {
      user.bookmarks.push(propertyId);
      message = "Bookmark added";
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
