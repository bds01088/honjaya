import styled from 'styled-components'
import backImg from '../../assets/main_img.jpg'

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
            </Container>
        )
}

export default Main