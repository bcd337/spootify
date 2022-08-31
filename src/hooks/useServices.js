import { useState, useEffect } from 'react'

export default function useServices(service) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const controller = new AbortController();
    const call = service(controller.signal)

    async function getData() {
      setLoading(true)
      const newData = await call.catch(() => [])
      setData(newData)
      setLoading(false)
    }
    
    getData()

    return () => {
      controller.abort()
    }
  }, [service])
  
  return [data, loading]
}