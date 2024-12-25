import React, { useEffect, useRef, useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { Context } from "../store/appContext";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const [hoverIndex, setHoverIndex] = useState(null);
	const [isDropDownOpen, setIsDropDownOpen] = useState(false)
	const dropdownRef = useRef(null);

	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setIsDropDownOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid" style={{ width: "80%" }}>
				<img style={{ width: "100px" }} src="https://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG37.png" />

				<div ref={dropdownRef}>
					<DropdownButton
						align="end"
						title="Favorites"
						id="dropdown-menu-align-end"
						variant="primary"
					>
						{store.favorites.length === 0 ? (
							<Dropdown.Item>No favorites added!</Dropdown.Item>
						) : (
							store.favorites.map((favorite, index) => (
								<Dropdown.Item
									key={index}
									className="dropdown-item d-flex justify-content-between"
									onMouseEnter={() => setHoverIndex(index)}
									onMouseLeave={() => setHoverIndex(null)}
								>
									{favorite.name}
									{hoverIndex === index && (
										<button
											className="btn btn-sm"
											onClick={(e) => {
												e.stopPropagation()
												actions.removeFavorite(favorite.id)
											}}>
											<FontAwesomeIcon icon={faTrashAlt} />
										</button>
									)}

								</Dropdown.Item>
							))
						)}
					</DropdownButton>
				</div>
			</div>
		</nav>
	);
};
