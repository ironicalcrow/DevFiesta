const { pool } = require("../config/database");

class Project {
  static async createProject(projectData, username) {
    const {
      project_name,
      git_repo,
      overview,
      motivation,
      features,
      project_genre,
    } = projectData;

    const [projectResult] = await pool.execute(
      `INSERT INTO projects (
        project_name, git_repo, overview, motivation, features, project_genre, creation_date
      ) VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [project_name, git_repo, overview, motivation, features, project_genre]
    );

    const project_id = projectResult.insertId;

    await pool.execute(
      `INSERT INTO p_u_junction (project_id, username) VALUES (?, ?)`,
      [project_id, username]
    );

    return { project_id };
  }
  static async createProject_for_team(projectData, usernames) {
    const {
      project_name,
      git_repo,
      overview,
      motivation,
      features,
      project_genre,
    } = projectData;

    const [projectResult] = await pool.execute(
      `INSERT INTO projects (
        project_name, git_repo, overview, motivation, features, project_genre, creation_date
      ) VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [project_name, git_repo, overview, motivation, features, project_genre]
    );

    const project_id = projectResult.insertId;

    for (const Participants of usernames) {
                const participants_username = (Participants.username || "").trim();
                if (!participants_username) continue;

                const user = await User.findByUsername(participants_username);
                if (user) {
                  await pool.execute(`INSERT INTO p_u_junction (project_id, username) VALUES (?, ?)`,[project_id, participants_username]);
                } 
                else {
                  console.warn(`User not found: ${judge_username} — skipping judge_entry`);
                }
    }

    return { project_id };
  }

  static async getProjectById(project_id) {
    const [projects] = await pool.execute(
      `SELECT * FROM projects WHERE project_id = ?`,
      [project_id]
    );
    return projects[0] || null;
  }

  static async getAllProjects() {
    const [projects] = await pool.execute(`SELECT * FROM projects`);
    return projects;
  }

  static async getProjectsByUsername(username) {
    const [projects] = await pool.execute(
      `SELECT * FROM projects p
       JOIN p_u_junction pu ON p.project_id = pu.project_id
       WHERE pu.username = ?`,
      [username]
    );
    return projects;
  }

  static async updateProject(project_id, updateData) {
    const {
      project_name,
      git_repo,
      overview,
      motivation,
      features,
      project_genre,
    } = updateData;

    const [result] = await pool.execute(
      `UPDATE projects SET
        project_name = COALESCE(?, project_name),
        git_repo = COALESCE(?, git_repo),
        overview = COALESCE(?, overview),
        motivation = COALESCE(?, motivation),
        features = COALESCE(?, features),
        project_genre = COALESCE(?, project_genre)
       WHERE project_id = ?`,
      [
        project_name,
        git_repo,
        overview,
        motivation,
        features,
        project_genre,
        project_id,
      ]
    );

    return result;
  }

  static async deleteProject(project_id) {
    await pool.execute(
      `DELETE FROM p_u_junction WHERE project_id = ?`,
      [project_id]
    );

    const [result] = await pool.execute(
      `DELETE FROM projects WHERE project_id = ?`,
      [project_id]
    );

    return result;
  }

  static async getUsersByProject(project_id) {
    const [users] = await pool.execute(
      `SELECT u.username, u.full_name FROM users u
       JOIN p_u_junction pu ON u.username = pu.username
       WHERE pu.project_id = ?`,
      [project_id]
    );
    return users;
  }
    static async getProjectsByGenre(project_genre) {
    const [projects] = await pool.execute(
      `SELECT * FROM projects WHERE project_genre = ?`,
      [project_genre]
    );
    return projects;
  }

  static async getProjectbyDate()
  {
        const[projects]= await pool.execute(
          `select * from projects order by creation_date DESC;`
        )
        return projects;
  }
}

module.exports = Project;
