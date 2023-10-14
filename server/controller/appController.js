

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
   res.json('register route'); 
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




