import catchAsync from "../../utils/catchAsync";
import { noDataFound } from "../../utils/noDataFound";
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
  });
});
const getAllRentals = catchAsync(async (req, res) => {
  const rentals = await rentalServices.getAllRentalsFromDB();
  if (noDataFound(res, rentals)) {
    return;
  }
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Rentals retrieved successfully",
    data: rentals,
  });
});
const updateRental = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const rental = await rentalServices.updateRentalIntoDB(userId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Rental updated successfully",
    data: rental,
  });
});
export const rentalController = {
  createRental,
  getAllRentals,
  updateRental,
};
