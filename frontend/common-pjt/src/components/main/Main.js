import styled from 'styled-components'
import backImg from '../../assets/main_img.jpg'
import MainHeader from './MainHeader'
import MainCharacter from './MainCharacter'
import CreateTag from './CreateTag'
import { MdAddCircle, MdRemoveCircle } from 'react-icons/md'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Container = styled.div`
    background-image: url(${backImg});
    background-size: cover;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
`

const CharacterBox = styled.div`
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
    display: flex;
    flex-direction: row;
`

const AddHash01 = styled(MdAddCircle)`
    width: 3rem;
    height: 3rem;
    color: #71db76;

    &:hover {
        color: #65c56a;
    }
`

const Hash01 = styled.p`
    font-family: Jua;
    font-size: 1.5rem;
    border-radius: 20%;
    background-color: #85EAEA;
    padding: 0.5rem;
`

const RemoveHash01 = styled(MdRemoveCircle)`
    width: 3rem;
    height: 3rem;
    color: #71db76;
    margin-left: 1rem;

    &:hover {
        color: #65c56a;
    }
`

const HashTag02 = styled.div`
    position: absolute;
    top: 33rem;
    left: 62%;
`

const AddHash02 = styled(MdAddCircle)`
    width: 3.2rem;
    height: 3.2rem;
    color: #df5dbe;

    &:hover {
        color: #c954ab;
    }
`

const HashTag03 = styled.div`
    position: absolute;
    top: 40rem;
    left: 33%;
`

const AddHash03 = styled(MdAddCircle)`
    width: 3.5rem;
    height: 3.5rem;
    color: #B5EAEA;

    &:hover {
        color: #77c9c9;
    }
`

const Start = styled.div`
    position: absolute;
    bottom: 3rem;
    right: 3rem;
    text-decoration: none;
    background-color: #FFCBCB;
    font-size: 2rem;
    font-family: Jua;
    padding: 1rem 2rem;
    border-radius: 2rem;
    border: 3px solid #333333;
    
`


const Main = () => {

    const [openHash01, setOpenHash01] = useState(false)
    const [hash01, setHash01] = useState('')
    const [remove01, setRemove01] = useState(false)

    const openModalHash01 = () => {
        setOpenHash01(!openHash01)
        setHash01(hash01)
    }

    const showRemove01 = () => {
        setRemove01(!remove01)
    }

    return (
        <Container>
            {/* MainHeader는 nickname, point, rate_score가 필요 */}
            <MainHeader/>

            <CharacterBox>
                <MainCharacter />
            </CharacterBox>

            <HashTag01>
                { hash01==='' ? 
                    <AddHash01 onClick={openModalHash01}/> 
                    : <Hash01 onClick={showRemove01}># {hash01}</Hash01>
                }
                { remove01 ? <RemoveHash01 onClick={() => {
                    setRemove01(!remove01)
                    setHash01('')
                }}/> : null}
                { openHash01 ? <CreateTag openModalHash01={openModalHash01} setHash01={setHash01}/> : null }
            </HashTag01>

            <HashTag02>
                <AddHash02 />
            </HashTag02>

            <HashTag03>
                <AddHash03 />
            </HashTag03>
            
            <Start>
                <Link to="/mode" style={{ textDecoration: 'none', color: '#333333' }}>입장하기</Link>
            </Start>

        </Container>
    )
}

export default Main