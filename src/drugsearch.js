import React, { useEffect, useState } from 'react'
import axios from 'axios'

const drugsearch = (query) => {

    const [brand, setBrand] = useState([])
    const [dosage, setDosage] = useState([])
    const [pharmClass, setpharmClass] = useState([])
    const [geneName, setGeneName] = useState([])
    const [active, setActive] = useState([])
    const [route, setRoute] = useState([])
    const [prodType, setProdtype] = useState([])
    const [pack, setPack] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        setBrand([])
        setDosage([])
        setGeneName([])
        setpharmClass([])
        setRoute([])
        setProdtype([])
        setActive([])
        setPack([])
        setError(() => { return false })
    }, [query])

    useEffect(() => {
        setLoading(true)
        let Cancel
        axios({
            method: 'GET',
            url: "https://api.fda.gov/drug/ndc.json?limit=1",
            params: { search: query },
            cancelToken: new axios.CancelToken(c => Cancel = c)
        }).then(res => {

            setGeneName(prevGeneName => {
                return [...prevGeneName, ...res.data.results.map((resut => resut.generic_name))]
            })

            setBrand(prevBrand => {
                return [...prevBrand, ...res.data.results.map(result => result.brand_name)]
            })
            setDosage(prevDose => {
                return [...prevDose, ...res.data.results.map(result => result.dosage_form)]
            })

            setpharmClass(prevClass => {
                return [...prevClass, ...res.data.results.map(result => result.pharm_class)]
            })

            setRoute(prevRoute => {
                return [...prevRoute, ...res.data.results.map(result => result.route)]
            })

            setProdtype(prodType => {
                return [...prodType, ...res.data.results.map(result => result.product_type)]
            })

            setActive(prevActive => {
              return[ ...prevActive, ...res.data.results.map(result => result.active_ingredients)]
            })

            setPack(prevpack => {
                return[ ...prevpack, ...res.data.results.map(result => result.packaging)]
              })

            console.log(res.data)
            setLoading(false)
        }).catch(error => {
            if (axios.isCancel(error)) return
            setError(true)
            setLoading(false)
        })

        return () => Cancel()
    }, [query])
    return { brand, loading, error, dosage, geneName, pharmClass, route, active, prodType, pack }
}

export default drugsearch