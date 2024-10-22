"use client";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const video = document.getElementById('video');

    // Trigger video play on scroll
    gsap.to(video, {
      scrollTrigger: {
        trigger: '#exploreVideo',
        toggleActions: 'play pause reverse restart',
        onEnter: () => video.play(),
        onEnterBack: () => video.play(),
      },
    });

    // Animation for the heading
    gsap.to('#heading1', {
      opacity: 1,
      delay: 0.5,
      translateX: 10,
      duration: 1,
      scrollTrigger: {
        trigger: '#heading1',
      },
    });

    gsap.to('#heading2', {
      opacity: 1,
      delay: 0.5,
      duration: 1,
      translateY: -20,
    });

    gsap.to('#registerButton', {
      opacity: 1,
      delay: 1.5,
      duration: 1,
      y: 0,
      stagger: 1,
    });

    // Explore section animations
    gsap.to('#exploreh1', {
      opacity: 1,
      y: -20,
      duration: 2,
      delay: 1,
      scrollTrigger: {
        trigger: '#exploreh1',
        end: 'top 40%',
        scrub: 2,
        markers: false,
      },
    });

    gsap.to('#exploreh2', {
      opacity: 1,
      y: -20,
      duration: 2,
      delay: 1,
      scrollTrigger: {
        trigger: '#exploreh2',
        end: 'top 40%',
        scrub: 2,
        markers: false,
      },
    });
  }, []);

  return (
    <>
      <div className="relative bg-black w-full">
        <video
          id="video"
          src="/videos/video1.mp4"
          autoPlay
          loop
          muted
          className="absolute inset-0 md:ml-[10vw] w-full h-[50vh] md:h-[100vh] object-cover"
        />
        <div className="w-full h-full text-gray-100 absolute font-bold bg-black z-50">
          <h1
            id="heading1"
            className="ml-[5vw] md:ml-[10vw] mt-[6vh] text-[10vw] md:text-[14vh] opacity-0"
          >
            ESUMMIT-2025
          </h1>
          <h1
            id="heading2"
            className="ml-[5vw] mt-[2vh] md:mt-0 text-gray-400 text-xl md:text-4xl opacity-0"
          >
            CAMPUS AMBASSADOR PROGRAM
          </h1>
          <div
            id="registerButton"
            className="opacity-0 w-[40vw] md:w-[14vw] py-[2vh] px-[2vw] ml-[30vw] md:ml-[80vw] mt-[10vh] md:mt-[28vh] rounded-3xl text-lg md:text-xl font-semibold text-center
             bg-gray-100 hover:font-bold text-gray-900 hover:text-black hover:cursor-pointer hover:bg-gray-400 shadow-xl outline-gray-600 outline-double outline-4"
          >
            <h1>Register Now</h1>
          </div>
          <h1
            id="heading2"
            className="opacity-0 mt-[8vh] md:mt-[20vh] text-center text-xl md:text-3xl text-white"
          >
            Become a Part of The North India's Biggest Entrepreneurship Summit
          </h1>
        </div>
      </div>

      <div className="w-full h-[50vh] md:h-[90vh] bg-black"></div>

      <div className="flex flex-col md:flex-row h-full w-full py-[10vh] bg-black text-white">
        <div className="flex-1 px-[5vw] md:px-0 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold md:my-[6vh]  text-center text-gray-100">ABOUT ESUMMIT</h1>
          <p
            id="exploreh1"
            className="absolute md:w-[50vw] pt-[5vh] md:pt-0 w-auto text-center opacity-0 mt-[2vh] md:mt-[4vh] text-xl md:text-2xl px-[2vw] md:px-[2.5vw] bg-transparent font-medium"
          >
            <section>
              Esummit is the <span className="font-bold text-gray-500">largest entrepreneurship fest in North India</span>.
              It's the flagship event of E CELL DTU, with a <span className="font-bold text-gray-500">footfall of 50K+</span> and an online reach of <span className="font-bold text-gray-500">1M+</span>.
            </section>
            <section id="exploreh2" className="opacity-0 mt-4"><br></br>
              Be it Seminars, Panel Discussions, Leadership Talks, Competitions, and PRO NIGHTS; we’ve got it all covered in this 2-day spectacle.
            </section>
          </p>
        </div>
        <div className="flex-1  md:mt-0">
          <video src="/videos/video2.mp4" autoPlay loop muted className="w-[100vw] h-[50vh] md:h-auto md:w-[50vw] object-cover" />
        </div>
      </div>
    </>
  );
}
