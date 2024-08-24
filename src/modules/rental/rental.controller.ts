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
export const rentalController = {
  createRental,
};
