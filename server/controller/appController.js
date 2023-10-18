import { rejects } from "assert";
import UserModel from "../model/User.model.js";
import bcrypt from 'bcrypt';


/** POST: http://localhost:8080/api/register
 * @param :{
    "username":"example123",
    "password":"admin123",
    "email":"exapmle@gmail.com",
    "firstName":"faiz",
    "lastName":"khan",
    "mobile":"8989898989",
    "address":"123 new delhi",
    "profile":""
}
 */
export async function register(req, res){
    try{
        const { username, password, profile, email } = req.body;
            // check the existing user
            // const existUsername = new Promise((resolve, reject)=>{
            //     UserModel.findOne({username}, function (err, user){
            //         if(err) reject(new Error(err));
            //         if(user) reject({ error:"Please use unique username"});
            //         resolve();
            //     })
            // })
        // Check if the user already exists
        // const checkUserExists = async (username) => {
        //     try {
        //         const user = await UserModel.findOne({ username });
        //         if (user) {
        //             throw { error: "Please use a unique username" };
        //         }
        //     } catch (error) {
        //         throw new Error(error);
        //     }
        // };

        // // Usage
        // try {
        //     await checkUserExists(username);
        //     // Username is unique, continue with registration
        // } catch (error) {
        //     console.error(error);
        // }

        const checkUserExists = (username) => {
            return new Promise((resolve, reject) => {
                UserModel.findOne({ username }, (err, user) => {
                    if (err) {
                        reject(new Error(err));
                    } else if (user) {
                        reject({ error: "Please use a unique username" });
                    } else {
                        resolve();
                    }
                });
            });
        };

        const existEmail = (email) =>{
            return new Promise((resolve, reject) =>{
                UserModel.findOne({ email}, (err, user) =>{
                    if(err) {
                        reject(new Error(err));
                    } else if(user) {
                        reject({ error:"Please use unique email "});
                    }else {
                        resolve()
                    }
                })
            })
        }
        Promise.all([checkUserExists, existEmail])
            .then(() =>{
                if (password) {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {

                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email
                            });

                            // return save result as a response
                            user.save()
                                .then(result => res.status(201).send({ msg: "User Register Successfully" }))
                                .catch(error => res.status(500).send({ error}))

                        }).catch(error => {
                            return res.status(500).send({
                                error: "Enable to hashed password"
                            })
                        })
                }
            })
    } catch (error) {
        return res.status(500).send(error);
    }
//    try{
//     const {username, password, profile, email} = req.body;
    
//     // check the existing user
//     // const existUsername = new Promise((resolve, reject)=>{
//     //     UserModel.findOne({username}, function (err, user){
//     //         if(err) reject(new Error(err));
//     //         if(user) reject({ error:"Please use unique username"});
//     //         resolve();
//     //     })
//     // })

//     // check the existing email
//     //    const existEmail = new Promise((resolve, reject) => {
//     //        UserModel.findOne({ email }, function (err, email) {
//     //            if (err) reject(new Error(err));
//     //            if (email) reject({ error: "Please use unique email " });
//     //            resolve();
//     //        })
//     //    })
       
//     //    Promise.all([existUsername, existEmail])
//     //     .then({

//     //     }).catch(error=>{
//     //         return res.status(500).send({
//     //             error: "Enable to hashed password"
//     //         })
//     //     })
    
//    }catch(error) {
//     return res.status(500).send(error);
//    } 
}


/** POST: http://localhost:8080/api/login
 * @param :{
    "username":"example123",
    "password":"admin123"
}
 */
export async function login(req, res) {
    res.json('login route');
}

/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {
    res.json('getUser route');
}

/** PUT: http://localhost:8080/api/updateuser
 * @param:{
    "id":"<userid>"
 }
 * @param :{
    "firstName":"",
    "address":"",
    "profile":""
}
 */
export async function updateUser(req, res) {
    res.json('updateUser route');
}

/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req, res) {
    res.json('generateOTP route');
}


/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res) {
    res.json('verifyOTP route');
}

// successfully redirect usser when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res) {
    res.json('createResetSession route');
}


// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
    res.json('resetPassword route');
}




