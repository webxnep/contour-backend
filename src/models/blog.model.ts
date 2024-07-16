import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface BlogInput {
  title: string;
  authorImage: string;
  authorName: string;
  banner: string;
  description: string;
}

export interface BlogDocument extends BlogInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new mongoose.Schema(
  {
    blogId: {
      type: String,
      required: true,
      unique: true,
      default: () => `blog_${nanoid()}`,
    },
    title: { type: String, required: true },
    authorImage: { type: String, required: true },
    authorName: { type: String, required: true },
    banner: { type: String, required: true },
    description: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const BlogModel = mongoose.model<BlogDocument>("Blog", blogSchema);

export default BlogModel;
