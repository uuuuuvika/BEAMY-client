import { useNavigate } from "react-router-dom";

function StudyBtn({ deckId }) {

    const navigate = useNavigate();
    return (
        <button className="button clay red" onClick={() => navigate(`/decks/${deckId}/cards`)}>
            start
        </button>
    )
}
export default StudyBtn;