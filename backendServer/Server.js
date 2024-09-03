const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const ConnectDB = require('./dataBase'); 
const User = require('./models/newUserModel')
dotenv.config();
ConnectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/route', async(req,res) => {
    res.status(200).json({message:'udhf'})
    console.log('gtrntr')
})
// GET requests
app.get('/getInfo', async (req, res) => {
    const email = {email:req.query.email}
    const data = await User.findOne(email)
    res.status(200).json({ data });
});

// POST requests
app.post('/info', async (req, res) => {
    console.log(req.body);
    const {name,fullName,email} = req.body;
    const newUserInfo = await User.create({name,fullName,email})
    res.status(200).json({ message: 'Data received successfully' });
});
app.post('/skills', async (req, res) => {
    console.log(req.body);
    const email = {email : 'umamahesh.b@snapperit.com'}
    const user = await User.findOne(email)
    user.skills.push(req.body)
    await user.save()
    console.log(user)
    res.status(200).json({ message: 'Data received successfully' });
});
app.post('/certificates', async (req, res) => {
    console.log(req.body);
    const email = {email : 'umamahesh.b@snapperit.com'}
    const user = await User.findOne(email)
    user.certificates.push(req.body)
    await user.save()
    console.log(user)
    res.status(200).json({ message: 'Data received successfully' });
});
app.post('/projects', async (req, res) => {
    console.log(req.body);
    const email = {email : 'umamahesh.b@snapperit.com'}
    const user = await User.findOne(email)
    user.projects.push(req.body)
    await user.save()
    res.status(200).json({ message: 'Data received successfully' });
});
app.post('/experiences', async (req, res) => {
    console.log(req.body);
    const email = {email : 'umamahesh.b@snapperit.com'}
    const user = await User.findOne(email)
    user.experience.push(req.body)
    await user.save()
    res.status(200).json({ message: 'Data received successfully' });
});
app.post('/education', async (req, res) => {
    console.log(req.body);
    const email = {email : 'umamahesh.b@snapperit.com'}
    const user = await User.findOne(email)
    user.education.push(req.body)
    await user.save()
    res.status(200).json({ message: 'Data received successfully' });
});
app.post('/about', async (req, res) => {
    console.log(req.body);
    const email = {email : 'umamahesh.b@snapperit.com'}
    const user = await User.findOne(email)
    user.about.push(req.body)
    await user.save()
    res.status(200).json({ message: 'Data received successfully' });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
