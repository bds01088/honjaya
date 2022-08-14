import { useEffect, useState } from 'react'
import axios from '../../api/http'
import styled from 'styled-components'
import cat from './../../assets/profile/001.png'
import Shadow from '../../assets/shadow.png'

const Container = styled.div`
  perspective: 300px;
  position: relative;

  &:hover {
    .front {
      transform: rotateY(180deg);
    }
    .back {
      transform: rotateY(0deg);
    }
  }
`

const CardFront = styled.div`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transition: 1s;
  position: absolute;
  transform: rotateY(0deg);
`

const FrontImg = styled.img`
  width: 100%;
  height: 100%;
`

const CardBack = styled.div`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transition: 1s;
  transform: rotateY(-180deg);
  border-radius: 20%;
`

const BackImg = styled.img`
  width: 100%;
  height: 100%;
`

const MainCharacter = () => {
  const [character, setCharacter] = useState({})

  useEffect(() => {
    getCharacter()
    console.log("useEffect안", character)
  },[])

  const getCharacter = async() => {
    try {
      const res = await axios.get('/honjaya/users/profile')
      console.log(res)
      await setCharacter({ url : res.data.profileUrl})
    }
    catch(err) {
        console.log(err)
    }
  }
  
  const handleProfileChange = (profileNo) => {
    axios.put(`/honjaya/users/profile/${profileNo}`)
    .then((res) => {
      console.log("put 응답", res)
      setCharacter({ url : res.data.profileUrl })
    })
    .catch((err) => {
      console.log(err)
    })
  }
  

  return (
    <div>
    <Container>
        <CardFront className="front">
          { character.url !== undefined ? 
          <FrontImg src={require(`./../../assets/profile${character.url}`)} /> 
          : null }
        </CardFront>
        <CardBack className="back">
          <BackImg src={Shadow} />
        </CardBack>
      </Container>
      <div>
        <button onClick={() => handleProfileChange(1)}>프로필 사진 바꾸기</button>
      </div>
    </div>
  )
}

export default MainCharacter
