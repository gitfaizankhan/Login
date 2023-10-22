import UserModel from "../model/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from "../config.js";




// Middleware for verify user
export async function verifyUser(req, res, next){
    try{
        const username = req.method === "GET" ? req.query.username : req.body.username;
        // check the user existance
        let exist = await UserModel.findOne({ username });
        if(!exist) return res.status(404).send({ error: "Can't find User!"});
        next();
    }catch(error) {
        return res.status(404).send({error : "Authentication Error"});
    }
} 



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
}


/** POST: http://localhost:8080/api/login
 * @param :{
    "username":"example123",
    "password":"admin123"
}
 */
export async function login(req, res) {
    const {username, password} = req.body;
    try{
        UserModel.findOne({username})
            .then( user =>{
                bcrypt.compare(password, user.password)
                    .then( passwordCheck =>{
                        if(!passwordCheck) return res.status(400).send({ error: "Don't have Password"});
                        
                        // create jwt token
                        const token = jwt.sign({
                                userId: user._id,
                                username: user.username 
                        }, ENV.JWT_SECRET, {expiresIn:"24h"});
                        return res.status(200).send({
                            msg:"Login Successful...!",
                            username: user.username,
                            token
                        });
                    })
                    .catch( error =>{
                        return res.status(400).send({ error: "Password does not Match"});
                    })
            })
            .catch( error =>{
                return res.status(406).send({error:"Username not found"});
            })
    }catch(error){
        return res.status(500).send({error});
    }
}

/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {
    const { username } = req.params;

    try {
        if (!username) return res.status(501).send({ error: "Invalid Username" });

        const user = await UserModel.findOne({ username });

        if (!user) return res.status(501).send({ error: "Couldn't find the User" });
        const { password, ...rest} = Object.assign({}, user.toJSON());
        return res.status(201).send({ rest });
    } catch (error) {
        return res.status(406).send({ error: error.message });
    }
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




