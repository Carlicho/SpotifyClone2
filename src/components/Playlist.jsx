
import { useEffect } from "react"
import { useStateProvider } from "../utils/StateProvider"
import axios from "axios"
import { reducerCases } from "../utils/Constants";
    
export default function Playlist() {
            //importante poner token y dispatch entre [{}] pero porque?
     const [{ token, playlist }, dispatch ] = useStateProvider(); // Llama a la función useStateProvider
    
    useEffect(()=>{

        const getPlaylistData = async () => {
                const response = await axios.get(
                    'https://api.spotify.com/v1/me/playlists',
                     {
                    headers:{
                        Authorization: "Bearer " + token, 
                        "Content-Type": "application/json",
                    },
                }
                )
                console.log(response)
               

        }
        getPlaylistData();
    }, [token, dispatch]) // Asegúrate de incluir token y dispatch en la matriz de dependencias de useEffect

  return (
    <div>
            <ul>
                {playlist && playlist.map(({ name, id }) => (
                    <li key={id}>{name}</li>
                ))}
            </ul>
        </div>
  )
}

// FALTA RESOLVER PORQUE LA PLAYLIST ME LA DEVUELVE VACIA