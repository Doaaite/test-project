const OrderTable = ({ orders, updateOrderStatus }) => {
  const handleStatusChange = (orderId, e) => {
    updateOrderStatus(orderId, e.target.value)
  }

  const statusColors = {
    'New': 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Done': 'bg-green-100 text-green-800'
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border-b">اسم العميل</th>
            <th className="px-4 py-2 border-b">الوصف</th>
            <th className="px-4 py-2 border-b">تاريخ الإنشاء</th>
            <th className="px-4 py-2 border-b">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">لا توجد طلبات لعرضها</td>
            </tr>
          ) : (
            orders.map(order => (
              <tr key={order.id}>
                <td className="px-4 py-2 border-b">{order.customerName}</td>
                <td className="px-4 py-2 border-b">{order.description}</td>
                <td className="px-4 py-2 border-b">{order.createdAt}</td>
                <td className="px-4 py-2 border-b">
                  <select 
                    value={order.status} 
                    onChange={(e) => handleStatusChange(order.id, e)}
                    className={`px-2 py-1 rounded ${statusColors[order.status]}`}
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default OrderTable