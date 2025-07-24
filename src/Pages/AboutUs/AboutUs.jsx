import React from 'react';
import { FaGithub, FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';

const AboutUs = () => {
    return (
        <section className="min-h-screen bg-base-200 py-10 px-6">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-8 text-primary">About the Developer</h2>

                <div className="bg-white shadow-xl rounded-lg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        <div className="flex justify-center">
                            <img
                                src="https://i.ibb.co/yFhz6TzM/foysal.jpg"
                                alt="Developer"
                                className="w-40 h-40 rounded-full object-cover border-4 border-primary"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-4">
                            <h3 className="text-2xl font-semibold">Hi, I'm Foysal Haque 👋</h3>
                            <p className="text-gray-700">
                                A passionate Fontend Web Developer who loves building modern web applications using React, Node.js, and MongoDB.
                                With a strong eye for design and usability, my aim  is to create seamless user experiences and robust backend logic.
                            </p>

                            <p className="text-gray-700">
                                I've successfully completed <strong>12+ projects</strong> including e-commerce sites, tour booking platforms, admin dashboards,Doctors appoinment system.
                            </p>

                            <div>
                                <span className="font-medium text-gray-800">Tech Stack:</span>
                                <p className="text-sm text-gray-600">
                                    React · Tailwind CSS · Node.js · Express · MongoDB · Firebase · JWT · Stripe · React Query
                                </p>
                            </div>

                            <div className="flex gap-4 mt-4">
                                <a
                                    href="https://github.com/foysalhaque1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline btn-sm flex items-center gap-2"
                                >
                                    <FaGithub /> GitHub
                                </a>
                               
                                <a
                                    href="https://www.linkedin.com/in/foysal-haque-6a5484169?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app "
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline btn-sm flex items-center gap-2"
                                >
                                    <FaLinkedin /> LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
