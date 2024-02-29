import {BsFillPlayCircleFill,BsFillPauseFill, BsShuffle} from 'react-icons/bs'
import {CgPlayTrackNext,CgPlayTrackPrev} from 'react-icons/cg'
import {FiRepeat} from 'react-icons/fi'
import { useStateProvider } from '../utils/StateProvider';
import styled from 'styled-components';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';
export default function PlayerControls() {


    const [{ token, playerState }, dispatch ] = useStateProvider(); // Llama a la función useStateProvider


    const changeTrack = async (type) =>{
        await axios.post(
            `https://api.spotify.com/v1/me/player/${type}`, {} ,
             {
            headers:{
                Authorization: "Bearer " + token, 
                "Content-Type": "application/json",
            },
        } )

        //AGREGAR ESTO

        // const response = await axios.put(
        //     `https://api.spotify.com/v1/me/player/${state}`,
        //     {},
        //      {
        //     headers:{
        //         Authorization: "Bearer " + token, 
        //         "Content-Type": "application/json",
        //     },
        // }
        // )




        if(response.data !=="") {
            const {item} = response.data
            const currentlyPlaying = {
                id:item.id,
                name:item.name,
                artists:item.artists.map((artist)=>artist.name),
                image:item.album.images[2].url,

            }
            dispatch({type: reducerCases.SET_PLAYING,currentlyPlaying})//El error estaba en el dispatch, la variable playlists era llamada como playlist y esto tenia como resultado que llamaba a una funcion que nunca fue declarada
        
        }else  dispatch({type: reducerCases.SET_PLAYING,currentlyPlaying:null})//El error estaba en el dispatch, la variable playlists era llamada como playlist y esto tenia como resultado que llamaba a una funcion que nunca fue declarada
    }
    

    const changeState = async () => {
        const state = playerState ? "pause" : "play";

        const response = await axios.put(
            `https://api.spotify.com/v1/me/player/${state}`,
            {},
             {
            headers:{
                Authorization: "Bearer " + token, 
                "Content-Type": "application/json",
            },
        }
        )
        dispatch({type: reducerCases.SET_PLAYER_STATE,
            playerState:!playerState})
    }


    return (
        <Container>
        <div className="shuffle">
            <BsShuffle/>
        </div>
        <div className="previous">
            <CgPlayTrackPrev onClick={()=>changeTrack("previous")}/>
        </div>
        <div className="state">
            {playerState ? <BsFillPauseFill onClick={changeState} /> : <BsFillPlayCircleFill onClick={changeState}/>}  
        </div>
        <div className="next">
            <CgPlayTrackNext onClick={()=>changeTrack("next")} />
        </div>
        <div className="repeat">
            <FiRepeat/>
        </div>

        </Container>

  )
}

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
gap: 2rem;
svg{
    color:#b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
        color: white,
    }
}
.state {
    svg {
        color: white;
    }
}
.previous,.next,.state {
    font-size: 2rem;
}
    
`