import { z } from "zod";
const createBikeValidations = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be string",
  }),
  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Description must be string",
  }),
  isAvailable: z.boolean().optional().default(true),
  pricePerHour: z.number({
    required_error: "pricePerHour is required",
    invalid_type_error: "pricePerHour must be number",
  }),
  cc: z.number({
    required_error: "cc is required",
    invalid_type_error: "cc must be number",
  }),
  year: z.number({
    required_error: "year is required",
    invalid_type_error: "year must be number",
  }),
  model: z.string({
    required_error: "model is required",
    invalid_type_error: "model must be string",
  }),
  brand: z.string({
    required_error: "brand is required",
    invalid_type_error: "brand must be string",
  }),
});
const updateBikeValidations = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  pricePerHour: z.number().optional(),
  cc: z.number().optional(),
  year: z.number().optional(),
  model: z.string().optional(),
  brand: z.string().optional(),
});
export const bikeValidations = {
  createBikeValidations,
  updateBikeValidations,
};
