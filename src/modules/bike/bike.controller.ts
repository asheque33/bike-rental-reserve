import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bikeServices } from "./bike.service";

const createBike = catchAsync(async (req, res) => {
  const result = await bikeServices.createBikeIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Bike added successfully",
    data: result,
  });
});
export const bikeController = {
  createBike,
};
