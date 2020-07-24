import { Router } from 'express'
import UserCon from './user.controller'

const router = Router()
const con = new UserCon()
const baseUrl = '/user'

router.get(`${baseUrl}/`, con.index)
router.get(`${baseUrl}/auth/google`, con.login)
router.get(`/auth_callback`, con.callback)
router.get(`${baseUrl}/profile`, con.profile)

export default router
