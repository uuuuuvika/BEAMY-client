import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authTokenHeader from "../../token.jsx"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const API_URL = process.env.REACT_APP_API_URL;


function Stats() {

    const { deckId } = useParams();
    const [plotData, setPlotData] = useState(null);
    console.log(plotData)

    useEffect(() => {
        if (plotData === null) {
            axios
                .get(`${API_URL}/stats/${deckId}`,  { headers: authTokenHeader() })
                .then(response => {
                    console.log(response.data);
                    setPlotData(response.data);
                })
                .catch((error) => console.log(error));
        }
    }, [plotData])

    return (
        <>
        { plotData && plotData.length > 0 
        ?
            <LineChart
                width={550}
                height={400}
                data={plotData || []}
                margin={{
                    top: 10,
                    right: 0,
                    left: 0,
                    bottom: 0
                }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="percentage"
                    stroke="blue"
                    activeDot={{ r: 8 }} />
            </LineChart>
        : null}
        </>
    )
}

export default Stats;