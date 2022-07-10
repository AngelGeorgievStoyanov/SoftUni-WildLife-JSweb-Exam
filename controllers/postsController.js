const { Router } = require('express');



const router = Router();



router.get('/', async (req, res) => {



    res.render('index')
})


router.get('/create', async (req, res) => {



    res.render('create', { title: 'Create post' })
})


router.post('/create', async (req, res) => {

    const post = {

        title:req.body.title,
        keyword:req.body.keyword,
        location:req.body.location,
        date:req.body.date,
        imageUrl:req.body.imageUrl,
        description:req.body.description,

    }

    console.log(post,'--post--')


    try {
        await req.storage.create(post)
        res.redirect('/')
    } catch (err) {
        let arr=err.message.split(', ')
        const ctx={
            title:'Create Post',
            error:arr,
            post
        }
        res.render('create',ctx)
    }
})


module.exports = router;