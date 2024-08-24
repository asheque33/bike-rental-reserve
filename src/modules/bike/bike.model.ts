import { model, Schema } from "mongoose";
import { IBike } from "./bike.interface";

const bikeSchema = new Schema<IBike>(
  {
    name: { type: "string", required: true },
    description: { type: "string", required: true },
    isAvailable: { type: "boolean", default: true },
    pricePerHour: { type: "number", required: true },
    cc: { type: "number", required: true },
    year: { type: "number", required: true },
    model: { type: "string", required: true },
    brand: { type: "string", required: true },
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
