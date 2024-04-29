"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import profileDefault from "@/assets/images/profile.png";
import { fetchUserProperties } from "@/utils/request";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinnner";
import { toast } from "react-toastify";

const page = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileEmail = session?.user?.email;
  const profileName = session?.user?.name;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertiesData = async (userid) => {
      try {
        const properties = await fetchUserProperties(userid);
        setProperties(properties);
      } catch (error) {
        console.error("Error fetching property: ", error);
      } finally {
        setLoading(false);
      }
    };
    if (session?.user?.id) fetchPropertiesData(session?.user?.id);
  }, [session]);

  const deleteProperty = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        setProperties((prev) => prev.filter((property) => property._id !== id));
        toast.success("Property deleted successfully");
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting property: ", error);
    }
  };

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage || profileDefault}
                  alt="User"
                  width={500}
                  height={500}
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span> {profileName}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {profileEmail}
              </h2>
            </div>

            {loading && <Spinner loading={loading} />}
            {!loading && (
              <div className="md:w-3/4 md:pl-4">
                <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
                {properties && properties.length === 0 ? (
                  <div className="text-center">No properties found</div>
                ) : (
                  properties?.map((property, index) => (
                    <div className="mb-10">
                      <Link href="/property">
                        <Image
                          className="h-32 w-full rounded-md object-cover"
                          src={property.images[0]}
                          alt="Property 1"
                          width={200}
                          height={200}
                        />
                      </Link>
                      <div className="mt-2">
                        <p className="text-lg font-semibold">{property.name}</p>
                        <p className="text-gray-600">
                          Address: {property.location.city}{" "}
                          {property.location.state}
                        </p>
                      </div>
                      <div className="mt-2">
                        <Link
                          href={`/properties/${property._id}/edit`}
                          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteProperty(property._id)}
                          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                          type="button"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
