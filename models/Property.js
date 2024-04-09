import { Schema, model, models } from "mongoose";

const PropertySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User", // reference to User model from where we can get the user details
        required: [true, "Owner is required"],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    type: {
        type: String,
        required: [true, "Type is required"],
    },
    description: {
        type: String,
    },
    location: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        zipcode: {
            type: String,
        },  
    },
    square_feet: {
        type: Number,
        required: true,
    },
    beds: {
        type: Number,
        required: true,
    },
    baths: {
        type: Number,
        required: true,
    },
    amenities: [
        {
            type: String,
        }
    ],
    rates:{
        nightly: {
            type: Number,
        },
        weekly: {
            type: Number,
        },
        monthly: {
            type: Number,
        },
    },
    seller_info: {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
    },
    images: [
        {
            type: String,
        }
    ],
    is_featured: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true // createdAt, updatedAt
});

export default models.Property || model("Property", PropertySchema);