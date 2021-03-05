var Mongoose = require('mongoose');

const UserModel = Mongoose.model("user", {
    name: String,
    password: String
});

const ImageModel = Mongoose.model("image", {
    label: String,
    url: String
});


exports.models = {
    user: UserModel,
    image: ImageModel
}
