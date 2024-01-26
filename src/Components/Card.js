import React from  'react';
import './../Styles/Card.css';

function Card({Name , Email}) {
	return (
		<div className="card dib br3 pa3 ma2 grow tc bw2 shadow-5">
			<img src={`https://robohash.org/${Name}?200x200`} alt="Robo" />
			<div>
				<h2> {Name} </h2>
				<p> {Email} </p>
			</div>
		</div>
	);
}

export default Card;