const { Schema, model } = require('mongoose');



const schema = new Schema({
    title: { type: String, required: true, minlength:[6,'Title must be min 6 characters long'] },
    keyword: { type: String, required: true , minlength:[6,'Keyword must be min 6 characters long']},
    location: { type: String, required: true, maxlength:[15,'Location must be max 15 characters long'] },
    date: { type: String, required: true, match:[/[0-9]{2}.[0-9]{2}.[0-9]{4}/,'Date is invalid, current format is 02.02.2021'] },
    imageUrl: { type: String, required: true , match: [/^https?/, 'Image must be a valid URL'] },
    description: { type: String, required: true ,minlength:[8,'Description must be min 8 characters long']},
    votes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    rating: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: 'User' },

})


module.exports=model('Post',schema)