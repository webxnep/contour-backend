import { object, string, TypeOf, any } from "zod";

const payload = {
    body: object({
        title: string({
            required_error: "title is required",
        }),

        description: string({
            required_error: "description is required",
        }),

        expedition: string({
            required_error: "expedition is required",
        }),
    }),
};

const params = {
    params: object({
        tripAttractionId: string({
            required_error: "tripAttractionId is required",
        }),
    }),
};

export const createTripAttractionSchema = object({
    ...payload,
});

export const updateTripAttractionSchema = object({
    ...payload,
    ...params,
});

export const deleteTripAttractionSchema = object({
    ...params,
});

export const getTripAttractionSchema = object({
    ...params,
});

export type CreateTripAttractionInput = TypeOf<typeof createTripAttractionSchema>;
export type UpdateTripAttractionInput = TypeOf<typeof updateTripAttractionSchema>;
export type ReadTripAttractionInput = TypeOf<typeof getTripAttractionSchema>;
export type DeleteTripAttractionInput = TypeOf<typeof deleteTripAttractionSchema>;
