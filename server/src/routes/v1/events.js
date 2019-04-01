const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/events');
// const { authorize } = require('../../middlewares/auth');
const {
  listEvents,
} = require('../../validations/events');

const router = express.Router();

router
  .route('/')
  /**
   * @api {get} v1/events List Events
   * @apiDescription Get a list of events
   * @apiVersion 1.0.0
   * @apiName ListEvents
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Events per page
   *
   * @apiSuccess {Object[]} users List of events.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   */
  .get(validate(listEvents), controller.list)

module.exports = router;
