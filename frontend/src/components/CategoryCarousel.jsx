import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Code, Server, Database, Paintbrush, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
    { name: "Frontend Developer", icon: Code },
    { name: "Backend Developer", icon: Server },
    { name: "Data Science", icon: Database },
    { name: "Graphic Designer", icon: Paintbrush },
    { name: "FullStack Developer", icon: Layers }
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="my-10 px-4 sm:px-6 lg:px-8"
        >
            <h2 className="text-center text-green-500 text-2xl font-semibold mb-6">Browse Categories</h2>
            <Carousel className="w-full max-w-5xl mx-auto">
                <CarouselContent className="-ml-2 md:-ml-4">
                    {categories.map((cat, index) => (
                        <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2"
                            >
                                <Button
                                    onClick={() => searchJobHandler(cat.name)}
                                    variant="outline"
                                    className="w-full h-full aspect-square flex flex-col items-center justify-center gap-2 border-2 border-green-500 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all rounded-xl"
                                >
                                    <motion.div
                                        initial={{ rotate: 0 }}
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    >
                                        <cat.icon className="w-8 h-8" />
                                    </motion.div>
                                    <span className="text-xs sm:text-sm font-medium text-center">{cat.name}</span>
                                </Button>
                            </motion.div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="flex justify-center mt-4">
                    {/* <CarouselPrevious className="mr-2" />
                    <CarouselNext /> */}
                </div>
            </Carousel>
        </motion.div>
    );
};

export default CategoryCarousel;