const User = require('../models/eater')
var config = require('./config')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	function (username, password, done) {
		User.findOne({ username: username }, (err, userMatch) => {
			if (err) {
				return done(err)
			}
			if (!userMatch) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!userMatch.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, userMatch)
		})
	}
)

module.exports = strategy
