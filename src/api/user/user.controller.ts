import { Request, Response, NextFunction } from 'express'
import httpException from '../../utils/httpException'
import UserService from './user.service'

const userService = new UserService()

export default class UserController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getAllUser()
      res.send(result)
    } catch (error) {
      next(new httpException(error.statusCode || 500, error.message))
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const link = await userService.googleLoginLink()
      res.redirect(link as string)
    } catch (error) {
      next(new httpException(error.statusCode || 500, error.message))
    }
  }

  async callback(req: Request, res: Response, next: NextFunction) {
    try {
      const errorLink = req.query.error != null ? req.query.error : ''
      const codeLink = req.query.code != null ? req.query.code : ''
      const userToken = await userService.googleLoginCallback(
        errorLink as string,
        codeLink as string
      )
      res.cookie('jwt', userToken)
      res.redirect('/user/profile')
    } catch (error) {
      next(new httpException(error.statusCode || 500, error.message))
    }
  }

  async profile(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.retrieveGoogleData(req.cookies.jwt)
      res.send(result)
    } catch (error) {
      next(new httpException(error.statusCode || 500, error.message))
    }
  }
}
