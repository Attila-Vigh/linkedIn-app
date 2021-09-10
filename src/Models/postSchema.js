import mongoose from "mongoose";

const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: "post.png",
    },

    comments: 
    [
        { type: Schema.Types.ObjectId, 
            ref: "Comment" }

    ],
  },
  {
    timestamps: true,
  }
);

export default model("Post", postSchema);
