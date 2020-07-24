require('dotenv').config()
import { Request, Response, NextFunction } from 'express'
import httpException from '../utils/httpException'
import jwt from 'jsonwebtoken'

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt
  if (!token) throw new httpException(404, 'Token not found')

  jwt.verify(
    token,
    process.env.JWT_SECRET || '',
    async (err: any, payload: any) => {
      if (err) throw new httpException(403, err.message)
      if (!payload) throw new httpException(404, 'no payload found')

      req.user = payload
      next()
    }
  )
}

export default verifyToken
