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
  overflow: auto;
`

const ModalView = styled.div.attrs(props => ({
  role: 'dialog'
}))`
  /* text-align: center; */
  text-decoration: none;
  padding: 30px 90px;
  border-radius: 30px;
  color: #5D5D5D;
  background-color: #FFFDDE;
  font-size: 1.4rem;
  font-family: Jua;
  width: 28rem;
`


const Header = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: thick double #333333;
  border-top: thick double #333333;
  margin-bottom: 1rem;
`


const LogoImg = styled.img`
  height: 5rem;
`

const HeaderText = styled.p`
  font-size: 2rem;
  margin-bottom: -1rem;
  color: #006A71;
`

const GuideTitle = styled.p`
  font-size: 1.6rem;
  color: #006A71;
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
          <GuideTitle>🌟 매너 별점</GuideTitle>
          미팅을 진행하며 얼마나 매너있었는가?<br />
          함께 미팅을 진행한 유저들이 평가해줘요 !<br />
          <br />

          <GuideTitle>💎 루팡</GuideTitle>
          혼자야만의 포인트 제도 💰 <br />
          루팡을 소모하여 랜덤 대화 주제 추천이나 타이머 연장 등의 서비스를
          이용할 수 있어요 ! <br />

          <br />
          <GuideTitle>#️⃣ 해시태그</GuideTitle>
          해시태그로 나를 표현해보세요 ! <br />
          <br />
          
          <GuideTitle>💌 1:1 채팅</GuideTitle>
          마음에 드는 유저와 채팅을 통해 소통할 수 있어요 !<br />
        </div>
      </ModalView>
    </ModalBackdrop>
  )
}

export default MainHelper