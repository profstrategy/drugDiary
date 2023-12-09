import React from 'react';
import { useState, useEffect } from 'react';
import drugsearch from './drugsearch'

const Info = () => {

  const { dosage, geneName, brand, prodType, 
    pharmClass, active, route, loading, pack } = drugsearch()

  const [ querry, setQuerry] = useState({
    // dosage,
    geneName,
    brand,
    prodType,
    pharmClass,
    active,
    route,
    loading,
    pack
})

    return (
      <>
      <div>
        {querry.geneName.map(each => (
          setQuerry(<h5>{each}</h5>)
        ))}
      </div>
      </>
    )
}

export default Info
