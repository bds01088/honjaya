import React from "react"
import styled from 'styled-components'
import ModeList from "./ModeList"

const ModeSelectBox=styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    border: 5px solid #000;
    width: 90%;
    height: 55%;
    border-radius: 2rem;
    position: relative;
` 

const ModeChoice = () =>{
    return(
        <ModeSelectBox className="box">
            <ModeList className="ModeList"></ModeList>
        </ModeSelectBox>
    )
}


export default ModeChoice
