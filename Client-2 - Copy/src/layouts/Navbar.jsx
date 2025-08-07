import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import { IoMdSearch, IoIosClose } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import Logo from '../Images/logo.png';
import { userContext } from '../hooks/AutoAuth';

const Navbar = () => {
    const navigateto = useNavigate();
    const [showJoinDropdown, setShowJoinDropdown] = useState(false);
    const [showHostDropdown, setShowHostDropdown] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const joinRef = useRef(null);
    const hostRef = useRef(null);
    const profileRef = useRef(null);

    const { User, setUser, loading, logout } = userContext();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (joinRef.current && !joinRef.current.contains(event.target)) {
                setShowJoinDropdown(false);
            }
            if (hostRef.current && !hostRef.current.contains(event.target)) {
                setShowHostDropdown(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (loading) return <div>Data still not reached</div>;

    const Logout = () => {
        logout();
        navigateto('/');
    };

    const checkIfLoggedin = () => {
        if (User) {
            navigateto('/hostingpage');
        } else {
            alert('You need to be logged in first');
            navigateto('/login');
        }
    };

    return (
        <div className='relative z-50 bg-white w-full h-22 text-md font-medium shadow-lg mb-0.5 flex items-center justify-between'>
            <div className='relative md:w-100 lg:w-140 xl:w-180 2xl:w-220 max-h-full flex md:gap-1 xl:gap-2 flex-col md:flex-row justify-end items-center'>
                <img
                    onClick={() => { navigateto('/') }}
                    className="md:flex max-h-22 cursor-pointer md:pt-4 md:object-cover xl:h-22 xl:w-1/5"
                    src={Logo}
                    alt="Logo"
                />

                <div ref={joinRef} className='relative text-black flex flex-row items-center justify-center xl:h-full xl:w-1/4'>
                    <a href='#' onClick={(e) => {
                        e.preventDefault();
                        setShowJoinDropdown(prev => !prev);
                    }} className='flex flex-row items-center lg:whitespace-nowrap justify-center sm:text-sm md:text-sm lg:text-lg xl:text-xl 2xl:text-xl'>
                        Join a Hackathon
                        <FaAngleDown className='hidden lg:block xl:h-full xl:pt-0.5 xl:pl-0.5 xl:ml-1/2' />
                    </a>
                    {showJoinDropdown && (
                        // CHANGE: Lowered dropdown with `mt-3` and increased width with `w-56`
                        <div className="absolute top-full mt-3 w-56 bg-white shadow-lg border rounded-xl flex flex-col z-50 p-2 space-y-1 transition-all duration-150 ease-in-out">
                            <a
                                onClick={(e) => { e.preventDefault(); setShowJoinDropdown(false); navigateto('/hackathons'); }}
                                href="#"
                                className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-green-50 hover:text-green-600 transition-all duration-150 text-base"
                            >
                                🧭 Explore Hackathons
                            </a>
                            <a
                                onClick={(e) => { e.preventDefault(); setShowJoinDropdown(false);
                                    navigateto('/projects')
                                }}
                                href="#"
                                className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-150 text-base"
                            >
                                🔑 Explore Projects
                            </a>
                        </div>
                    )}
                </div>

                <div ref={hostRef} className='relative'>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        setShowHostDropdown(prev => !prev);
                    }} className='flex flex-row items-center justify-center sm:text-sm md:text-sm lg:text-lg xl:text-xl 2xl:text-xl'>
                        Host a Hackathon
                        <FaAngleDown className="hidden lg:block ml-1" />
                    </a>
                    {showHostDropdown && (
                        // CHANGE: Lowered dropdown with `mt-3` and increased width with `w-56`
                        <div className="absolute top-full mt-3 w-56 bg-white shadow-lg border rounded-xl flex flex-col z-50 p-2 space-y-1 transition-all duration-150 ease-in-out">
                            <a
                                onClick={(e) => { e.preventDefault(); setShowHostDropdown(false); navigateto('/hackathons'); }}
                                href="#"
                                className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-green-50 hover:text-green-600 transition-all duration-150 text-base"
                            >
                                🌍 Explore Hackathons
                            </a>
                            <a
                                onClick={(e) => { e.preventDefault(); setShowHostDropdown(false); checkIfLoggedin(); }}
                                className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-green-50 hover:text-green-600 transition-all duration-150 text-base"
                            >
                                🚀 Host a Hackathon
                            </a>
                            <a
                                onClick={(e) => { e.preventDefault(); setShowHostDropdown(false);
                                    checkIfLoggedin();
                                    navigateto('/profileinfo')
                                }}
                                href="#"
                                className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-green-50 hover:text-green-600 transition-all duration-150 text-base"
                            >
                                🗂️ Your Participations
                            </a>
                        </div>
                    )}
                </div>
            </div>

            <div className='relative lg:w-70 xl:w-100 2xl:w-180 h-full flex flex-row justify-start items-center'>
                {User ? (
                    isSearchVisible ? (
                        <div className="w-full relative flex items-center pr-4">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full h-10 pl-4 pr-10  border-b-2 border-gray-300 focus:outline-none focus:border-black"
                                autoFocus
                            />
                            <IoIosClose
                                className="absolute right-6 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 cursor-pointer hover:text-black"
                                onClick={() => setIsSearchVisible(false)}
                            />
                        </div>
                    ) : (
                        <div className='w-full md:pr-5 md:gap-3 lg:h-22 lg:max-h-22 lg:gap-5 flex md:flex-row justify-start items-center'>
                            <IoMdSearch
                                onClick={() => setIsSearchVisible(true)}
                                color='black'
                                className='cursor-pointer sm:h-1/2 md:h-11 md:w-7 lg:h-12 lg:w-8 xl:h-15 xl:w-10 object-contain rounded-full'
                            />
                            <IoIosNotifications color='silver' className='sm:h-1/2 md:h-11 md:w-7 lg:h-15 lg:w-10 object-contain rounded-full' />

                            <div ref={profileRef} className='relative'>
                                {User?.user?.image ? (
                                    <img src={User?.user?.image} onClick={(e) => {
                                        e.preventDefault();
                                        setShowProfileDropdown(prev => !prev);
                                    }} className='h-5 w-5 md:h-7 md:w-7 lg:h-9 lg:w-9 rounded-full cursor-pointer' alt="User" />
                                ) : (
                                    <CgProfile onClick={(e) => {
                                        e.preventDefault();
                                        setShowProfileDropdown(prev => !prev);
                                    }} className='cursor-pointer md:h-11 md:w-7 lg:h-12 lg:w-8 xl:h-15 xl:w-10 object-cover rounded-full' />
                                )}

                                {showProfileDropdown && (
                                    // CHANGE: Lowered dropdown with `mt-3` and increased width with `w-56`
                                    <div className="absolute right-0 top-full mt-3 w-56 bg-white shadow-lg border rounded-xl flex flex-col z-50 p-2 space-y-1 transition-all duration-150 ease-in-out">
                                        <a
                                            onClick={(e) => { e.preventDefault(); setShowProfileDropdown(false); navigateto('/profileinfo'); }}
                                            href="#"
                                            className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-100 transition-all duration-150 text-base"
                                        >
                                            🧑‍💻 Portfolio
                                        </a>
                                        <a
                                            onClick={(e) => { e.preventDefault(); setShowProfileDropdown(false); navigateto('/settings'); }}
                                            href="#"
                                            className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-100 transition-all duration-150 text-base"
                                        >
                                            ⚙️ Settings
                                        </a>
                                        <a
                                            onClick={(e) => { e.preventDefault(); Logout(); }}
                                            href="#"
                                            className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-500 transition-all duration-150 text-base"
                                        >
                                            🔓 Logout
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                ) : (
                    <div className='gap-6 flex flex-row justify-start items-center text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl'>
                        <IoMdSearch color='black' className='sm:h-1/2 md:h-15 md:w-10 object-contain rounded-full' />
                        <button onClick={() => { navigateto('/login'); }} className='hover:text-gray-500 cursor-pointer '>Login</button>
                        <button onClick={() => { navigateto('/signup'); }} className='hover:bg-blue-700 text-white cursor-pointer  rounded-md bg-[#4060C1] py-2 px-2'>Signup</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;