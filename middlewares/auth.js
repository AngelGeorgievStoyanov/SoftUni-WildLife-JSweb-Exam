const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/user')
const { COOKIE_NAME, TOKEN_SECRET } = require('../config');


module.exports = () => (req, res, next) => {


    req.auth = {
        register

    };

    if (readToken(req)) {
        next();
    }


    async function register({ firstName, lastName, email, password, repass }) {


        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userService.createUser(firstName, lastName, email, hashedPassword);
        req.user = createToken(user);
    }

    function createToken(user) {
        const userViewModel = { _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email };

        const token = jwt.sign(userViewModel, TOKEN_SECRET);
        res.cookie(COOKIE_NAME, token, { httpOnly: true });

        return userViewModel;
    };


    function readToken(req) {
        const token = req.cookies[COOKIE_NAME];
        if (token) {
            try {
                const userData = jwt.verify(token, TOKEN_SECRET);
                req.user = userData;
                res.locals.user = userData;
                console.log('Known user', userData.username);
            } catch (err) {
                res.clearCookie(COOKIE_NAME);
                res.redirect('/auth/login');
                return false;
            }
        }
        return true;
    }

}