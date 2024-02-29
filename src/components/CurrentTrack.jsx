
import styled from 'styled-components'
import { useEffect } from 'react'
import axios from 'axios';
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/Constants';



export default function CurrentTrack() {

    const [{ token, currentlyPlaying }, dispatch ] = useStateProvider(); // Llama a la función useStateProvider

    useEffect(()=>{
        const getCurrentTrack = async () => {
                const response = await axios.get(
                    'https://api.spotify.com/v1/me/player/currently-playing',
                     {
                    headers:{
                        Authorization: "Bearer " + token, 
                        "Content-Type": "application/json",
                    },
                }
                )
                if(response.data !=="") {
                    const {item} = response.data
                    const currentlyPlaying = {
                        id:item.id,
                        name:item.name,
                        artists:item.artists.map((artist)=>artist.name),
                        image:item.album.images[2].url,

                    }
                    dispatch({type: reducerCases.SET_PLAYING,currentlyPlaying})//El error estaba en el dispatch, la variable playlists era llamada como playlist y esto tenia como resultado que llamaba a una funcion que nunca fue declarada
                }
            // por lo que dispatch lo que hace es actualizar el estado global por lo que entiendo
               

        }
        getCurrentTrack()
    }, [token, dispatch]) 



  return (
    <Container>
        {
            currentlyPlaying && (
                <div className="track">
                    <div className="track__image">
                        <img src={currentlyPlaying.image} alt='currentlyplaying'/>
                    </div>
                    <div className="track__info">
                        <h4>{currentlyPlaying.name}</h4>
                        <h6>{currentlyPlaying.artists.join(", ")}</h6>
                    </div>
                </div>
            )
            
        }

    </Container>
  )
}

const Container = styled.div`
    .track {
        display: flex;
        align-items: center;
        gap: 1rem;
        &__info{
            display: flex;
            flex-direction: column;
            gap: 0.3;
            h4{
                color: white;
            }
            h6{
                color: #b3b6b3;
            }
        }
    }
`
