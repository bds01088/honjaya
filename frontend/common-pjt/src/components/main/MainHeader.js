import styled from 'styled-components'
import logoImg from '../../assets/logo.png'
import Rating from '@mui/material/Rating';
import { MdPets, MdAccountCircle, MdHelpOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 2rem;
    margin-right: 2rem;
    height: 5rem;
    font-family: Jua;
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

const point = 100000;
const pointShow = point.toLocaleString('ko-KR');


const MainHeader = () => {

    return (
        <div>
            <Header>
                <Logo src={logoImg}/>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Nickname>닉네임</Nickname>
                    <Rating style={{ color: '#FFF672', marginRight: '1rem' }} size="large" value={3.5} precision={0.5} readOnly />
                    <MdPets style={{ color: '#F38BA0', fontSize: '2rem', marginRight: '0.5rem' }}/>
                    <p style={{ color: '#333333', fontSize: '1.5rem', marginRight: '1rem' }}>{pointShow}</p>
                    <Link to="/profile">
                    <MdAccountCircle style={{ color: '#333333', fontSize: '2rem', marginRight: '0.5rem' }}/>
                    </Link>
                    <MdHelpOutline style={{ color: '#333333',fontSize: '2rem'}}/>
                </div>
            </Header>
        </div>
    )
}

export default MainHeader