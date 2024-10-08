import Link from "next/link";
import Navbar from '@/components/custom/navbar';

export default function Information() {
  return (
    <main className="min-h-screen bg-[#f1f1f8] pt-24 flex">
      
      <Navbar />

      <aside className="bg-[#112235] w-64 h-full fixed top-0 left-0 pt-24">
        <div className="flex flex-col items-center py-8">
          <img src="path/to/profile-picture.jpg" alt="Profile" className="w-24 h-24 rounded-full mb-4" />
          <h2 className="text-white text-xl font-bold">Username</h2>
          <p className="text-[#5394cf]">Role</p>
        </div>
        <nav className="mt-10">
          <ul className="space-y-4">
          <li>
              <a href="/dashboard" className="text-white px-4 py-2 flex items-center hover:bg-[#145da0] rounded transition duration-300">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 8.5a3 3 0 013-3h10a3 3 0 013 3v7a3 3 0 01-3 3H5a3 3 0 01-3-3v-7zm3-1a1 1 0 00-1 1v7a1 1 0 001 1h10a1 1 0 001-1v-7a1 1 0 00-1-1H5z" />
                </svg>
                Orders
              </a>
            </li>
            
            <li>
              <Link href="/dashboard/settings" className="text-white px-4 py-2 flex items-center hover:bg-[#145da0] rounded transition duration-300">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a2 2 0 100 4 2 2 0 000-4zM10 6a2 2 0 110 4 2 2 0 010-4zm0 4a2 2 0 100 4 2 2 0 000-4zM10 12a2 2 0 110 4 2 2 0 010-4zm0 4a2 2 0 100 4 2 2 0 000-4zM10 16a2 2 0 110 4 2 2 0 010-4zM10 2a2 2 0 100 4 2 2 0 000-4zM10 6a2 2 0 110 4 2 2 0 010-4zM10 10a2 2 0 110 4 2 2 0 010-4zM10 14a2 2 0 100 4 2 2 0 000-4zM10 18a2 2 0 100 4 2 2 0 000-4zM10 10a2 2 0 100 4 2 2 0 000-4zM10 14a2 2 0 100 4 2 2 0 000-4zM10 18a2 2 0 100 4 2 2 0 000-4zM10 10a2 2 0 100 4 2 2 0 000-4zM10 14a2 2 0 100 4 2 2 0 000-4zM10 18a2 2 0 100 4 2 2 0 000-4zM10 14a2 2 0 100 4 2 2 0 000-4zM10 18a2 2 0 100 4 2 2 0 000-4zM10 14a2 2 0 100 4 2 2 0 000-4zM10 18a2 2 0 100 4 2 2 0 000-4zM10 14a2 2 0 100 4 2 2 0 000-4zM10 18a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                Settings
              </Link>
            </li>

            <li>
              <Link href="/dashboard/information" className="text-white px-4 py-2 flex items-center bg-[#145da0] rounded transition duration-300">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 8.5a3 3 0 013-3h10a3 3 0 013 3v7a3 3 0 01-3 3H5a3 3 0 01-3-3v-7zm3-1a1 1 0 00-1 1v7a1 1 0 001 1h10a1 1 0 001-1v-7a1 1 0 00-1-1H5z" />
                </svg>
                Information
              </Link>
            </li>
            <li>
              <Link href="/logout" className="text-white px-4 py-2 flex items-center hover:bg-[#145da0] rounded transition duration-300">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 8.5a3 3 0 013-3h10a3 3 0 013 3v7a3 3 0 01-3 3H5a3 3 0 01-3-3v-7zm3-1a1 1 0 00-1 1v7a1 1 0 001 1h10a1 1 0 001-1v-7a1 1 0 00-1-1H5z" />
              </svg>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>


      {/* Main Content */}
      <section className="flex-1 ml-64 p-8">
        <h1 className="text-3xl font-bold mb-6">Registration Information</h1>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <table className="table-auto w-full text-left">
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-semibold">Name</td>
                <td className="border px-4 py-2">Sir Rolex</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Email</td>
                <td className="border px-4 py-2">sir.rolex@example.com</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Organization</td>
                <td className="border px-4 py-2">PSHS-EVC</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Role</td>
                <td className="border px-4 py-2">Our beloved teacher</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Phone</td>
                <td className="border px-4 py-2">+63 912 345 6789</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Address</td>
                <td className="border px-4 py-2">1234 Main St, Quezon City</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-right">
          <button className="bg-[#145da0] text-white py-2 px-4 rounded-lg hover:bg-[#0d4a8d] transition duration-300">
            Edit Information
          </button>
        </div>
      </section>
    </main>
  );
}