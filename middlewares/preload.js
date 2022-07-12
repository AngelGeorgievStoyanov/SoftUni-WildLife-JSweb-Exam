function preloadPost() {
    return async (req, res, next) => {
        req.data = req.data || {};

        try {
            const post = await req.storage.getById(req.params.id);
            
            if (post) {
                req.data.post = post
            }

        } catch (err) {
            console.error('Database error:', err.message);

        }

        next()
    }
}


module.exports = {
    preloadPost
}