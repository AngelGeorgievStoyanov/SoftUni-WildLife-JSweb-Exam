const Post = require('../models/Post');
const User = require('../models/User')

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


async function getById(id) {
    const post = await Post.findById(id).populate('author').lean()

    if (post) {
        const viewModel = {
            _id: post._id,
            title: post.title,
            keyword: post.keyword,
            location: post.location,
            date: post.date,
            imageUrl: post.imageUrl,
            description: post.description,
            votes: post.votes,
            rating: post.rating,
            author: post.author

        }

        return viewModel
    }else{
        return undefined;

    }
}

async function vote(id,post){
    const exsisting = await Post.findById(id);

    if(!exsisting){
        throw new ReferenceError('No such ID in database')
    }

    Object.assign(exsisting,post);
    return exsisting.save();


}

async function getUserById(id) {
    return await User.findById(id).lean()
}


module.exports = {
    create,
    getAll,
    getById,
    vote,
    getUserById
    
}