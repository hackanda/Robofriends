import React from 'react';

function Scroll(props) {
	return (
		<div
			style={{
					overflowY: 'Scroll',
					height: '75vh'
				  }}
		>
			{ props.children }
		</div>
	);
}

export default Scroll;