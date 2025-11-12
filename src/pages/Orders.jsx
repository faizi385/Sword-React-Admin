import { motion } from 'framer-motion';

const Orders = () => {
  const orders = [
    { id: '#ORD-001', customer: 'John Doe', date: '2023-11-12', status: 'Completed', total: 299.99 },
    { id: '#ORD-002', customer: 'Jane Smith', date: '2023-11-11', status: 'Processing', total: 199.99 },
    { id: '#ORD-003', customer: 'Bob Johnson', date: '2023-11-10', status: 'Shipped', total: 149.99 },
    { id: '#ORD-004', customer: 'Alice Brown', date: '2023-11-09', status: 'Pending', total: 89.99 },
    { id: '#ORD-005', customer: 'Charlie Wilson', date: '2023-11-08', status: 'Cancelled', total: 199.99 },
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Completed': 'bg-green-900/50 text-green-400',
      'Processing': 'bg-blue-900/50 text-blue-400',
      'Shipped': 'bg-purple-900/50 text-purple-400',
      'Pending': 'bg-yellow-900/50 text-yellow-400',
      'Cancelled': 'bg-red-900/50 text-red-400',
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {status}
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
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="bg-[#121212] border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <span className="absolute left-3 top-2.5 text-gray-500">
              🔍
            </span>
          </div>
          <select className="bg-[#121212] border border-gray-800 rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
            <option>All Status</option>
            <option>Completed</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-[#121212] rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-4 px-6 text-gray-400 font-medium">ORDER ID</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">CUSTOMER</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">DATE</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">STATUS</th>
                <th className="text-right py-4 px-6 text-gray-400 font-medium">TOTAL</th>
                <th className="text-right py-4 px-6">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-medium text-red-400">{order.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-white text-sm font-medium mr-3">
                        {order.customer[0]}
                      </div>
                      {order.customer}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-400">{order.date}</td>
                  <td className="py-4 px-6">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="py-4 px-6 text-right font-medium">${order.total.toFixed(2)}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-gray-400 hover:text-white mr-3" title="View">
                      <span className="text-lg">👁️</span>
                    </button>
                    <button className="text-blue-400 hover:text-blue-300 mr-3" title="Edit">
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
            Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">5</span> of <span className="font-medium text-white">24</span> orders
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

export default Orders;
