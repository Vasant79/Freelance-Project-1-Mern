import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
const Team = mongoose.model("Team", teamSchema);

export default Team;
