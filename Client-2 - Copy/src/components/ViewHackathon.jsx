import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Globe, Users, Award, Tag, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const getHackathonStatus = (startDateStr, endDateStr) => {
    const now = new Date();
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    if (now > end) {
        return { text: 'Hackathon Ended', classes: 'bg-red-100 text-red-700' };
    } else if (now >= start && now <= end) {
        const daysLeft = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
        return { text: `Running • ${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`, classes: 'bg-green-100 text-green-700' };
    } else {
        const daysLeft = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
        return { text: `Starts in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`, classes: 'bg-blue-100 text-blue-700' };
    }
};


const ViewHackathonPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const hackathon = location?.state;
    const User = location?.state?.User || 'Host';

    if (hackathon === null) {
        return <div>Nothing to show</div>;
    }

    localStorage.setItem('tempP', JSON.stringify(hackathon.hackathon));

    const finalData = location?.state?.finalData || JSON.parse(localStorage.getItem('tempP'));

    const status = getHackathonStatus(finalData.starting_date, finalData.ending_date);

    const mockData = {
        participants: 0,
        prize: "0",
        schedule: "No Date",
        starting_date: '',
        ending_date: '',
        tags: []
    };

    const navItems = ["Overview", "My projects", "Participants", "Rules", "Project gallery", "Updates", "Discussions"];

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <div className="h-90 flex items-center justify-center pattern-bg">
                <img src={finalData.hackathon_image} className='relative w-full h-full object-cover' alt="Hackathon Banner" />
            </div>

            <nav className="bg-white shadow-md sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center">
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-6">
                                    {navItems.map((item, index) => (
                                        <a
                                            onClick={() => {
                                                if (item === 'Rules') {
                                                    window.location.href = `${finalData?.rule_book}`;
                                                }
                                            }}
                                            key={item}
                                            href="#"
                                            className={`px-4 py-2 rounded-md text-base font-medium ${index === 0 ? ' text-black' : 'text-gray-700 hover:bg-gray-100'}`}
                                        >
                                            {item}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2">
                        <h1 className="text-5xl font-bold text-gray-900">{finalData?.hackathon_name}</h1>

                        <div className="mt-10">
                            {User === 'Host' && (
                                <div className="flex flex-wrap gap-4">
                                    <button className="bg-[#6D8EF2] text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors text-lg">
                                        View Projects
                                    </button>
                                    <Link to={'/judges'} state={{ID:finalData?.hackathon_id}} className="bg-[#6D8EF2] text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors text-lg text-center">
                                        View Judges
                                    </Link>
                                    <button className="bg-[#6D8EF2] text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors text-lg">
                                        Show Leaderboard
                                    </button>
                                </div>
                            )}

                            {User === 'Judge' && (
                                <div className="flex flex-wrap gap-4">
                                    <button className="bg-[#6D8EF2] text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors text-lg">
                                        Add Marks
                                    </button>
                                    <button className="bg-[#6D8EF2] text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors text-lg">
                                        View Projects
                                    </button>
                                </div>
                            )}

                            {User === 'participant' && (
                                <button className="bg-[#6D8EF2] text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors text-lg">
                                    Add project
                                </button>
                            )}

                            {User === 'normal' && (
                                <button className="bg-[#6D8EF2] text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors text-lg">
                                    Join Hackathon
                                </button>
                            )}
                        </div>

                        <div className="mt-16 border-t border-gray-200 pt-10">
                            <h2 className="text-3xl font-semibold text-gray-800">Who can participate</h2>
                            <ul className="mt-6 list-disc list-inside text-gray-700 space-y-3 text-lg">
                                <li>Above legal age of majority in country of residence</li>
                                <li>All countries/territories, excluding standard exceptions</li>
                            </ul>
                            <a href="#" className="mt-6 inline-block text-blue-600 hover:underline text-lg">
                                View full rules <ChevronRight className="inline h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <aside>
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <div className="flex items-center justify-between">
                                <p className={`text-base font-bold px-4 py-1.5 rounded-full ${status.classes}`}>
                                    {status.text}
                                </p>
                                <a href="#" className="text-base text-blue-600 hover:underline">View schedule</a>
                            </div>

                            <div className="mt-8 flex flex-col text-gray-800 gap-2">
                                <div className='flex flex-row '>
                                    <Calendar className="h-6 w-6 text-gray-500" />
                                    <p className="ml-4 font-semibold text-lg">{finalData.starting_date.split('T')[0]}</p>
                                </div>
                                <div className='flex flex-row '>
                                    <Calendar className="h-6 w-6 text-gray-500" />
                                    <p className="ml-4 font-semibold text-lg">{finalData.ending_date.split('T')[0]}</p>
                                </div>
                            </div>

                            <div className="mt-10 border-t border-gray-200 pt-8 space-y-5 text-base">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center text-gray-600"><Globe className="h-5 w-5 mr-3" /> Online</span>
                                    <span className="font-semibold text-gray-900">{finalData?.genre}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center text-gray-600"><Award className="h-5 w-5 mr-3" /> Prize pool</span>
                                    <span className="font-semibold text-gray-900">${mockData.prize} in cash</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center text-gray-600"><Users className="h-5 w-5 mr-3" /> Participants</span>
                                    <span className="font-semibold text-gray-900">{mockData.participants}</span>
                                </div>
                            </div>

                            <div className="mt-10 border-t border-gray-200 pt-8">
                                <h3 className="text-base font-semibold text-gray-500 uppercase tracking-wider">Tags</h3>
                                <div className="mt-4 flex flex-wrap gap-3">
                                    {mockData.tags.map(tag => (
                                        <span key={tag} className="bg-gray-200 text-gray-800 text-sm font-semibold px-3 py-1.5 rounded-full flex items-center">
                                            <Tag className="h-4 w-4 mr-2" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default ViewHackathonPage;