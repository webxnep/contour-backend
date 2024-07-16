import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import BlogModel, { BlogInput, BlogDocument } from "../models/blog.model";

export async function createBlog(input: BlogInput) {
  const result = await BlogModel.create(input);
  return result;
}

export async function findBlog(query: FilterQuery<BlogDocument>, options: QueryOptions = { lean: true }) {
  const result = await BlogModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateBlog(query: FilterQuery<BlogDocument>, update: UpdateQuery<BlogDocument>, options: QueryOptions) {
  return BlogModel.findOneAndUpdate(query, update, options);
}

export async function deleteBlog(query: FilterQuery<BlogDocument>) {
  return BlogModel.deleteOne(query);
}

export async function findAllBlog() {
  const result = await BlogModel.find().sort({ createdAt: -1 }); 
  return result;
}
