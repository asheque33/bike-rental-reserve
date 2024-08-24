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
const getBikes = catchAsync(async (req, res) => {
  const bikes = await bikeServices.getBikesFromDB();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Bikes retrieved successfully",
    data: bikes,
  });
});
const updateBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bikeServices.updateBikeIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Bike updated successfully",
    data: result,
  });
});
const deleteBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bikeServices.deleteBike(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Bike deleted successfully",
    data: result,
  });
});
export const bikeController = {
  createBike,
  getBikes,
  updateBike,
  deleteBike,
};
