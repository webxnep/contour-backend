import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";
import { UserDocument } from "./user.model";
import { Schema } from "mongoose";
import { ActivityDocument } from "./activity.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface CustomTripInput {
    country:string;
    email: string;
    message?:string;
    fullName: string;
    phone: number;
    noOfTravelers: any;
    travelDate: any;
    location: string;
    accomodation: string;
    budgetRange: any;
    expedition: ExpeditionDocument["_id"];
    user: UserDocument["_id"];
    activity: ActivityDocument["_id"];

}

export interface CustomTripDocument extends CustomTripInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const CustomTripSchema = new mongoose.Schema(
    {
        customTripId: {
            type: String,
            required: true,
            unique: true,
            default: () => `customTrip_${nanoid()}`,
        },

        noOfTravelers: { type: Schema.Types.Mixed, required: true },
        travelDate: { type: Schema.Types.Mixed, required: true },
        location: { type: String, required: true },
        expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition" },
        activity: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
        accomodation: { type: String, required: true },
        budgetRange: { type: Schema.Types.Mixed, required: true },

        fullName: { type: String, required: true },
        phone: { type: Number, required: true },

        country: { type: String, required: true },
        email: { type: String, required: true },
        message: { type: String },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    {
        timestamps: true,
    }
);

const CustomTripModel = mongoose.model<CustomTripDocument>("CustomTrip", CustomTripSchema);

export default CustomTripModel;
