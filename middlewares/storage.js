const postService = require('../services/posts')

async function init(){
    return(req,res,next)=>{
        const storage=Object.assign({},postService)
        req.storage=storage;
        next()
    }
}

module.exports=init;