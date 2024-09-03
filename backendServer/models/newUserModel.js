const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    position: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String, // URL or path to the image
    },
    resume: {
        type: String, // URL or path to the resume (PDF)
    },
});

const educationSchema = new mongoose.Schema({
    institutionName: {
        type: String,
    },
    institutionGrade: {
        type: String,
    },
    institutionDescription: {
        type: String,
    },
    institutionImage: {
        type: String, 
    },
});

const experienceSchema = new mongoose.Schema({
    companyName: {
        type: String,
    },
    companyDuration: {
        type: Number, 
    },
    companyDescription: {
        type: String,
    },
    companyImage: {
        type: String, 
    },
});

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
    },
    projectGit: {
        type: String, 
    },
    projectDescription:{
        type: String,
    },
    projectUrl: {
        type: String, 
    },
    projectImage: {
        type: String, 
    },
});
const CertificatesSchema = new mongoose.Schema({
    certificateName: {
        type: String,
    },
    certificateURL: {
        type: String, 
    },
});

const skillSchema = new mongoose.Schema({
    skillName: {
        type: String,
    },
    skillPercentage: {
        type: String, 
    },
});

const newUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    about: {
        type: [aboutSchema], 
    },
    education: {
        type: [educationSchema], 
    },
    experience: {
        type: [experienceSchema],
    },
    projects: {
        type: [projectSchema],
    },
    skills: {
        type: [skillSchema], 
    },
    certificates:{
        type: [CertificatesSchema]
    },
    footer: {
        type: [String], 
    },
});

module.exports = mongoose.model('User', newUserSchema);
