import { IBike } from "./bike.interface";
import { Bike } from "./bike.model";

const createBikeIntoDB = async (payload: IBike) => {
  const result = await Bike.create(payload);
  return result;
};
export const bikeServices = {
  createBikeIntoDB,
};
