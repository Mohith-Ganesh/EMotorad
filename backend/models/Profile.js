const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    instagram: { type: String, default: "" },
    youtube: { type: String, default: "" },
});
  

module.exports = mongoose.model('Profile',ProfileSchema);
