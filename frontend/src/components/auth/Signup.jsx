import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !input.fullname ||
      !input.email ||
      !input.phoneNumber ||
      !input.password ||
      !input.role
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const userData = {
      fullname: input.fullname,
      email: input.email,
      phoneNumber: input.phoneNumber,
      password: input.password,
      role: input.role,
    };

    try {
      dispatch(setLoading(true));
      // Register the user
      const registerRes = await axios.post(
        `${USER_API_END_POINT}/register`,
        userData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Register response:", registerRes.data);

      if (registerRes.data.success) {
        // If registration is successful, immediately log in the user
        const loginRes = await axios.post(
          `${USER_API_END_POINT}/login`,
          {
            email: input.email,
            password: input.password,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        console.log("Login response:", loginRes.data);

        if (loginRes.data.success) {
          dispatch(setUser(loginRes.data.user));
          toast.success("Signup successful and logged in!");
          console.log("Navigating to home page...");
          navigate("/");
        } else {
          toast.error(
            "Signup successful but login failed. Please login manually."
          );
          console.log("Navigating to login page...");
          navigate("/login");
        }
      } else {
        toast.error(registerRes.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error details:", error.response || error);
      toast.error(
        error.response?.data?.message || "An error occurred during registration"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      console.log("User detected, navigating to home page...");
      navigate("/");
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
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  const inputVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98 },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
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
          <motion.h1
            variants={itemVariants}
            className="text-2xl font-semibold text-gray-800 mb-4 text-center"
          >
            Sign Up
          </motion.h1>
          <div className="space-y-4">
            <motion.div variants={itemVariants}>
              <Label htmlFor="fullname" className="text-gray-700 text-sm">
                Full Name
              </Label>
              <motion.div
                variants={inputVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Input
                  id="fullname"
                  type="text"
                  value={input.fullname}
                  name="fullname"
                  onChange={changeEventHandler}
                  placeholder="John Doe"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </motion.div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Label htmlFor="email" className="text-gray-700 text-sm">
                Email
              </Label>
              <motion.div
                variants={inputVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Input
                  id="email"
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="john@example.com"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </motion.div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Label htmlFor="phoneNumber" className="text-gray-700 text-sm">
                Phone Number
              </Label>
              <motion.div
                variants={inputVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Input
                  id="phoneNumber"
                  type="text"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  onChange={changeEventHandler}
                  placeholder="1234567890"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </motion.div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Label htmlFor="password" className="text-gray-700 text-sm">
                Password
              </Label>
              <motion.div
                variants={inputVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Input
                  id="password"
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </motion.div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Label className="text-gray-700 text-sm">Role</Label>
              <RadioGroup
                className="flex items-center gap-4"
                value={input.role}
                onValueChange={(value) => setInput({ ...input, role: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="text-gray-700 text-sm">
                    Student
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="recruiter" id="recruiter" />
                  <Label htmlFor="recruiter" className="text-gray-700 text-sm">
                    Recruiter
                  </Label>
                </div>
              </RadioGroup>
            </motion.div>
          </div>
          <motion.div variants={itemVariants}>
            {loading ? (
              <Button
                disabled
                className="w-full flex items-center justify-center space-x-2 py-2 bg-purple-500 text-white rounded-lg text-sm"
              >
                <Loader2 className="h-5 w-5 animate-spin" />{" "}
                <span>Signing Up...</span>
              </Button>
            ) : (
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  type="submit"
                  className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm"
                >
                  Sign Up
                </Button>
              </motion.div>
            )}
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="text-center text-sm text-gray-600 mt-4"
          >
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:underline">
              Login
            </Link>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
};

export default Signup;
