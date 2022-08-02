import React from "react"
import styled from 'styled-components'
import ModeRoleListItem from "./ModeRoleListItem"

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    /* flex-direction: row; */
    /* justify-content: space-between; */
    align-items: center;
`

const ModeList = () => {
    return (
        <Container>
            {/* {indexes.map( i => (
                    <ModeListItem key={i} i={i} />
            ))} */}
            <ModeRoleListItem />

        </Container>
 
    )
}

export default ModeList