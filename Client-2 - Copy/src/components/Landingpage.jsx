import React, { useEffect, useState } from 'react';
import LandingImage from '../Images/LandingImage.png'
import LandingImageBlue from '../Images/LandingImageBlue.png'
import { useNavigate } from 'react-router-dom';
import { FaLongArrowAltRight, FaChevronDown, FaTwitter, FaDiscord, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Twitter, Facebook, Linkedin, Globe, Users, Award, ArrowRight } from 'lucide-react';
import { useHackathons } from '../hooks/HackathonContext';
const getHackathonStatus = (startDateStr, endDateStr) => {
    const now = new Date();
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    if (now > end) {
        return { text: 'Ended' };
    } else if (now >= start && now <= end) {
        return { text: 'Running' };
    } else {
        const daysLeft = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
        return { text: 'Upcoming', timeLeft: `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left` };
    }
};

/**
 * Returns Tailwind CSS classes based on the hackathon status text.
 * @param {string} statusText - The status text ('Upcoming', 'Running', 'Ended').
 * @returns {string} The corresponding CSS classes for styling.
 */
const getStatusClasses = (statusText) => {
    switch (statusText) {
        case 'Running':
            return 'bg-green-100 text-green-800';
        case 'Ended':
            return 'bg-red-100 text-red-800';
        case 'Upcoming':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};


// --- Data-driven Components ---

/**
 * A card component to display summary information about a single hackathon.
 * @param {object} props - The component props.
 * @param {object} props.info - The hackathon data object.
 */
const HackathonCard = ({ info }) => {
    const navigateto = useNavigate();
    const status = getHackathonStatus(info.starting_date, info.ending_date);
    const statusClasses = getStatusClasses(status.text);

    const handleCardClick = () => {
        
        console.log("Navigating to hackathon:", info.hackathon_name);
        const hackathon = info
        navigateto('/viewhackathon',{state:{hackathon}})
        
        
    };

    return (
        <div
            onClick={handleCardClick}
            className="bg-white border-l-4 border-teal-500 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer flex flex-col justify-between"
        >
            <div>
                <div className="flex items-center mb-4">
                    <img
                        src={info.hackathon_image || `https://placehold.co/48x48/E0E0E0/000000?text=${info.hackathon_name.charAt(0)}`}
                        alt={`${info.hackathon_name} logo`}
                        className="w-12 h-12 mr-4 rounded-md object-cover bg-gray-200"
                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/48x48/E0E0E0/000000?text=${info.hackathon_name.charAt(0)}`; }}
                    />
                    <div className="flex items-center text-gray-600">
                        <Globe size={16} className="mr-2" />
                        <span>{info.genre}</span>
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{info.hackathon_name}</h3>
                <div className="flex items-center text-sm mb-5">
                    <span className={`${statusClasses} font-semibold px-3 py-1 rounded-full`}>
                        {status.text === 'Upcoming' ? status.timeLeft : status.text}
                    </span>
                    <span className="ml-4 text-gray-500 font-medium">
                        {`${info.starting_date.split('T')[0]} - ${info.ending_date.split('T')[0]}`}
                    </span>
                </div>
            </div>
            <div className="flex items-center text-gray-800 pt-4 border-t border-gray-100">
                 {/* Prize and participant info can be added here if available */}
            </div>
        </div>
    );
};

export default function LandingPage() {
  
    const [display, setdisplay] = useState('grid')
    const [search,setsearch]=useState('')
    const { loading ,hackathons} = useHackathons();
    const [showhackathon,sethackathon]=useState([])
        useEffect(()=>{
            if(loading===false){
                sethackathon(hackathons)
            }
            let demohackathons =[];
            if(search.trim!=''){
                    demohackathons=hackathons.filter((prev)=>prev.hackathon_name.includes(search))
            }
            sethackathon(demohackathons)
        
    },[search,loading])
    if (loading === true) {
        return <h1 className='w-full bg-black'>The page is still loading </h1>
    }

    return (
        <div className='w-full h-[100%] xl:mt-.9    '>
            <div className='h-[40%] relative flex   image-container-buttons w-full xl:h-[60%] bg-sky-200 2xl:h-[40%] '>
                <img className='   w-full   md:h-[50%] xl:h-[90%]   object-cover 2xl:h-[700px]' src={LandingImageBlue}>
                </img>
                <div className="absolute inset-0 w-full flex flex-col sm:flex-row justify-center items-center gap-4 font-bold text-white px-4">
                    <button className="flex items-center gap-2 bg-[#4060C1] px-4 py-2 text-xs sm:text-sm md:px-11 md:py-6 md:text-base lg:text-lg rounded-md">
                        For Organizers
                        <FaLongArrowAltRight size={20} />
                    </button>

                    <button className="flex items-center gap-2 bg-[#6D8EF2] px-4 py-2 text-xs sm:text-sm md:text-base md:px-10 md:py-6 lg:text-lg rounded-md ">
                        For Participants
                        <FaLongArrowAltRight size={20} />
                    </button>
                </div>

            </div>
            <div className='w-full   bg-sky-200 h-25 flex items-center justify-center flex-row'>

                <input
                    type="search"
                    placeholder="Find your next hackathon"
                    value={search}
                    onChange={(e)=>{setsearch(e.target.value)}}
                    className="
    bg-white
    font-medium
    text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl mr-5
    px-2 py-1 sm:px-4 sm:py-2
    w-[150px] sm:w-[200px] md:w-[400px] lg:w-[600px] xl:w-[700px] 2xl:w-[800px]
    rounded-md
    outline-none border border-gray-300 focus:border-blue-500 transition h-10 sm:h-12 md:h-14 lg:h-16"
                />


                <input className=' bg-[#4060C1] text-white w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px] xl:w-[180px] 2xl:w-[200px] font-base sm:text-sm md:text-md lg:text-xl xl:text-xl 2xl:text-2xl h-9 sm:h-11 md:h-13 lg:h-16   font-sans  rounded-md  cursor-pointer     ' value={'Search'} type='submit'></input>
            </div>
            <div className="p-4">
                <h2 onClick={() => { setdisplay((prev) => { return prev === 'hidden' ? 'grid' : 'hidden' }) }} className="cursor-pointer text-lg sm:text-xl md:text-2xl font-semibold text-center mb-4">
                    Show hackathons
                </h2>

                <div className={`${display} grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-6 `}>
                    {showhackathon.map((info, index) => (
                        <HackathonCard key={index} info={info} />
                    ))}
                </div>
            </div>


            <footer className="bg-slate-100 text-gray-800 py-12 px-4 sm:px-6 lg:px-8 mt-10">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Devpost Column */}
                    <div>
                        <h3 className="font-bold text-base mb-4">Devfiesta</h3>
                        <ul className="space-y-3 text-base">
                            <li><a href="#" className="hover:underline">About</a></li>
                            <li><a href="#" className="hover:underline">Careers</a></li>
                            <li><a href="#" className="hover:underline">Contact</a></li>
                            <li><a href="#" className="hover:underline">Help</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-base mb-4">Hackathons</h3>
                        <ul className="space-y-3 text-base">
                            <li><a href="#" className="hover:underline">Browse hackathons</a></li>
                            <li><a href="#" className="hover:underline">Explore projects</a></li>
                            <li><a href="#" className="hover:underline">Host a hackathon</a></li>
                            <li><a href="#" className="hover:underline">Hackathon guides</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-base mb-4">Portfolio</h3>
                        <ul className="space-y-3 text-base">
                            <li><a href="#" className="hover:underline">Your projects</a></li>
                            <li><a href="#" className="hover:underline">Your hackathons</a></li>
                            <li><a href="#" className="hover:underline">Settings</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-base mb-4">Connect</h3>
                        <ul className="space-y-3 text-base">
                            <li>
                                <a href="#" className="flex items-center gap-2 hover:underline">
                                    <FaTwitter /> Twitter
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center gap-2 hover:underline">
                                    <FaDiscord /> Discord
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center gap-2 hover:underline">
                                    <FaFacebook /> Facebook
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center gap-2 hover:underline">
                                    <FaLinkedin /> LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}