import styled from 'styled-components'
import backImg from '../../assets/main_img.jpg'
import MainHeader from './MainHeader'

const Container = styled.div`
    background-image: url(${backImg});
    background-size: cover;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
    position: fixed;
`


const Main = () => {

    return (
        <Container>
            {/* MainHeader는 nickname, point, rate_score가 필요 */}
            <MainHeader/>
        </Container>
    )
}

export default Main