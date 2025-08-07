const Project = require("../models/project")
const User = require("../models/user")
const ResponseHandler = require("../utils/responseHandler")
const PaginationUtils = require("../utils/pagination")
const AuthController= require("../controllers/authController");


class ProjectController{
    static async createProject(req,res)
    {
        try{
            const {
                    project_name,
                    git_repo,
                    overview,
                    motivation,
                    features,
                    project_genre,
                    username,
                }= req.body;

            const projectData= {project_name,git_repo,overview,motivation,features,project_genre};
            
            const projectId= await Project.createProject(projectData,username);

            return ResponseHandler.success(res,{
                projectId,projectData
            },"Project Create Successfully");
        }
    catch (error) {
                console.error("Project Creation error:", error);
                return ResponseHandler.error(res, "Project Creation failed", 500, error.message);
    }
    }

    static async retrieveProjectsbyUsername(req, res) {
    try {
      const { username } = req.user;

      const projects = await Project.getProjectsByUsername(username);

      if (!projects || projects.length === 0) {
        return ResponseHandler.notFound(res, "No projects found for this user");
      }

      return ResponseHandler.success(
        res,
        { projects },
        "Projects retrieved successfully"
      );
    } catch (error) {
      console.error("Project retrieval error:", error);
      return ResponseHandler.error(res, "Failed to retrieve projects", 500, error.message);
    }
  }
  static async getprojectsbyGenre(req,res)
  {
    try
    {
      const{genre}= req.params;
      const projects= await Project.getProjectsByGenre(genre);
      if (!projects || projects.length === 0) {
        return ResponseHandler.notFound(res, "No projects found for this genre");
      }
      return ResponseHandler.success(
        res,
        { projects },
        "Projects retrieved successfully"
      );
    } 
    catch (error) {
      console.error("Project retrieval error:", error);
      return ResponseHandler.error(res, "Failed to retrieve projects", 500, error.message);
    }
  }
    static async get_all_projects(req,res)
  {
    try
    {
      const projects= await Project.getAllProjects();
      console.log(projects)
      if (!projects || projects.length === 0) {
        return ResponseHandler.notFound(res, "No projects found");
      }
      return ResponseHandler.success(
        res,
        { projects },
        "Projects retrieved successfully"
      );
    } 
    catch (error) {
      console.error("Project retrieval error:", error);
      return ResponseHandler.error(res, "Failed to retrieve projects", 500, error.message);
    }
  }
}

module.exports= ProjectController;