import React, {useEffect, useState} from 'react'
import axios from 'axios';

export default function Chat() {

  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api').then(res => {
      setData(res.data.message)
    })
  }, [data])

  return (
    <div>{data}</div>
  )
}
