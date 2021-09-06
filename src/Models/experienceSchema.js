import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const experienceSchema = new Schema(
    {
        username   : { type: String, required: true},   //"admin",
        role       : { type: String, required: true},   //"CTO",
        company    : { type: String, required: true},   //"Strive School",
        startDate  : { type: Date  , required: true},   //"2019-06-16T22:00:00.000Z",
        endDate    : { type: Date  , required: true},   //"2019-06-16T22:00:00.000Z", //could be null
        description: { type: String, required: true},   //"Doing stuff here and there",
        area       : { type: String, required: true},   //"Berlin",
        image      : { type: String, required: true},   //... //server generated on upload, set a default here
    },
    {
        timestamps: true,
    }
);

export default model('Experience', experienceSchema);