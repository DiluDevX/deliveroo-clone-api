import mongoose from "mongoose";

export interface ICategory {
  createdAt: Date;
  updatedAt: Date;
  _id: mongoose.Types.ObjectId;
  name: string;
  restaurant: mongoose.Types.ObjectId;
}

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    restaurant: {
      required: true,
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Restaurant",
    },
  },
  { timestamps: true },
);

categorySchema.virtual("dishes", {
  ref: "Dish",
  localField: "_id",
  foreignField: "category",
});

categorySchema.set("toJSON", { virtuals: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;
