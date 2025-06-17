'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaArrowDown } from 'react-icons/fa'; // Arrow icon for animation

const Page = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(true); // To manage popup visibility
  const arrowRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const connectTextRef = useRef<HTMLParagraphElement>(null); // Ref for the connect text

  useEffect(() => {
    // Animate the arrow to point toward the Connect MetaMask button
    gsap.to(arrowRef.current, {
      y: 20, // Move down by 20px
      repeat: -1, // Infinite repeat
      yoyo: true, // Reverse animation after completing
      ease: 'power1.inOut', // Smooth easing
      duration: 0.8, // Animation duration
    });

    // Fade-in animation for hero text and connect text
    gsap.fromTo(heroTextRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        delay: 0.3
      }
    );

    gsap.fromTo(connectTextRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        delay: 0.6
      }
    );
  }, []);

  const connectMetaMask = async () => {
    setIsPopupVisible(false); // Hide the popup after connecting
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen bg-black text-white bg-cover bg-center"
      style={{
        backgroundImage: `url(https://img.freepik.com/free-vector/gradient-particle-wave-background_23-2150491602.jpg)`, // Background image URL
      }}
    >
      {/* Main content */}
      <div className="text-center mt-20 px-4 md:px-16 lg:px-32">
        <div className="px-6 md:px-12 lg:px-24">
          <h1
            ref={heroTextRef}
            className="text-5xl md:text-6xl font-extrabold text-transparent pb-12 bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
          >
            Transform tasks into rewards—post bounties, complete challenges, and get paid!
          </h1>
        </div>
      </div>

      {/* MetaMask Connect Popup */}
      {isPopupVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Connect</h2>
            <p className="text-lg mb-6">To continue with app, connect Aptos wallet.</p>
            <button
              onClick={connectMetaMask}
              className="bg-purple-600 px-6 py-3 rounded-lg text-white font-semibold hover:bg-purple-700 transition duration-300"
            >
              Got it !!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
