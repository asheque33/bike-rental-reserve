import { startSession } from "mongoose";
import { IBooking } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { Bike } from "../bike/bike.model";

const createRentalIntoDB = async (payload: IBooking) => {
  const session = await startSession();
  try {
    session.startTransaction();
    // const {bikeId,startTime}=payload
    await Bike.findOneAndUpdate(
      { _id: payload.bikeId }, //! must _id dite hobe jeta bike doc er _id er sathe match korbe

      { $set: { isAvailable: false } },
      { runValidators: true, new: true, session }
    );
    // Add returnTime: null to the payload
    const rentalPayload = {
      ...payload,
      returnTime: null,
    };
    // create rental logic here
    const rental = await Booking.create([rentalPayload], { session });
    if (!rental) {
      throw new Error("Failed to create rental.");
    }
    await session.commitTransaction();
    return rental; // rental[0]=> Since create returns an array
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
export const rentalServices = {
  createRentalIntoDB,
  getAllRentalsFromDB,
};
