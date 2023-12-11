const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: false
    },
    desc: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },

    categories: {
        type: String,
        required: true,
    },
},
    { timestamps: true }

)

module.exports = mongoose.model("Post", PostSchema)