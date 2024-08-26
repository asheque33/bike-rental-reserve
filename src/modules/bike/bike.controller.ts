import { noDataFound } from "../../utils/noDataFound";
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
  // ! no data found function called here
  if (noDataFound(res, bikes)) {
    return;
  }
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Bikes retrieved successfully",
    data: bikes,
  });
  //  else {
  //   sendResponse(res, {
  //     success: false,
  //     statusCode: 404,
  //     message: "No Bikes found",
  //     data: [],
  //   });
  // }
});
const updateBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  // const { pricePerHour } = req.body;
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
