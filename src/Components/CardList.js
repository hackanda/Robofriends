import React from 'react';
import Card from './Card';

function CardList({robots}) {
	let cardComponents = robots.map((user, i) => {
		return (
			<Card 
				key={i} 
				Name={robots[i].name} 
				Email={robots[i].email}
			/>
		);
	})
	return (
		<div>
    		{cardComponents}
		</div>
	);
}

export default CardList;