import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Card from "../component/card";

export const Single = () => {
	const { store, actions } = useContext(Context)
	let [searchParams, setSearchParams] = useSearchParams()
	let [nextPage, setNextPage] = useState(0)

	useEffect(() => {
		let page = parseInt(searchParams.get("page"))
		let limit = parseInt(searchParams.get("limit"))
		if (!Number.isInteger(page)) page = 1
		if (!Number.isInteger(limit)) limit = 10
		setNextPage(page + 1)

		console.log({ page, limit })
		actions.getCharacters(page, limit)
	}, [searchParams])


	return <div className="mt-5" >
		<Link to={`/characters/?page=${nextPage}&limit=10`}>
			<button type="button" className="btn btn-outline-primary">Next page</button>
		</Link>
		{store.loading ?
			<div className="spinner-border" role="status">
				<span className="sr-only">Loading...</span>
			</div> :
			store.characters.map(character => <Card
				body={""}
				title={character.name}
				id={character.uid}
				type={"characters"}
				key={character.uid}
			/>
			)}
	</div>

};

Single.propTypes = {
	match: PropTypes.object
};
