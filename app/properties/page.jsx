import properties from "@/properties.json";
import PropertCard from "@/components/PropertCard";

const PropertiesPage = () => {
  return (
    <section class="px-4 py-6">
      <div class="container-xl lg:container m-auto px-4 py-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.length === 0 ? (
            <div class="text-center">No properties found</div>
          ) : (
            properties.map((property, index) => 
            <>
              <PropertCard key={index} property={property} />
            </>
          )
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertiesPage;
