import {useState, useEffect} from 'react';

/* post fetch custome hook */
const usePost = (url, body="null") => {
    const [data_post, setData] = useState([]);
    const [loading_post, setLoading] = useState(true);
    const [error_post, setError] = useState(null);

    useEffect(()=>{
        let didCancel = false;
        const fetchsource = async () =>{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };
            try{
                var response;
                if (body.points){
                    response = await fetch(url,requestOptions);
                    var data = await response.json();
                }
                if (!didCancel) {
                    setData(data);
                    setLoading(false);
                }
            }catch(error){
                console.log(error);
                if (!didCancel) {
                    setError(error);
                    setLoading(false);
                }     
            }
        }
        fetchsource()
        return () => { didCancel = true; };
    },[url, body])
    return {data_post, loading_post, error_post}
}

export default usePost