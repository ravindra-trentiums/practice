const validate = require('../validation/index')
const Blog = require('../models/blog')
const path = require('path');
const uploading = require('../validation/upload')
module.exports = {
    createBlog: createBlog,
    getBlogs: getBlogs,
    deleteBlog: deleteBlog
};

async function createBlog(req, res, next) {
    try {
        let reqBody = req.body
        console.log(req.body)
        let vUser = validate.VALIDATE_BLOG.validateBlogReq(reqBody);
        if (vUser.refused) {
            if (!vUser.errors) {
                res.status(400).send(
                    {
                        message: null
                    }
                );
            } else {
                res.status(400).send(
                    {
                        message: vUser.errors.request,
                    }
                );
            }
        }

        if (req.files) {
            let fileDestination = path.join(
                __dirname,
                `../public/image/blog`
            );
            let columnName = req.files.file;
            const data = await uploading.uploadImage(
                req,
                res,
                next,
                fileDestination,
                columnName
            );
            reqBody.blogImage = data;
        }

        let blog = await Blog.create(reqBody)
        if (blog) {
            res.json({ message: "Blog created successfully." })
        } else {
            res.status(400).send(
                { message: 'Error while creating blog.' }
            );
        }
    } catch (errors) {
        return res.status(500).json(errors.message);
    }
}

async function deleteBlog(req, res, next) {
    try {
        let reqBody = req.body
        console.log(req.body)
        if(reqBody.id){
            let blog = await Blog.findByIdAndDelete(reqBody.id)
            if (blog) {
                console.log(blog)
                res.json({ message: "Blog created successfully." })
            } else {
                res.status(400).send(
                    { message: 'Error while creating blog.' }
                );
            }
        }else{
            res.status(400).send(
                { message: 'Please send required field blogID.' }
            );
        }
    } catch (errors) {
        return res.status(500).json(errors.message);
    }
}
async function getBlogs(req, res, next) {
    try {
        let blog = await Blog.find({})
        if (blog) {
            blog.map(Element=>{
                Element.blogImage=(`/image/blog/${Element.blogImage}`)
            })
            res.json(blog)
        } else {
            res.status(400).send(
                { message: 'Error while creating blog.' }
            );
        }
    } catch (errors) {
        return res.status(500).json(errors.message);
    }
}
