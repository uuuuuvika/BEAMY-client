import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.jsx";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const API_URL = "http://localhost:5005";

function Stats() {

    const { user } = useContext(AuthContext);
    const { deckId } = useParams();
    const [plotData, setPlotData] = useState(null);

    useEffect(() => {
        if (plotData === null){
            axios
                .get(`${API_URL}/stats/${deckId}`, user)
                .then(response => {
                    console.log(response.data);
                    setPlotData(response.data);
                })
                .catch((error) => console.log(error));
        }
    }, [plotData])

    return (
        <>
            <LineChart
                width={500}
                height={300}
                data={plotData || []}
                margin={{
                    top: 10,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="percentage"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }} />
            </LineChart>
        </>
    )
}

export default Stats;