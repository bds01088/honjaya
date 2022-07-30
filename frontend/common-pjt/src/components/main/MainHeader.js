import styled from 'styled-components'
import logoImg from '../../assets/logo.png'
import pointImg from '../../assets/carrot.png'
import Rating from '@mui/material/Rating';
import { MdAccountCircle, MdHelpOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import MainHelper from './MainHelper'
import React, { useState } from "react"

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    height: 7rem;
    font-family: Jua;

    @media (max-width: 412px) {
        width: 100vw;
    }
`

const Logo = styled.img`
    margin-left: 2rem;
`

const Nickname = styled.div`
    font-size: 2rem;
    background-color: #FFC187;
    padding-top: 0.3rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 0.5rem;
    margin-right: 1rem;
`

const PointImg = styled.img`
    height: 50%;
`

const point = 100000;
const pointShow = point.toLocaleString('ko-KR');


const Helper = styled(MdHelpOutline)`
    margin-right: 2rem;
`


const MainHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const openModalHelper = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <Header>
                <Logo src={logoImg}/>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Nickname>닉네임</Nickname>
                    <Rating style={{ color: '#FFF672', marginRight: '1rem' }} size="large" value={3.5} precision={0.5} readOnly />
                    <PointImg src={pointImg}/>
                    <p style={{ color: '#333333', fontSize: '1.5rem', marginRight: '1rem' }}>{pointShow}</p>
                    <Link to="/profile" style={{ fontSize: '0' }}>    
                        <MdAccountCircle style={{ color: '#333333', fontSize: '2rem', marginRight: '0.5rem' }}/>
                    </Link>
                    <Helper style={{ color: '#333333',fontSize: '2rem'}} onClick={openModalHelper}/>
                </div>
                { isOpen ? <MainHelper openModalHelper={openModalHelper}/> : null }
            </Header>
        </div>
    )
}

export default MainHeader


