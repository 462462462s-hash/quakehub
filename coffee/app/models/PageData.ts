import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  roast: { type: String, required: true },
  notes: [{ type: String }],
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  image: { type: String, required: true },
  tag: { type: String, default: "" },
});

const HomePageSchema = new Schema({
  announcementText: { type: String, default: "Welcome to the Lumen Coffee Experience" },
  heroBadge: { type: String, default: "FRESHLY ROASTED DAILY" },
  heroHeading: { type: String, default: "Crafted for the quiet moments before the world wakes up." },
  heroDescription: { type: String, default: "Sourced ethically from high-altitude volcanic soils, slow-roasted in small batches." },
  heroPrimaryBtnText: { type: String, default: "Explore Menu" },
  heroSecondaryBtnText: { type: String, default: "Join Customer Club" },
  heroCardTag: { type: String, default: "Signature Roast" },
  heroCardTitle: { type: String, default: "Velvet Mocha Reserve" },
  heroCardSubtitle: { type: String, default: "Dark Roast • Cocoa & Smoked Vanilla Notes" },
  heroCardImage: { type: String, default: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1000" },
  documentaryTitle: { type: String, default: "From the High-Altitude Farms" },
  documentaryDescription: { type: String, default: "Take a visual journey into how high-elevation soil gives our beans their distinct taste profile." },
  youtubeVideoId: { type: String, default: "RJlRLt31CFU" },
  products: [ProductSchema],
});

export const HomePageData = models.HomePageData || model("HomePageData", HomePageSchema);