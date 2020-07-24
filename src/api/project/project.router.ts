import { Router } from 'express'
import projectCon from './project.controller'
import verifyToken from '../../middlewares/verifyToken'

const router = Router()
const con = new projectCon()
const baseUrl = '/project'

router.use(verifyToken)

router.get(`${baseUrl}/`, con.index)

export default router
