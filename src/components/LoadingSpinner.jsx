const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <br/>
      <div className="mt-3">جاري تحميل البيانات...</div>
    </div>
  )
}

export default LoadingSpinner