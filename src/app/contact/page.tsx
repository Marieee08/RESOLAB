export default function Contact() {
  return (
    <main className="min-h-screen bg-[#f1f1f8] pt-24">
      
      <nav className="bg-[#0d4a8d] p-4 fixed w-full top-0 z-10">
        <div className="container mx-auto flex items-center justify-between relative">
          <div className="flex items-center space-x-4">
            <img src="/images" alt="DOST Logo" className="w-10 h-10" />
            <img src="SSF-logo.png" alt="SSF Logo" className="w-10 h-10" />
            <a href="/.." className="text-white text-lg">RESOLAB</a>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-10">
              <a href="/dashboard" className="text-white px-4 py-2 rounded hover:bg-[#5394cf] transition duration-300">Dashboard</a>
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

      <section className="container mx-auto p-10 pt-32 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/3 pr-0 lg:pr-8 mb-8 lg:mb-0">
          <img src="path/to/admin-image.jpg" alt="Admin" className="w-full h-auto rounded-lg mb-4" />
          <h2 className="text-2xl font-bold mb-2">Admin Name</h2>
          <p className="text-gray-700">Brief description about the admin goes here. This can include their role, experience, and any other relevant information.</p>
        </div>
        <div className="w-full lg:w-2/3">
          <h2 className="text-4xl font-bold mb-8 text-center">Contact Us</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <form>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your name" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Your email" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                  Subject
                </label>
                <input className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="subject" type="text" placeholder="Subject" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <textarea className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" rows="4" placeholder="Your message"></textarea>
              </div>
              <div className="flex items-center justify-center">
                <button className="bg-[#145da0] text-white py-3 px-6 rounded-full hover:bg-[#0d4a8d] transition duration-300" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
