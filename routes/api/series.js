const express = require("express");
const router = express.Router();

// Load TvSeries model
const TvSeries = require("../../models/TvSeries");

// @route GET api/series/test
// @description tests series route
// @access Public
// router.get("/test", (req, res) => res.send("tv series route testing!"));

// @route GET api/series/status=:status
// @description Get all series that match status
// @access Public
router.get("/status=:status", (req, res) => {
  TvSeries.find({ watch_status: `${req.params.status}` })
    .then(series => res.json(series))
    .catch(err =>
      res
        .status(404)
        .json({ noseriesfound: `No Series of status ${status} found` })
    );
});

// @route GET api/series
// @description Get all series
// @access Public
router.get("/", (req, res) => {
  TvSeries.find()
    .then(series => res.json(series))
    .catch(err => res.status(404).json({ noseriesfound: "No Series found" }));
});

// @route GET api/series/:id
// @description Get single series by id
// @access Public
// router.get("/:id", (req, res) => {
//   TvSeries.findById(req.params.id)
//     .then(series => res.json(series))
//     .catch(err => res.status(404).json({ noseriesfound: "No Series found" }));
// });

// @route GET api/series
// @description add/save series
// @access Public
router.post("/", (req, res) => {
  const query = { tmdb_id: req.body.tmdb_id };
  const update = req.body;
  const options = { upsert: true, new: true };

  TvSeries.findOneAndUpdate(query, update, options)
    .then(series => res.json({ msg: "TV series add successfully" }))
    .catch(err => {
      res.status(400).json({ error: "Unable to add series to watchlist" });
    });

  // TvSeries.create(req.body)
  //   .then(series => res.json({ msg: "TV series added successfully" }))
  //   .catch(err =>
  //     res.status(400).json({ error: "Unable to add this TV series" })
  //   );
});

// @route GET api/series/:id
// @description Update series
// @access Public
// router.put("/:id", (req, res) => {
//   TvSeries.findByIdAndUpdate(req.params.id, req.body)
//     .then(series => res.json({ msg: "Updated successfully" }))
//     .catch(err =>
//       res.status(400).json({ error: "Unable to update the Database" })
//     );
// });

// @route GET api/series/:id
// @description Delete series by id
// @access Public
router.delete("/:id", (req, res) => {
  TvSeries.deleteMany({ tmdb_id: req.params.id })
    .then(series => res.json({ mgs: "Series entry deleted successfully" }))
    .catch(err => res.status(404).json({ error: "No such TV series" }));
});

module.exports = router;
