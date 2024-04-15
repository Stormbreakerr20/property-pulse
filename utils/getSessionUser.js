import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

// rather than import both every time, we can import getSessionUser to get user

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return null;
    }

    return {
      user: session.user,
      userId: session.user.id,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
