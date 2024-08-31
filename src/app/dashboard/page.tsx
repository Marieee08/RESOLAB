export default function Dashboard() {
    return (
      <main className="min-h-screen bg-[#f1f1f8]">
        
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
  
        <section id="dashboard-overview" className="p-10 pt-24">
          <h2 className="text-4xl font-bold mb-8">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Statistics</h3>
              <p className="text-gray-700">View real-time statistics about usage, project completions, and more.</p>
              <a href="#" className="text-[#145da0] hover:underline mt-4 inline-block">View Details</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Recent Activity</h3>
              <p className="text-gray-700">Check the latest activities and updates in your workspace.</p>
              <a href="#" className="text-[#145da0] hover:underline mt-4 inline-block">View Details</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Notifications</h3>
              <p className="text-gray-700">Stay informed with the latest alerts and messages.</p>
              <a href="#" className="text-[#145da0] hover:underline mt-4 inline-block">View Details</a>
            </div>
          </div>
        </section>
  
        <section id="projects" className="p-10 bg-white">
          <h2 className="text-4xl font-bold mb-8">Your Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#f8f9fa] p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Project Title 1</h3>
              <p className="text-gray-600 mb-4">Status: In Progress</p>
              <p className="text-gray-700 mb-4">A brief overview of the project and its current status.</p>
              <a href="#" className="text-[#145da0] hover:underline">View Project</a>
            </div>
            <div className="bg-[#f8f9fa] p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Project Title 2</h3>
              <p className="text-gray-600 mb-4">Status: Completed</p>
              <p className="text-gray-700 mb-4">Summary of the completed project with key achievements.</p>
              <a href="#" className="text-[#145da0] hover:underline">View Project</a>
            </div>
            <div className="bg-[#f8f9fa] p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Project Title 3</h3>
              <p className="text-gray-600 mb-4">Status: Pending</p>
              <p className="text-gray-700 mb-4">Details about the upcoming project and its objectives.</p>
              <a href="#" className="text-[#145da0] hover:underline">View Project</a>
            </div>
          </div>
        </section>
  
        <section id="resources" className="p-10 pt-24 pl-20 pr-20 bg-[#f1f1f8]">
          <h2 className="text-4xl font-bold mb-8">Resources</h2>
          <p className="text-lg mb-8">Access a variety of resources to support your work, including tutorials, templates, and guides.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Resource Title 1</h3>
              <p className="text-gray-700 mb-4">Description of the resource and how it can be used.</p>
              <a href="#" className="text-[#145da0] hover:underline">Access Resource</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Resource Title 2</h3>
              <p className="text-gray-700 mb-4">Overview of the resource with key features highlighted.</p>
              <a href="#" className="text-[#145da0] hover:underline">Access Resource</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Resource Title 3</h3>
              <p className="text-gray-700 mb-4">Brief description of what the resource offers.</p>
              <a href="#" className="text-[#145da0] hover:underline">Access Resource</a>
            </div>
          </div>
        </section>
      </main>
    );
  }
  