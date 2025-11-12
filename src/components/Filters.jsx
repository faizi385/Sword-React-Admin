import { FiCheck, FiDollarSign, FiTag, FiBox } from 'react-icons/fi';

// Price ranges in PKR
const priceRanges = [
  { id: 'all', name: 'All Prices' },
  { id: 'under-10k', name: 'Under PKR 10,000', min: 0, max: 10000 },
  { id: '10k-50k', name: 'PKR 10,000 - 50,000', min: 10000, max: 50000 },
  { id: '50k-100k', name: 'PKR 50,000 - 100,000', min: 50000, max: 100000 },
  { id: 'over-100k', name: 'Over PKR 100,000', min: 100000, max: Infinity },
];

const Filters = ({ 
  filters = {
    priceRange: 'all',
    inStock: false,
    onSale: false
  },
  onFilterChange = () => {}
}) => {
  // Handle price range change
  const handlePriceRangeChange = (rangeId) => {
    onFilterChange({ ...filters, priceRange: rangeId });
  };

  // Handle in stock toggle
  const handleInStockChange = (checked) => {
    onFilterChange({ ...filters, inStock: checked });
  };

  // Handle on sale toggle
  const handleOnSaleChange = (checked) => {
    onFilterChange({ ...filters, onSale: checked });
  };

  // Clear all filters
  const clearFilters = () => {
    onFilterChange({
      priceRange: 'all',
      inStock: false,
      onSale: false
    });
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button 
          onClick={clearFilters}
          className="text-sm text-red-400 hover:text-red-300"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Price Range</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => handlePriceRangeChange(range.id)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  filters.priceRange === range.id
                    ? 'bg-red-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{range.name}</span>
                  {filters.priceRange === range.id && <FiCheck className="h-4 w-4" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* In Stock Toggle */}
        <div>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm font-medium text-gray-300">In Stock Only</span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={filters.inStock}
                onChange={(e) => handleInStockChange(e.target.checked)}
              />
              <div className={`block w-10 h-6 rounded-full transition-colors ${
                filters.inStock ? 'bg-red-600' : 'bg-gray-700'
              }`}></div>
              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                filters.inStock ? 'transform translate-x-4' : ''
              }`}></div>
            </div>
          </label>
        </div>

        {/* On Sale Toggle */}
        <div>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm font-medium text-gray-300">On Sale</span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={filters.onSale}
                onChange={(e) => handleOnSaleChange(e.target.checked)}
              />
              <div className={`block w-10 h-6 rounded-full transition-colors ${
                filters.onSale ? 'bg-red-600' : 'bg-gray-700'
              }`}></div>
              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                filters.onSale ? 'transform translate-x-4' : ''
              }`}></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filters;
