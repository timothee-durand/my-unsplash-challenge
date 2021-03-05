// ================ Base Setup ========================
// Include Hapi package
var Hapi = require('@hapi/hapi');
const Joi = require("joi");
const axios = require("axios");


const db = require('./database').db;
const models = require("./models").models;

const regExpUrl = /^(ftp|http|https):\/\/[^ "]+$/;

const headersUnsplash = {
    "Authorization":"Client-ID 5JRhVE45Lfn2susc4wOzKsC9KFVeuWdhyGohsS_1H3c"
}


const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });


    server.route({
        method: 'GET',
        path: '/users',
        handler: async (request, h) => {
            try {
                var person = await models.user.find().exec();
                return h.response(person);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    });

    server.route({
        method: "GET",
        path: "/users/{id}",
        handler: async (request, h) => {
            try {
                var person = await models.user.findById(request.params.id).exec();
                return h.response(person);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    });

    server.route({
        method: "POST",
        path: "/users",
        options: {
            validate:{
                payload: Joi.object({
                    name: Joi.string().min(1).max(140).required(),
                    password: Joi.string().min(6).required()
                })
            }
        },
        handler: async (request, h) => {
            try {
                let user = new models.user(request.payload);
                let result = await user.save();
                return h.response(result);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    });

    server.route({
        method: "DELETE",
        path: "/users/{id}",
        handler: async (request, h) => {
            try {
                var result = await models.user.findByIdAndDelete(request.params.id);
                return h.response(result);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/images',
        handler: async (request, h) => {
            try {
                var person = await models.image.find().exec();
                return h.response(person);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    });

    server.route({
        method: "GET",
        path: "/images/{id}",
        handler: async (request, h) => {
            try {
                var person = await models.image.findById(request.params.id).exec();
                return h.response(person);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    });

    server.route({
        method: "POST",
        path: "/images",
        options: {
            validate:{
                payload: Joi.object({
                    label: Joi.string().min(1).max(140).required(),
                    url: Joi.string().regex(regExpUrl).required()
                })
            }
        },
        handler: async (request, h) => {
            try {
                let user = new models.image(request.payload);
                let result = await user.save();
                return h.response(result);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    });

    server.route({
        method: "DELETE",
        path: "/images/{id}",
        handler: async (request, h) => {
            try {
                var result = await models.image.findByIdAndDelete(request.params.id);
                return h.response(result);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    });

    server.route({
        method: "GET",
        path: "/images/crawl",
        handler: async (request, h) => {
            try {
                let result = await axios.get("https://api.unsplash.com/photos?page=1", {headers:headersUnsplash});
                //console.log(result.data)

                result.data.forEach(function (image) {
                    //console.log(image)
                    let description = image.description;
                    if(description === null) {
                        description = image.alt_description
                    }

                    let _image = new models.image({
                        label:description,
                        url:image.urls.raw
                    })
                    _image.save();

                })

                return {statut:200};
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    });


    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
