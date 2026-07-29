// models/MenuItem.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMenuItem extends Document {
  id: string;
  name: string;
  category: string;
  roast: "Light Roast" | "Medium Roast" | "Dark Roast" | "Omni Roast";
  notes: string[];
  origin: string;
  altitude: string;
  process: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  tag?: string;
  description: string;
}

const MenuItemSchema: Schema<IMenuItem> = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    roast: { 
      type: String, 
      enum: ["Light Roast", "Medium Roast", "Dark Roast", "Omni Roast"], 
      required: true 
    },
    notes: [{ type: String, required: true }],
    origin: { type: String, required: true },
    altitude: { type: String, required: true },
    process: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true, default: 5.0 },
    reviewsCount: { type: Number, required: true, default: 0 },
    image: { type: String, required: true },
    tag: { type: String },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "menudata", // Targets your 'menudata' collection explicitly
  }
);

const MenuItem: Model<IMenuItem> =
  mongoose.models.MenuItem || mongoose.model<IMenuItem>("MenuItem", MenuItemSchema);

export default MenuItem;