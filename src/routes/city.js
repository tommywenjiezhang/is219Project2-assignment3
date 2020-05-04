const router = require("express").Router()
const cityController = require('../controller/cityController')


// index route
router.get('/',cityController.index);

// render create new route
router.get("/new", cityController.new)

// create post route
router.post("/", cityController.new_post)

router.get("/:id", cityController.show)
// edit page
router.get("/edit/:id", cityController.edit)

router.put("/edit/:id", cityController.edit_put)

router.delete("/:id", cityController.delete)

router.get("/api/key",function(req,res){
    res.send({GOOGLE_API_KEY:process.env.GOOGLE_API_KEY,UPSPLASH_API_KEY:process.env.UPSPLASH_API_KEY})
})

module.exports = router;