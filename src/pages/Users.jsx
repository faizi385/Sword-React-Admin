import { motion } from 'framer-motion';

const Users = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', lastLogin: '5 hours ago' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Author', status: 'Inactive', lastLogin: '2 days ago' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Subscriber', status: 'Active', lastLogin: '1 day ago' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Editor', status: 'Suspended', lastLogin: '1 week ago' },
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Active': 'bg-green-900/50 text-green-400',
      'Inactive': 'bg-gray-700/50 text-gray-400',
      'Suspended': 'bg-red-900/50 text-red-400',
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {status}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleClasses = {
      'Admin': 'bg-purple-900/50 text-purple-400',
      'Editor': 'bg-blue-900/50 text-blue-400',
      'Author': 'bg-yellow-900/50 text-yellow-400',
      'Subscriber': 'bg-gray-800/50 text-gray-400',
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${roleClasses[role]}`}>
        {role}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="bg-[#121212] border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <span className="absolute left-3 top-2.5 text-gray-500">
              🔍
            </span>
          </div>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center">
            <span className="mr-2">+</span> Add User
          </button>
        </div>
      </div>

      <div className="bg-[#121212] rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-4 px-6 text-gray-400 font-medium">USER</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">EMAIL</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">ROLE</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">STATUS</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">LAST LOGIN</th>
                <th className="text-right py-4 px-6">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-white font-medium mr-3">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-400">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-400">{user.email}</td>
                  <td className="py-4 px-6">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="py-4 px-6 text-gray-400">{user.lastLogin}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-gray-400 hover:text-white mr-3" title="Edit">
                      <span className="text-lg">✏️</span>
                    </button>
                    <button className="text-red-400 hover:text-red-300" title="Delete">
                      <span className="text-lg">🗑️</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-800 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">5</span> of <span className="font-medium text-white">24</span> users
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 rounded border border-gray-700 text-gray-400 hover:bg-gray-800">
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-red-500 text-white">
              1
            </button>
            <button className="px-3 py-1 rounded border border-gray-700 text-gray-400 hover:bg-gray-800">
              2
            </button>
            <button className="px-3 py-1 rounded border border-gray-700 text-gray-400 hover:bg-gray-800">
              Next
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Users;
