const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;

const comparePassword = (passwordInput, hash, callback) => {
    bcrypt.compare(passwordInput, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};

module.exports.addAdmin = (req, res) => {
    let newAdmin = new Admin({
        email: req.body.email,
        password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;
            newAdmin.password = hash;
            newAdmin.save((err) => {
                if (err)
                    res.json({success: false, error: "Failed to register admin"});
                else 
                    res.json({success: true});
            });
        });
    });
};

module.exports.getUserByEmail = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    Admin.findOne({email:email}, (err, admin) => {
        if(err) throw err;
        if(!admin){
            return res.json({success:false,error:`Admin account not found`});
        }

        comparePassword(password, admin.password, (err, isMatch) => {
            if(err) throw err;
            if(!isMatch) {
                return res.json({success:false,error:"Incorrect password"});
            }
            const token = jwt.sign({admin}, process.env.JWT_SECRET, {
                expiresIn: 604800
            });

            res.json({
                success:true,
                token:`Bearer ${token}`
            });
        });
    });
};