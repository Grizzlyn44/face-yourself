import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  lastUpdatedAt: {
    type: Date,
    required: true
  },
  deletedAt: {
    type: Date
  }
});

export default mongoose.model("User", UserSchema);