import styled from 'styled-components'
import logoImg from '../../assets/logo.png'
import Rating from '@mui/material/Rating';


const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 2rem;
    margin-right: 2rem;
    height: 5rem;
`

const Logo = styled.img`
`

const Nickname = styled.div`
    font-size: 1.5rem;
    background-color: #FFC187;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 0.5rem;
    margin-right: 1rem;
`



const MainHeader = () => {
    return (
        <div>
            <Header>
                <Logo src={logoImg}/>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Nickname>뚜웅따앙</Nickname>
                    <Rating style={{ color: '#FFF672', marginRight: '1rem' }} size="large" value={3.5} precision={0.5} readOnly />
                </div>
            </Header>
        </div>
    )
}

export default MainHeader