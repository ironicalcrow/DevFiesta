const User = require("../models/user")
const ResponseHandler = require("../utils/responseHandler")
const PaginationUtils = require("../utils/pagination")
const AuthController= require("../controllers/authController");
const Hackathon= require("../models/hackathon");

class hackathonController{
    static async host_hackathons(req,res)
    {
        try
        {
            console.log('it is done')
            const
            {
                hackathon_name,host_username,duration,genre,rule_book,hackathon_image,starting_date,ending_date,judge_username
            }= req.body;

            const hackathon_data= {hackathon_name,duration,genre,rule_book,hackathon_image,starting_date,ending_date,judge_username};

            const  hackathon_id= await Hackathon.host_hackathon(hackathon_data,host_username);
            
            ResponseHandler.success(res,{
                hackathon_id,hackathon_data
            },"Hackathon hosted Successfully");
        }
        catch(error)
        {
            console.error("Hackathon hosting failed",error);
            ResponseHandler.error(res,"Hackathon Hosting Failed",500,error.message);
        }
    }

    static async retrieve_hackathon(req,res)
    {
        try
        {
            console.log('reached here ')
            const {username}= req.user;

            const hackathons= await Hackathon.get_hackathon_by_username(username);

            if(!hackathons || hackathons.length===0)
                {
                    return ResponseHandler.notFound(res,`No Hackathon Hosted By ${username}`);
                }

            return ResponseHandler.success(
                    res,
                    {
                        hackathons
                    },
                    `Hackathon Retrieved Succesfully`
                );    
        }
        catch(error)
        {
            console.error(`Error Retrieveing Hackathon: `,error);
            ResponseHandler.error(res,`Failed Retrieving Hackathon`,500,error.message);
        }
    }

    static async get_hackathons_by_name(req,res)
    {
        try
        {
            const {hackathon_name}= req.params;
            const hackathons= await Hackathon.get_hackathon_by_name(hackathon_name);
            if(!hackathons || hackathons.length===0)
            {
                return ResponseHandler.notFound(res,`No hackathon named ${hackathon_name} found`);
            }
            return ResponseHandler.success(res,{
                hackathons
            },`Hackathon found`);
        }
        catch(error)
        {
            console.error(`Error Retreiving Hackathon:`,error);
            ResponseHandler.error(res,`Failed Finding Hackathon ${hackathon_name}`,error.message);
        }
    }

    static async get_hackathons_by_genre(req,res)
    {
        try
        {
            const { genre }= req.params;
            const hackathons= await Hackathon.get_hackathon_by_genre(genre);
            if(!hackathons || hackathons.length===0)
            {
                return ResponseHandler.notFound(res,`No hackathon of the genre ${genre} found`);
            }
            return ResponseHandler.success(res,{
                hackathons
            },`Hackathon found`);
        }
        catch(error)
        {
            console.error(`Error Retriving hackathon`,error);
            ResponseHandler.error(res,`Failed to retrieve Hackathon`,error.message);
        }
    }

    static async get_hackathons_by_duration(req,res)
    {
        try
        {
            const {duration}= req.params;
            const hackathons= await Hackathon.get_hackathon_by_duration(duration);
            if(!hackathons || hackathons.length===0)
            {
                return ResponseHandler.notFound(res,`No hackathon of the duration ${duration} found`);
            }
            return ResponseHandler.success(res,{
                hackathons
            },`Hackathon found`);
        }
        catch(error)
        {
            console.error(`Error Retriving hackathon`,error);
            ResponseHandler.error(res,`Failed to retrieve Hackathon`,error.message);
        }
    }

    static async getJudgedetails(req,res)
    {
        try
        {
            const{hackathon_id}=req.params;

            const judges= await Hackathon.get_judge_details(hackathon_id);

            if(!judges || judges.length===0)
            {
               return ResponseHandler.notFound(res,`No Judges Found`);
            }

            return ResponseHandler.success(res,{judges},`Judges Found Successfully`);
        }
        catch(error)
        {
            console.error(`Error Finding Judges: `,error);
            ResponseHandler.error(res,`Failed Retrieving Judges info`,error.message);
        }
    }

    static async get_all_hackathon(req,res)
    {
        try
        {
            const hackathons = await Hackathon.get_all_hackathon();
            if(!hackathons||hackathons.length===0)
            {
                return ResponseHandler.notFound(res,`No Hackathon Found`);
            }

            return ResponseHandler.success(res,{hackathons},'Retrievied successfully');
        }
        catch(error)
        {
            console.error(`Error Retrieving Hackathon: `,error);
            ResponseHandler.error(res,`Could not retrieve Hackathon`,error.message);
        }
    }

    static async get_judges_hackathons(req,res)
    {
    try{ 
        const{username}= req.user;
        const hackathons= await Hackathon.get_hackathons_by_judges(username);
        if(!hackathons||hackathons.length===0)
            {
                return ResponseHandler.notFound(res,`No Hackathon Hosted By ${username}`);
            }
        return ResponseHandler.success(res,{hackathons},'Retrievied successfully');
    }
    catch(error)
    {
        console.error(`Error Retrieveing Hackathon: `,error);
        ResponseHandler.error(res,`Failed Retrieving Hackathon`,500,error.message);
    }
    }

    static async get_judges_all_hackathons(req,res)
    {
    try{ 
        const{username}= req.user;
        const hackathons= await Hackathon.get_all_hackathons_by_judges(username);
        if(!hackathons||hackathons.length===0)
            {
                return ResponseHandler.notFound(res,`No Hackathon Hosted By ${username}`);
            }
        return ResponseHandler.success(res,{hackathons},'Retrievied successfully');
    }
    catch(error)
    {
        console.error(`Error Retrieveing Hackathon: `,error);
        ResponseHandler.error(res,`Failed Retrieving Hackathon`,500,error.message);
    }
    }
    
}

module.exports= hackathonController;