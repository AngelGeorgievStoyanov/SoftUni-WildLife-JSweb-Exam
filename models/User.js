const { Schema, model } = require('mongoose');

const schema = new Schema({
    firstName: { type: String, required: true, minlength: [3, 'First name must be min length 3 char'], match: [/[a-zA-Z]/, 'First name must contains only English letters'] },
    lastName: { type: String, required: true, minlength: [5, 'Last name must be min length 5 char'], match: [/[a-zA-Z]/, 'First name must contains only English letters'] },
    email: { type: String, required: true, match: [/[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+/, 'Email is invalid. Example of a valid email - "petar@softuni.bg'] },
    hashedPassword: { type: String, required: true, minlength: [4, 'Password must be min 4 characters long'] },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post', default: [] }]
})
module.exports = model('User', schema)