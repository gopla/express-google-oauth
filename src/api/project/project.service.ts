import Project from './project.model'
import HttpException from '../../utils/httpException'

export default class ProjectService {
  getAllProject() {
    return Project.find()
  }
}
