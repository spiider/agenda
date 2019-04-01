const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/user.controller');
const {
    authorize
} = require('../../middlewares/auth');
const {
    createUser,
} = require('../../validations/users');

const router = express.Router();

router
    .route('/')
    /**
     * @api {post} v1/users Create User
     * @apiDescription Create a new user
     * @apiVersion 1.0.0
     * @apiName CreateUser
     * @apiGroup User
     * @apiPermission admin
     *
     * @apiHeader {String} Authorization   User's access token
     *
     * @apiParam  {String{1..128}}     username  User's username
     * @apiParam  {String{6..128}}     password  User's password
     * @apiParam  {String{..128}}      [name]    User's name
     *
     * @apiSuccess (Created 201) {String}  id         User's id
     * @apiSuccess (Created 201) {String}  name       User's name
     * @apiSuccess (Created 201) {String}  username   User's username
     * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
     *
     * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
     * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
     */
    .post(authorize(), validate(createUser), controller.create);


router
    .route('/profile')
    /**
     * @api {get} v1/users/profile User Profile
     * @apiDescription Get logged in user profile information
     * @apiVersion 1.0.0
     * @apiName UserProfile
     * @apiGroup User
     * @apiPermission user
     *
     * @apiHeader {String} Authorization   User's access token
     *
     * @apiSuccess {String}  id         User's id
     * @apiSuccess {String}  name       User's name
     * @apiSuccess {String}  username   User's username
     * @apiSuccess {Date}    createdAt  Timestamp
     *
     * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
     */
    .get(authorize(), controller.loggedIn);


module.exports = router;
