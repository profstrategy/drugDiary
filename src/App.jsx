import React, { useState } from "react";
import { useEffect } from "react";


const App = () => {
  return (
    <div>
      <Drug>
        <DrugList />
      </Drug>
      <DrugContent />
    </div>
  )

}


export default App

const Drug = ({ children }) => {

  return (
    <div>
      {children}
    </div>
  )
}

const DrugList = () => {
  const [query, setQuery] = useState('')
  const [drugs, setDrugs] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [iserror, setError] = useState('')


  const handleQuery = (e) => {
    setQuery(e.target.value)
  }

  useEffect(() => {

    async function fetchDrugs() {
      try {
        setIsLoading(true)
        const res = await fetch(`https://api.fda.gov/drug/drugsfda.json?api_key=MgktfyXuOpmmSw3nmZmq2oq5rdeCLTFAA3CLbqSM&search=openfda.brand_name:"${query}"&limit=5`)
        if (!res.ok) 
        throw new Error("Something went wrong")
        const data = await res.json()
        let result = data.results
        
        const brandGenericName = Object.entries(result).map((fda) => fda.at(1).openfda.brand_name)
        setDrugs(prevBrandGenericName => {
          return [...prevBrandGenericName, ...brandGenericName]
        })
        
      } catch (err) {
        setError(err.message)
      }finally{
        setIsLoading(false)
      }
    }
    if (!query) return

    fetchDrugs()
  }, [query])
  return (
    <div>
      <input value={query} onChange={handleQuery} />
      {isLoading && <Loading />}
      {!isLoading && !iserror && drugs}

      {iserror && <ErrorMessage msg={iserror} />}

    </div>
  )
}

const DrugContent = () => {
  return (
    <div></div>
  )
}

const Loading = () => {
  return (
    <div>Loading...</div>
  )
}

const ErrorMessage = ({msg}) => {
  return (
    <p>{msg}</p>
  )
}