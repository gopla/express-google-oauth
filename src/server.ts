require('dotenv').config()
import { connectDB } from './utils/db'
import app from './app'

const port = process.env.PORT || 3000

connectDB()
  .then(() => {
    console.log(` -> Database connected!`)
    app.listen(port, () => {
      console.log(` -> API started at http://localhost:${port}/`)
    })
  })
  .catch((err: string) => {
    console.log(err)
  })
