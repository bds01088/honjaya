import styled from 'styled-components'
import backImg from '../../assets/main_img.jpg'
import MainHeader from './MainHeader'
import MainCharacter from './MainCharacter'

const Container = styled.div`
    background-image: url(${backImg});
    background-size: cover;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
`

const CharacterBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const Main = () => {

    return (
        <Container>
            {/* MainHeader는 nickname, point, rate_score가 필요 */}
            <MainHeader/>
            <CharacterBox>
                <MainCharacter />
            </CharacterBox>
        </Container>
    )
}

export default Main