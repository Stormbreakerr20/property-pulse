// import properties from "@/properties.json";
import PropertCard from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/request";

const PropertiesPage = async () => {
  const { properties } = await fetchProperties();

  // Sort properties by Date
  properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
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
  );
};

export default PropertiesPage;
