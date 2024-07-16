import { object, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    image: any(),
    team: string({
      required_error: "team is required",
    }),
  }),
};

const params = {
  params: object({
    achievementId: string({
      required_error: "achievementId is required",
    }),
  }),
};

export const createAchievementSchema = object({
  ...payload,
});

export const updateAchievementSchema = object({
  ...payload,
  ...params,
});

export const deleteAchievementSchema = object({
  ...params,
});

export const getAchievementSchema = object({
  ...params,
});

export type CreateAchievementInput = TypeOf<typeof createAchievementSchema>;
export type UpdateAchievementInput = TypeOf<typeof updateAchievementSchema>;
export type ReadAchievementInput = TypeOf<typeof getAchievementSchema>;
export type DeleteAchievementInput = TypeOf<typeof deleteAchievementSchema>;
