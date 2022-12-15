import { useState, useEffect } from "react";
import axios from "axios";
import LearnCardsOneByOne from "../../components/Cards/LearnCardsOneByOne/LearnCardsOneByOne";

const API_URL =  process.env.REACT_APP_API_URL;


function StudyAgain() {

    const [data, setData] = useState(null);

    function authTokenHeader() {
        const storedToken = localStorage.getItem("authToken");
        return { Authorization: `Bearer ${storedToken}` }
    }

    useEffect(() => {
        if (data === null) {
            axios
                .get(`${API_URL}/stats/lastStudied`, { headers: authTokenHeader() })
                .then((response) => {
                    console.log(response.data)
                    setData(response.data)
                })
                .catch((error) => console.log(error));
        }
    }, [data])

    // useEffect(() => {
    //     getCards();
    // }, []);

    return (
        <>
            {data && data.length > 0
                ?
                <LearnCardsOneByOne cards={data} />
                : <p>Nothing to show yet</p>}
        </>
    );
}

export default StudyAgain;