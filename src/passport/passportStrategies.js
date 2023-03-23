import passport from "passport";
import { usersModel } from "../dao/models/users.model.js";
import { hashPassword, comparePasswords} from "../utils.js"
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from 'passport-github2'
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt'
import cookieParser from "cookie-parser";


// Passport local
passport.use(
    'registro',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            const usuario = await usersModel.find({ email })
            if (usuario.length !== 0) {
                return done(null, false)
            }
            const hashNewPassword = await hashPassword(password)
            const newUser = { ...req.body, password: hashNewPassword }
            const newUserBD = await usersModel.create(newUser)
            done(null, newUserBD)
        }
    )
)

// Passport github
passport.use(
    'githubRegistro',
    new GitHubStrategy(
        {
            clientID: 'Iv1.56205fc09c42eed6',
            clientSecret: 'd5a5660f195b869e673983585cc55613b3bc4a39',
            callbackURL: 'http://localhost:8080/users/github'
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile)
            done(null, 'prueba')
            const usuario = await usersModel.findOne({ email: profile._json.email })
            if (!usuario) {
                const nuevoUsuario = {
                    first_name: profile._json.name.split(' ')[0],
                    last_name: profile._json.name.split(' ')[1] || ' ',
                    email: profile._json.email,
                    password: ' ',
                }
                const dbResultado = await usersModel.create(nuevoUsuario)
                done(null, dbResultado)
            } else {
                done(null, usuario)
            }
        }
    )
)

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                const userDB = await usersModel.findOne({ email })
                if (!userDB) return done(null, false)
                const comparePasswords = await comparePasswords(password, userDB.password)
                if (!comparePasswords) return done(null, false)
                done(null, userDB)
            } catch (error) {
                done(error)
            }
        }
    )
)


// Jason Web Token 
passport.use(
    'jwt',
    new jwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey'
        },
        async (jwt_payload, done)=>{
            try {
                done(null, jwt_payload.user)
            } catch (error) {
                done(error)
            }
        }
    )
)


passport.serializeUser((usuario, done) => {
    done(null, usuario)
})

passport.deserializeUser(async (_id, done) => {
    const usuario = await usersModel.findById(_id)
    done(null, usuario)
})

