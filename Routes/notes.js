const express = require('express')
const {getPosts,createPost,postsByUser,postById,updatePost,deletePost, singlePost} = require('../Controllers/notes')
const { requireSignin } = require('../Controllers/auth')
const { userById } = require('../Controllers/user')

const router = express.Router();

router.get('/posts', getPosts);
router.post('/post/new/:userId',requireSignin, createPost);
router.get('/posts/by/:userId', requireSignin, postsByUser);
router.put('/post/:postId', requireSignin, updatePost);
router.get('/post/:postId', singlePost);
router.delete('/post/:postId', requireSignin, deletePost);
router.param("userId", userById);
router.param("postId", postById);


module.exports = router;