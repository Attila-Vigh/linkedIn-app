import createError from "http-errors";
import Experience from "../../Models/experiencesSchema.js";
import Profile from "../../Models/profileSchema.js";


export const getAllExperienceByName = async ( req, res, next ) => {
    try
    {
        console.log( req.params );
        const profile = await Profile.findOne( { username: req.params.userName } );

        console.log( "profile.experiences: ", profile.experiences );

        const experiencesID = profile.experiences;

        // const experiences = await experiencesID.map( async id => {
        //     console.log( "id: ", id );
        //     const profile = await Experience.findById( id );

        //     console.log( "profile: ", profile );

        //     return profile;
        // } )

        // console.log( "experiences: ", experiences );

        let experiences = [];

        for ( let i = 0; i < experiencesID.length; i++ ) {
            const experience = await Experience.findById( experiencesID[ i ] );
            experiences.push( experience );
        }

        experiences
            ? res.send( experiences )
            : next( createError( 404, `Profile with id: ${ req.params.userId } not found` ) );

    }
    catch ( error )
    {
        next( createError( 404, error.message ) );
    }
};

export const addExperience = async ( req, res, next ) => {
    console.log( "req.file::: ", req.file );
    console.log( "req.params.body::: ", req.body );
    try
    {
        req.body.image = req.file.path;
        const newExperience = await new Experience( req.body ).save();
        console.log( "newExperience::: ", newExperience );
        const profile = await Profile.findOne( { username: req.params.userName } );
        console.log( profile );
        const updatedExperience = await Profile.findOneAndUpdate(
            { username: req.params.userName },
            { $push: { experiences: { ...newExperience } } },
            { new: true }
        );

        updatedExperience
            ? res.status( 201 ).send( newExperience )
            : res.status( 404 ).send( `Profile with username: ${ req.params.userName } not found` );
    }
    catch ( error )
    {
        next( createError( 500, error.message ) );
    }
};

export const findById = async ( req, res, next ) => {
    try
    {
        const experience = await Experience.findById( req.params.expId );

        experience
            ? res.send( experience )
            : next( createError( 404, `Experience with id "${ req.params.expId }" not found` ) );
    }
    catch ( error )
    {
        next( createError( 500, error.message ) );
    }
};

export const updateExperience = async ( req, res, next ) => {
    try
    {
        console.log( "req.params.expId: ", req.params.expId );
        console.log( "req.body: ", req.body );
        const updatedExperience = await Experience.findByIdAndUpdate( req.params.expId, req.body, { new: true, returning: true } );
        console.log( "updatedExperience: ", updatedExperience );
        res.status( 204 ).send( updatedExperience );
    }
    catch ( error )
    {
        next( createError( 500, error.message ) );
    }
};

export const uploadPicture = async ( req, res, next ) => {
    try
    {
        console.log( "req.params: ", req.params );
        console.log( "req.body: ", req.body );
        req.body.image = req.file.path;
        const updatedExperience = await Experience.findByIdAndUpdate( req.params.expId, req.body, { new: true, returning: true } );
        console.log( "updatedExperience: ", updatedExperience );
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
        await Experience.findByIdAndDelete( req.params.expId );
        await Profile.findOneAndUpdate( { username: req.params.userName }, { $pull: { experiences: req.params.expId } } );
        res.status( 204 ).send();
    }
    catch ( error )
    {
        next( createError( 500, error.message ) );
    }
};

const experiencesHandler = {
    getAll: getAllExperienceByName,
    add: addExperience,
    findById: findById,
    update: updateExperience,
    uploadPicture: uploadPicture,
    delete: deleteExperience
};

export default experiencesHandler;