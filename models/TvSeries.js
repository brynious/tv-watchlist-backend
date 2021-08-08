const mongoose = require("mongoose");

const TvSeriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tmdb_id: {
    type: Number,
    required: true,
  },
  overview: {
    type: String,
  },
  first_air_date: {
    type: String,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
  backdrop_path: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
  watch_status: {
    type: String,
    required: true,
  },
});

module.exports = TvSeries = mongoose.model("series", TvSeriesSchema);
