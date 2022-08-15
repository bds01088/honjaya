import { useEffect, useState } from 'react'
import axios from '../../api/http'
import styled from 'styled-components'
import cat from './../../assets/profile/001.png'
import Shadow from '../../assets/shadow.png'
import SelectCharcter from './SelectCharcter'

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

const ChangeProfile = styled.div`
  display: flex;
  justify-content: center;
  outline: 2px solid;
`

const Div = styled.div`
  width: 120%;
  height: 120%;
  /* outline: 3px solid red; */
`

const MainCharacter = () => {
  const [character, setCharacter] = useState({})

  useEffect(() => {
    getCharacter()
    console.log('useEffect안', character)
  }, [])

  // 기존 이미지 가져오기
  const getCharacter = async () => {
    try {
      const res = await axios.get('/honjaya/users/profile')
      console.log('기본프로필', res)
      await setCharacter({ url: res.data.profileUrl })
    } catch (err) {
      console.log(err)
    }
  }

  // 변경된 이미지 보내기
  const handleProfileChange = (profileNo) => {
    axios
      .put(`/honjaya/users/profile/${profileNo}`)
      .then((res) => {
        console.log('put 응답', res)
        setCharacter({ url: res.data.profileUrl })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const [isOpen, setIsOpen] = useState(false)

  const openModalHelper = () => {
    setIsOpen(!isOpen)
  }

  const closeModalProfile = () => {
    openModalHelper(false)
  }

  const [num, setNum] = useState('')

  return (
    <div>
      <Container>
        <CardFront className="front">
          {character.url !== undefined ? (
            <FrontImg src={require(`./../../assets/profile${character.url}`)} />
          ) : null}
        </CardFront>
        <CardBack className="back">
          <BackImg src={Shadow} />
        </CardBack>
      </Container>
      

      <Div>
      <ChangeProfile>
        <button onClick={() => handleProfileChange(num)}>저장</button>
        <button onClick={closeModalProfile}>취소</button>
        <button onClick={openModalHelper}>모달 띄우기</button>
      </ChangeProfile>
      {isOpen ? (
        <SelectCharcter
          openModalHelper={openModalHelper}
          setNum={setNum}
          num={num}
        />
      ) : null}
      </Div>
    </div>
  )
}

export default MainCharacter
