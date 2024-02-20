
import styled from 'styled-components';




const Playlist = () => {

    const Container = styled.div`
    height: 100%;
    overflow: hidden;
            ul{
            list-style-type: none;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
            height: 52vh;
            max-height: 100%;
            overflow: auto;
            &::-webkit-scrollbar{
                width: 0.7rem;
                &-thumb{
                    background-color: #255;
                }

            }
            li{
                display: flex;
                gap: 1rem;
                cursor: pointer;
                transition: 0.3s ease-in-out;
                &:hover {
                    color: white;
                }
            }}`


    return (
        <Container>

        </Container>
    );
};

export default Playlist;