import { start } from "repl";
import { z } from "zod";
const createRentalValidation = z.object({
  userId: z.string().optional(),
  bikeId: z.string(),
  startTime: z.string(),
  returnTime: z.string().optional(),
  totalCost: z.number().optional(),
  isReturned: z.boolean().optional(),
});
const updateRentalValidation = z.object({
  startTime: z.string().optional(),
  returnTime: z.string().optional(),
  totalCost: z.number().optional(),
  isReturned: z.boolean().optional(),
});
export const rentalValidation = {
  createRentalValidation,
  updateRentalValidation,
};
