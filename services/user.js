const User = require('../models/User')


async function createUser(firstName, lastName, email, hashedPassword) {


    const user = new User({
        firstName,
        lastName,
        email,
        hashedPassword
    })

  

    await user.save();
    return user;
}

async function getUserByEmail(email) {
    return await User.findOne({ "email":`${email}` });
   
}
module.exports = {
    createUser,
    getUserByEmail

}