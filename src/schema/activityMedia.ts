import { object, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    image: any(),
    activity: string({
      required_error: "activity is required",
    }),
  }),
};

const params = {
  params: object({
    activityMediaId: string({
      required_error: "activityMediaId is required",
    }),
  }),
};

export const createActivityMediaSchema = object({
  ...payload,
});

export const updateActivityMediaSchema = object({
  ...payload,
  ...params,
});

export const deleteActivityMediaSchema = object({
  ...params,
});

export const getActivityMediaSchema = object({
  ...params,
});

export type CreateActivityMediaInput = TypeOf<typeof createActivityMediaSchema>;
export type UpdateActivityMediaInput = TypeOf<typeof updateActivityMediaSchema>;
export type ReadActivityMediaInput = TypeOf<typeof getActivityMediaSchema>;
export type DeleteActivityMediaInput = TypeOf<typeof deleteActivityMediaSchema>;
