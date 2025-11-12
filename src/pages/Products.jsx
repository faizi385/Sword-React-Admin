import { motion } from 'framer-motion';

const Products = () => {
  const products = [
    { id: 1, name: 'Premium Sword', category: 'Weapons', price: 299.99, stock: 45, status: 'In Stock' },
    { id: 2, name: 'Leather Armor', category: 'Armor', price: 199.99, stock: 12, status: 'Low Stock' },
    { id: 3, name: 'Health Potion', category: 'Potions', price: 24.99, stock: 0, status: 'Out of Stock' },
    { id: 4, name: 'Magic Ring', category: 'Accessories', price: 149.99, stock: 8, status: 'In Stock' },
    { id: 5, name: 'Steel Shield', category: 'Shields', price: 159.99, stock: 5, status: 'Low Stock' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center">
          <span className="mr-2">+</span> Add Product
        </button>
      </div>

      <div className="bg-[#121212] rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Product</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Category</th>
                <th className="text-right py-4 px-6 text-gray-400 font-medium">Price</th>
                <th className="text-right py-4 px-6 text-gray-400 font-medium">Stock</th>
                <th className="text-right py-4 px-6 text-gray-400 font-medium">Status</th>
                <th className="text-right py-4 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-800 rounded-lg flex items-center justify-center text-red-500 mr-4">
                        {product.name[0]}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-400">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">${product.price.toFixed(2)}</td>
                  <td className="py-4 px-6 text-right">{product.stock}</td>
                  <td className="py-4 px-6 text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      product.status === 'In Stock' ? 'bg-green-900/50 text-green-400' :
                      product.status === 'Low Stock' ? 'bg-yellow-900/50 text-yellow-400' :
                      'bg-red-900/50 text-red-400'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-gray-400 hover:text-white mr-3">
                      <span className="text-xl">✏️</span>
                    </button>
                    <button className="text-red-400 hover:text-red-300">
                      <span className="text-xl">🗑️</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-800 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">5</span> of <span className="font-medium text-white">24</span> results
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

export default Products;
