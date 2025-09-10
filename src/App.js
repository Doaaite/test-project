import './App.css';
import { useState, useEffect , useCallback } from 'react'
import OrderTable from './components/OrderTable'
import Filter from './components/Filter'
import LoadingSpinner from './components/LoadingSpinner'
import OrderForm from './components/OrderForm'
import ErrorMessage from './components/ErrorMessage'

function App() {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    // كود التصفية هنا مباشرة بدل استدعاء الدالة
    if (filter === 'All') {
      setFilteredOrders(orders)
    } else {
      setFilteredOrders(orders.filter(order => order.status === filter))
    }
  }, [orders, filter]) // الآن لا توجد دالة مفقودة

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await import('./data/data.json')
      setTimeout(() => {
        setOrders(response.orders)
        setLoading(false)
      }, 1000)
    } catch (err) {
      setError('فشل في تحميل البيانات')
      setLoading(false)
    }
  }

  // تم حذف الدالة filterOrders تماماً

  // const addOrder = (newOrder) => {
  //   const order = {
  //     id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
  //     ...newOrder,
  //     createdAt: new Date().toISOString().split('T')[0]
  //   }
  //   setOrders([...orders, order])
  // }

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }
  // في مكون App.js
const addOrder = useCallback((newOrder) => {
  const order = {
    id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
    ...newOrder,
    createdAt: new Date().toISOString().split('T')[0]
  };
  setOrders(prevOrders => [...prevOrders, order]);
}, [orders]); // أضف orders ك dependency

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="app container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">نظام إدارة الطلبات</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Filter filter={filter} setFilter={setFilter} />
          <OrderTable 
            orders={filteredOrders} 
            updateOrderStatus={updateOrderStatus} 
          />
        </div>
        
        <div className="lg:col-span-1">
          <OrderForm addOrder={addOrder} />
        </div>
      </div>
    </div>
  )
}

export default App