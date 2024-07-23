import { object, number, string, TypeOf, any, boolean, date } from "zod";


const payload = {
  body: object({
    startDate:date({
      required_error: "Start date  is required",
    }),
    endDate: date({
      required_error: "End date is required",
    }),

    previousPrice: string({
      required_error: "Previous price is required",
    }),

    price: string({
      required_error: "Price is required",
    }),

    totalQuantity: string({
        required_error: "total quantity is required",
      }),

      soldQuantity: string({
        required_error: "sold quantity is required",
      }),
  }),
};

const params = {
  params: object({
    groupDepartureId: string({
      required_error: "groupDepartureId is required",
    }),
  }),
};



export const createGroupDepartureSchema = object({
  ...payload,
});

export const updateGroupDepartureSchema = object({
  ...payload,
  ...params,
});

export const deleteGroupDepartureSchema = object({
  ...params,
});

export const getGroupDepartureSchema = object({
  ...params,
});




export type CreateGroupDepartureInput = TypeOf<typeof createGroupDepartureSchema>;
export type UpdateGroupDepartureInput = TypeOf<typeof updateGroupDepartureSchema>;

export type ReadGroupDepartureInput = TypeOf<typeof getGroupDepartureSchema>;
export type DeleteGroupDepartureInput = TypeOf<typeof deleteGroupDepartureSchema>;
