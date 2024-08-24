import { model, Schema } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    bikeId: { type: Schema.Types.ObjectId, required: true, ref: "Bike" },
    startTime: { type: Date, required: true },
    returnTime: { type: Date },
    totalCost: { type: Number, default: 0, required: true },
    isReturned: { type: Boolean, default: false },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);
export const Booking = model<IBooking>("Booking", bookingSchema);
