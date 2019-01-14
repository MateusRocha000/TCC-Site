'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//tabela do usuário no banco de dados
var userData = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	psw: {
		type: String,
		required: true
	},
	confirm_psw: {
		type: String,
		required: true
	}
});

//Hashing da senha antes de salvar no banco de dados
userData.pre('save', function(next){
	var user = this;
	bcrypt.hash(user.password, 10, function(error, hash){
		if (error)
		{
			return next(error);
		}
		user.psw = hash;
		next();
	})
});