import createError from "http-errors";
import Experience from "../../Models/experienceSchema.js";

export const getAllExperience = async ( req, res, next ) => {
    try {
        const experienceList = await Experience.find( {} );
        if ( req.query && req.query.name )
        {
            const filteredExperience = experienceList.filter( author =>
                author.name
                    .toLowerCase()
                    .includes( req.query.name.toLowerCase() )
            );
            res.send( filteredExperience );
        }
        else
            res.send( experienceList );
    }
    catch ( error ) {
        next( createError( 404, error.message ) );
    }
};

export const addExperience = async ( req, res, next ) => {
    console.log( "req.params.id::: ", req.body );
    try {
        const newExperience = await new Experience( req.body ).save();
        res.status( 201 ).send( newExperience );
    }
    catch ( error ) {
        next( createError( 500, error.message ) );
    }
};

export const searchExperienceByTitle = async ({req, res, next}) => {
    console.log("req.query ", req.query);
    try {
        const experienceTitle = await Experience.find(req.query.title);
        res.send(experienceTitle);
    }
    catch (error) {
        next(createError(500, error.message));
    }
};

export const findById = async (req, res, next) => {
    console.log("req.params.id::: ", req.params.id);
    try {
        const Experience = await Experience.findById(req.params.id);
        if(!Experience) {
            next(createError(404, `Experience with id "${ req.params.id }" not found`));}
        res.send(Experience);
    }
    catch (error) {
        next(createError(500, error.message));
    }
};

export const updateExperience = async (req, res, next) => {
    try {
        const updatedAuthor = await Experience.findByIdAndUpdate( req.params.id, req.body, { new: true } );
        res.status(204).send(updatedAuthor);
    }
    catch (error) {
        next(createError(500, error.message));
    }
};

export const deleteExperience = async (req, res, next) => {
    try {
        await Experience.findByIdAndDelete( req.params.id);
        res.status(204).send();
    }
    catch (error) {
        next(createError(500, error.message));
    }
};

export const getExperienceCommentsById = async (req, res, next) => {
    try {
        const ExperienceComments = await Experience.findById(req.params.id);
        if(!ExperienceComments) 
            next(createError(404, `Experience with id "${ req.params.id }" not found`));
        res.send(ExperienceComments);
    }
    catch (error) {
        next(createError(500, error.message));
    }
}

export const addComment = async (req, res, next) => {
    try {
        const updatedExperience = await Experience.findByIdAndUpdate( req.params.id, { $push: { comments: req.body } }, { new: true } );
        res.status(204).send(updatedExperience);
    }
    catch (error) {
        next(createError(500, error.message));
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const updatedExperience = await Experience.findByIdAndDelete( req.params.id, { $pull: { _id: req.params.commentId } }, { new: true } );
        res.status(204).send(updatedExperience);
    }
    catch (error) {
        next(createError(500, error.message));
    }
}
const cartHandler = {
    getAll: getAllExperience,
    add: addExperience,
    findById: findById,
    update: updateExperience,
    delete: deleteExperience,
};

export default cartHandler;