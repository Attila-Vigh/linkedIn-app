import mongoose from 'mongoose';
const { Schema, model } = mongoose;



const productSchema = new Schema(
    {
        // "_id": "5d84937322b7b54d848eb41b", //server generated
        // "name": "Diego",
        // "surname": "Banovaz",
        // "email": "diego@strive.school",
        // "bio": "SW ENG",
        // "title": "COO @ Strive School",
        // "area": "Berlin",
        // "image": ..., //server generated on upload, set a default here
        // "username": "admin",
        // "createdAt": "2019-09-20T08:53:07.094Z", //server generated
        // "updatedAt": "2019-09-20T09:00:46.977Z", //server generated
    },
    {
        timestamps: true,
    }
);

export default model( 'Products', productSchema );

