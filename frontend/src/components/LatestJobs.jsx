import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                damping: 10,
                stiffness: 100
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100
            }
        }
    };

    const iconVariants = {
        hidden: { rotate: -180, opacity: 0 },
        visible: {
            rotate: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                damping: 10,
                stiffness: 100
            }
        }
    };

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className='max-w-7xl mx-auto my-16 px-4 sm:my-24'
        >
            <motion.div className='text-center mb-12'>
                <motion.div
                    variants={iconVariants}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className='inline-block p-3 bg-green-100 rounded-full mb-4'
                >
                    <Briefcase className='w-10 h-10 text-green-500' />
                </motion.div>
                <motion.h1 
                    variants={titleVariants}
                    className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4'
                >
                    <motion.span
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className='text-green-500'
                    >
                        Latest & Top 
                    </motion.span>{" "}
                    Job Openings
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className='mt-4 text-gray-600 max-w-2xl mx-auto'
                >
                    Explore the most recent and exciting job opportunities tailored for you.
                </motion.p>
            </motion.div>
            <motion.div 
                variants={containerVariants}
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8'
            >
                {allJobs.length === 0 ? (
                    <motion.div 
                        variants={cardVariants}
                        className='col-span-full text-center text-gray-500 py-12'
                    >
                        No Jobs Available
                    </motion.div>
                ) : (
                    <>
                        {allJobs.slice(0, 6).map((job, index) => (
                            <motion.div 
                                key={job._id} 
                                variants={cardVariants}
                                whileHover={{ 
                                    scale: 1.05, 
                                    boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
                                    transition: { type: "spring", stiffness: 300, damping: 10 }
                                }}
                            >
                                <LatestJobCards job={job}/>
                            </motion.div>
                        ))}
                        {allJobs.length < 6 && (
                            [...Array(6 - allJobs.length)].map((_, index) => (
                                <motion.div 
                                    key={`empty-${index}`} 
                                    variants={cardVariants}
                                    className="hidden sm:block"
                                >
                                    {/* Empty div to maintain grid layout */}
                                </motion.div>
                            ))
                        )}
                    </>
                )}
            </motion.div>
        </motion.div>
    )
}

export default LatestJobs