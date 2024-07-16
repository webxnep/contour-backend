import { object, number, string, TypeOf, any, optional, boolean, date } from "zod";

const payload = {
  body: object({
    fullName: string({
      required_error: "fullName is required",
    }),

    email: string({
      required_error: "email is required",
    }),

    pEmail: string({
      required_error: "participant email is required",
    }),
    pName: string({
      required_error: "participant email is required",
    }),
    pCode: string({
      required_error: "participant phone code  is required",
    }),

    pPhone: string({
      required_error: "Participant phone no  is required",
    }),

    pNationality: string({
      required_error: "nationality is required",
    }),

    pPassportNo: string({
      required_error: "passport no is required",
    }),
    pDob: string({
      required_error: "Date of birth is required",
    }),

    departureDate: string({
      required_error: "Departure date is required",
    }),

    noOfTravelers: number({
      required_error: "No of travelers is required",
    }),

    price: number({
      required_error: "Price is required",
    }),

    tripDuration: number({
      required_error: "Trip duration is required",
    }),

    notes: string().optional(),


    isSeen: boolean().optional(),

    
    status:string().optional(),

    paymentStatus:string().optional(),

    expedition: string({
      required_error: "Expedition is required",
    }),
  }),
};

const params = {
  params: object({
    bookingId: string({
      required_error: "bookingId is required",
    }),
  }),
};

export const createBookingSchema = object({
  ...payload,
});

export const updateBookingSchema = object({
  ...payload,
  ...params,
});

export const deleteBookingSchema = object({
  ...params,
});

export const getBookingSchema = object({
  ...params,
});

export type CreateBookingInput = TypeOf<typeof createBookingSchema>;
export type UpdateBookingInput = TypeOf<typeof updateBookingSchema>;
export type ReadBookingInput = TypeOf<typeof getBookingSchema>;
export type DeleteBookingInput = TypeOf<typeof deleteBookingSchema>;
