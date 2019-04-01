const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/users');
const {
    authorize
} = require('../../middlewares/auth');
const {
    createUser,
    loginUser,
} = require('../../validations/users');

const router = express.Router();

router
    .route('/')
    /**
     * @api {post} v1/user Create User
     * @apiDescription Create a new user
     * @apiVersion 1.0.0
     * @apiName CreateUser
     *
     * @apiHeader {String} Authorization   User's access token
     *
     * @apiParam  {String{1..128}}     username  User's username
     * @apiParam  {String{6..128}}     password  User's password
     * @apiParam  {String{..128}}      [name]    User's name
     *
     * @apiSuccess (Created 201) {String}  message  Record status
     *
     */
    .post(validate(createUser), controller.create);

router
    .route('/login')
    /**
     * @api {post} v1/user/login Login User
     * @apiDescription Authenticate user in system
     * @apiVersion 1.0.0
     * @apiName LoginUser
     * @apiGroup User
     *
     * @apiHeader {String} Authorization   User's access token
     *
     * @apiParam  {String{1..128}}     username  User's username
     * @apiParam  {String{6..128}}     password  User's password
     * @apiParam  {String{..128}}      [name]    User's name
     *
     * @apiSuccess (Created 200) {String}  id         User's id
     * @apiSuccess (Created 200) {String}  name       User's name
     * @apiSuccess (Created 200) {String}  username   User's username
     * @apiSuccess (Created 200) {String}  token      User's token
     * @apiSuccess (Created 200) {Date}    createdAt  Timestamp
     *
     */
    .post(validate(loginUser), controller.login);


router
    .route('/profile')
    /**
     * @api {get} v1/user/profile User Profile
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
