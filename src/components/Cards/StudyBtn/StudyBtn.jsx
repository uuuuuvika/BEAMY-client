import start from "./start-button.png";
import { motion } from 'framer-motion';
import "./StudyBtn.css"

function StudyBtn({deckId}) {
    
    return (
        <a href={`/decks/${deckId}/cards`}>
            <motion.div
                className="box"
                whileHover={{ scale: 2.5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <img className="start" src={start} />
            </motion.div>
        </a>
    )
}
export default StudyBtn;