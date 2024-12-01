import React from "react";

const UserManagement = () => {
  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage users and their roles efficiently.</p>
      </header>

      <main className="dashboard-content">
        <section className="user-table-section">
          <h2>User Management</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>john@example.com</td>
                <td>User</td>
                <td>
                  <button className="action-button edit-button">Edit Role</button>
                </td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>jane@example.com</td>
                <td>Admin</td>
                <td>
                  <button className="action-button edit-button">Edit Role</button>
                </td>
              </tr>
              <tr>
                <td>Sam Wilson</td>
                <td>sam@example.com</td>
                <td>Moderator</td>
                <td>
                  <button className="action-button edit-button">Edit Role</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="role-edit-modal hidden">
          <div className="modal-content">
            <h3>Edit User Role</h3>
            <p>Update the role for <strong>Selected User</strong></p>
            <select className="role-dropdown">
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Moderator">Moderator</option>
            </select>
            <div className="modal-actions">
              <button className="action-button save-button">Save</button>
              <button className="action-button cancel-button">Cancel</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserManagement;
