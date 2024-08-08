import { object, number, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    lowerLimit: number({
      required_error: "Lower limit is required",
    }),

    upperLimit: number({
      required_error: "Upper limit is required",
    }),

    discountRate: number({
      required_error: "Discount rate is required",
    }),
  }),
};

const params = {
  params: object({
    discountId: string({
      required_error: "discountId is required",
    }),
  }),
};

export const createDiscountSchema = object({
  ...payload,
});

export const updateDiscountSchema = object({
  ...payload,
  ...params,
});

export const deleteDiscountSchema = object({
  ...params,
});

export const getDiscountSchema = object({
  ...params,
});

export type CreateDiscountInput = TypeOf<typeof createDiscountSchema>;
export type UpdateDiscountInput = TypeOf<typeof updateDiscountSchema>;
export type ReadDiscountInput = TypeOf<typeof getDiscountSchema>;
export type DeleteDiscountInput = TypeOf<typeof deleteDiscountSchema>;
