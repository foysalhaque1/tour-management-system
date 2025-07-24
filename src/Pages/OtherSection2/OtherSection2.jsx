import React from 'react';
import { motion } from 'framer-motion';

const WhyTravelWithUs = () => {
  return (
    <section className="bg-gray-50 py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        
        {/* Image */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2"
            alt="Travel Experience"
            className="rounded-2xl shadow-xl object-cover w-full h-[400px]"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Why Travel With Us?
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            We make travel simple, enriching, and unforgettable by offering personalized experiences, local expertise, and complete support at every step.
          </p>

          <ul className="space-y-4 text-gray-700 font-medium">
            <li className="flex items-start gap-3">
              ✅ 100% Verified Guides & Packages
            </li>
            <li className="flex items-start gap-3">
              ✅ Curated Destinations & Hidden Gems
            </li>
            <li className="flex items-start gap-3">
              ✅ 24/7 Support & Easy Booking
            </li>
            <li className="flex items-start gap-3">
              ✅ Real Travel Stories from Real People
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyTravelWithUs;
