const Post = require('../models/Post');


async function create(post){
    console.log(post)
    const record=new Post(post)
    await record.save()
    return record;
}


module.exports={
    create
}