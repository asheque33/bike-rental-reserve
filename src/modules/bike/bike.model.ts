import { model, Schema } from "mongoose";
import { IBike } from "./bike.interface";

const bikeSchema = new Schema<IBike>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    pricePerHour: { type: Number, required: true },
    cc: { type: Number, required: true },
    year: { type: Number, required: true },
    model: { type: String, unique: true, required: true },
    brand: { type: String, required: true },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        // ret.id = ret._id;
        // delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

bikeSchema.pre("find", function (next) {
  this.find({ isAvailable: { $eq: true } });

  next();
});
export const Bike = model<IBike>("Bike", bikeSchema);
