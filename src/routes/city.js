const router = require("express").Router();
const cityController = require('../controller/cityController');
const {isLoggedin, checkOwnship } = require("../auth/middleware");

// index route
router.get('/',cityController.index);
router.get('/api',cityController.api);
// render create new route
router.get("/new", isLoggedin, cityController.new);

// create post route
router.post("/",isLoggedin, cityController.new_post);

router.get("/:id",cityController.show);
// edit page
router.get("/edit/:id", checkOwnship, cityController.edit);

router.put("/edit/:id", checkOwnship,cityController.edit_put);

router.delete("/:id", cityController.delete);


module.exports = router;