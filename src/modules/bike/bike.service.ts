import { IBike } from "./bike.interface";
import { Bike } from "./bike.model";

const createBikeIntoDB = async (payload: IBike) => {
  const result = await Bike.create(payload);
  return result;
};
const getBikesFromDB = async () => {
  const bikes = await Bike.find({}).select("-__v");
  return bikes;
};
const updateBikeIntoDB = async (_id: string, payload: IBike) => {
  const updatedDoc = {
    pricePerHour: payload.pricePerHour,
  };
  const result = await Bike.findByIdAndUpdate(_id, updatedDoc, {
    new: true,
    runValidators: true,
  }).select("-__v");
  return result;
};
const deleteBike = async (_id: string, payload: IBike) => {
  const result = await Bike.findByIdAndUpdate(
    _id,
    { isAvailable: false, ...payload },
    { runValidators: true, new: true }
  );
  return result;
};
export const bikeServices = {
  createBikeIntoDB,
  getBikesFromDB,
  updateBikeIntoDB,
  deleteBike,
};
