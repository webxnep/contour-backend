import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import DiscountModel, { DiscountInput, DiscountDocument } from "../models/discount.model";

export async function createDiscount(input: DiscountInput) {
  const result = await DiscountModel.create(input);
  return result;
}

export async function findDiscount(query: FilterQuery<DiscountDocument>, options: QueryOptions = { lean: true }) {
  const result = await DiscountModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateDiscount(query: FilterQuery<DiscountDocument>, update: UpdateQuery<DiscountDocument>, options: QueryOptions) {
  return DiscountModel.findOneAndUpdate(query, update, options);
}

export async function deleteDiscount(query: FilterQuery<DiscountDocument>) {
  return DiscountModel.deleteOne(query);
}

// export async function findAllDiscount() {
//   const result = await DiscountModel.find().sort({ createdAt: -1 });
//   return result;
// }

export async function findAllDiscount(query: FilterQuery<DiscountDocument>, options: QueryOptions = { lean: true }) {
  const result = await DiscountModel.find(query, {}, options).sort({ createdAt: -1 });
  return result;
}

export async function findAllDiscountForCard() {
  const result = await DiscountModel.find().select("title slug banner createdAt").sort({ createdAt: -1 });
  return result;
}
