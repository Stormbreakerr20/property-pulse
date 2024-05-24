"use client";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Spinner from "./Spinnner";

function Bookmark({ property }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!userId) {
      return toast.error("Please login to bookmark this property");
    }

    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        body: JSON.stringify({ propertyId: property._id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      toast.success(data.message);
      setIsBookmarked(data.isBookmarked);
    } catch (error) {
      console.error("Error bookmarking property: ", error);
      toast.error("Error bookmarking property");
    }
  };

  useEffect(() => {
    const checkBookmark = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const res = await fetch("/api/bookmarks/check", {
          method: "POST",
          body: JSON.stringify({ propertyId: property._id }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setIsBookmarked(data.isBookmarked);
      } catch (error) {
        console.error("Error checking bookmark: ", error);
      } finally {
        setLoading(false);
      }
    };

    checkBookmark();
  }, [userId, property._id]);
  return (
    <>
      {loading && <Spinner loading={loading} size={50} />}
      {!loading &&
        (isBookmarked ? (
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
            onClick={handleClick}
          >
            <FaBookmark className="mr-2" /> Remove Bookmark
          </button>
        ) : (
          <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
          >
            <FaBookmark className="mr-2" /> Bookmark Property
          </button>
        ))}
    </>
  );
}

export default Bookmark;
