import createError from "http-errors";
import Experience from "../../Models/experienceSchema.js";

export const addExperience = async ( req, res, next ) => {
    console.log( "req.params.id::: ", req.body );
    try
    {
        const newExperience = await new Experience( req.body ).save();
        res.status( 201 ).send( newExperience );
    }
    catch ( error )
    {
        next( createError( 500, error.message ) );
    }
};

export const getAllExperience = async ( req, res, next ) => {
    try
    {

        const experience = await Experience.find( {} );
        res.send( experience );

    }
    catch ( error )
    {
        next( createError( 404, error.message ) );
    }
};

export const findById = async ( req, res, next ) => {
    console.log( "req.params.id::: ", req.params.id );
    try
    {
        const experience = await Experience.findById( req.params.id );
        if ( !experience )
        {
            next( createError( 404, `Experience with id "${ req.params.id }" not found` ) );
        }
        res.send( experience );
    }
    catch ( error )
    {
        next( createError( 500, error.message ) );
    }
};

export const updateExperience = async ( req, res, next ) => {
    try
    {
        const updatedExperience = await Experience.findByIdAndUpdate( req.params.id, req.body, { new: true } );
        res.status( 204 ).send( updatedExperience );
    }
    catch ( error )
    {
        next( createError( 500, error.message ) );
    }
};


export const deleteExperience = async ( req, res, next ) => {
    try
    {
        await Experience.findByIdAndDelete( req.params.id );
        res.status( 204 ).send();
    }
    catch ( error )
    {
        next( createError( 500, error.message ) );
    }
};

const experienceHandler = {
    getAll: getAllExperience,
    add: addExperience,
    findById: findById,
    update: updateExperience,
    delete: deleteExperience
};

export default experienceHandler;