import { object, string, TypeOf, any,number } from "zod";

const payload = {
  body: object({
    message: string(),
    expedition: string(),
    rating: number(),
    like: number(),
    user: string({
      required_error: "user is required",
    }),
  }),
};

const params = {
  params: object({
    ReviewId: string({
      required_error: "reviewId is required",
    }),
  }),
};

export const createReviewSchema = object({
  ...payload,
});

export const updateReviewSchema = object({
  ...payload,
  ...params,
});

export const deleteReviewSchema = object({
  ...params,
});

export const getReviewSchema = object({
  ...params,
});

export type CreateReviewInput = TypeOf<typeof createReviewSchema>;
export type UpdateReviewInput = TypeOf<typeof updateReviewSchema>;
export type ReadReviewInput = TypeOf<typeof getReviewSchema>;
export type DeleteReviewInput = TypeOf<typeof deleteReviewSchema>;
