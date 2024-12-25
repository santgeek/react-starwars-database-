import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Card from "../component/card";

export const Home = () => {
	const { store, actions } = useContext(Context)

	useEffect(() => {
		actions.getCharacters()
		actions.getVehicles()
		actions.getPlanets()
	}, [])

	const getCharacterBodyContent = (id) => {
		const data = store.charactersInfo[id]
		if (!data) {
			return <div className="d-flex justify-content-center mt-4 mb-4"><div className="spinner-border" role="status">
				<span className="sr-only">Loading...</span></div></div>
		}
		const characterProperties = data.properties
		return <ul>
			{Object.keys(characterProperties)
				.filter(info => !["name", "height", "mass", "skin_color", "birth_year", "created", "edited", "homeworld", "url"].includes(info))
				.map(key => <li className="card-body-content" key={key}>{key.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}: {characterProperties[key].replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</li>)}
		</ul>
	}

	const getVehicleBodyContent = (id) => {
		const data = store.vehiclesInfo[id]
		if (!data) {
			return <div className="d-flex justify-content-center mt-4 mb-4"><div className="spinner-border" role="status">
				<span className="sr-only">Loading...</span></div></div>
		}
		const vehicleProperties = data.properties
		return <ul>
			{Object.keys(vehicleProperties)
				.filter(info => !["name", "cargo_capacity", "consumables", "cost_in_credits", "created", "crew", "edited", "length", "url", "manufacturer", "max_atmosphering_speed", "pilots", "films", "vehicle_class"].includes(info))
				.map(key => <li className="card-body-content" key={key}>{key.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}: {vehicleProperties[key].replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</li>)}
		</ul>
	}

	const getPlanetBodyContent = (id) => {
		const data = store.planetsInfo[id]
		if (!data) {
			return <div className="d-flex justify-content-center mt-4 mb-4"><div className="spinner-border" role="status">
				<span className="sr-only">Loading...</span></div></div>
		}
		const planetProperties = data.properties
		return <ul>
			{Object.keys(planetProperties)
				.filter(info => !["name", "climate", "mass", "created", "diameter", "edited", "films", "gravity", "orbital_period", "residents", "rotation_period", "surface_water", "url"].includes(info))
				.map(key => <li className="card-body-content" key={key}>{key.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}: {planetProperties[key].replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</li>)}
		</ul>
	}

	return <div className="mt-5" >
		{/*Display character cards*/}

		<div className="container-fluid ">
			<div className="row container-sm ms-5 ps-5">
				<div className="col ms-5 ps-5"><h3 className="ms-5">Characters</h3></div>
			</div>
			<div className="row d-flex justify-content-center mb-5">
				<div className="col d-flex flex-row flex-nowrap overflow-scroll" style={{ maxWidth: "80%" }}>
					{store.characters.map(character => <Card
						body={getCharacterBodyContent(character.uid)}
						title={character.name}
						id={character.uid}
						type={"characters"}
						key={character.uid}
					/>
					)}
				</div>
			</div>


			{/*Display vehicle cards*/}

			<div className="row container-sm ms-5 ps-5">
				<div className="col ms-5 ps-5"><h3 className="ms-5">Vehicles</h3></div>
			</div>
			<div className="row d-flex justify-content-center mb-5">
				<div className="col d-flex flex-row flex-nowrap overflow-scroll" style={{ maxWidth: "80%" }}>
					{store.vehicles.map(vehicle => <Card
						body={getVehicleBodyContent(vehicle.uid)}
						title={vehicle.name}
						id={vehicle.uid}
						type={"vehicles"}
						key={vehicle.uid}
					/>
					)}
				</div>
			</div>

			{/*Display planet cards*/}

			<div className="row container-sm ms-5 ps-5">
				<div className="col ms-5 ps-5"><h3 className="ms-5">Planets</h3></div>
			</div>
			<div className="row d-flex justify-content-center mb-5">
				<div className="col d-flex flex-row flex-nowrap overflow-scroll" style={{ maxWidth: "80%" }}>
					{store.planets.map(planet => <Card
						body={getPlanetBodyContent(planet.uid)}
						title={planet.name}
						id={planet.uid}
						type={"planets"}
						key={planet.uid}
					/>
					)}
				</div>
			</div>

		</div>


	</div >

};
