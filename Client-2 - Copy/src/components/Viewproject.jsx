import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { FaGithub } from "react-icons/fa";
import Img1 from '../Images/img1.jpg'
import Img2 from '../Images/img2.jpeg'
import Img3 from '../Images/img3.jpeg'
import Img4 from '../Images/img4.jpg'
import Img5 from '../Images/img5.jpg'
import Img6 from '../Images/img6.jpeg'
import Img7 from '../Images/img7.jpeg'
import Img8 from '../Images/img8.jpg'
import Img9 from '../Images/img9.jpg'
import Img10 from '../Images/img10.jpg'




export default function Viewproject() {
    const images = [Img1,Img2,Img3,Img4,Img5,Img6,Img7,Img8,Img9,Img10]
    const location  = useLocation()
    const {project} = location.state;
    console.log(location.state.project)


    const displayProject = project || {
        project_name: '',
        project_genre: '',
        git_repo: '',
        motivation: '',
        overview: '',
        features: [],
        imageUrl: '' 
    };

    const openRepo = () => {
        if (displayProject.git_repo) {
            window.open(displayProject.git_repo, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="bg-[#E9F0FF] min-h-screen font-sans p-4 sm:p-6 lg:p-8 2xl:p-12">
            <main className="max-w-screen-2xl mx-auto">
                <header className="mb-8 md:mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-extrabold text-gray-800 tracking-tight">{displayProject.project_name}</h1>
                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-500 mt-2">{displayProject.project_genre}</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 2xl:gap-12">
                    <div className="lg:col-span-2 flex flex-col gap-8 2xl:gap-12">
                        
                        <section className="bg-white p-6 rounded-xl shadow-lg">
                             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Project Showcase</h2>
                             <div className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                                {displayProject.imageUrl ? (
                                    <img src={displayProject.imageUrl} alt={`${displayProject.project_name} showcase`} className="w-full h-full object-cover" />
                                ) : (
                                   <img src={images[Math.floor(Math.random() * 9) + 1]}></img>
                                )}
                             </div>
                        </section>

                        <section className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Overview</h2>
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed">{displayProject.overview}</p>
                        </section>

                         <section className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Motivation</h2>
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed">{displayProject.motivation}</p>
                        </section>
                    </div>

                    <div className="flex flex-col gap-8 2xl:gap-12">
                         <section className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Repository</h2>
                            <button 
                                onClick={openRepo} 
                                className="w-full disabled:bg-[#4060C1] text-white font-semibold py-3 px-5 rounded-lg hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center gap-3 text-lg bg-[#6D8EF2] disabled:cursor-not-allowed"
                                disabled={!displayProject.git_repo}
                            >
                                <FaGithub size={'25'} />
                                <span>View on GitHub</span>
                            </button>
                        </section>

                        <section className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Features</h2>
                            <p>{displayProject.features}</p>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
