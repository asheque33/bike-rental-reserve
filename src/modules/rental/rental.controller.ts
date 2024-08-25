import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { rentalServices } from "./rental.service";

const createRental = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const rental = await rentalServices.createRentalIntoDB({
    userId,
    ...req.body,
  });
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Rental added successfully",
    data: rental,
    // data: { returnTime: null, ...rental },
  });
});
const getAllRentals = catchAsync(async (req, res) => {
  const rentals = await rentalServices.getAllRentalsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Rentals retrieved successfully",
    data: rentals,
  });
});
export const rentalController = {
  createRental,
  getAllRentals,
};
