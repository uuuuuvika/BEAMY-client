import start from "./start-button.png";
import { motion } from 'framer-motion';

function StudyBtn() {

    return (
        <a href="/">
            <motion.div
                className="box"
                whileHover={{ scale: 1.5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <img src={start} style={{ width: '30px', height: '30px' }} />
            </motion.div>
        </a>
    )
}
export default StudyBtn