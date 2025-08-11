const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const placesControllers = require("../controllers/places-controller");

router.get("/:placeId", placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ max: 5 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);

router.patch(
  "/:placeId",
  [check("title").not().isEmpty(), check("description").isLength({ max: 5 })],
  placesControllers.updatePlace
);

router.delete("/:placeId", placesControllers.deletePlace);

module.exports = router;
