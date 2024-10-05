import Link from "next/link";
import Navbar from '@/components/custom/navbar';
import DynamicSidebar from '@/components/custom/DynamicSidebar';

export default function Information() {
  return (
    <main className="min-h-screen bg-[#f1f1f8] pt-24 flex">
      
      <Navbar />
      <DynamicSidebar  
      username="John Doe"
      role="User"
      profilePicture="/path/to/profile-picture.jpg"
      activePath="/dashboard/user/information"
      />
      
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