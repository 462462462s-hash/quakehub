import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IAboutData extends Document {
  hero: {
    badgeText: string;
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    subtitle: string;
  };
  stats: Array<{ label: string; value: string }>;
  philosophy: {
    badgeText: string;
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    badgeTitle: string;
    badgeDescription: string;
    bulletPoints: string[];
  };
  pillars: Array<{ icon: string; title: string; description: string }>;
  methodSteps: Array<{ number: string; title: string; icon: string; details: string }>;
  showcaseGallery: Array<{ title: string; subtitle: string; image: string }>;
  cta: {
    title: string;
    description: string;
    primaryBtnText: string;
    primaryBtnLink: string;
    secondaryBtnText: string;
    secondaryBtnLink: string;
  };
}

const AboutDataSchema = new Schema<IAboutData>(
  {
    hero: {
      badgeText: String,
      titlePrefix: String,
      titleHighlight: String,
      titleSuffix: String,
      subtitle: String,
    },
    stats: [{ label: String, value: String }],
    philosophy: {
      badgeText: String,
      title: String,
      description: String,
      imageUrl: String,
      imageAlt: String,
      badgeTitle: String,
      badgeDescription: String,
      bulletPoints: [String],
    },
    pillars: [{ icon: String, title: String, description: String }],
    methodSteps: [{ number: String, title: String, icon: String, details: String }],
    showcaseGallery: [{ title: String, subtitle: String, image: String }],
    cta: {
      title: String,
      description: String,
      primaryBtnText: String,
      primaryBtnLink: String,
      secondaryBtnText: String,
      secondaryBtnLink: String,
    },
  },
  { collection: "aboutdata" } // explicitly targets the 'aboutdata' collection in the 'coffee' database
);

export default models.AboutData || model<IAboutData>("AboutData", AboutDataSchema);