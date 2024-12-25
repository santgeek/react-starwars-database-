import React, { useEffect, useRef, useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const [hoverIndex, setHoverIndex] = useState(null);
	const [isDropDownOpen, setIsDropDownOpen] = useState(false)
	const dropdownRef = useRef(null);

	const toggleDropdown = () => {
		setIsDropDownOpen(prev => !prev)
	}

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

				<div>
					<div className="dropdown" ref={dropdownRef}>
						<button
							className="btn btn-primary dropdown-toggle"
							type="button"
							onClick={toggleDropdown}
							aria-expanded="false">
							Favorites
						</button>
						<ul className={`dropdown-menu ${isDropDownOpen ? 'show' : ''}`}>
							{store.favorites.length === 0 ? (
								<li className="dropdown-item">No favorites added!</li>
							) : (
								store.favorites.map((favorite, index) => (
									<li
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

									</li>
								))
							)}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};
