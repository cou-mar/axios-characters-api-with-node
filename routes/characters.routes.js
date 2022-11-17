const router = require("express").Router();
const axios = require("axios");

/* GET home page */
router.get("/", (req, res, next) => {
  axios
    .get("https://ih-crud-api.herokuapp.com/characters")
    .then((responseFromAPI) => {
      // console.log(responseFromAPI)
      res.render("characters/list-characters.hbs", {
        characters: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

router.get("/create-new", (req, res, next) => {
  console.log("CREATING");
  res.render("characters/create-character.hbs");
});

router.post("/create", (req, res, next) => {
  axios
    .post("https://ih-crud-api.herokuapp.com/characters/", {
      name: req.body.name || "?",
      occupation: req.body.occupation || "?",
      weapon: req.body.weapon || "?",
    //   isAcartoon: req.body.isAcartoon,
    })
    .then((createdCharacter) => {
      console.log(createdCharacter.data, "CHARACTER CREATED");
      res.redirect(`/characters/${createdCharacter.data.id}`);
    })
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res, next) => {
  axios
    .get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((responseFromAPI) => {
      // console.log("details: ", responseFromAPI.data)
      res.render("characters/details-character.hbs", {
        character: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

router.get("/:id/edit",
  (req, res, next) => {
    console.log("EDITING!!!")

    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((results) => {
        res.render("characters/edit-character.hbs", {character: results.data});

    })
    .catch((err) => {
        console.log("There has been an error: ", err)
    })
  });
//update character
router.post("/:id/update",
  (req, res, next) => {
    axios
      .put(
        `https://ih-crud-api.herokuapp.com/characters/${req.params.id}`,
        req.body
      )
      .then((results) => {
        res.redirect(`/characters/${results.data.id}`);
      })
      .catch((err) => console.log(err));
  });

//delete character
router.post('/:id/delete', (req, res, next) => {
    axios.delete(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(() => {
        res.redirect('/characters')
    })
})

module.exports = router;

// https://ih-crud-api.herokuapp.com/characters
