import { Router } from "express";
const router = Router();

// import all controllers

import * as controller from '../controller/appController.js'


//********************POST Method********************


// register user
router.route('/register').post(controller.register);

// send the email
// router.route('/registerMail').post();


// authenticate user
router.route('/authenticate').post((req, res)=> res.end());


// login in app
router.route('/login').post(controller.verifyUser , controller.login);


//********************GET Method********************


// user with username
router.route('/user/:username').get(controller.getUser);

// generate random OTP
router.route('/generateOTP').get(controller.generateOTP);

// verify generated OTP
router.route('/verifyOTP').get(controller.verifyOTP);

// reset all the variables
router.route('/createResetSession').get(controller.createResetSession);



//********************PUT Method********************

// use to update the user profile
router.route('/updateuser').put(controller.updateUser);

// use to reset password
router.route('/resetPassword').put(controller.resetPassword);



export default router;