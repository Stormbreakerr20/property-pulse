import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

// GET /api/properties/:id
export const GET = async (req, { params }) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);

    if (!property) {
      return new Response("Property not found", { status: 404 });
    }

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

// Delete /api/properties/:id
export const DELETE = async (req, { params }) => {
  try {
    if (!params.id) {
      return new Response("Property ID is required", { status: 400 });
    }
    const sessionUser = await getSessionUser();

    // check if user is logged in
    if (!sessionUser || !sessionUser.userId) {
      return new Response("UserId is required", { status: 401 });
    }

    const { userId } = sessionUser;
    await connectDB();

    const property = await Property.findById(params.id);

    if (!property) {
      return new Response("Property not found", { status: 404 });
    }

    // check if user is the owner of the property
    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await property.deleteOne();

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

// PUT /api/properties/:id
export const PUT = async (req, { params }) => {
  try {
    await connectDB();

    // session and user
    const sessionUser = await getSessionUser(req);

    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { userId } = sessionUser;
    const { id } = params;

    // Handle Form
    const formData = await req.formData();

    // handle Amenties
    const amenities = formData.getAll("amenities");

    const existingProperty = await Property.findById(id);

    // check if user is the owner of the property
    if (existingProperty.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!existingProperty) {
      return new Response("Property not found", { status: 404 });
    }

    const property = {
      name: formData.get("name"),
      type: formData.get("type"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    // update property to db
    const updatedProperty = await Property.findByIdAndUpdate(id, property);

    return new Response(JSON.stringify(updatedProperty), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
