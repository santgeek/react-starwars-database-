import React, { useState, useEffect, useContext } from "react";
import PropTypes, { element } from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = () => {
	const { store, actions } = useContext(Context)
	const { type, id } = useParams()
	const [currentItem, setCurrentItem] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			if (type === 'characters') {
				await actions.getCharacterData(id);
			} else if (type === 'planets') {
				await actions.getPlanetData(id);
			} else if (type === 'vehicles') {
				await actions.getVehicleData(id);
			}

			let item = null;
			if (type === "characters") {
				item = store.charactersInfo[id];
			} else if (type === "planets") {
				item = store.planetsInfo[id];
			} else if (type === "vehicles") {
				item = store.vehiclesInfo[id];
			}

			setCurrentItem(item || null);
			setLoading(false);
		};
		fetchData()
	}, [type, id, store])

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!currentItem) {
		return <div>Element not found</div>;
	}

	return (
		<div className="mt-5">
			<div className="container">
				<div className="row mb-5">
					<div className="col-6 d-flex justify-content-center">
						<img src={`https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`} alt={`${type} image`} />
					</div>
					<div className="col-6 d-flex justify-content-center flex-column">
						<h1 className="mb-3 text-center">{currentItem.properties.name}</h1>
						<p className="text-center">{currentItem.description}</p>
					</div>
				</div>
				<div className="row border-top border-dark pt-4">

					{type === "characters" && (
						<div className="col-12 d-flex justify-content-evenly">
							<div className="me-2">
								<label className="mb-3 fw-bold">Birth Year:</label>
								<p>{currentItem.properties.birth_year}</p>
							</div>
							<div className="me-2">
								<label className="mb-3 fw-bold">Gender:</label>
								<p>{currentItem.properties.gender}</p>
							</div>
							<div className="me-2">
								<label className="mb-3 fw-bold">Height:</label>
								<p>{currentItem.properties.height}</p>
							</div>
							<div className="me-2">
								<label className="mb-3 fw-bold">Skin Color:</label>
								<p>{currentItem.properties.skin_color}</p>
							</div>
							<div>
								<label className="mb-2 fw-bold">Eye Color:</label>
								<p>{currentItem.properties.eye_color}</p>
							</div>
						</div>
					)}

					{type === "planets" && (
						<div className="col-12 d-flex justify-content-evenly">
							<div className="me-2">
								<label className="mb-3 fw-bold">Climate:</label>
								<p>{currentItem.properties.climate}</p>
							</div>
							<div className="me-2">
								<label className="mb-3 fw-bold">Population:</label>
								<p>{currentItem.properties.population}</p>
							</div>
							<div className="me-2">
								<label className="mb-3 fw-bold">Gravity:</label>
								<p>{currentItem.properties.gravity}</p>
							</div>
							<div className="me-2">
								<label className="mb-3 fw-bold">Diameter:</label>
								<p>{currentItem.properties.diameter}</p>
							</div>
							<div>
								<label className="mb-2 fw-bold">Orbital Period:</label>
								<p>{currentItem.properties.orbital_period}</p>
							</div>
						</div>
					)}

					{type === "vehicles" && (
						<div className="col-12 d-flex justify-content-evenly">
							<div className="me-2">
								<label className="mb-3 fw-bold">Model:</label>
								<p>{currentItem.properties.model}</p>
							</div>
							<div className="me-2">
								<label className="mb-3 fw-bold">Crew:</label>
								<p>{currentItem.properties.crew}</p>
							</div>
							<div className="me-2">
								<label className="mb-3 fw-bold">Length:</label>
								<p>{currentItem.properties.length}</p>
							</div>
							<div className="me-2">
								<label className="mb-3 fw-bold">Manufacturer:</label>
								<p>{currentItem.properties.manufacturer}</p>
							</div>
							<div>
								<label className="mb-2 fw-bold">Passengers:</label>
								<p>{currentItem.properties.passengers}</p>
							</div>
						</div>
					)}

				</div>
			</div>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object,
}; 
