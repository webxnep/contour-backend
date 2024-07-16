import { object, string, TypeOf, any, boolean, number } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "name is required",
    }),

    image: any(),

    position: string({
      required_error: "position is required",
    }),

    description: string({
      required_error: "description is required",
    }),

    order: string({
      required_error: "number is required",
    }),

    bioData: any(),
    phone: string().optional(),
    linkedin: string().optional(),
    x: string().optional(),
    insta: string().optional(),
    facebook: string().optional(),

    isBoardMember: string(),
  }),
};

const params = {
  params: object({
    teamId: string({
      required_error: "teamId is required",
    }),
  }),
};

export const createTeamSchema = object({
  ...payload,
});

export const updateTeamSchema = object({
  ...payload,
  ...params,
});

export const deleteTeamSchema = object({
  ...params,
});

export const getTeamSchema = object({
  ...params,
});

export type CreateTeamInput = TypeOf<typeof createTeamSchema>;
export type UpdateTeamInput = TypeOf<typeof updateTeamSchema>;
export type ReadTeamInput = TypeOf<typeof getTeamSchema>;
export type DeleteTeamInput = TypeOf<typeof deleteTeamSchema>;
