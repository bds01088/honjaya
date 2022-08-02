import React from "react"
import styled from 'styled-components'
import ModeRoleListItem from "./ModeRoleListItem"

const ModeList = () => {
    return (
        <Container>
            <ModeRoleListItem />
        </Container>
 
    )
}

export default ModeList

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    /* flex-direction: row; */
    /* justify-content: space-between; */
    align-items: center;
`