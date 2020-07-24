require('dotenv').config()
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_PROJECT_ID,
  GOOGLE_CLIENT_SECRET,
} = process.env

module.exports = {
  client_id: GOOGLE_CLIENT_ID,
  project_id: GOOGLE_PROJECT_ID,
  client_secret: GOOGLE_CLIENT_SECRET,
  redirect_uris: [`http://localhost:3000/auth_callback`],
  scopes: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
}
