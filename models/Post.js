const { Schema, model } = require('mongoose');



const schema = new Schema({
    title: { type: String, reqired: true },
    keyword: { type: String, reqired: true },
    location: { type: String, reqired: true },
    date: { type: String, reqired: true },
    imageUrl: { type: String, reqired: true },
    description: { type: String, reqired: true },
    votes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    rating: { type: Number, default: 0 }
})


module.exports=model('Post',schema)