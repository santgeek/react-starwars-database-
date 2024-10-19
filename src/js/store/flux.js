const baseUrl = "https://www.swapi.tech/api/"
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			favorites: [],
			characters: [],
			charactersInfo: {},
			vehicles: [],
			vehiclesInfo: {},
			planets: [],
			planetsInfo: {},
			loading: false
		},
		actions: {

			addFavorites: (id, name) => {
				//setStore({ favorites: [...store.favorites, id] })
				const store = getStore();
				const favorites = store.favorites.find(favorite => favorite.id === id)
					? store.favorites.filter(favorite => favorite.id !== id) // Remove if already favorite  
					: [...store.favorites, { id, name }]; // Add if not favorite  
				setStore({ favorites });
			},

			removeFavorite: (id) => {
				const store = getStore();
				setStore({ favorites: store.favorites.filter(favorite => favorite.id !== id) });
			},

			getCharacters: async (page = 1, limit = 10) => {
				const response = await fetch(baseUrl + `/people/?page=${page}&limit=${limit}`)
				if (!response.ok) {
					console.error(response.statusText)
					setStore({ loading: false })
					return false
				}
				const swData = await response.json()
				//console.log("Fetched characters:", swData)
				setStore({ characters: swData.results, loading: false })
				const actions = getActions()
				const characters = swData.results
				for (let char of characters) {
					await actions.getCharacterData(char.uid)
				}
			},

			getCharacterData: async (id) => {
				const store = getStore()
				try {
					const response = await fetch(baseUrl + `people/${id}`)
					if (!response.ok) {
						console.error(response.statusText)
						return false
					}
					const characterData = await response.json()
					//console.log("Fetched character data:", characterData)

					const uid = characterData.result.uid
					const currentCharactersInfo = { ...store.charactersInfo }
					currentCharactersInfo[uid] = characterData.result

					setStore({ charactersInfo: currentCharactersInfo })
					//console.log("The store is populated by: ", currentCharactersInfo)
					return true
				} catch (error) {
					console.error(error)
					return false
				}
			},

			getVehicles: async (page = 1, limit = 10) => {
				const response = await fetch(baseUrl + `/vehicles/?page=${page}&limit=${limit}`)
				if (!response.ok) {
					console.error(response.statusText)
					setStore({ loading: false })
					return false
				}
				const swVehiclesData = await response.json()
				//console.log("Fetched vehicles:", swVehiclesData)
				setStore({ vehicles: swVehiclesData.results, loading: false })
				const actions = getActions()
				const vehicles = swVehiclesData.results
				for (let vehicle of vehicles) {
					await actions.getVehicleData(vehicle.uid)
				}
			},

			getVehicleData: async (id) => {
				const store = getStore()
				try {
					const response = await fetch(baseUrl + `vehicles/${id}`)
					if (!response.ok) {
						console.error(response.statusText)
						return false
					}
					const vehicleData = await response.json()
					//console.log("Fetched vehicle data:", vehicleData)

					const uid = vehicleData.result.uid
					const currentVehiclesInfo = { ...store.vehiclesInfo }
					currentVehiclesInfo[uid] = vehicleData.result

					setStore({ vehiclesInfo: currentVehiclesInfo })
					//console.log("The store is populated by: ", currentVehiclesInfo)
					return true
				} catch (error) {
					console.error(error)
					return false
				}
			},

			getPlanets: async (page = 1, limit = 10) => {
				const response = await fetch(baseUrl + `/planets/?page=${page}&limit=${limit}`)
				if (!response.ok) {
					console.error(response.statusText)
					setStore({ loading: false })
					return false
				}
				const swPlanetsData = await response.json()
				//console.log("Fetched planets:", swPlanetsData)
				setStore({ planets: swPlanetsData.results, loading: false })
				const actions = getActions()
				const planets = swPlanetsData.results
				for (let planet of planets) {
					await actions.getPlanetData(planet.uid)
				}
			},

			getPlanetData: async (id) => {
				const store = getStore()
				try {
					const response = await fetch(baseUrl + `planets/${id}`)
					if (!response.ok) {
						console.error(response.statusText)
						return false
					}
					const planetData = await response.json()
					//console.log("Fetched planet data:", planetData)

					const uid = planetData.result.uid
					const currentPlanetsInfo = { ...store.planetsInfo }
					currentPlanetsInfo[uid] = planetData.result

					setStore({ planetsInfo: currentPlanetsInfo })
					//console.log("The store is populated by: ", currentPlanetsInfo)
					return true
				} catch (error) {
					console.error(error)
					return false
				}
			}
		}
	};
};

export default getState;