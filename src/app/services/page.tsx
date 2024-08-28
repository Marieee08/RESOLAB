export default function Services() {
    const machines = [
      {
        name: '3D Printer',
        image: 'path/to/3d-printer-image.jpg',
        description: 'Create precise and intricate 3D models with our advanced 3D printers.',
      },
      {
        name: 'Laser Cutter',
        image: 'path/to/laser-cutter-image.jpg',
        description: 'Cut and engrave materials with high precision using our laser cutters.',
      },
      {
        name: 'CNC Machine',
        image: 'path/to/cnc-machine-image.jpg',
        description: 'Produce complex parts with our computer-controlled CNC machines.',
      },
      {
        name: 'Vinyl Cutter',
        image: 'path/to/vinyl-cutter-image.jpg',
        description: 'Cut vinyl and other materials to create custom designs and decals.',
      },
      {
        name: 'PCB Mill',
        image: 'path/to/pcb-mill-image.jpg',
        description: 'Mill custom printed circuit boards for your electronic projects.',
      },
      {
        name: 'Soldering Station',
        image: 'path/to/soldering-station-image.jpg',
        description: 'Assemble and repair electronic components with our soldering stations.',
      },
    ];
  
    return (
      <main className="min-h-screen bg-[#f1f1f8] pt-24">
        
        <nav className="bg-[#0d4a8d] p-4 fixed w-full top-0 z-10 flex items-center justify-between">
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
  
        <section className="container mx-auto p-10">
          <h2 className="text-4xl font-bold mb-8 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {machines.map((machine, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <img src={machine.image} alt={machine.name} className="h-48 w-full object-cover rounded-t-lg mb-4" />
                <h3 className="text-2xl font-bold mb-2">{machine.name}</h3>
                <p className="text-gray-700 mb-4">{machine.description}</p>
                <button className="bg-[#145da0] text-white py-2 px-4 rounded-full hover:bg-[#0d4a8d] transition duration-300">
                  Avail Service
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }
  