import express from "express";
import createError from "http-errors";
import q2m from "query-to-mongo";
import Profile from "../../Models/profileSchema.js";
import fs from 'fs-extra'


const router = express.Router();

export const listProfile = async(req, res, next) => {
    try {
        const profileList = await Profile.find({});
        res.send(profileList);
    } catch (error) {
        next(createError(404, error.message));
    }
};

export const singleProfile = async(req, res, next) => {
    console.log("req.params.id::: ", req.params.id);
    try {
        const profileId = req.params.profileId;

        const profile = await Profile.findById(profileId); // similar to findOne()

        profile
            ?
            res.send(profile) :
            next(createError(404, `profile with id ${ profileId } not found!`));
    } catch (error) {
        next(createError(500, error.message));
    }
};

export const addProfile = async(req, res, next) => {
    console.log("req.params.id::: ", req.body);
    try {
        const newProfile = await new Profile(req.body).save();

        res.status(201).send(newProfile);
    } catch (error) {
        next(createError(500, error.message));
    }
};

export const updateProduct = async(req, res, next) => {
    try {
        const productId = req.params.productId;

        const updatedProduct = await Products.findByIdAndUpdate(productId, req.body, {
            new: true,
            runValidators: true, // returns the modified user
        });

        if (updatedProduct)
            res.send(updatedProduct);
    } catch (error) {
        next(createError(500, error.message));
    }
};

export const deleteProduct = async(req, res, next) => {
    try {

        await Products.findByIdAndDelete(req.params.productId);
        res.status(204).send();
    } catch (error) {
        next(createError(500, error.message));
    }
};



export const uploadImage = async(req, res, next) => {
    try {
        console.log(req.file)
        const profileId = req.params.profileId
        const imgUpload = await Profile.findByIdAndUpdate(profileId, { image: fs.readFileSync('./src/services/profile/uploads/' + req.file.filename) }, { new: true })
        res.send(imgUpload)
    } catch (error) {
        next(createError(500, error.message));
    }
}

export const getImage = async(req, res, next) => {
    try {
        const profile = await Profile.find({})
        res.send(profile)
    } catch (error) {
        next(createError(500, error.message));
    }
}


export const getAllReviewsByProductId = async(req, res, next) => {
    try {


    } catch (error) {
        next(createError(500, error.message));
    }
};

const profileHandler = {
    add: addProfile,
    list: listProfile,
    single: singleProfile,
    update: updateProduct,
    delete: deleteProduct,
    addImage: uploadImage,
    getImage: getImage,
    getAllReviewsByProductId: getAllReviewsByProductId
};

export default profileHandler;