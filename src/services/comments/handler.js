import createError from "http-errors";
import Post from "../../Models/postSchema.js";
import Comments from "../../Models/commentsSchema.js";

export const addComment = async(req, res, next) => {
    console.log("req.params.id::: ", req.body);
    try {

        const postId = req.params.postId
        const post = await Post.findById(postId)
        if (post) {
            const newComment = new Comments(req.body)
            // newComment.postID = postId
            const { _id } = await newComment.save()
            post.comments.push(_id)
            await post.save()

            res.status(201).send(newComment)
        } else {
            next(createError(404, `post with id ${postId} not found`))
        }
    } catch (error) {
        console.log(error)
        if (error.name === "validationError") {
            next(createError(400, error))
        } else {
            console.log(error)
            next(createError(500, "An Error ocurred while creating your comment"))
        }
        
    }
};

export const getAllComments = async(req, res, next) => {
    try {
        const postId = req.params.postId
        const post = await Post.findById(postId)
        console.log(post.comments);
        if (postId) {
            const comments = await Comments.find(post.comments._id)
            console.log(comments)
            res.status(200).send(comments)
        } else {
            next(createError(404, `comments for post - ${postId} - cannot be found`))
        }
    } catch (error) {
        if (error.name === "validationError") {
            next(createError(400, error))
        } else {
            console.log(error)
            next(createError(500, "An Error ocurred"))
        }
    }
};

// export const searchBlogByTitle = async ({req, res, next}) => {
//     console.log("req.query ", req.query);
//     try {
//         const blogTitle = await Blogs.find(req.query.title);
//         res.send(blogTitle);
//     }
//     catch (error) {
//         next(createError(500, error.message));
//     }
// };

export const findById = async(req, res, next) => {
    console.log("req.params.id::: ", req.params.id);
    try {
        const Posts = await Post.findById(req.params.id).populate('profile');
        if (!Posts) {
            next(createError(404, `Post with id "${ req.params.id }" not found`));
        }
        res.send(Posts);
    } catch (error) {
        next(createError(500, error.message));
    }
};


export const updateComment = async(req, res, next) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(204).send(updatedPost);
    } catch (error) {
        next(createError(500, error.message));
    }
};


export const deleteComment = async(req, res, next) => {
    try {
        
        const commentId = req.params.commentId
        
        const comment = await Comments.findById(commentId)
        await Comments.findByIdAndDelete(commentId)
        await Post.findOneAndUpdate({_id: commentId}, {$pull: { comments: commentId  }})
        
        comment           
            ? res.status(204).send(`deleted`)
            : next(createError(404, `sorry your request cannot be found`))
    } catch (error) {
        console.log(error)
        if (error.name === "validationError") {
            next(createError(400, error))
        } else {
            console.log(error)
            next(createError(500, "An Error ocurred while creating your comment"))
        }
    }
};



// export const getBlogCommentsById = async (req, res, next) => {
//     try {
//         const blogComments = await Blogs.findById(req.params.id);
//         if(!blogComments) 
//             next(createError(404, `Blog with id "${ req.params.id }" not found`));
//         res.send(blogComments);
//     }
//     catch (error) {
//         next(createError(500, error.message));
//     }
// }

// export const addComment = async (req, res, next) => {
//     try {
//         const updatedBlog = await Blogs.findByIdAndUpdate( req.params.id, { $push: { comments: req.body } }, { new: true } );
//         res.status(204).send(updatedBlog);
//     }
//     catch (error) {
//         next(createError(500, error.message));
//     }
// }

// export const deleteComment = async (req, res, next) => {
//     try {
//         const updatedBlog = await Blogs.findByIdAndDelete( req.params.id, { $pull: { _id: req.params.commentId } }, { new: true } );
//         res.status(204).send(updatedBlog);
//     }
//     catch (error) {
//         next(createError(500, error.message));
//     }
// }
const CommentHandler = {
    getAll: getAllComments,
    add: addComment,
    findById: findById,
    update: updateComment,
    delete: deleteComment
};

export default CommentHandler