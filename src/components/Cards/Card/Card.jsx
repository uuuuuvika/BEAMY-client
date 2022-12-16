import React, { useEffect, useState } from 'react';
import "./Card.css"

function Card({ question, answer }) {

	const [isFlipped, setIsFlipped] = useState(false);

	useEffect(() => {
		setIsFlipped(false);
	}, [question, answer])

	return (
		<div onClick={() => { setIsFlipped(prevState => !prevState) }}>
			{!isFlipped && <p className='c'>{question}</p>}
			{isFlipped && <p className='c'>{answer}</p>}
		</div>
	);
}

export default Card;