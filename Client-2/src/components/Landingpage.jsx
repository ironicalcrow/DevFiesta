import React, { useEffect, useState } from 'react';
import LandingImage from '../Images/LandingImage.png'
import LandingImageBlue from '../Images/LandingImageBlue.png'
import { useNavigate } from 'react-router-dom';
import { FaLongArrowAltRight, FaChevronDown, FaTwitter, FaDiscord, FaFacebook, FaLinkedin } from "react-icons/fa";



export default function LandingPage() {
    const [display, setdisplay] = useState('hidden')
    console.log('This is working fine')
    const dummy = Array.from({ length: 16 }, (_, i) => i);


    return (
        <div className='w-full h-[100%] xl:mt-.9    '>
            <div className='h-[40%] relative flex   image-container-buttons w-full xl:h-[60%] bg-sky-200 2xl:h-[40%] '>
                <img className='   w-full   md:h-[50%] xl:h-[90%]   object-cover 2xl:h-[700px]' src={LandingImageBlue}>
                </img>
                <div className="absolute inset-0 w-full flex flex-col sm:flex-row justify-center items-center gap-4 font-bold text-white px-4">
                    <button className="flex items-center gap-2 bg-blue-500 px-4 py-2 text-xs sm:text-sm md:px-11 md:py-6 md:text-base lg:text-lg rounded-md">
                        For Organizers
                        <FaLongArrowAltRight size={20} />
                    </button>

                    <button className="flex items-center gap-2 bg-green-500 px-4 py-2 text-xs sm:text-sm md:text-base md:px-10 md:py-6 lg:text-lg rounded-md">
                        For Participants
                        <FaLongArrowAltRight size={20} />
                    </button>
                </div>

            </div>
            <div className='w-full   bg-sky-200 h-25 flex items-center justify-center flex-row'>

                <input
                    type="search"
                    placeholder="Search for hackathons..........."
                    className="
    bg-white
    font-medium
    text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl
    px-2 py-1 sm:px-4 sm:py-2
    w-[150px] sm:w-[200px] md:w-[400px] lg:w-[600px] xl:w-[700px] 2xl:w-[800px]
    rounded-md
    outline-none border border-gray-300 focus:border-blue-500 transition h-10 sm:h-12 md:h-14 lg:h-16"
                />


                <input className=' bg-blue-300 w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px] xl:w-[180px] 2xl:w-[200px] font-base sm:text-sm md:text-md lg:text-xl xl:text-xl 2xl:text-2xl h-10 sm:h-12 md:h-14 lg:h-16         ' value={'Search'} type='submit'></input>
            </div>
            <div className="p-4">
                <h2 onClick={() => { setdisplay((prev) => { return prev === 'hidden' ? 'grid' : 'hidden' }) }} className="cursor-pointer text-lg sm:text-xl md:text-2xl font-semibold text-center mb-4">
                    Show hackathons
                </h2>

                <div className={`${display} grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-6 `}>
                    {dummy.map((item, index) => (
                        <div
                            key={index}
                            className="bg-sky-100 rounded-xl h-24 md:h-32 xl:h-40 shadow-md"
                        >

                        </div>
                    ))}
                </div>
            </div>


            <footer className="bg-slate-100 text-gray-800 py-12 px-4 sm:px-6 lg:px-8 mt-10">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Devpost Column */}
                    <div>
                        <h3 className="font-bold text-base mb-4">Devpost</h3>
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