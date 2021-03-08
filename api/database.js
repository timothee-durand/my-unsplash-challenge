// var Mongoose = require('mongoose');
// //load database
// Mongoose.connect('mongodb://localhost/unsplash', {useUnifiedTopology:true, useNewUrlParser:true});
// var db = Mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', function callback() {
//     console.log('Connection with database succeeded.');
// });
// exports.db = db;
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./database.sqlite"
    },
    useNullAsDefault:true
});


knex.schema.createTableIfNotExists('images', function (table) {
    table.increments();
    table.string('label');
    table.string('url');
    table.timestamps();
}).then(response => {console.log(response)}).catch(error => {console.log(error)})

//
// const data = [
//     {label:"test", url:"https://images.unsplash.com/photo-1615141506772-90b39c01a7c9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"},
//     {label:"test2", url:"https://images.unsplash.com/photo-1615127603912-9b0bba4b11cf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"},
//     {label:"test", url:"https://images.unsplash.com/photo-1615141506772-90b39c01a7c9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"},
//     {label:"test2", url:"https://images.unsplash.com/photo-1615127603912-9b0bba4b11cf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"},
// ]
//
// data.forEach(function (img) {
//     knex("images").insert(data).then((res)=> {console.log(data)})
// })


exports.db = knex;
