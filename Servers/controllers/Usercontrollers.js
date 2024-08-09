const { User } = require(`../models`)
const { compare } = require(`../helpers/bcrypt`)
const { signToken } = require(`../helpers/jwt`)
const { OAuth2Client } = require('google-auth-library');


class usercontroller {
    static async register(req, res, next) {
        try {
            const { username, email, password, gender } = req.body
            const user = await User.create({ username, email, password, gender })
            res.status(201).json({
                massage: "success create new user",
                user
            })
        } catch (err) {
            next(err)
        }
    }
    static async login(req, res, next) {
        try {

            const { email, password } = req.body
            if (!email || !password) throw { name: "InvalidLogin" }

            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) throw { name: "LoginError" }
            if (!compare(password, user.password)) throw { name: "LoginError" }
            const payload = {
                id: user.id,
                email: user.email,
                role: user.role
            }

            const access_token = signToken(payload)
            res.status(200).json({
                access_token
            })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
    static async googleLogin(req, res, next) {
        try {
            const { token } = req.headers
            const client = new OAuth2Client();

            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();

            const [user, created] = await User.findOrCreate({
                where: {
                    username: payload.email
                },
                defaults: {
                    username: payload.email,
                    password: "password_google"
                },
                hooks: false
            })

            const access_token = createToken({
                id: user.id,
                username: user.username,
            })

            res.status(200).json({ access_token })
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

}

module.exports = usercontroller