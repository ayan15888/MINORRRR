import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  };

  const inputVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98 }
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center flex-grow px-4 py-8 lg:px-6">
        <motion.form
          initial="hidden"
          animate="visible"
          variants={formVariants}
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6"
        >
          <motion.h1 variants={itemVariants} className="text-2xl font-semibold text-gray-800 text-center mb-4">Login</motion.h1>
          <div className="space-y-4">
            <motion.div variants={itemVariants}>
              <Label className="text-gray-700 text-sm">Email</Label>
              <motion.div variants={inputVariants} whileHover="hover" whileTap="tap">
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="patel@gmail.com"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label className="text-gray-700 text-sm">Password</Label>
              <motion.div variants={inputVariants} whileHover="hover" whileTap="tap">
                <Input
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="Your password"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <RadioGroup className="flex items-center gap-4">
                <motion.div variants={inputVariants} whileHover="hover" whileTap="tap" className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === 'student'}
                    onChange={changeEventHandler}
                    className="cursor-pointer h-4 w-4"
                  />
                  <Label htmlFor="student" className="text-gray-700 text-sm">Student</Label>
                </motion.div>
                <motion.div variants={inputVariants} whileHover="hover" whileTap="tap" className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === 'recruiter'}
                    onChange={changeEventHandler}
                    className="cursor-pointer h-4 w-4"
                  />
                  <Label htmlFor="recruiter" className="text-gray-700 text-sm">Recruiter</Label>
                </motion.div>
              </RadioGroup>
            </motion.div>
          </div>
          <motion.div variants={itemVariants}>
            {loading ? (
              <Button
                className="w-full flex items-center justify-center space-x-2 py-2 bg-indigo-500 text-white rounded-lg text-sm"
              >
                <Loader2 className="h-5 w-5 animate-spin" /> <span>Logging in...</span>
              </Button>
            ) : (
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  type="submit"
                  className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm"
                >
                  Login
                </Button>
              </motion.div>
            )}
          </motion.div>
          <motion.div variants={itemVariants} className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Signup
            </Link>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
};

export default Login;