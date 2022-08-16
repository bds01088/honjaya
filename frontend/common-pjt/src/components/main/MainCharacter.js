import { useEffect, useState } from 'react'
import axios from '../../api/http'
import styled from 'styled-components'
import Shadow from '../../assets/shadow.png'
import SelectCharcter from './SelectCharcter'
import { FiEdit } from 'react-icons/fi'

const Div = styled.div`
  position: relative;
`

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
const Wrapper = styled.div`
  position: absolute;
  /* display: flex; */
  /* right: 0rem; */
  width: 100%;
  z-index: 1;
`

const ChangeProfile = styled.div`
  display: flex;
  justify-content: center;
`

const EditBtn = styled(FiEdit)`
  font-size: 2.5rem;
  color: #ffc9d0;
  cursor: pointer;
`

const MainCharacter = () => {
  const [character, setCharacter] = useState({})

  useEffect(() => {
    getCharacter()
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

  // 모달 열기
  const [isOpen, setIsOpen] = useState(false)

  const openModalProfle = () => {
    setIsOpen(!isOpen)
  }

  const closeModalProfile = () => {
    openModalProfle(false)
  }
  console.log('url', character.url)
  return (
    <Div>
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

      <Wrapper>
        <ChangeProfile>
          <EditBtn onClick={openModalProfle}></EditBtn>
        </ChangeProfile>
        {isOpen ? (
          <SelectCharcter
            handleProfileChange={handleProfileChange}
            closeModalProfile={closeModalProfile}
          />
        ) : null}
      </Wrapper>
    </Div>
  )
}

export default MainCharacter
