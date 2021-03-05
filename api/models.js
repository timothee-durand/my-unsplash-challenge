var Mongoose = require('mongoose');

const ImageModel = Mongoose.model("image", {
    label: String,
    url: String
});


exports.models = {
    image: ImageModel
}
