const mongoose = require('mongoose');

var campgroundSchema = new mongoose.Schema({
    title : String,
    price : String,
    img : String,
    description : String,
    author : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username : String
    },
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Comment"
        }
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema);
