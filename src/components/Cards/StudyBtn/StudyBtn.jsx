import start from "./start-button.png";
import { motion } from 'framer-motion';
import "./StudyBtn.css"
import { useNavigate } from "react-router-dom";

function StudyBtn({ deckId }) {

    const navigate = useNavigate();

    return (
        // <a href={`/decks/${deckId}/cards`}>
        //     <motion.div
        //         className="box"
        //         whileHover={{ scale: 1.1 }}
        //         transition={{ type: "spring", stiffness: 400, damping: 10 }}>
        //         <img className="start" src={start} />
        //     </motion.div>
        // </a>
        <button className="button clay red" onClick={() => navigate(`/decks/${deckId}/cards`)}>
            start
        </button>
    )
}
export default StudyBtn;