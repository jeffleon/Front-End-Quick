import {useState, useEffect} from 'react';

const useFetch = (url, body="null", method=0) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchsource = async () =>{
            try{
                var cors = "https://cors-anywhere.herokuapp.com/"
                var response = await fetch(url); 
                const data = await response.json();
                setData(data);
                setLoading(false);
            }catch(error){
                setError(error);
                setLoading(false);     
            }
        }
        fetchsource()
    },[url])

    return {data, loading, error}
}

export default useFetch