import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          { title: 'Total Users', value: '2,543', change: '+12%', icon: '👥' },
          { title: 'Total Revenue', value: '$12,543', change: '+8%', icon: '💰' },
          { title: 'New Orders', value: '143', change: '+5%', icon: '📦' },
          { title: 'Active Now', value: '24', change: '+2%', icon: '🔥' },
        ].map((stat, index) => (
          <div key={index} className="bg-[#121212] p-6 rounded-xl border border-gray-800 hover:border-red-500/50 transition-colors">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <span className="text-green-400 text-xs mt-1 inline-block">{stat.change} from last month</span>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#121212] p-6 rounded-xl border border-gray-800 mb-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center p-3 hover:bg-gray-900/50 rounded-lg transition-colors">
              <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-red-500 mr-4">
                {['👤', '📦', '💰', '📝', '🔔'][item - 1]}
              </div>
              <div className="flex-1">
                <p className="font-medium">New order #{1000 + item} has been placed</p>
                <p className="text-sm text-gray-400">2 hours ago</p>
              </div>
              <span className="text-sm text-gray-400">View</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
