import React from 'react';


function SearchBox({onSearchChange}) {
	return (
		<div className="pa2">
			<input
			 className="pa3 ba b--green bg-lightest-blue"
			 tpye="search"
			 placeholder="Search Robot" 
			 onChange={onSearchChange}
			/>
		</div>
	);
}

export default SearchBox;