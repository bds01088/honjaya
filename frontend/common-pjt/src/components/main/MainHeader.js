import styled from 'styled-components'
import logoImg from '../../assets/logo.png'
import pointImg from '../../assets/carrot.png'
import Rating from '@mui/material/Rating'
import { MdAccountCircle, MdHelpOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import MainHelper from './MainHelper'
import React, { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { loadUser } from '../auth/login/login-slice'
import { getRate } from './hashtag/rate-slice'


const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 5rem;
  font-family: Jua;
  position: sticky;
  z-index: 3;
`

const Logo = styled.img`
  margin-left: 2rem;
`

const LeftBox = styled.div`
  display: flex;
  align-items: center;
`

const Nickname = styled.div`
  font-size: 1.8rem;
  background-color: #f5c939;
  padding-top: 0.3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 1rem;
  margin-right: 1rem;
  color: #333333;

  @media screen and (max-width: 800px) {
    font-size: 1.3rem;
  }
`

// 매너 별점
const RateBox = styled.div`
  position: relative;

  &:hover .rateTip {
    visibility: visible;
  }
`

const MannerRate = styled(Rating)`
  && {
    color: #fffc3e;
    margin-right: 1rem;
  }
`

const RateText = styled.p`
  visibility: hidden;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 0.3rem;
  padding: 0.2rem 0.5rem;
  font-family: Jua;
  opacity: 80%;
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 50%;
  margin-left: -3rem;
`

// 포인트
const PointImg = styled.img`
  height: 50%;
`

const PointText = styled.p`
  color: #333333;
  font-size: 1.5rem;
  margin-right: 1rem;
`

// 프로필 수정
const ProfileBox = styled.div`
  position: relative;

  &:hover .profileTip {
  visibility: visible;
  }
`

const ProfileIcon = styled(MdAccountCircle)`
  color: #333333;
  font-size: 2rem;
  margin-right: 0.5rem;
`

const ProfileText = styled.p`
  visibility: hidden;
  background-color: black;
  color: #fff;
  text-align: center;
  width: 80px;
  border-radius: 0.3rem;
  padding: 0.2rem 0.5rem;
  font-family: Jua;
  opacity: 80%;
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 50%;
  margin-left: -3.3rem;
`

// 도움말
const HelperBox = styled.div`
    position: relative;

  &:hover .helperTip {
    visibility: visible;
  }
`
const Helper = styled(MdHelpOutline)`
  margin-right: 2rem;
  color: #333333;
  font-size: 2rem;
`

const HelperText = styled.p`
  visibility: hidden;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 0.3rem;
  padding: 0.2rem 0.5rem;
  font-family: Jua;
  opacity: 80%;
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 50%;
  margin-left: -2.8rem;
`


const MainHeader = () => {

  //Main이 mount될때 loadUser()를 불러오니까 따로 MainHeader에서는 안불러와도 되나봄
  //store에 있는 userNickname 불러오기
  const { userNickname, userPoint } = useSelector((state) => state.login.user)

  //store에서 관리중인 rate 불러오기
  const { rateScore } = useSelector((state) => state.rate.rateInfo)
  
  const [isOpen, setIsOpen] = useState(false)

  // const pointShow = userPoint.toLocaleString('ko-KR')
  const openModalHelper = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Header>
      <Logo src={logoImg} />
      
      <LeftBox>
        <Nickname>{userNickname}</Nickname>
        <RateBox>
          <MannerRate
            size="large"
            value={rateScore}
            precision={0.5}
            readOnly
          />
          <RateText className="rateTip">매너점수: {rateScore}</RateText>
        </RateBox>

        <PointImg src={pointImg} />
        <PointText>{userPoint}</PointText>
        
        <ProfileBox>
          <Link to="/profile" style={{ fontSize: '0' }}>
            <ProfileIcon />
          </Link>
          <ProfileText className="profileTip">회원정보수정</ProfileText>
        </ProfileBox>

        <HelperBox>
          <Helper onClick={openModalHelper} />
          <HelperText className="helperTip">도움말</HelperText>
        </HelperBox>

      </LeftBox>
      {isOpen ? <MainHelper openModalHelper={openModalHelper} /> : null}
    </Header>
  )
}

export default MainHeader
