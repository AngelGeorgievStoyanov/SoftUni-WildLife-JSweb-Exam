const { Router } = require('express');



const router = Router();



router.get('/', async (req, res) => {

  

    res.render('index')
})


router.get('/create', async (req, res) => {

  

    res.render('create',{title:'Create post'})
})


module.exports = router;