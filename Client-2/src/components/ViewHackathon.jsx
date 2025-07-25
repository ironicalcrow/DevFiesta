import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Globe, Users, Award, Tag, ChevronRight } from 'lucide-react';


const ViewHackathonPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    

    const { hackathon } = location.state || { 
        hackathon: {
            hackathon_name: "Sample Hackathon",
            theme: "Sample Theme",
            overview: "This is a sample overview for a hackathon. Build cool things!"
        }
    };


    const mockData = {
        participants: 0,
        prize: "0",
        schedule: "No Date",
        tags: []
    };

    const navItems = ["Overview", "My projects", "Participants", "Rules", "Project gallery", "Updates", "Discussions"];

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
    
            <div className="h-56 bg-[#6D8EF2] flex items-center justify-center pattern-bg">
                 <div className="text-center text-white">
                   
                    <h1 className="text-5xl font-bold">{hackathon.hackathon_name}</h1>
                    <p className="text-xl mt-2">{hackathon.theme}</p>
                 </div>
            </div>

            <nav className="bg-white shadow-md sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center">
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-6">
                                    {navItems.map((item, index) => (
                                        <a
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
                        <h1 className="text-5xl font-bold text-gray-900">{hackathon.hackathon_name}</h1>
                        <p className="mt-4 text-2xl text-gray-600">{hackathon.overview}</p>

                        <button className="mt-10 bg-[#6D8EF2] text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors text-lg">
                            Join hackathon
                        </button>

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
                                <p className="text-base font-bold text-red-500 bg-orange-100 px-4 py-1.5 rounded-full">Submissions open soon</p>
                                <a href="#" className="text-base text-blue-600 hover:underline">View schedule</a>
                            </div>
                            
                            <div className="mt-8 flex items-center text-gray-800">
                                <Calendar className="h-6 w-6 text-gray-500" />
                                <p className="ml-4 font-semibold text-lg">{mockData.schedule}</p>
                            </div>

                            <div className="mt-10 border-t border-gray-200 pt-8 space-y-5 text-base">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center text-gray-600"><Globe className="h-5 w-5 mr-3"/> Online</span>
                                    <span className="font-semibold text-gray-900">Public</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center text-gray-600"><Award className="h-5 w-5 mr-3"/> Prize pool</span>
                                    <span className="font-semibold text-gray-900">${mockData.prize} in cash</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center text-gray-600"><Users className="h-5 w-5 mr-3"/> Participants</span>
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
