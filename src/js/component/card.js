import React from "react";
import "../../styles/card.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

export default function Card({ title, body, id, type }) {
    const { store, actions } = useContext(Context)

    function imageError(e) {
        console.log(e)
        e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"
    }

    const isFavorite = store.favorites.includes(id, title)

    return <div className="card mx-2" style={{ width: "15rem", flex: "0 0 auto" }}>
        <img src={`https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`} onError={imageError} className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title text-center">{title}</h5>
            <div className="card-text text-start">{body}</div>
            <div className="d-flex justify-content-between">
                <Link to={`/${type}/${id}`} className="btn btn-outline-primary">Learn more!</Link>
                <button
                    type="button"
                    onClick={() => actions.addFavorites(id, title)}
                    class={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-warning'}`}><FontAwesomeIcon icon={faHeart} /></button>
            </div>
        </div>
    </div>
}