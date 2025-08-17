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
    static async createProjectForTeam(req, res) {
    try {
      const { project_name, git_repo, overview, motivation, features, project_genre, usernames } = req.body;

      const projectData = { project_name, git_repo, overview, motivation, features, project_genre };
      const projectId = await Project.createProject_for_team(projectData, usernames);

      return ResponseHandler.success(res, { projectId, projectData }, "Team project created successfully");
    } catch (error) {
      console.error("Team Project Creation error:", error);
      return ResponseHandler.error(res, "Team project creation failed", 500, error.message);
    }
  }
    static async getProjectById(req, res) {
    try {
      const { id } = req.params;
      const project = await Project.getProjectById(id);

      if (!project) return ResponseHandler.notFound(res, "Project not found");

      return ResponseHandler.success(res, { project }, "Project retrieved successfully");
    } catch (error) {
      console.error("Project retrieval error:", error);
      return ResponseHandler.error(res, "Failed to retrieve project", 500, error.message);
    }
  }
  static async updateProject(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const result = await Project.updateProject(id, updateData);

      if (result.affectedRows === 0) return ResponseHandler.notFound(res, "Project not found");

      return ResponseHandler.success(res, { id, updateData }, "Project updated successfully");
    } catch (error) {
      console.error("Project update error:", error);
      return ResponseHandler.error(res, "Failed to update project", 500, error.message);
    }
  }
  static async deleteProject(req, res) {
    try {
      const { id } = req.params;
      const result = await Project.deleteProject(id);

      if (result.affectedRows === 0) return ResponseHandler.notFound(res, "Project not found");

      return ResponseHandler.success(res, { id }, "Project deleted successfully");
    } catch (error) {
      console.error("Project deletion error:", error);
      return ResponseHandler.error(res, "Failed to delete project", 500, error.message);
    }
  }
    static async getUsersByProject(req, res) {
    try {
      const { id } = req.params;
      const users = await Project.getUsersByProject(id);

      if (!users || users.length === 0) return ResponseHandler.notFound(res, "No users found for this project");

      return ResponseHandler.success(res, { users }, "Users retrieved successfully");
    } catch (error) {
      console.error("User retrieval error:", error);
      return ResponseHandler.error(res, "Failed to retrieve users", 500, error.message);
    }
  }
    static async getProjectsByDate(req, res) {
    try {
      const projects = await Project.getProjectbyDate();

      if (!projects || projects.length === 0) return ResponseHandler.notFound(res, "No projects found");

      return ResponseHandler.success(res, { projects }, "Projects retrieved successfully");
    } catch (error) {
      console.error("Project retrieval error:", error);
      return ResponseHandler.error(res, "Failed to retrieve projects", 500, error.message);
    }
  }
}

module.exports= ProjectController;