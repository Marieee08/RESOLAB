import Link from "next/link";

export default function Contacts() {
  return (

<section className="body-font relative bg-[#f8f9fa] text-gray-400">
    <nav className="bg-[#0d4a8d] p-4 fixed w-full top-0 z-10">
        <div className="container mx-auto flex items-center justify-between relative">
          <div className="flex items-center space-x-4">
            <img src="/images" alt="DOST Logo" className="w-10 h-10" />
            <img src="SSF-logo.png" alt="SSF Logo" className="w-10 h-10" />
            <a href="/.." className="text-white text-lg">RESOLAB</a>
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

  <div className="container mx-auto px-5 py-24">
    
    <div className="mb-12 flex w-full flex-col text-center">
      <h1 className="title-font mb-4 text-2xl font-medium text-gray-800 sm:text-3xl">Contact Us</h1>
      <p className="mx-auto text-base leading-relaxed lg:w-2/3">Feel free to reach out to us! Whether you have a question,
        feedback, or a collaboration proposal, we'd love to hear from you.
      </p>
    </div>

    <div className="mx-auto md:w-2/3 lg:w-1/2">
      <div className="-m-2 flex flex-wrap">

        <div className="w-1/2 p-2">
          <div className="relative">
            <input type="text" id="name" name="name" className="peer w-full rounded border border-gray-700 bg-gray-800 bg-opacity-40 py-1 px-3 text-base leading-8 text-gray-100 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900" placeholder="Name" />
            <label className="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:bg-gray-900 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500">Name</label>
          </div>
        </div>
        <div className="w-1/2 p-2">
          <div className="relative">
            <input type="email" id="email" name="email" className="peer w-full rounded border border-gray-700 bg-gray-800 bg-opacity-40 py-1 px-3 text-base leading-8 text-gray-100 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900" placeholder="Email" />
            <label className="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:bg-gray-900 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500">Email</label>
          </div>
        </div>
        <div className="mt-4 w-full p-2">
          <div className="relative">
            <textarea id="message" name="message" className="peer h-32 w-full resize-none rounded border border-gray-700 bg-gray-800 bg-opacity-40 py-1 px-3 text-base leading-6 text-gray-100 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900" placeholder="Message"></textarea>
            <label className="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:bg-gray-900 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500">Message</label>
          </div>
        </div>
        <div className="w-full p-2">
          <button className="mx-auto flex rounded border-0 bg-indigo-500 py-2 px-8 text-lg text-white hover:bg-indigo-600 focus:outline-none">Submit</button>
        </div>


        <div className="mt-8 w-full border-t border-gray-800 p-2 pt-8 text-center">
          <a className="text-indigo-400">ctapales@evc.pshs.edu.ph</a>
          <p className="my-5 leading-normal">Ground Floor of Crest Building, PSHS-EVC <br />Pawing, Palo, Leyte, 6501, Philippines</p>
          <span className="inline-flex">
            <a className="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-4 text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-4 text-gray-500">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="h-5 w-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-4 text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
            </a>
          </span>
        </div>

      </div>
    </div>

  </div>
  
</section>

  )
}