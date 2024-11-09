import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className='relative'>
            {/* Navbar */}
            <div className='bg-green-500 shadow-sm'>
                <div className='flex items-center justify-between px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl h-16'>
                    {/* Logo */}
                    <div className='flex items-center'>
                        <Link to="/" className="flex items-center space-x-2">
                            <h1 className='cursor-pointer text-2xl font-bold text-gray-800'>
                                TalentSpot
                            </h1>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center gap-10'>
                        <ul className='flex font-medium items-center gap-5 text-gray-800'>
                            {user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className="hover:text-white transition duration-150">Companies</Link></li>
                                    <li><Link to="/admin/jobs" className="hover:text-white transition duration-150">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/jobs" className="hover:text-white transition duration-150">Jobs</Link></li>
                                    <li><Link to="/browse" className="hover:text-white transition duration-150">Browse</Link></li>
                                </>
                            )}
                        </ul>
                        {!user ? (
                            <div className='flex items-center gap-2 text-gray-800'>
                                <Link to="/login"><Button className="border-2 hover:border-green-700 hover:bg-green-100" variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-gray-800 hover:bg-gray-700">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-gray-600'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {user && user.role === 'student' && (
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <User2 />
                                                    <Button variant="link">
                                                        <Link to="/profile">View Profile</Link>
                                                    </Button>
                                                </div>
                                            )}
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>

                    {/* Mobile Navigation & Sidebar Toggle */}
                    <div className='flex md:hidden items-center'>
                        <button onClick={toggleSidebar} className="text-gray-700 focus:outline-none">
                            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar (Overlapping) */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-gray-500 shadow-lg z-40 transform ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out`}
            >
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4 text-white">Menu</h2>
                    <ul className="flex flex-col gap-4">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li><Link to="/admin/companies" className='text-white hover:text-green-200'>Companies</Link></li>
                                <li><Link to="/admin/jobs" className='text-white hover:text-green-200'>Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/" className='text-white hover:text-green-200'>Home</Link></li>
                                <li><Link to="/jobs" className='text-white hover:text-green-200'>Jobs</Link></li>
                                <li><Link to="/browse" className='text-white hover:text-green-200'>Browse</Link></li>
                            </>
                        )}
                        {user && user.role === 'student' && (
                            <li><Link to="/profile" className='text-white hover:text-green-200'>Profile</Link></li>
                        )}
                      
                        {!user ? (
                            <div className='items-center flex flex-col gap-2 mt-4'>
                                <Link to="/login"><Button variant="outline" className="w-full bg-white hover:bg-green-100">Login</Button></Link>
                                <Link to="/signup"><Button className="w-full bg-green-500 hover:bg-green-600 text-white">Signup</Button></Link>
                            </div>
                        ) : (
                            <li>
                                <button onClick={logoutHandler} className='flex items-center gap-2 text-red-600 hover:text-red-500'>
                                    <LogOut /> Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Page Content (Shifts when sidebar is open) */}
            <div
                className={`transition-all duration-300 ease-in-out ${
                    sidebarOpen ? 'ml-64' : 'ml-0'
                }`}
            >
               
            </div>
        </div>
    )
}

export default Navbar