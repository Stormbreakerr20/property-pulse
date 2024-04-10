"use client";
import PropertCard from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/request";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinnner";

const PropertiesPage = async () => {
  // Sort properties by Date
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertiesData = async () => {
      try {
        const properties = await fetchProperties();
        setProperties(properties);
      } catch (error) {
        console.error("Error fetching property: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertiesData();
  }, []);

  properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && (
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            {properties.length === 0 ? (
              <div className="text-center">No properties found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((property, index) => (
                  <PropertCard key={property._id} property={property} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default PropertiesPage;
