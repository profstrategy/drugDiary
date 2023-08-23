import { act } from "@react-three/fiber";
import React, { useState } from "react";
import drugsearch from "./drugsearch";

const App = () => {

  const [query, setQuery] = useState('')
  const [Classes, setClasses] = useState('')
  const { brand, loading, error, dosage, geneName, pharmClass, route, active, prodType } = drugsearch(query)

  const handleSearch = (e) => {
    setQuery(e.target.value)
  }
  return (
    <>
      <div className='App'>
        <input type="text" onChange={handleSearch} value={query} />
        <div>{loading && 'Loading...'}</div>
        {geneName.map(generic =>
        (<div
          key={generic}
        >
          GENERIC NAME: {generic}
        </div>))}

        {brand.map(brand =>
        (<div
          key={brand}
        >BRAND NAME: {brand}
        </div>))}

        {active.map(actv => (
          Object.values(actv).map(actev => (
            Object.values(actev).map((value, index) => (
              <p> active ingredient:{value}</p>
            ))
          ))
        ))}


        {pharmClass.map(pharmclass =>
        (<div
          key={pharmclass}
        >PHARMACOLOGIC CLASS: {...[pharmclass].map(classes =>
        (<span
          key={classes}
        >{classes}</span>))}
        </div>))}

        {dosage.map(dosage =>
        (<div
          key={dosage}
        >DOSAGE FORM: {dosage}
        </div>))}

        {route.map(route =>
        (<div key={route}
        >ROUTE: {route}</div>))}

        {prodType.map(prod =>
        (<div
          key={prod.product_type}
        >PRODUCT-TYPE: {prod}
        </div>
        ))}

        <div>{error && 'No matches found!'}</div>
      </div>
    </>
  )
}

export default App
