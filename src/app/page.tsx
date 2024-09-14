import { Calendar } from '@/components/ui/calendar';
import { Carousel } from '@/components/ui/carousel';
import { Slider } from '@/components/ui/slider';
import { Menubar } from '@/components/ui/menubar';
import Link from "next/link";
import Image from 'next/image';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#f1f1f8]">
{/*
<nav className="flex justify-between items-center m-4 p-4 fixed z-50">
    
    <div className="flex-shrink-0">
      <img src="your-logo-url-here.png" alt="Logo" className="h-10"/>
    </div>
    
    <div className="bg-[#f1f1f8] p-4 rounded-full shadow-lg">
      <ul className="flex space-x-6">
        <li><a href="#" className="text-gray-800 hover:text-gray-600">Dashboard</a></li>
        <li><a href="#" className="text-gray-800 hover:text-gray-600">Services</a></li>
        <li><a href="#" className="text-gray-800 hover:text-gray-600">Contact</a></li>
      </ul>
    </div>
  
  </nav>
*/}  
 <nav className="py-4 fixed w-full top-0 z-50 bg-[#f1f1f6] backdrop-blur opacity-95">
  <div className="flex justify-between items-center px-10">
    <div className="flex items-center space-x-4">
      <img src="/images/logos/SSF-logo.png" alt="SSF Logo" className="w-10 h-10" />
      <a href="/.." className="text-[#0e4579] text-2xl font-qanelas4">FABLAB</a>
    </div>

    <div className="absolute left-1/2 transform -translate-x-1/2">
      <div className="flex space-x-10">
        <Link href="/dashboard" className="font-qanelas1 text-black px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300">Dashboard</Link>
        <Link href="/services" className="font-qanelas1 text-black px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300">Services</Link>
        <Link href="/contact" className="font-qanelas1 text-black px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300">Contact</Link>
      </div>
    </div>

    <div className="flex items-center space-x-4 mr-8">
      <div className="relative group">
        <button className="text-[#0e4579] px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition duration-300 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405C18.79 14.79 18 13.42 18 12V8a6 6 0 10-12 0v4c0 1.42-.79 2.79-2.595 3.595L3 17h5m4 0v1a3 3 0 11-6 0v-1m6 0a3 3 0 01-6 0"></path>
          </svg>
        </button>
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
          <ul className="divide-y divide-gray-300">
            <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">Order Notification 1</li>
            <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">Announcement 1</li>
            <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">Message Notification 1</li>
            <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">Order Notification 2</li>
            <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">Announcement 2</li>
            <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">Message Notification 2</li>
          </ul>
        </div>
      </div>
      <img src="path/to/profile-picture.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
    </div>
  </div>
