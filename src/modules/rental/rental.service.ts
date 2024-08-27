import { startSession } from "mongoose";
import { IBooking } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { Bike } from "../bike/bike.model";

const createRentalIntoDB = async (rentalPayload: IBooking) => {
  const session = await startSession();
  try {
    session.startTransaction();
    // const {bikeId,startTime}=payload
    await Bike.findByIdAndUpdate(
      { _id: rentalPayload.bikeId }, //! must _id dite hobe jeta bike doc er _id er sathe match korbe

      { $set: { isAvailable: false } },
      { runValidators: true, new: true, session }
    );
    // Add returnTime: null to the payload
    // const rentalPayload = {
    //   isAvailable: payload.isAvailable,
    //   ...payload,
    // returnTime: null,
    // };
    // create rental logic here
    const rental = await Booking.create([rentalPayload], { session });
    if (!rental) {
      throw new Error("Failed to create rental.");
    }
    await session.commitTransaction();
    return rental[0]; // rental[0]=> Since create returns an array
  } catch (error) {
    await session.abortTransaction();
    throw new Error("Boths are failed simultaneously.");
  } finally {
    session.endSession();
  }
};
const getAllRentalsFromDB = async () => {
  const rentals = await Booking.find({});
  return rentals;
};
const updateRentalIntoDB = async (_id: string /* rentalPayload:IBooking */) => {
  const existingRental = await Booking.findById(_id);
  const { bikeId, startTime } = existingRental as IBooking;

  if (!startTime) {
    throw new Error("Rental including start time is missing.");
  }
  const returnTime = new Date();
  const rentalDuration = Math.ceil(
    (returnTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)
  );
  const bikeData = await Bike.findById(bikeId);
  if (!bikeData) {
    throw new Error("Associated bike not found.");
  }
  const totalCost = bikeData.pricePerHour * rentalDuration;
  console.log("total cost: " + totalCost);
  // ! Update rental in the database

  const updatedRental = await Booking.findByIdAndUpdate(
    _id,
    {
      isReturned: true,
      totalCost: totalCost,
      returnTime: returnTime,
    },
    {
      runValidators: true,
      new: true,
    }
  ).select("-__v");
  if (!updatedRental) {
    throw new Error("Failed to update rental.");
  }
  await Bike.findOneAndUpdate(
    { _id: bikeId },
    { $set: { isAvailable: true } },
    {
      runValidators: true,
      new: true,
      select: "-__v",
    }
  );
  return updatedRental;
};
export const rentalServices = {
  createRentalIntoDB,
  getAllRentalsFromDB,
  updateRentalIntoDB,
};
