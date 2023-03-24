import { useState, useEffect } from 'react';
import instance from '../service';
const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    // useEffect: khi dependency(truong hop nay la URL) thay doi thi goi callback(truong hop nay la function fetchData())
    useEffect(() => {
        // define EffectCallback function
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await instance.get(url)
                setData(res.data);
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
        // call EffectCallback everytime deps(url) change
        fetchData();
    }, [url]);

        const reFetch = async () => {
            setLoading(true);
            try {
                const res = await instance.get(url);
                setData(res.data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };

        return {data, loading, error, reFetch};
};

export default useFetch;