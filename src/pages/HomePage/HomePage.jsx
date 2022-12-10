import "./HomePage.css";
import { motion } from 'framer-motion';
import Card from "../../components/Cards/Card/Card";

function HomePage() {

  return (
    <div>
      <motion.div
        className="text-gradient"
        animate={{
          fontSize: 32,
          color: '#FFF',
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
        }}
        whileHover={{ scale: 1.2 }}>
        <h1 className="text">BEAMY</h1>
      </motion.div>

      <div className="rowOfcards">
        <div className="clay small">
          <Card
            question="What is BEAMY?"
            answer={<div>
              <p>BEAMY is learning APP</p>
              <p>where you can:</p>
              <p>-create and sare decks</p>
              <p>-or use the community created</p>
              <p>-track your progress</p>
              <p>-and mainly HAVE FUN!</p>
            </div>}
          />
          </div>
          <div className="clay small" >
            <Card
              question="Is BEAMY free?"
              answer={<div>
                <p>Yes, BEAMY is TOTALY FREE</p>
                <p>and it always will be.</p>
              </div>}
            />
          </div>
          <div className="clay small" >
            <Card
              question="How do I use BEAMY?"
              answer={<div>
                <p>To browse an awailible decks</p>
                <p>simply click here</p>
                <p>or register here to start learning and creating</p>
              </div>}
            />
          </div>
        </div>
      </div>
      );
}

      export default HomePage;
