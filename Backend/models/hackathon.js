const { pool } = require("../config/database");
const User = require("../models/user");

class hackathon{
    static async host_hackathon(hackathon_data, username)
    {
        const{
            hackathon_name,
            duration,
            genre,
            rule_book,
            hackathon_image,
            starting_date,
            ending_date,
            judge_username,
        }=hackathon_data;
        console.log(hackathon.data)
        const [hackathon_result]= await pool.execute(`insert into hackathon(hackathon_name,host_username,duration,genre,rule_book,hackathon_image,starting_date,ending_date,added_date) values(?,?,?,?,?,?,?,?,NOW())`,[hackathon_name,username,duration,genre,rule_book,hackathon_image,starting_date,ending_date]);

        const hackathon_id= hackathon_result.insertId;

        const judgeUsernames = judge_username.split(",").map(j => j.trim());

        for(const judge_users of judgeUsernames)
        {
            const user = User.findByUsername(judge_users);
            if(user)
            {
                await pool.execute(`insert into judges(judge_username,hackathon_id) values(?,?)`,[judge_users,hackathon_id]);
            }
            else
            {
                console.warn(`User not found, Username: ${judge_user}!!! Skipping judge_entry`);
            }
        }
        return hackathon_id;
    }

    static async get_hackathon_by_username(username)
    {
        const [hackathon]= await pool.execute(`select * from hackathon where host_username=?`,[username]);
        return hackathon;
    }
    static async get_hackathon_by_genre(genre)
    {
        const [hackathon]= await pool.execute(`select * from hackathon where genre=?`,[genre]);
        return hackathon;
    }
    static async get_all_hackathon()
    {
        const [hackathon]= await pool.execute(`select * from hackathon order by added_date DESC`);
        return hackathon;
    }
    static async get_hackathon_by_id(hackathon_id)
    {
        const[hackathon]= await pool.execute(`select * from hackathon where hackathon_id=?`,[hackathon_id]);
        return hackathon;
    }

    static async get_judge_details(hackathon_id)
    {
        const[judge]=await pool.execute(`select * from users u join judges j on u.username=judge_username where j.hackathon_id=?`,[hackathon_id]);
        return judge;
    }

    static async get_hackathon_by_name(hackathon_name)
    {
        const[hackathon]= await pool.execute(`select * from hackathon where hackathon_name=?`,[hackathon_name]);
        return hackathon;
    }
    
    static async get_hackathon_by_duration(duration)
    {
        const[hackathon]= await pool.execute(`select * from hackathon where duration=?`,[duration]);
        return hackathon;
    }

    static async get_hackathons_by_judges(judge_username)
    {
        const[hackathon]= await pool.execute(`select * from hackathon h join judges j on h.hackathon_id=j.hackathon_id where j.judge_username=? and h.ending_date >= current_date`,[judge_username]);
        return hackathon;
    }

        static async get_all_hackathons_by_judges(judge_username)
    {
        const[hackathon]= await pool.execute(`select * from hackathon h join judges j on h.hackathon_id=j.hackathon_id where j.judge_username=?`,[judge_username]);
        return hackathon;
    }

}    
  
module.exports= hackathon;