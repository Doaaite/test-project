const Filter = ({ filter, setFilter }) => {
  const filters = [
    { value: 'All', label: 'الكل' },
    { value: 'New', label: 'جديد' },
    { value: 'In Progress', label: 'قيد التنفيذ' },
    { value: 'Done', label: 'مكتمل' }
  ]

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">تصفية حسب الحالة:</label>
      <div className="flex space-x-2 space-x-reverse">
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1 rounded ${
              filter === f.value 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Filter

