import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f1f1f8]">
      <nav className="bg-[#0d4a8d] p-4 fixed w-full top-0 z-30 flex items-center justify-between">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-white text-lg">RESOLAB</h1>
          <div className="flex-1 flex justify-center">
            <div className="flex space-x-10">
              <a href="../" className="text-white px-4 py-2 rounded hover:bg-[#5394cf] transition duration-300">Home</a>
              <a href="/services" className="text-white px-4 py-2 rounded hover:bg-[#5394cf] transition duration-300">Services</a>
              <a href="/contact" className="text-white px-4 py-2 rounded hover:bg-[#5394cf] transition duration-300">Contact</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <img src="path/to/profile-picture.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
            <div className="relative group">
              <button className="text-white px-4 py-2 rounded hover:bg-blue-500 transition duration-300 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">View Profile</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="grid grid-cols-1 md:grid-cols-2 items-center h-auto pt-0 pb-5">

        <div style={{ width: '110%' }} className="flex items-center justify-center order-2 md:order-1 mb-6 md:mb-0">
          <img src="images/elements/fablablanding.png" alt="Fabrication Laboratory of PSHS-EVC" className="relative inset-0 z-20 w-5/6 h-auto mb-5 mr-auto mt-32 pl-0" />
          <img src="images/elements/settingsrotate.png" alt="Rotating Background" className="absolute inset-0 z-0 flex items-center justify-left overflow-hidden container mx-auto w-2/6 h-auto pl-20 ml-96 mt-96 rotate-fixed" />
          <img src="images/elements/squiggly.png" alt="Rotating Background" className="absolute inset-0 z-0 flex items-center justify-left overflow-hidden container mx-auto w-1/3 h-auto ml-96 mt-5" />
        </div>

        <div className="relative z-1 flex flex-col justify-center text-right space-y-4 order-1 md:order-2 px-20 p-10 z-2 pt-32">
          <h1 className="text-7xl font-extrabold">Innovate to</h1>
          <h2 className="block text-7xl font-extrabold text-[#f5a237]">ELEVATE</h2>
          <p className="text-lg">
            Turn your Imagination into Reality with the FabLab!
          </p>
          <p className="text-lg">
            The PSHS-EVC fab lab is a small-scale workshop offering digital fabrication. A fab lab is typically equipped with an array of flexible
            computer-controlled tools that cover several different length scales and various materials with the aim to make “almost anything”.
          </p>
          <a href="/services" className="bg-[#0e4579] text-white font-bold text-lg py-2 px-6 rounded-full hover:bg-[#0d4a8d] transition duration-300 max-w-xs ml-auto">
            Avail Services
          </a>
        </div>
      </section>

      <section id="events" className="h-screen p-10 pt-24 pl-20 pr-20 bg-white">
        <h2 className="text-4xl font-bold mb-4">Upcoming Events</h2>
        <p className="text-lg mb-8">Stay tuned for our upcoming events. We regularly host workshops, fairs, and other exciting activities. Check back often for the latest updates and event details!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#f8f9fa] p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Event Title 1</h3>
            <p className="text-gray-600 mb-4">Date: MM/DD/YYYY</p>
            <p className="text-gray-700 mb-4">Brief description of the event goes here. Provide some details about what participants can expect.</p>
            <a href="#" className="text-[#145da0] hover:underline">Learn More</a>
          </div>
          <div className="bg-[#f8f9fa] p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Event Title 2</h3>
            <p className="text-gray-600 mb-4">Date: MM/DD/YYYY</p>
            <p className="text-gray-700 mb-4">Brief description of the event goes here. Provide some details about what participants can expect.</p>
            <a href="#" className="text-[#145da0] hover:underline">Learn More</a>
          </div>
          <div className="bg-[#f8f9fa] p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Event Title 3</h3>
            <p className="text-gray-600 mb-4">Date: MM/DD/YYYY</p>
            <p className="text-gray-700 mb-4">Brief description of the event goes here. Provide some details about what participants can expect.</p>
            <a href="#" className="text-[#145da0] hover:underline">Learn More</a>
          </div>
        </div>
      </section>

      <section id="about" className="h-screen p-10 pt-24 pl-20 pr-20 bg-[#f1f1f8]">
        <h2 className="text-4xl font-bold mb-4">About Us</h2>
        <p className="text-lg mb-8">Learn more about our organization and mission. We are dedicated to fostering innovation and creativity through our cutting-edge facilities and collaborative environment. Our team is passionate about helping individuals and organizations achieve their goals through advanced technology and hands-on learning.</p>
        <p className="text-lg mb-8">Our FabLab is equipped with state-of-the-art tools and resources to support a wide range of projects and initiatives. Whether you are an entrepreneur, student, or hobbyist, we provide the support and expertise to bring your ideas to life.</p>
      </section>
    </main>
  );
}
