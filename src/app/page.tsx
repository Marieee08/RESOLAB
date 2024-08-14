// pages/index.js
export default function Home() {
  return (
    <main className="min-h-screen bg-[#f1f1f8]">
      <nav className="bg-[#0d4a8d] p-4 fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-lg">RESOLAB</h1>
          <div className="flex-1 flex justify-center">
            <div className="flex space-x-10">
              <a href="#home" className="text-white px-4 py-2 rounded hover:bg-[#0d4a8d] transition duration-300">Home</a>
              <a href="#about" className="text-white px-4 py-2 rounded hover:bg-[#0d4a8d] transition duration-300">About</a>
              <a href="#events" className="text-white px-4 py-2 rounded hover:bg-[#0d4a8d] transition duration-300">Events</a>
              <a href="#contact" className="text-white px-4 py-2 rounded hover:bg-[#0d4a8d] transition duration-300">Contact</a>
              <a href="#services" className="text-white px-4 py-2 rounded hover:bg-[#0d4a8d] transition duration-300">Services</a>
              <div className="relative group">
                <button className="text-white px-4 py-2 rounded hover:bg-[#0d4a8d] transition duration-300 focus:outline-none">Profile</button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">View Profile</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="flex items-center justify-end h-screen p-10 pt-24 pr-20">
        <div className="text-right max-w-lg mr-20">
          <h1 className="text-7xl mb-4 font-bold">Innovate to</h1>
          <h2 className="text-7xl mb-6 font-extrabold text-orange-300">ELEVATE</h2>
          <p className="text-lg mb-7">Turn your Imagination into Reality with the FabLab!</p>
          <p className="text-lg mb-8">The PSHS-EVC fab lab is a small-scale workshop offering digital fabrication. A fab lab is typically equipped with an array of flexible computer-controlled tools that cover several different length scales and various materials with the aim to make “almost anything”.</p>
          <button className="bg-[#145da0] text-white text-lg py-2 px-6 rounded-full hover:bg-[#0d4a8d] transition duration-300">AVAIL SERVICES</button>
        </div>
      </section>


      <section id="about" className="h-screen p-10 pt-24 pl-20 pr-20 bg-white">
        <h2 className="text-4xl font-bold mb-4">About Us</h2>
        <p className="text-lg mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta mollis sem, vitae blandit tortor porta in. Integer pharetra varius convallis. Morbi lacinia vel purus at varius.</p>
      </section>

      <section id="events" className="h-screen p-10 pt-24 pl-20 pr-20 bg-gray-200">
        <h2 className="text-4xl font-bold mb-4">Events</h2>
        <p className="text-lg mb-8">Check out our upcoming events and workshops.</p>
      </section>

      <section id="contact" className="h-screen p-10 pt-24 pl-20 pr-20 bg-white">
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg mb-8">Get in touch with us for more information.</p>
      </section>

      <section id="services" className="h-screen p-10 pt-24 pl-20 pr-20 bg-gray-200">
        <h2 className="text-4xl font-bold mb-4">Our Services</h2>
        <p className="text-lg mb-8">Explore the range of services we offer.</p>
      </section>
    </main>
  );
}
