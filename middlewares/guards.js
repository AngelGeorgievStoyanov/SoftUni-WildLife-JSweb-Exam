function isOwner() {
    return (req, res, next) => {
        if (req.data.post && req.user && (req.data.post.author._id == req.user._id)) {
            next()
        } else {
            res.redirect('/auth/login')
        }
    }
}

module.exports={
    isOwner
}