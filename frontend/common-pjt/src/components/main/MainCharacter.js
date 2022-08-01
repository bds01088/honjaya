import styled from "styled-components"
import Character from '../../assets/character.png'
import Shadow from '../../assets/shadow.png'

const Container = styled.div`
    perspective: 300px;
    position: relative;

    &:hover {
        .front {
            transform: rotateY(180deg);
        }
        .back {
            transform: rotateY(0deg);
        }
    }
`

const CardFront = styled.div`
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transition: 1s;
    position: absolute;
    transform: rotateY(0deg);
`

const FrontImg = styled.img`
    width: 100%;
    height: 100%;
`

const CardBack = styled.div`
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transition: 1s;
    transform: rotateY(-180deg);
    border-radius: 20%;
`

const BackImg = styled.img`
    width: 100%;
    height: 100%;
`

const MainCharacter = () => {
    return (
        <Container>
            <CardFront className="front">
                <FrontImg src={Character}/>
            </CardFront>
            <CardBack className="back">
                <BackImg src={Shadow} />
            </CardBack>
        </Container>
    )
}

export default MainCharacter