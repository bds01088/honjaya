import React from "react"
import styled from 'styled-components'
import ModeRoleList from "./ModeRoleList"

const ModeSelectBox=styled.div`
    display: flex;
    position: relative;
    justify-content: space-between;
    margin: 0 auto;
    outline: 0.2rem solid #000;
    width: 90%;
    height: 55%;
    border-radius: 2rem;
` 

const ModeChoice = () =>{
    return(
        <ModeSelectBox className="box">
            <ModeRoleList className="ModeList"></ModeRoleList>
        </ModeSelectBox>
    )
}


export default ModeChoice
