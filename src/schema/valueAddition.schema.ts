import { object, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "title is required",
    }),

    shortDescription: string({
      required_error: "description is required",
    }),

    image: any(),

    documents:any(),

    expedition: string({
      required_error: "expedition is required",
    }),
  }),
};

const params = {
  params: object({
    valueAdditionId: string({
      required_error: "costExcludeId is required",
    }),
  }),
};

export const createCostExcludeSchema = object({
  ...payload,
});

export const updateCostExcludeSchema = object({
  ...payload,
  ...params,
});

export const deleteCostExcludeSchema = object({
  ...params,
});

export const getCostExcludeSchema = object({
  ...params,
});

export type CreateCostExcludeInput = TypeOf<typeof createCostExcludeSchema>;
export type UpdateCostExcludeInput = TypeOf<typeof updateCostExcludeSchema>;
export type ReadCostExcludeInput = TypeOf<typeof getCostExcludeSchema>;
export type DeleteCostExcludeInput = TypeOf<typeof deleteCostExcludeSchema>;