</nav>


      <section id="home" className="grid grid-cols-1 md:grid-cols-2 items-center h-auto pt-0 pb-5">

        <div style={{ width: '110%' }} className="flex items-center justify-center order-2 md:order-1 mb-6 md:mb-0 mt-20">
          <img src="images/elements/fablablanding.png" alt="Fabrication Laboratory of PSHS-EVC" className="relative inset-0 z-20 w-5/6 h-auto mb-5 mr-auto pl-0" />
          <img src="images/elements/settingsrotate.png" alt="Rotating Background" className="absolute inset-0 z-0 flex items-center justify-left overflow-hidden container mx-auto w-2/6 h-auto pl-20 ml-96 mt-80 rotate-fixed" />
          <img src="images/elements/squiggly.png" alt="Rotating Background" className="absolute inset-0 z-0 flex items-center justify-left overflow-hidden container w-1/3 h-auto ml-96 mt-0" />
        </div>

        <div className="relative z-1 flex flex-col justify-center text-right order-1 md:order-2 px-20 p-10 z-2 pl-28">
        <p className="text-xl font-qanelas2">Turn your Imagination into <span className="text-[#f5a237]">Reality</span></p>
          <h1 className="text-7xl font-qanelas4">Innovate to</h1>
          <h2 className="block text-7xl font-qanelas4 text-[#f5a237] mb-5">ELEVATE</h2>
          <p className="text-md font-poppins1 mb-5">
            The PSHS-EVC fab lab is a small-scale workshop offering digital fabrication. A fab lab is typically equipped with an array of flexible
            computer-controlled tools that cover several different length scales and various materials with the aim to make “almost anything”.
          </p>
          <a href="/services" className="bg-[#00417a] hover:bg-[#1c62b5] text-white font-qanelas2 text-lg py-2 px-6 rounded-full hover:bg-[#0d4a8d] transition duration-300 max-w-xs ml-auto">
            Get Started
          </a>
        </div>
      </section>

      <section id="events" className=" p-10 pl-20 pr-20 bg-white">
        <h2 className="text-4xl font-qanelas3 mb-4">Lorem Ipsum</h2>
        <p className="text-lg mb-8 font-poppins1">Stay tuned for our upcoming events. We regularly host workshops, fairs, and other exciting activities. Check back often for the latest updates and event details!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-[#f8f9fa] rounded-2xl shadow-lg">
            <div className="p-10">
              <h3 className="text-2xl font-semibold mb-2 font-qanelas3">Who can avail?</h3>
              <p className="text-gray-700 mb-4 font-poppins1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

</p>
              <a href="#" className="text-[#145da0] hover:underline">Learn More</a>
            </div>
          </div>

          <div className="bg-[#f8f9fa] rounded-2xl shadow-lg">
            <div className="p-10">
              <h3 className="text-2xl font-semibold mb-2 font-qanelas3">Why was the FabLab established?</h3>
              <p className="text-gray-700 mb-4 font-poppins1">Brief description of the event goes here. Provide some details about what participants can expect.</p>
              <a href="#" className="text-[#145da0] hover:underline">Learn More</a>
            </div>
          </div>

          <div className="bg-[#f8f9fa] rounded-2xl shadow-lg">
            <div className="p-10">
              <h3 className="text-2xl font-semibold mb-2 font-qanelas3">Where is the FabLab located?</h3>
              <p className="text-gray-700 mb-4 font-poppins1">Brief description of the event goes here. Provide some details about what participants can expect.</p>
              <a href="#" className="text-[#145da0] hover:underline">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      <section id="minifair2" className="w-full p-10 bg-[#0e4579]">
        {/* Two Columns of Text */}
        <div className="grid grid-cols-2 gap-10 mb-10 px-10">
          {/* Left Column */}
          <div className="text-left">
            <p className="text-xl text-white font-patrick">
             Hmmm... what to look out for?
            </p>
            <h1 className="text-4xl text-white font-qanelas3">FabLab mini fair</h1>
            <p className="text-white mb-4 font-poppins1">Stay tuned for our upcoming events.</p>
            <p className="font-poppins1 text-white mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          {/* Right Column */}
          <div className="text-right">
              <p className="mt-5 text-left text-xl font-patrick text-white">What to expect?</p>
              <p className="mt-5 text-left text-xl text-white">•</p>
              <p className="text-left text-xl text-white">•</p>
              <p className="text-left text-xl text-white">•</p>
              <p className="text-left text-xl text-white">•</p>
          </div>
        </div>
{/*
    <div className="w-full h-min inline-flex flex-nowrap overflow-hidden">
            <ul x-ref="slides" className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                <li>
                    <img src="/images/slider/1.jpg"/>
                </li>
                <li>
                    <img src="/images/slider/2.jpg"/>
                </li>
                <li>
                    <img src="/images/slider/3.jpg"/>
                </li>
                <li>
                    <img src="/images/slider/4.jpg" />
                </li>
                <li>
                    <img src="/images/slider/5.jpg" />
                </li>
                <li>
                    <img src="/images/slider/6.jpg" />
                </li>
                <li>
                    <img src="/images/slider/7.jpg" />
                </li>
                <li>
                    <img src="/images/slider/8.jpg" />
                </li>
                <li>
                    <img src="/images/slider/9.jpg" />
                </li>
                <li>
                    <img src="/images/slider/10.jpg" />
                </li>
            </ul>
            <ul x-ref="logos" className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                <li>
                    <img src="/images/slider/1.jpg"/>
                </li>
                <li>
                    <img src="/images/slider/2.jpg"/>
                </li>
                <li>
                    <img src="/images/slider/3.jpg"/>
                </li>
                <li>
                    <img src="/images/slider/4.jpg" />
                </li>
                <li>
                    <img src="/images/slider/5.jpg" />
                </li>
                <li>
                    <img src="/images/slider/6.jpg" />
                </li>
                <li>
                    <img src="/images/slider/7.jpg" />
                </li>
                <li>
                    <img src="/images/slider/8.jpg" />
                </li>
                <li>
                    <img src="/images/slider/9.jpg" />
                </li>
                <li>
                    <img src="/images/slider/10.jpg" />
                </li>
            </ul>                
        </div>
      */}
      </section>

      <section id="machines" className="p-10 pt-10 pl-20 pr-20 pb-auto bg-[#f1f1f8]">
        <p className="text-xl font-patrick text-left text-[#0e4579]">Here's what we can offer!</p>
        <h2 className="text-4xl font-bold mb-4 text-left font-qanelas3">Machines and Services</h2>
        <p className="text-lg mb-8 text-left font-poppins1 text-[#605e63]">Our FabLab is equipped with state-of-the-art tools and resources to support a wide range of projects and initiatives.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-auto ">
          
          <div className="bg-[#f8f9fa] bg-white border md:border-0 rounded-3xl overflow-hidden shadow-lg">
            <div className="p-8">
              <div className="flex space-x-2 mb-2 font-figtree3">
                <p className="text-ms py-1 px-3 rounded bg-[#0e4579] text-white">Etch Patterns</p>
                <p className="text-ms py-1 px-3 rounded bg-[#f5a237] text-white">Cut Materials</p>
              </div>
              <h3 className="text-2xl font-qanelas3">Laser Cutter</h3>
            <a href="/services" className="text-[#145da0] hover:underline mb-2">Learn More</a>
            </div>

            <div className="relative h-[318px]">
                  <img src="images/machines/trylaser2.png" alt="machine" className="absolute bottom-0" />
            </div>
          </div>

          <div className="bg-[#f8f9fa] bg-white border md:border-0 rounded-3xl overflow-hidden shadow-lg">
            <div className="p-8">
              <div className="flex space-x-2 mb-2 font-figtree3">
                <p className="text-ms py-1 px-3 rounded bg-[#0e4579] text-white">Prototyping</p>
                <p className="text-ms py-1 px-3 rounded bg-[#f5a237] text-white">Create 3D Models</p>
              </div>
              <h3 className="text-2xl font-qanelas3">3D Printer</h3>
            <a href="/services" className="text-[#145da0] hover:underline mb-2">Learn More</a>
            </div>

            <div className="relative h-[318px]">
                  <img src="images/machines/try3dprint.png" alt="machine" className="absolute bottom-0" />
            </div>
          </div>

          <div className="bg-[#f8f9fa] bg-white border md:border-0 rounded-3xl overflow-hidden shadow-lg">
            <div className="p-8">
              <div className="flex space-x-2 mb-2 font-figtree3">
                <p className="text-ms py-1 px-3 rounded bg-[#0e4579] text-white">Multi-purpose</p>
                <p className="text-ms py-1 px-3 rounded bg-[#f5a237] text-white">Carve Structures</p>
              </div>
              <h3 className="text-2xl font-qanelas3">CNC Mill</h3>
            <a href="/services#" className="text-[#145da0] hover:underline mb-2">Learn More</a>
            </div>

            <div className="relative h-[318px]">
                  <img src="images/machines/trycncmill.png" alt="machine" className="absolute bottom-0" />
            </div>
          </div>

          <div className=" p-6 rounded-lg text-center align-middle pt-28">
            <p className="text-xl font-patrick">Don't worry, there's more!</p>
            <h3 className="text-3xl font-qanelas3 mb-1 text-[#0e4579]">Lorem Ipsum</h3>
            <p className="text-lg mb-4 font-figtree4">Visit our Machines and Services Page</p>
            <p className="text-md mb-10 font-poppins1 px-10">Our FabLab is equipped with state-of-the-art tools and resources to support a wide range of projects and initiatives. Whether you are an entrepreneur, student, or hobbyist, we provide the support and expertise to bring your ideas to life.</p>
            <a href="/services#" className="text-white text-xl bg-[#0e4579] py-3 px-10 rounded-full hover:underline font-qanelas2">Services</a>
          </div>
        </div>
      </section>

      <section id="about" className="min-h-screen p-10 pt-24 pl-20 pr-20 bg-white">
        <h2 className="text-4xl font-bold mb-4">About Us</h2>
        <p className="text-lg mb-8">Learn more about our organization and mission. We are dedicated to fostering innovation and creativity through our cutting-edge facilities and collaborative environment. Our team is passionate about helping individuals and organizations achieve their goals through advanced technology and hands-on learning.</p>
        <p className="text-lg mb-8 ">Our FabLab is equipped with state-of-the-art tools and resources to support a wide range of projects and initiatives. Whether you are an entrepreneur, student, or hobbyist, we provide the support and expertise to bring your ideas to life.</p>
      </section>
    </main>
  );
}
