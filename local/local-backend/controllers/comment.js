const validate = require('../validation/index')
const Comment = require('../models/comments')
const path = require('path');
const uploading = require('../validation/upload')
module.exports = {
    createComment: createComment,
    updateComment: updateComment,
    getComment: getComment,
    deleteComment: deleteComment
};

async function createComment(req, res, next) {
    try {
        let reqBody = req.body
        console.log(req.body)
        let vUser = validate.VALIDATE_COMMENT.validateCommentReq(reqBody);
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

        let comment = await Comment.create(reqBody)
        if (comment) {
            res.json({ message: "Comment created successfully." })
        } else {
            res.status(400).send(
                { message: 'Error while creating Comment.' }
            );
        }
    } catch (errors) {
        return res.status(500).json(errors.message);
    }
}
async function updateComment(req, res, next) {
    try {
        let reqBody = req.body
        if(reqBody.id){
            let vUser = validate.VALIDATE_COMMENT.validateCommentReq(reqBody);
            if (vUser.refused) {
                if (!vUser.errors) {
                  return res.status(400).send(
                        {
                            message: null
                        }
                    );
                } else {
                    return res.status(400).send(
                        {
                            message: vUser.errors.request,
                        }
                    );
                }
            }
    
            let id=reqBody.id
            delete reqBody.id
            let comment = await Comment.findByIdAndUpdate(id,reqBody)
            if (comment) {
                res.json({ message: "Comment updated successfully." })
            } else {
                res.status(400).send(
                    { message: 'Error while updating Comment.' }
                );
            }
        }else{
            res.status(400).send(
                { message: 'Please send required field Comment id.' }
            );
        }
    } catch (errors) {
        return res.status(500).json(errors.message);
    }
}
async function deleteComment(req, res, next) {
    try {
        let reqBody = req.body
        console.log(req.body)
        if(reqBody.id){
            let blog = await Blog.findByIdAndDelete(reqBody.id)
            if (blog) {
                console.log(blog)
                res.json({ message: "Comment deleted successfully." })
            } else {
                res.status(400).send(
                    { message: 'Error while deleting Comment.' }
                );
            }
        }else{
            res.status(400).send(
                { message: 'Please send required field CommentID.' }
            );
        }
    } catch (errors) {
        return res.status(500).json(errors.message);
    }
}
async function getComment(req, res, next) {
    try {
        let comment = await Comment.find({})
        if (comment) {
            res.json(comment)
        } else {
            res.status(400).send(
                { message: 'Error while listing comment.' }
            );
        }
    } catch (errors) {
        return res.status(500).json(errors.message);
    }
}
