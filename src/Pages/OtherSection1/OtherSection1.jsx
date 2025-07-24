import React from 'react';
import { motion } from 'framer-motion';

const HeroSection1 = () => {
    return (
        <div
            className="relative h-[90vh] bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80')",
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            <motion.div
                className="relative z-10 text-center text-white px-4"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                <motion.h1
                    className="text-4xl md:text-6xl font-bold mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                >
                    Explore the World with Us
                </motion.h1>

                <motion.p
                    className="text-lg md:text-2xl mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                >
                    Discover breathtaking places, unforgettable experiences, and travel stories worth sharing.
                </motion.p>

                <motion.button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}
                >
                    Start Your Journey
                </motion.button>
            </motion.div>
        </div>
    );
};

export default HeroSection1;
