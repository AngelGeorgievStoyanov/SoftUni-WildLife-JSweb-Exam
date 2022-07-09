const router = require('express').Router();


router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' })
})


router.post('/register', async (req, res) => {
    try {
   
        await req.auth.register(req.body)
     
        res.redirect('/posts');
    } catch (err) {
        const ctx = {
            title: 'Register',
            error: err.message,
            data: {
                email: req.body.email,
            }
        }
        res.render('register', ctx);
    }
});

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' })
})


module.exports = router;