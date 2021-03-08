// ================ Base Setup ========================
// Include Hapi package
var Hapi = require('@hapi/hapi');
const Joi = require("joi");
const axios = require("axios");
var dayjs = require('dayjs')

const db = require('./database').db;
//const models = require("./models").models;

const regExpUrl = /^(ftp|http|https):\/\/[^ "]+$/;

const headersUnsplash = {
    "Authorization":"Client-ID 5JRhVE45Lfn2susc4wOzKsC9KFVeuWdhyGohsS_1H3c"
}

const password = 'admin';
const dbName = 'images';

let port = process.env.PORT;
if (port == null || port === "") {
    port = 8000;
}

const init = async () => {
    const date = new Date();

    const server = Hapi.server({
        port: port,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'], // an array of origins or 'ignore'
            }
        }
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
        path: '/images',
        handler: async (request, h) => {
            try {
                let data = await db(dbName).select("id","label", "url")
                return h.response(data)
            } catch (e) {
                return h.response(e).code(500);
            }

        }
    });

    server.route({
        method: "GET",
        path: "/images/{id}",
        handler: async (request, h) => {
            try {
                let data = await db(dbName).select("id","label", "url").where("id", request.params.id)
                return h.response(data)
            } catch (e) {
                return h.response(e).code(500);
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
                let image = {
                    label:request.payload.label,
                    url:request.payload.url
                }

                console.log(image);

                let result = await db("images").insert(image)
                return h.response("INSERT SUCEED").code(200);
            } catch (error) {
                console.log(error)
                return h.response(error).code(500);
            }
        }
    });

    server.route({
        method: "DELETE",
        path: "/images/{id}",
        handler: async (request, h) => {
            try {
                if(request.payload.password !== password) return h.response("WRONG PASSWORD").code(401);
                var result = await db(dbName).where("id", request.params.id).del()
                return h.response("DELETE SUCCEED").code(200);
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

                async function saveImg(img) {
                    let result = await db("images").insert(img);
                    console.log(result)
                }
                result.data.forEach((image) => {
                    //console.log(image)
                    let description = image.description;
                    if(description === null) {
                        description = image.alt_description
                    }

                    let _image = {
                        label:description,
                        url:image.urls.regular
                    }

                    saveImg(_image);
                })

                return  h.response("CRAWL SUCCEED").code(200);
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
