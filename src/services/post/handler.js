import createError from "http-errors";
import Post from "../../Models/postSchema.js";

export const addPost = async(req, res, next) => {
    console.log("req.params.id::: ", req.body);
    try {
        //const userId = req.body.userId
        const newUser = new Post(req.body)
        const { _id } = await newUser.save()
        res.send({ newUser, _id })
    } catch (error) {
        console.log(error)
    }
};

export const getAllPosts = async(req, res, next) => {
    try {

        const Posts = await Post.find({})
        res.send(Posts)

    } catch (error) {
        next(createError(404, error.message));
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
        const Post = await Post.findById(req.params.id);
        if (!Post) {
            next(createError(404, `Post with id "${ req.params.id }" not found`));
        }
        res.send(Post);
    } catch (error) {
        next(createError(500, error.message));
    }
};


export const updatePost = async(req, res, next) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(204).send(updatedPost);
    } catch (error) {
        next(createError(500, error.message));
    }
};


export const deletePost = async(req, res, next) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(createError(500, error.message));
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
const PostHandler = {
    getAll: getAllPosts,
    add: addPost,
    findById: findById,
    update: updatePost,
    delete: deletePost
};

export default PostHandler;