import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import userRouter from './api/user/user.router'
import projectRouter from './api/project/project.router'
import errorHandler from './middlewares/errorHandler'
import morgan from 'morgan'

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.get(`/`, (req: Request, res: Response) => {
  res.json({
    isSuccess: true,
    message: 'Hello, World!',
  })
})

app.use(userRouter)
app.use(projectRouter)
app.use(errorHandler)

export default app
