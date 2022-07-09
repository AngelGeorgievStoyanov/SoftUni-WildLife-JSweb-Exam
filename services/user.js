const User = require('../models/User')


async function createUser(firstName, lastName, email, hashedPassword) {


    const user = new User({
        firstName,
        lastName,
        email,
        hashedPassword
    })

    console.log(user,'-------------')

    await user.save();
    return user;
}


module.exports = {
    createUser,

}