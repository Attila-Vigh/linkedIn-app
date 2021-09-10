import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ExperiencesSchema = new Schema(
    {
        username   : { type: String, required: true },   //"admin",
        role       : { type: String, required: true },   //"CTO",
        company    : { type: String, required: true },   //"Strive School",
        startDate  : { type: String, required: true },   //"2019-06-16T22:00:00.000Z",
        endDate    : { type: String, required: true },   //"2019-06-16T22:00:00.000Z", //could be null
        description: { type: String, required: true },   //"Doing stuff here and there",
        area       : { type: String, required: true },   //"Berlin",
        image: {
            type: String, 
            required: true,
            default: "https://via.placeholder.com/75",
        },   //... //server generated on upload, set a default here
    },
    {
        timestamps: true,
    }
);

// ExperiencesSchema.static( 'findExperiences', async function ( query ) {
//     const total = await this.countDocuments( query._id );
//     const experiences = await this.find( _id )
//         .skip( query.options.skip )
//         .limit( query.options.limit )
//         .sort( query.options.sort );

//     return { total, experiences };
// } );

export default model('Experiences', ExperiencesSchema);