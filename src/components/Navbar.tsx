import React from "react";
import GenerationSelector from "./GenerationSelector";

const NavBar: React.FC = () => {
	return (
		<div className='navbar bg-base-100'>
			<div className='flex-1'>
				<a className='btn btn-ghost text-xl'>ReactDEX</a>
			</div>
			{/* <div className='flex-none gap-2'>
				<div className='form-control'>
					<input
						type='text'
						placeholder='Search'
						className='input input-bordered w-24 md:w-auto'
					/>
				</div>
			</div> */}
			{/* <GenerationSelector /> */}
		</div>
	);
};

export default NavBar;
