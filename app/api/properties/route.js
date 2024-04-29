import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

// GET /api/properties
export const GET = async (req, res) => {
  try {
    await connectDB();

    // Get all properties
    const properties = await Property.find({});
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

// POST /api/properties
export const POST = async (req, res) => {
  try {
    await connectDB();

    // session and user
    const sessionUser = await getSessionUser(req);

    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { userId } = sessionUser;

    // Handle Form
    const formData = await req.formData();

    // handle Amenties and images
    const amenities = formData.getAll("amenities");

    const images = formData // couldinary used to upload images
      .getAll("images")
      .filter((image) => image.name !== ""); // Will be an array of file with all details of image

    // Create a new property for db
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
      images,
    };

    // Upload images to cloudinary
    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // Convert image data to base64
      const base64Image = imageData.toString("base64");

      // Make request to upload to cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${base64Image}`,
        {
          folder: "propertypulse",
        }
      );

      imageUploadPromises.push(result.secure_url);

      // Wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);

      // Add images to property object
      property.images = uploadedImages;
    }

    // Save property to db
    const newProperty = new Property(property);
    await newProperty.save();

    // Redirect to the new property page
    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );

    // return new Response(JSON.stringify(property), {
    //   status: 201,
    // });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
