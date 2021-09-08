import express from "express";
import createError from "http-errors";
import q2m from "query-to-mongo";
import ProfileModel from "../../Models/profileSchema.js";
import ExperienceModel from "../../Models/experiencesSchema.js";
import { generatePDFReadableStream } from '../lib/pdf/index.js'
import { pipeline } from 'stream'

export const listProfiles = async(req, res, next) => {
    try {
        const query = q2m(req.query)

        const { total, profiles } = await ProfileModel.findProfiles(query)

        res.send({ links: query.links('/profile', total), total, profiles })
    } catch (error) {
        next(createError(500, "An Error ocurred while getting the list of profiles"))
    }
};

export const singleProfile = async(req, res, next) => {
    console.log("req.params.id::: ", req.params.id);
    try {
        const profileId = req.params.profileId
        const profile = await ProfileModel.findById(profileId)

        if (profile) {
            res.send(profile)
        } else {
            next(createError(404, `Profile with _id ${profileId} Not Found!`))
        }
    } catch (error) {
        next(createError(500, "An Error ocurred while getting the profile"))
    }
};

export const addProfile = async(req, res, next) => {
    console.log("req.params.id::: ", req.body);
    try {
        const newProfile = new ProfileModel(req.body)
        const { _id } = await newProfile.save()

        res.status(201).send({ _id })

    } catch (error) {
        if (error.name === "validationError") {
            next(createError(400, error))
        } else {
            console.log(error)
            next(createError(500, "An Error ocurred while creating a new profile"))
        }
    }
};

export const updateProfile = async(req, res, next) => {
    try {
        const profileId = req.params.profileId
        const modifiedProfile = await ProfileModel.findByIdAndUpdate(profileId, req.body, {
            new: true,
            runValidators: true,
        })

        if (modifiedProfile) {
            res.send(modifiedProfile)
        } else {
            next(createError(404, `Profile with _id ${profileId} Not Found!`))
        }
    } catch (error) {
        next(createError(500, `An Error ocurred while updating the profile ${req.params.profileId}`))
    }
};

export const deleteProfile = async(req, res, next) => {
    try {
        const profileId = req.params.profileId
        const deletedProfile = await ProfileModel.findByIdAndDelete(profileId)

        if (deletedProfile) {
            res.status(204).send()
        } else {
            next(createError(404, `Profile with _id ${profileId} Not Found!`))
        }
    } catch (error) {
        next(createError(500, `An Error ocurred while deleting the profile ${req.params.profileId}`))
    }
};

export const profileCV = async(req, res, next) => {
    try {
        const profileId = req.params.profileId
        const profile = await ProfileModel.findById(profileId)
        const expUser = await ExperienceModel.find({ username: profileId })

        if (profile) {

            res.setHeader("Content-Disposition", `attachment; filename=${profile.name}_${profile.surname}_CV.pdf`)

            const source = await generatePDFReadableStream(profile, expUser)

            const destination = res

            pipeline(source, destination, err => {
                if (err) next(err)
            })
        } else {
            next(createError(404, `Profile with _id ${profileId} Not Found!`))
        }
    } catch (error) {
        console.log(error)
        next(createError(500, `An Error ocurred while generating pdf CV for profile with _id ${profileId}`))
    }
};

// export const getAllReviewsByProductId = async ( req, res, next ) => {
//     try
//     {


//     }
//     catch ( error )
//     {
//         next( createError( 500, error.message ) );
//     }
// };

const productHandler = {
    add: addProfile,
    list: listProfiles,
    single: singleProfile,
    update: updateProfile,
    delete: deleteProfile,
    // getAllReviewsByProfileId: getAllReviewsByProductId,
    getCV: profileCV
};

export default productHandler;