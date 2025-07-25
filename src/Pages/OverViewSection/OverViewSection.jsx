import React from 'react';

const OverviewSection = () => {
    return (
        <section className="px-4 md:px-16 py-12 bg-gray-50 text-gray-800">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                    Welcome to Explore Tour
                </h2>
                <p className="text-lg text-center mb-10 max-w-3xl mx-auto">
                    Discover breathtaking destinations, book unforgettable adventures, and connect with verified local tour guides — all in one platform.
                </p>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Video 1: Explore Destinations */}
                    <div className="rounded-lg overflow-hidden shadow-lg">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/O2yMv1JDYRU?si=fG3YCoEqNq6b5SCX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        <div className="p-4 bg-white">
                            <h3 className="text-xl font-semibold">Discover Top Destinations</h3>
                            <p className="mt-2 text-sm text-gray-600">
                                Watch how you can browse stunning tour packages with day-wise plans and immersive galleries.
                            </p>
                        </div>
                    </div>

                    {/* Video 2: Book with Confidence */}
                    <div className="rounded-lg overflow-hidden shadow-lg">
                       <iframe width="560" height="315" src="https://www.youtube.com/embed/9vN_htf-05w?si=MMWeOD_O7uEs_K-H" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        <div className="p-4 bg-white">
                            <h3 className="text-xl font-semibold">Book & Travel with Confidence</h3>
                            <p className="mt-2 text-sm text-gray-600">
                                Learn how to book trips, select guides, and manage bookings seamlessly — all backed by a secure platform.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Highlight Features */}
                <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-2">Verified Tour Guides</h4>
                        <p className="text-sm text-gray-600">Meet experienced local guides and view their stories, ratings, and availability.</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-2">Smart Booking</h4>
                        <p className="text-sm text-gray-600">Book tours easily with date selection, guide assignment, and real-time updates.</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-2">Admin & Guide Dashboards</h4>
                        <p className="text-sm text-gray-600">Admins can manage applications, users, and bookings. Guides can handle their assigned tours.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OverviewSection;
