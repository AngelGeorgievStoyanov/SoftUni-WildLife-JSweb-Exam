const Post = require('../models/Post');


async function create(post) {
    console.log(post)
    const record = new Post(post)
    await record.save()
    return record;
}

async function getAll(query) {
    const options = {}
    if (query.search) {
        option = { regex: query.search, $options: 'i' }
    }
    const posts = Post.find(options).lean()
    return await posts
}


module.exports = {
    create,
    getAll
}