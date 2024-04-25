const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const express = require('express')
const app = express();
const {Schema} = mongoose;
DB_URI="mongodb+srv://eguterobson:k86hmwgzhwyaqcFR@cluster0.f9rgsjk.mongodb.net/todo_app?retryWrites=true&w=majority"
mongoose.connect(DB_URI)

const TodoSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

const TodoUsers = mongoose.model('TodoUsers', TodoSchema);

module.exports = TodoUsers





