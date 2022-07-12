const { Router } = require('express');

const { preloadPost } = require('../middlewares/preload')

const { isOwner } = require('../middlewares/guards')

const router = Router();



router.get('/', async (req, res) => {

    const posts = await req.storage.getAll(req.query)
    const ctx = {
        title: 'Posts',
        posts
    }
    res.render('index', ctx)
})


router.get('/create', async (req, res) => {



    res.render('create', { title: 'Create post' })
})


router.post('/create', async (req, res) => {

    const post = {

        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        author: req.user._id,

    }




    try {
        await req.storage.create(post)
        res.redirect('/allPosts')
    } catch (err) {
        let arr = err.message.split(', ')
        const ctx = {
            title: 'Create Post',
            error: arr,
            post
        }
        res.render('create', ctx)
    }
})

router.get('/allPosts', async (req, res) => {

    const posts = await req.storage.getAll(req.query)
    const ctx = {
        title: 'Posts',
        posts
    }
    res.render('allPosts', ctx)
})

router.get('/details/:id', preloadPost(), async (req, res) => {



    const post = req.data.post;


    let isowner = false;
    let userVoted;
    let allUsersVoteds;
    if (post == undefined) {
        res.redirect('/404')
    } else {
        userVoted = false;
        let arrVotesIds;

        if (req.user) {

            if (req.data.post.author._id == req.user._id) {
                isowner = true;
            }

            arrVotesIds = post.votes

            for (const voteId of arrVotesIds) {

                if (voteId == req.user._id) {
                    userVoted = true;
                    break;
                }

            }


        }

        let arr = post.votes;
        const userVoteds = await Promise.all(
            arr.map(async (elem) => {
                let a = req.storage.getUserById(elem)
                return a
            })
        )

        allUsersVoteds = userVoteds.map((x) => { return x.firstName }).join(', ')



    }

    const ctx = {
        title: 'Details Page',
        post,
        isowner,
        userVoted,
        allUsersVoteds
    }
    res.render('details', ctx)
})

router.get('/voteup/:id', preloadPost(), async (req, res) => {



    const post = req.data.post;

    const userId = req.user._id;

    post.votes.push(userId)
    post.rating++;
    console.log(post, '====post===')

    try {
        await req.storage.vote(post._id, post)
    } catch (err) {
        error = err.message

    }

    res.redirect(`/posts/details/${post._id}`)

})

router.get('/votedwn/:id', preloadPost(), async (req, res) => {


    const post = req.data.post;

    const userId = req.user._id;

    post.votes.push(userId)
    post.rating--;


    try {
        await req.storage.vote(post._id, post)
    } catch (err) {
        error = err.message

    }

    res.redirect(`/posts/details/${post._id}`)

})

router.get('/delete/:id', preloadPost(), isOwner(), async (req, res) => {
    const post = req.data.post;


    if (!post) {
        res.redirect('/404')
    } else {
        await req.storage.deletePost(post._id);
        res.redirect('/posts/allPosts')
    }
})


router.get('/edit/:id', preloadPost(), isOwner(), async (req, res) => {

    const post = req.data.post
console.log(post)
    ctx = {
        title: 'Edit Page',
        post
    }

    res.render('edit', ctx)

})


module.exports = router;