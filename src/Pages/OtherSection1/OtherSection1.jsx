import React from 'react';
import { motion } from 'framer-motion';

const travelDestinations = [
    {
        name: 'Santorini, Greece',
        description: 'Famous for its white-washed buildings and stunning sunsets.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    },
    {
        name: 'Kyoto, Japan',
        description: 'Experience centuries-old temples and cherry blossoms in spring.',
        image: 'https://img.freepik.com/premium-photo/japanese-autumn-fall-kyoto-daigoji-temple_49683-4080.jpg?semt=ais_hybrid&w=740',
    },
    {
        name: 'Machu Picchu, Peru',
        description: 'Explore the ancient Incan city in the Andes Mountains.',
        image: 'https://img.freepik.com/free-photo/aerial-shot-beautiful-village-by-mountain-captured-machu-picchu-peru_181624-14674.jpg',
    },
    {
        name: 'Banff, Canada',
        description: 'Marvel at crystal-clear lakes and snowy peaks in the Rockies.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    },
];

const HeroSection1 = () => {
    return (
         <div>
      {/* Hero Section - No Background Image */}
      <section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-br from-yellow-100 to-white">
        <motion.div
          className="text-center px-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Your Next Adventure Awaits
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl text-gray-600 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Journey through unforgettable landscapes and hidden gems around the world.
          </motion.p>

          <motion.button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-3 rounded-full shadow-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}
          >
            Discover Now
          </motion.button>
        </motion.div>
      </section>

      {/* Travel Destination Cards Section */}
      <section className="bg-white py-16 px-6 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Popular Travel Destinations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {travelDestinations.map((destination, index) => (
            <motion.div
              key={index}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl bg-white"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                <p className="text-gray-600 text-sm">{destination.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
    );
};

export default HeroSection1;
