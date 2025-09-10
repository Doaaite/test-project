import { useState } from 'react'

const OrderForm = ({ addOrder }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    description: '',
    status: 'New'
  })
  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'اسم العميل مطلوب'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'الوصف مطلوب'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      addOrder(formData)
      setFormData({
        customerName: '',
        description: '',
        status: 'New'
      })
      
      // عرض الرسالة
      setShowSuccess(true)
      
      // إخفاء الرسالة بعد 3 ثواني
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">إضافة طلب جديد</h2>
      
      {/* رسالة النجاح - تظهر في الزاوية */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          <div className="flex items-center">
            <span className="ml-2 ">✅</span>
            <span>تمت الإضافة بنجاح!</span>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">اسم العميل</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.customerName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">الوصف</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className={`w-full p-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">الحالة</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          إضافة الطلب
        </button>
      </form>
    </div>
  )
}

export default OrderForm