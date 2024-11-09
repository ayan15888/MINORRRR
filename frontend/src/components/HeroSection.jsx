import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const canvasRef = useRef(null);

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    useEffect(() => {
        // Three.js setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 5;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: '#028511'
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 3;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.001;
            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            renderer.dispose();
        };
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative text-center py-8 px-4 sm:px-8 md:px-16"
        >
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />
            <div className="flex flex-col gap-6 max-w-xl mx-auto">
                <motion.span 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-green-500 font-medium border-gray-500 border-2"
                >
                    No. 1 Job Hunt Website
                </motion.span>
                <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="lg:text-5xl text-4xl font-extrabold leading-tight text-gray-700"
                >
                    Search, Apply & <br />
                    Get Your <span className="text-green-500">Dream Jobs</span>
                </motion.h1>
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="text-sm sm:text-base text-gray-600 italic font-serif"
                >
                    Discover a variety of job opportunities tailored for you. Find your dream job today!
                </motion.p>
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="relative flex items-center max-w-md mx-auto bg-gray-100 border border-gray-800 rounded-full shadow-md"
                >
                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 px-12 py-4 text-sm sm:text-base border-none bg-transparent rounded-full outline-none"
                    />
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            onClick={searchJobHandler}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-500 text-white hover:bg-[#5a2da5] transition-all duration-200 ease-in-out rounded-full px-4 py-2 mr-2"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default HeroSection;