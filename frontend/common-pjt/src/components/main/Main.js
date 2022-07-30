import styled from 'styled-components'
import backImg from '../../assets/main_img.jpg'
import MainHeader from './MainHeader'
import MainCharacter from './MainCharacter'
import CreateTag from './CreateTag'
import { MdAddCircle } from 'react-icons/md'
import React, { useState } from 'react'

const Container = styled.div`
    background-image: url(${backImg});
    background-size: cover;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
`

const CharacterBox = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;
`

const HashTag01 = styled.div`
    position: absolute;
    top: 17rem;
    left: 43%;
`

const AddHash01 = styled(MdAddCircle)`
    width: 3rem;
    height: 3rem;
    color: #71db76;

    &:hover {
        color: #65c56a;
    }
`

// const HashTag02 = styled.div`
//     position: absolute;
//     top: 33rem;
//     left: 62%;
// `

// const AddHash02 = styled(MdAddCircle)`
//     width: 3.2rem;
//     height: 3.2rem;
//     color: #df5dbe;

//     &:hover {
//         color: #c954ab;
//     }
// `

// const HashTag03 = styled.div`
//     position: absolute;
//     top: 40rem;
//     left: 33%;
// `

// const AddHash03 = styled(MdAddCircle)`
//     width: 3.5rem;
//     height: 3.5rem;
//     color: #B5EAEA;

//     &:hover {
//         color: #77c9c9;
//     }
// `

const Main = () => {

    const [openHash01, setOpenHash01] = useState(false)

    const openModalHash01 = () => {
        setOpenHash01(!openHash01)
    }

    return (
        <Container>
            {/* MainHeader는 nickname, point, rate_score가 필요 */}
            <MainHeader/>

            <CharacterBox>
                <MainCharacter />
            </CharacterBox>

            <HashTag01>
                <AddHash01 onClick={openModalHash01}/>
                { openHash01 ? <CreateTag openModalHash01={openModalHash01}/> : null }
            </HashTag01>

            {/* <HashTag02>
                <AddHash02 />
            </HashTag02>

            <HashTag03>
                <AddHash03 />
            </HashTag03> */}
        </Container>
    )
}

export default Main