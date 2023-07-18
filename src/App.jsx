import React, { useState } from 'react'
import './App.css'
import drugsearch from './drugsearch'

function App() {
  const [query, setQuery] = useState('')
  const { brand, loading, error, dosage, geneName, pharmClass, route, active } = drugsearch(query)

  const handleSearch = (e) => {
    setQuery(e.target.value)
  }
  return (
    <>
      <div className='App'>
        <input type="text" onChange={handleSearch} value={query} />
        <div>{loading && 'Loading...'}</div>
        {geneName.map(generic => (<div key={generic}>GENERIC NAME: {generic}</div>))}
        {brand.map(brand => (<div key={brand}>BRAND NAME: {brand}</div>))}
        {pharmClass.map(pharmclass => (<div key={pharmclass}>PHARMACOLOGIC CLASS: {...[pharmclass].map(classes => (<span key={classes}>{classes}</span>))}</div>))}
        {dosage.map(dosage => (<div key={dosage}>DOSAGE FORM: {dosage}</div>))}
        {route.map(route => (<div key={route}>ROUTE: {...[route].map(rou => (<span key={rou}>{rou}</span>))}</div>))}
        {active.map(ingredients => (<div key={ingredients}></div>))}
        <div>{error && 'No matches found!'}</div>
      </div>
    </>
  )
}

export default App
