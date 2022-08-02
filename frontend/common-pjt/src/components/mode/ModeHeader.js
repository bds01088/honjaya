import React from "react"
import styled from 'styled-components'
import logo from '../../assets/logo.png'
// import ModeChoice from "./ModeChoice"


const Header = styled.div`
    display: flex;
    justify-content: space-between;
    height: 7rem;

    @media (max-width: 412px) {
        width: 100vw;
    }
`

const Logo = styled.img`
    /* position: fixed; */
    /* display: inline; */
    margin-left: 2rem;
`

const ModeSelect = styled.div`
    /* position: relative; */
    display: flex;
    justify-content: center;
    font-family: 'Jua';
    font-size: 2rem;
    /* color: #00C3A9; */

`

const ModeHeader = () => {

    return (
        <>
        <Header>
            <Logo src={logo}></Logo>
        </Header>
        <ModeSelect>역할 선택</ModeSelect>
        
        </>
    )
}

export default ModeHeader