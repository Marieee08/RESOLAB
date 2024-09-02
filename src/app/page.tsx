import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f1f1f8]">
      
      <nav className="bg-[#0d4a8d] p-4 fixed w-full top-0 z-10">
        <div className="container mx-auto flex items-center justify-between relative">
          <div className="flex items-center space-x-4">
            <img src="/images" alt="DOST Logo" className="w-10 h-10" />
            <img src="SSF-logo.png" alt="SSF Logo" className="w-10 h-10" />
            <Link href="/.." className="text-white text-lg">RESOLAB</Link>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-10">
              <Link href="/dashboard" className="text-white px-4 py-2 rounded hover:bg-[#5394cf] transition duration-300">Dashboard</Link>
              <Link href="/services" className="text-white px-4 py-2 rounded hover:bg-[#5394cf] transition duration-300">Services</Link>
              <Link href="/contact" className="text-white px-4 py-2 rounded hover:bg-[#5394cf] transition duration-300">Contact</Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative group">
              <button className="text-white px-4 py-2 rounded hover:bg-blue-500 transition duration-300 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405C18.79 14.79 18 13.42 18 12V8a6 6 0 10-12 0v4c0 1.42-.79 2.79-2.595 3.595L3 17h5m4 0v1a3 3 0 11-6 0v-1m6 0a3 3 0 01-6 0"></path>
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                <ul className="divide-y divide-gray-300">
                  <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Order Notification 1
                  </li>
                  <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Announcement 1
                  </li>
                  <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Message Notification 1
                  </li>
                  <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Order Notification 2
                  </li>
                  <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Announcement 2
                  </li>
                  <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Message Notification 2
                  </li>
                </ul>
              </div>
            </div>

            <img src="path/to/profile-picture.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
          </div>
        </div>
      </nav>

      <section id="home" className="flex items-center justify-end h-screen p-10 pt-24 pr-20">
        <div className="text-right max-w-lg mr-20">
          <h1 className="text-7xl mb-4 font-bold">Innovate to</h1>
          <h2 className="text-7xl mb-6 font-extrabold text-orange-300">ELEVATE</h2>
          <p className="text-lg mb-7">Turn your Imagination into Reality with the FabLab!</p>
          <p className="text-lg mb-8">The PSHS-EVC fab lab is a small-scale workshop offering digital fabrication. A fab lab is typically equipped with an array of flexible computer-controlled tools that cover several different length scales and various materials with the aim to make “almost anything”.</p>
          <a href="/services" className="bg-[#145da0] text-white text-lg py-2 px-6 rounded-full hover:bg-[#0d4a8d] transition duration-300">
            AVAIL SERVICES
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
