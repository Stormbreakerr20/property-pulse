"use client";
import { useRouter, useParams } from "next/navigation";
const page = () => {
  const router = useRouter();
  const { id } = useParams();
  return (
    <>
      <div>
        <button className="bg-red-500" onClick={() => router.push("/")}>
          home1 {id}
        </button>
      </div>
    </>
  );
};

export default page;
