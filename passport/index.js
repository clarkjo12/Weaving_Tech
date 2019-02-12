const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const GoogleStrategy = require('./googleStrategy')
const FacebookStrategy = require('./facebookStrategy')
const Eater = require('../models/eater')
const Trucker = require('../models/trucker')

passport.serializeUser((user, done) => {
	console.log('=== serialize ... called ===')
	console.log(user) // the whole raw eater object!
	console.log('---------')
	done(null, { _id: user._id })
})

passport.deserializeUser((id, done) => {
	console.log('Deserialize ... called')
	Eater.findOne(
		{ _id: id },
		'firstName lastName photos local.username',
		(err, eater) => {
			console.log('======= DESERILAIZE USER CALLED ======')
			console.log(eater)
			console.log('--------------')
			done(null, eater)
		}
	)
})

// ==== Register Strategies ====
passport.use(LocalStrategy);
passport.use(FacebookStrategy);
passport.use(GoogleStrategy);

module.exports = passport
