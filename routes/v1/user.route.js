const express = require('express');
const { getAllUsers, getARandomUser, saveAUser, updateAUser, updateMultipleUsers, deleteAUser } = require('../../controller/user.controller');
const router = express.Router();

/**
 * @getAPI to load all users from json file
 */
router.get('/all', getAllUsers);

/**
 * @getAPI to load a single random user from json file
 */
router.get('/random', getARandomUser);

/**
 * @postAPI to save a new user 
 * @steps to post a user, we have to create a json data in request's body with all the properties including the "id" also.
 * @example {"id": 12, "name": "something", "gender": "male", contact: "23879382", "address": "something", "photoUrl": "http//:ldsjfdsflsa"}
 * @rule the "id" must be a number
 */
router.post('/save', saveAUser);

/**
 * @patchAPI to update a particular user 
 * @steps we have to send the updating user's information including the "id" in request's body 
 * @example {"id": 3, address: "A new address"}  // it only will change the address and the rest of the property will be the same 
 * @rule the "id" must be a number
 */
router.patch('/update', updateAUser);

/** 
* @patchAPI to update multiple users 
* @steps we have to send the updating user's information including the "id" in request's body inside an array.
* @example 
[
    {"id": 3, address: "A new address"},
    {"id": 1, name: "new user"},
    {"id": 9, contact: "98713 423", gender: "female"}  
]
    // it only will change these particular given properties values of those particular user data and the rest of the property will be the same.
* @rule the "id" must be a number
*/
router.patch('/bulk-update', updateMultipleUsers);

/**
 * @deleteAPI to delete an specific user through the user "id"
 * @step the "id" will contain in the request's body
 * @example {"id": 4}
 */
router.delete('/delete', deleteAUser);

module.exports = router;