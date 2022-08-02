import React from "react"
import styled from 'styled-components'
import ModeHeader from "./ModeHeader"
import ModeRole from "./ModeRole"
import ModePersonnel from "./ModePersonnel"

const Background = styled.div`
    background-color: #FFFDDE;
    width: 100vw;
    height: 100vh;    
    overflow: hidden;    
`

const Mode = () => {
    return (
        <Background>
            <ModeHeader/>
            <ModeRole></ModeRole>
            <ModePersonnel></ModePersonnel>
        </Background>
    )
};

export default Mode