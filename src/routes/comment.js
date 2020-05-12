const Comment = require('../Model/Comment');
const router = require("express").Router({mergeParams: true});
const {comment_create, post_new_comment,edit_comment,update_comment,destroy_comment} = require('../controller/commentController');
const {isLoggedin } = require("../auth/middleware");

// create new comment
router.get('/new', isLoggedin,comment_create)


// post new comment
router.post("/", isLoggedin,post_new_comment)


//  edit comment
router.get('/:comment_id/edit',isLoggedin, edit_comment)


// update comment
router.put('/:comment_id', update_comment)


// delete comment
router.delete('/:comment_id', destroy_comment)

module.exports = router;