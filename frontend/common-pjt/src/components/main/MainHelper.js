import React from "react"
import styled from "styled-components"
import logoImg from '../../assets/logo.png'


export const ModalBackdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`

const ModalView = styled.div.attrs(props => ({
  role: 'dialog'
}))`
  /* text-align: center; */
  text-decoration: none;
  padding: 30px 90px;
  background-color: white;
  border-radius: 30px;
  color: #333333;
  background-color: #FFFDDE;
  font-size: 1.5rem;
  font-family: Jua;
`
const Header = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LogoImg = styled.img`
  height: 5rem;
`

const HeaderText = styled.p`
  font-size: 2rem;
  margin-bottom: -1rem;
`

const MainHelper = ({openModalHelper}) => {

  const closeModalProfile = () => {
      openModalHelper(false)
  }

  return (
    <ModalBackdrop onClick={closeModalProfile}>
      <ModalView>
        <Header>
          <div>
            <LogoImg src={logoImg} />
          </div>
          <HeaderText>이용 가이드</HeaderText>
        </Header>

        <div>
          1. 매너 별점
          <br />
          : 게임을 진행하는 동안 얼마나 매너도를 나타내는 지표에요 !<br />
          <br />
          2. 루팡
          <br />
          : 혼자야만의 포인트 제도. <br />
          루팡을 이용해 미팅 중, 랜덤 주제 추천이나 타이머 연장 등의 서비스를
          이용할 수 있어요 ! <br />
          <br />
          3. 해시태그
          <br />
          : 해시태그를 이용해 나를 표현해보세요 ! <br />
          <br />
          4. 1:1 채팅
          <br />
          : 마음에 드는 유저와 채팅을 통해 소통할 수 있어요 !<br />
        </div>
      </ModalView>
    </ModalBackdrop>
  )
}

export default MainHelper