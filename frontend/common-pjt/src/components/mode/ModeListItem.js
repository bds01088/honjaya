import React from "react"
import styled from "styled-components"
import TempImg from '../../assets/character.png'
// import TempImg1 from '../../assets/carrot.png'
// import TempImg2 from '../../assets/logo.png'
// import TempImg3 from '../../assets/shadow.png'

const Container= styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    text-align: center;
    margin: 0 auto;
`

const Mode = styled.img`
    height: 90%;
    width: 90%;
`


// 모드 종류
const ModeListItem = ({i}) => {
    return (
        <Container>
            <div> 
                
                <Mode src={data[i].src}></Mode>
                <p>{data[i].text}</p>
    
            </div>
        </Container>
        
    ) 
}

const data = [
    {
        id: 1,
        src: `${TempImg}`,
        text: '싱글로 참여해서~',

    },
    {
        id: 2,
        src: `${TempImg}`,
        text: '지시자로 참여해서~',

    },
    {
        id: 3,
        src: `${TempImg}`,
        text: '아바타로 참여해서~',

    },
    {
        id: 4,
        src: `${TempImg}`,
        text: '랜덤으로 참여해서~',

    },
]
export default ModeListItem

