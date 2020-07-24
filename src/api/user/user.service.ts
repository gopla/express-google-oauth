import { Credentials } from 'google-auth-library'
import { google } from 'googleapis'
import User from './user.model'
import HttpException from '../../utils/httpException'
import jwt from 'jsonwebtoken'
import axios from 'axios'

const OAuth2 = google.auth.OAuth2
const oauth_conf: any = require('../../utils/oauth')

export default class UserService {
  getAllUser() {
    return User.find()
  }

  googleLoginLink() {
    return new Promise(async (resolve, reject) => {
      try {
        const oauth2Client = new OAuth2(
          oauth_conf.client_id,
          oauth_conf.client_secret,
          oauth_conf.redirect_uris[0]
        )
        // Obtain the google login link to which we'll send our users to give us access
        const loginLink = oauth2Client.generateAuthUrl({
          access_type: 'online',
          scope: oauth_conf.scopes,
        })
        resolve(loginLink)
      } catch (error) {
        reject(error)
      }
    })
  }

  googleLoginCallback(error: string, code: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const oauth2Client = new OAuth2(
          oauth_conf.client_id,
          oauth_conf.client_secret,
          oauth_conf.redirect_uris[0]
        )
        if (error) {
          // The user did not give us permission.
          return new HttpException(403, 'Authorization Failed')
        } else {
          oauth2Client.getToken(code, function (err, token) {
            if (err) return new HttpException(403, 'Authorization Failed')
            // Store the credentials given by google into a jsonwebtoken in a cookie called 'jwt'

            const userToken = jwt.sign(
              token as Credentials,
              process.env.JWT_SECRET as string
            )
            resolve(userToken)
          })
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  retrieveGoogleData(jwtCookies: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const tokenCookies: any = jwt.verify(
          jwtCookies,
          process.env.JWT_SECRET as string
        )

        const { data } = await axios.get(
          'https://www.googleapis.com/oauth2/v2/userinfo',
          {
            headers: { Authorization: `Bearer ${tokenCookies.access_token}` },
          }
        )
        const isUserExist = await User.findOne({ email: data.email })
        if (!isUserExist) {
          await User.create({ name: data.name, email: data.email })
        }
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }
}
