var Mongoose = require('mongoose');

const ImageModel = Mongoose.model("image", {
    label: String,
    url: String,
    creation_date:Date
});


exports.models = {
    image: ImageModel
}
