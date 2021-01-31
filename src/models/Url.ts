import mongoose from "mongoose";
import shortId from "shortid";

interface URLAttribute extends mongoose.Document {
  originalURL: string;
  shortenedURL: string;
  clicks: string;
}

const URLSchema = new mongoose.Schema({
  originalURL: {
    type: String,
    required: true,
    unique: true,
  },
  shortenedURL: {
    type: String,
    required: true,
    default: shortId.generate(),
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model<URLAttribute>("url", URLSchema);
