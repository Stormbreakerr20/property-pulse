const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// fetch all properties
export const fetchProperties = async () => {
  try {
    // handle the case where domain is not available yet
    if (!apiDomain) {
      return { properties: [] };
    }

    // we are in server not client so put domain not /api/properties directly
    const res = await fetch(`${apiDomain}/properties`);

    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// fetch single property
export const fetchProperty = async (id) => {
  try {
    // handle the case where domain is not available yet
    if (!apiDomain) {
      return null;
    }

    // we are in server not client so put domain not /api/properties directly
    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch property");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};
