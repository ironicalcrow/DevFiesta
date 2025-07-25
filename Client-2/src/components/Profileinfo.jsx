import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../hooks/AutoAuth';
import axios from 'axios';

const StatItem = ({ value, label, onClick, isActive }) => (
    <div onClick={onClick} className={`text-center cursor-pointer p-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-800 hover:bg-gray-100'}`}>
        <p className="text-lg md:text-xl 2xl:text-2xl font-bold">{value}</p>
        <p className="text-[10px] sm:text-xs 2xl:text-sm font-semibold tracking-wider">{label}</p>
    </div>
);

const ProjectCard = ({ project }) => {
    const goto = useNavigate();
    console.log('this is the project data', project);
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{project.project_name}</h3>
                <p className="text-sm font-medium text-teal-600 mb-4">{project.genre}</p>
                <p className="text-sm font-medium text-teal-600 mb-4">{project.git_repo}</p>
                <p className="text-gray-600 text-sm h-20 overflow-hidden">{project.overview}</p>
            </div>
            <div className="bg-gray-50 px-6 py-3">
                <a onClick={() => { console.log('see if it prints', project); goto('/viewproject', { state: { project } }) }} className="text-blue-500 hover:underline font-semibold text-sm cursor-pointer">View Project</a>
            </div>
        </div>
    )
};

const HackathonCard = ({ hackathon }) => {
    const goto = useNavigate();
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{hackathon.hackathon_name}</h3>
                <p className="text-sm font-medium text-purple-600 mb-4">{hackathon.theme}</p>
                <p className="text-gray-600 text-sm h-20 overflow-hidden">{hackathon.overview}</p>
            </div>
            <div className="bg-gray-50 px-6 py-3">
                <a onClick={() => goto('/viewhackathon', { state: { hackathon } })} className="text-blue-500 hover:underline font-semibold text-sm cursor-pointer">View Hackathon</a>
            </div>
        </div>
    )
};


const PortfolioPage = () => {
    const navigateto = useNavigate();
    const { User, loading } = userContext();

    const [activeTab, setActiveTab] = useState('projects');
    
    const [projects, setProjects] = useState([]);
    const [projectlength, setProjectlength] = useState(0);

    const [hackathons, setHackathons] = useState([]);
    const [hackathonlength, setHackathonlength] = useState(0);

    useEffect(() => {
        const fetchProjects = async (username, token) => {
            try {
                const response = await axios.post('http://localhost:4000/api/project/my-projectS', { username }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });
                const projectrecieved = response.data.data.projects || [];
                setProjects(projectrecieved);
                setProjectlength(projectrecieved.length);
                console.log("Projects received:", projectrecieved);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        const fetchHackathons = async (username, token) => {
            try {
                const response = await axios.post('http://localhost:4000/api/hackathon/my-hackathons', { username }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });
                const hackathonsReceived = response.data.data.hackathons || [];
                setHackathons(hackathonsReceived);
                setHackathonlength(hackathonsReceived.length);
                console.log("Hackathons received:", hackathonsReceived);
            } catch (error) {
                console.error('Error fetching hackathons:', error);
                const mockHackathons = [
                   
                ];
                setHackathons(mockHackathons);
                setHackathonlength(mockHackathons.length);
            }
        };

        const token = localStorage.getItem('token');
        const projectUser = JSON.parse(localStorage.getItem('user'));
        const username = projectUser?.username;

        if (username && token) {
            fetchProjects(username, token);
            fetchHackathons(username, token);
        }
    }, []);

    if (loading) {
        return <div className="flex bg-[#E9F0FF] justify-center items-center h-screen text-xl">Loading profile...</div>;
    }

    const placeholderText = User?.username ? User.username.slice(0, 2).toUpperCase() : '..';
    const profileImage = User?.imageUrl || `https://placehold.co/192x192/EFEFEF/333333?text=${placeholderText}`;

    return (
        <div className="bg-[#E9F0FF] min-h-screen font-sans">
            <div className="w-full max-w-6xl mx-auto p-2 sm:p-4 xl:max-w-7xl 2xl:max-w-none 2xl:px-32">
                <div className="md:relative">
                    <div className="h-32 md:h-48 xl:h-56 2xl:h-64 bg-[#BCCDFF] rounded-t-lg flex justify-end items-start p-2 sm:p-4">
                    </div>

                    <div className="flex flex-col items-center -mt-16 md:flex-row md:items-end md:absolute md:top-24 md:left-8 xl:top-28 xl:left-12 2xl:top-36 2xl:left-16 md:gap-6">
                        <div className="w-28 h-28 md:w-40 md:h-40 xl:w-44 xl:h-44 2xl:w-48 2xl:h-48 rounded-full bg-gray-300 border-4 border-white shadow-lg overflow-hidden flex-shrink-0">
                            <img
                                src={profileImage}
                                alt={`${User?.full_name || 'User'}'s profile picture`}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="text-center md:text-left mt-2 md:mt-0 md:pb-4 xl:pb-6 2xl:pb-8">
                            <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-800">
                                {User?.full_name}
                                <span className="text-lg md:text-xl xl:text-2xl font-normal text-gray-500 block sm:inline"> ({User?.username})</span>
                            </h1>
                            <a href="#" className="text-sm xl:text-base text-blue-500 hover:underline mt-1 block">
                                Add your skills, interests, bio, and location.
                            </a>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-b-lg shadow-md pt-4 md:pt-24 xl:pt-28 2xl:pt-32 px-4 sm:px-8 xl:px-12 pb-6">
                    <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 md:mt-0 mb-8 xl:mb-10">
                        <button className="w-full sm:w-auto bg-blue-500 text-white font-semibold py-2 px-4 xl:py-3 xl:px-5 xl:text-lg rounded-md hover:bg-blue-600 transition-colors duration-200">
                            Edit info & settings
                        </button>
                        <button onClick={() => { navigateto('/addproject') }} className="w-full sm:w-auto bg-[#BCCDFF] text-black font-semibold py-2 px-4 xl:py-3 xl:px-5 xl:text-lg rounded-md hover:bg-teal-600 transition-colors duration-200">
                            Add a new project
                        </button>
                    </div>

                    <div className="border-t border-gray-200 pt-4 xl:pt-6">
                        <div className="grid grid-cols-2 gap-2 text-center md:flex md:justify-start md:text-left md:gap-8 xl:gap-12">
                            <StatItem value={projectlength} label="PROJECTS" onClick={() => setActiveTab('projects')} isActive={activeTab === 'projects'} />
                            <StatItem value={hackathonlength} label="HACKATHONS" onClick={() => setActiveTab('hackathons')} isActive={activeTab === 'hackathons'} />
                            <StatItem value="0" label="ACHIEVEMENT" />
                            <StatItem value="0" label="LIKES" />
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    {activeTab === 'projects' && (
                        <>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 px-4 sm:px-0">Projects</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {projects.map((project, index) => (
                                    <ProjectCard key={index} project={project} />
                                ))}
                            </div>
                        </>
                    )}
                     {activeTab === 'hackathons' && (
                        <>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 px-4 sm:px-0">Hackathons</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {hackathons.map((hackathon, index) => (
                                    <HackathonCard key={index} hackathon={hackathon} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PortfolioPage;
