import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const [hoverIndex, setHoverIndex] = useState(null);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid" style={{ width: "80%" }}>
				<img style={{ width: "100px" }} src="https://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG37.png" />

				<div>
					<div className="dropdown">
						<button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Favorites
						</button>
						<ul className="dropdown-menu">
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
											<button className="btn btn-sm"><FontAwesomeIcon icon={faTrashAlt}
												onClick={() => actions.removeFavorite(favorite.id)}
											/>
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
