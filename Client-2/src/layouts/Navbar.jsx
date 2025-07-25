import React, { useState } from 'react'
import Logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import { useContext, createContext } from 'react';
import { IoMdSearch } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import axios from 'axios';
import { userContext } from '../hooks/AutoAuth';
import { CgProfile } from "react-icons/cg";
const Navbar = () => {
    const navigateto = useNavigate();
    const [oldValue, newValue] = useState(1);
    const [showJoinDropdown, setShowJoinDropdown] = useState(false);
    const [showHostDropdown, setShowHostDropdown] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const { User, setUser, loading, logout } = userContext();
    console.log('Navbar is working')
    if (loading == true) {
        return <div>Data still not reached</div>
    }
    console.log(User)
    const Logout = () => {
        console.log('Done reloadin')
        logout()
        navigateto('/');
    }
    const checkIfLoggedin = () => {
        if (User) {
            navigateto('/hostingpage');
        } else {
            alert('You need to be logged in first');
            navigateto('/login');
        }
    };



    return (
        <div className='relative z-50 bg-white w-full h-22  text-md font-medium shadow-lg mb-0.5 flex items-center justify-between'>
            <div className='relative  md:w-100  lg:w-140  xl:w-180  2xl:w-220 max-h-full flex md:gap-1 xl:gap-2 flex-col  md:flex-row justify-end items-center '>

                <img onClick={() => { navigateto('/') }} className="md:flex   max-h-22  cursor-pointer md:pt-4   md:object-cover xl:h-22   xl:w-1/5 " src={Logo}></img>



                <div className=' text-black flex flex-row items-center justify-center xl:h-full xl:w-1/4'>
                    <a href='#' onClick={(e) => {
                        e.preventDefault();
                        setShowJoinDropdown(prev => !prev);
                       


                    }} className='flex flex-row items-center lg:whitespace-nowrap justify-center  sm:text-sm md:text-sm lg:text-lg xl:text-xl 2xl:text-xl'>Join a Hackathon
                        <FaAngleDown className='hidden lg:block sm:m-0 xl:h-full xl:pt-0.5 xl:pl-0.5 xl:ml-1/2' />
                    </a>
                    {showJoinDropdown && (
                        <div className="absolute top-full mt-2 bg-white shadow-lg border rounded-md flex flex-col z-50">
                            <a onClick={(e) => {
                                e.preventDefault();
                                setShowJoinDropdown(prev => !prev);
                            }} href="#" className="px-4 py-2 hover:bg-gray-100 text-sm">Explore Hackathons</a>
                            <a onClick={(e) => {
                                e.preventDefault();
                                setShowJoinDropdown(prev => !prev);
                            }} href="#" className="px-4 py-2 hover:bg-gray-100 text-sm">Join with Code</a>
                            <a onClick={(e) => {
                                e.preventDefault();
                                setShowJoinDropdown(prev => !prev);
                            }} href="#" className="px-4 py-2 hover:bg-gray-100 text-sm">Your Participations</a>
                        </div>
                    )}
                </div>
                <div>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowHostDropdown((prev) => !prev);
                        }}
                        className='flex  flex-row items-center justify-center sm:text-sm md:text-sm lg:text-lg xl:text-xl 2xl:text-xl'
                    >
                        Host a Hackathon
                        <FaAngleDown className="hidden lg:block ml-1" />
                    </a>

                    {showHostDropdown && (
                        <div className="absolute top-full mt-2 bg-white shadow-lg border rounded-md flex flex-col z-50">
                            <a onClick={(e) => {
                                e.preventDefault();
                                setShowHostDropdown((prev) => !prev); navigateto('/hackathons')
                            }} href="#" className="px-4 py-2 hover:bg-gray-100 text-sm">Explore Hackathons</a>
                            <a onClick={(e) => {
                                e.preventDefault();
                                setShowHostDropdown((prev) => !prev);
                                checkIfLoggedin();
                              
                            }}  className="px-4 py-2 hover:bg-gray-100 text-sm">Host a Hackathon</a>
                            <a onClick={(e) => {
                                e.preventDefault();
                                setShowHostDropdown((prev) => !prev);
                            }}  href="#" className="px-4 py-2 hover:bg-gray-100 text-sm">Your Participations</a>
                        </div>
                    )}
                </div>

            </div>
            <div className='relative lg:w-70 xl:w-100 2xl:w-180 h-full flex  flex-row justify-start items-center'>
                {User != null ? (
                    <>
                        <div className='w-full md:pr-5 md:gap-3 lg:h-22 lg:max-h-22 lg:gap-5 flex md:flex-row justify-start items-center'>
                            <IoMdSearch color='black'
                                className='sm:h-1/2 md:h-11 md:w-7 md:pb-0.2 lg:h-12 lg:w-8 lg:pb-1 xl:h-15 xl:w-10    object-contain rounded-full  ' />
                            <IoIosNotifications color='silver' className='sm:h-1/2 md:h-11 md:w-7 md:pb-0.2 lg:h-15 lg:w-10 lg:pb-1   object-contain rounded-full  ' />
                            {User?.imageUrl ? (
                                <img src={User.imageUrl}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowProfileDropdown(prev => !prev);
                                    }} className='h-5 w-5 md:h-7 md:w-7  lg:h-9 lg:w-9   rounded-full' />

                            ) : (<CgProfile onClick={(e) => {
                                e.preventDefault();
                                setShowProfileDropdown(prev => !prev);
                            }} className='sm:h-1/2 md:h-11 md:w-7 md:pb-0.2 lg:h-12 lg:w-8 lg:pb-1 xl:h-15 xl:w-10    object-cover rounded-full  ' />)


                            }
                        </div>
                        {showProfileDropdown && (
                            <div className="absolute 2xl:w-[180px] top-full mt-2 bg-white shadow-lg border rounded-md flex flex-col z-50">
                                <a onClick={(e) => {  e.preventDefault();
                                        setShowProfileDropdown(prev => !prev); navigateto('/profileinfo') }} href="#" className="px-4 py-2 hover:bg-gray-100 text-sm">Portfolio</a>
                                <a onClick={(e) => {  e.preventDefault();
                                        setShowProfileDropdown(prev => !prev); navigateto('/settings') }} href="#" className="px-4 py-2 hover:bg-gray-100 text-sm">Settings</a>
                                <a onClick={(e)=>{Logout()}} href="#" className="px-4 py-2 hover:bg-gray-100 text-sm">Logout</a>
                            </div>
                        )}


                    </>) : (
                    <div className=' gap-6 flex flex-row justify-start items-center text-sm md:text-md lg:text-lg
                        xl:text-xl 2xl:text-2xl'>
                        <IoMdSearch color='black'
                            className='sm:h-1/2 md:h-15 md:w-10 md:pb-1   object-contain rounded-full lg:h-md ' />
                        <button onClick={() => { navigateto('/login') }} className='hover:text-gray-500 cursor-pointer '>Login</button>

                        <button onClick={() => { navigateto('/signup') }} className='hover:text-black text-white cursor-pointer bg-blue-500 py-2 px-2'>Signup</button>

                    </div>)
                }
            </div>
        </div>


    )
}

export default Navbar