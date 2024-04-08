import { Schema, model, models } from "mongoose";

// Google OAuth is used in the app however
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
    },
    image: {
        type: String,
    },
    // bookmark certain properties : it will be array
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Property", // reference to Property model from where we can get the property details
        }
    ]
}, {
    timestamps: true // createdAt, updatedAt
});

export default models.User || model("User", UserSchema);