'use client';

import Navbar from '../components/Navbar'; // Adjust the import path as necessary
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import OpportunityTabs from '../components/OportunityTabs';
import { FaBriefcase, FaCheckCircle, FaDollarSign, FaWallet } from 'react-icons/fa';
import Create from '../components/Create';
import Link from 'next/link'; // Import Link from Next.js
import Footer from '../components/Footer';
import LoginButton from '@/app/components/LoginButton';
// import { useOCAuth } from '@opencampus/ocid-connect-js';

const HomePage = () => {

    // const { authState, ocAuth } = useOCAuth();

    // Ensure authState is defined before accessing its properties
    // if (!authState) {
    //     return <div>Loading authentication...</div>;
    // }

    // if (authState.error) {
    //     return <div>Error: {authState.error.message}</div>;
    // }

    // if (authState.isLoading) {
    //     return <div>Loading...</div>;
    // }

    const heroTextRef = useRef<HTMLHeadingElement>(null);
    const welcomeTextRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        // Fade-in animation for hero text and welcome text
        gsap.fromTo(heroTextRef.current,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                delay: 0.3
            }
        );

        gsap.fromTo(welcomeTextRef.current,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                delay: 0.6
            }
        );
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            {/* Opportunity Tabs */}
            <div className="tabs flex flex-col items-center md:items-start px-4 md:px-12 lg:px-48 mt-16 w-full">
                <OpportunityTabs />
            </div>

            {/* Create and Records Section */}
            <div className="create-records-container flex flex-col md:flex-row items-center md:items-start md:justify-between md:px-6 lg:px-20 xl:px-32 mt-10 w-full space-y-8 md:space-y-0 md:space-x-4">

                {/* Create Section */}
                <div className="create flex flex-col items-center md:items-start w-full md:w-[48%]">
                    <Create />
                </div>

                {/* Records Section */}
                <div className="records relative flex flex-col items-center md:items-start w-full md:w-[400px]">
                    <div className="flex bg-gray-200 rounded-lg shadow-lg p-6 text-gray-800 space-x-4 w-full">

                        {/* Total Value Earned */}
                        <div className="flex items-center space-x-2">
                            <FaDollarSign className="text-purple-500 text-2xl" />
                            <div>
                                <p className="text-2xl font-semibold">$1,727,770</p>
                                <p className="text-gray-500">Total Value Earned</p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-l border-gray-300"></div>

                        {/* Opportunities Listed */}
                        <div className="flex items-center space-x-2">
                            <FaBriefcase className="text-purple-500 text-2xl" />
                            <div>
                                <p className="text-2xl font-semibold">1102</p>
                                <p className="text-gray-500">Opportunities Listed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bounties Section */}
            <div className="bounties w-[1000px] px-4 lg:px-20 xl:px-32 mt-10">
                <div className="opportunity-list flex flex-col space-y-6">
                    {/* Opportunity 1 */}
                    <div className="opportunity-card bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-between">
                        <div className="opportunity-info flex items-center">
                            <img src="https://res.cloudinary.com/dgvnuwspr/image/upload/v1728050560/m4nnvwwsrspo1lndad2w.png" alt="Tabby Bot" className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <Link href="/tabby">
                                    <h4 className="text-white font-bold text-lg cursor-pointer hover:underline">Twitter Thread for Tabby Bot: Exploring Use Cases</h4>
                                </Link>
                                <p className="text-gray-400">Tabby Bot</p>
                                <p className="text-gray-400">Deadline: 17 Nov 2024</p>
                            </div>
                        </div>
                        <div className="opportunity-reward text-right">
                            <p className="text-purple-500 font-bold">125 QF</p>
                            {/* <p className="text-gray-400">18 comments</p> */}
                        </div>
                    </div>

                    {/* Opportunity 2 */}
                    <div className="opportunity-card bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-between">
                        <div className="opportunity-info flex items-center">
                            <img src="https://res.cloudinary.com/dgvnuwspr/image/upload/v1727976244/bwjvumujdncaix6gokjs.png" alt="Blinkord" className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <Link href="/opportunity/blinkord">
                                    <h4 className="text-white font-bold text-lg cursor-pointer hover:underline">Write a Twitter Thread About Blinkord</h4>
                                </Link>
                                <p className="text-gray-400">Blinkord</p>
                                <p className="text-gray-400">Deadline: 22 Nov 2024</p>
                            </div>
                        </div>
                        <div className="opportunity-reward text-right">
                            <p className="text-purple-500 font-bold">300 QF</p>
                            {/* <p className="text-gray-400">16 comments</p> */}
                        </div>
                    </div>

                    {/* Opportunity 3 */}
                    <div className="opportunity-card bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-between">
                        <div className="opportunity-info flex items-center">
                            <img src="https://res.cloudinary.com/dgvnuwspr/image/upload/v1722770190/earn-sponsor/bbiiufcbjfiznfyay4hr.png" alt="ZNS" className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <Link href="">
                                    <h4 className="text-white font-bold text-lg cursor-pointer hover:underline">Create a Twitter Thread ZNS Canvas on Scroll</h4>
                                </Link>
                                <p className="text-gray-400">ZNS</p>
                                <p className="text-gray-400">Deadline: 28 Nov 2024</p>
                            </div>
                        </div>
                        <div className="opportunity-reward text-right">
                            <p className="text-purple-500 font-bold">300 Qf</p>
                            {/* <p className="text-gray-400">6 comments</p> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="how-it-works flex flex-col relative bottom-[400px] px-4 md:px-6 lg:px-0 lg:pr-20 xl:pr-36 w-full max-w-screen-lg md:ml-auto md:w-[500px]">
                <h3 className="text-gray-400 uppercase tracking-wide mb-6">How It Works</h3>
                <div className="flex flex-col space-y-6">

                    {/* Step 1 */}
                    <div className="flex items-start">
                        <FaCheckCircle className="text-purple-500 text-2xl mr-4" />
                        <div>
                            <p className="font-semibold text-lg text-purple-500">Create your profile</p>
                            <p className="text-gray-500">by telling us about yourself</p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-start">
                        <FaCheckCircle className="text-purple-500 text-2xl mr-4" />
                        <div>
                            <p className="font-semibold text-lg text-purple-500">Participate in Bounties & Projects</p>
                            <p className="text-gray-500">to build proof of work</p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-start">
                        <FaWallet className="text-purple-500 text-2xl mr-4" />
                        <div>
                            <p className="font-semibold text-lg text-purple-500">Get Paid for Your Work</p>
                            <p className="text-gray-500">in global standards</p>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
