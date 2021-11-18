const router = require("express").Router();
const Place = require("../models/Place.model");
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// Places
router.get("/places", (req, res, next) => {
  Place.find()
    .then((allPlaces) => {
      res.render("place/places", { allPlaces });
    })
    .catch((err) => console.log(err));
});

//Create place

router.get("/places/create", (req, res) => {
  Place.find().then((places) => {
    res.render("place/new-place", { places });
  });
});

router.post("/places/create", (req, res) => {
  let location = {
    type: "Point",
    coordinates: [req.body.lng, req.body.lat],
  };
  const { name, type, description } = req.body;
  //5. Realizar las operaciones en la BBDD o la lógica de negocio
  Place.create({ name, type, description, location })
    //6. Decidir que vista vamos a renderizar
    .then((place) => {
      res.redirect("/places");
    })
    .catch((err) => {
      res.render("place/new-place");
      console.log(err);
    });
});

router.get("/places/:id", (req, res) => {
  const placeId = req.params.id;
  Place.findById(placeId).then((place) => {
    res.render("place/place-details", { placeDetails: place });
  });
});

//Delete place

router.post("/places/:id/delete", (req, res) => {
  const placeId = req.params.id;
  Place.findByIdAndDelete(placeId).then((place) => {
    res.redirect("/places");
  });
});

//Edit place

router.get("/places/:id/edit", (req, res) => {
  const { id } = req.params;
  Place.findById(id).then((place) => {
    res.render("place/edit-place", { place });
  });
});

router.post("/places/:id", (req, res) => {
  const { id } = req.params;
  Place.findByIdAndUpdate(id, req.body).then(() => {
    res.redirect("/places");
  });
});

//Map

router.get("/api", (req, res, next) => {
  Place.find()
    .then((allPlaces) => {
      res.status(200).json({ places: allPlaces });
    })
    .catch((err) => console.log(err));
});

router.get("/api/:id", (req, res, next) => {
  let placeId = req.params.id;
  Place.findById(placeId)
    .then((onePlaceFromDB) => res.status(200).json({ place: onePlaceFromDB }))
    .catch((err) => next(err));
});

module.exports = router;
