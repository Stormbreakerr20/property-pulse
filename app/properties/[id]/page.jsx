"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProperty } from "@/utils/request";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
import PropertyDetails from "@/components/PropertyDetails";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Spinner from "@/components/Spinnner";
import Bookmark from "@/components/Bookmark";
import ShareProperty from "@/components/ShareProperty";
import ContactForm from "@/components/ContactForm";

const page = () => {
  const router = useRouter();
  const { id } = useParams();

  const [property, setProperty] = useState(null);

  // for client side loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;

      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.error("Error fetching property: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className="text-2xl text-center font-bold mt-10">
        Property not found
      </h1>
    );
  }
  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          {/* Header Image */}
          <PropertyHeaderImage image={property.images[0]} />

          {/*Go Back*/}
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Properties
              </Link>
            </div>
          </section>

          {/* Property Info */}
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                {/* Property Details */}
                <PropertyDetails property={property} />

                {/* Sidebar */}
                <aside className="space-y-4">
                  <Bookmark property={property} />
                  <ShareProperty property={property} />

                  {/* Contact Form */}
                  <ContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
};

export default page;
