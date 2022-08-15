import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { MdClear } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import logoImg from '../../../assets/logo.png'
import { opponentUserProfile } from './profile-slice'
import { IoIosFemale, IoIosMale } from 'react-icons/io'
import { RiAlarmWarningFill } from 'react-icons/ri'
import Rating from '@mui/material/Rating'
import UserReportModal from '../chat/UserReportModal'

export const ModalBackdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
  font-family: Jua;
`

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

const LogoImg = styled.img`
  height: 5rem;
`

const Text = styled.span`
  width: 100%;
  color: #4A4A4A;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`

const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  text-align: center;
  text-decoration: none;
  padding: 30px 90px;
  background-color: white;
  border-radius: 30px;
  color: #333333;
  position: relative;
`
const BackIcon = styled(MdClear)`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  width: 2rem;
  height: 2rem;
  color: #88866f;
`

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`


const StyledBtn = styled.button`
  height: 3rem;
  background-color: #ff728e;
  color: white;
  border-radius: 0.5rem;
  border: 0;
  font-size: 1rem;
  font-family: Jua;

  &:hover{
    background-color: #009c87;
    color: #e0e0e0;
  }
`

const RiAlarmWarning = styled(RiAlarmWarningFill)`
  cursor: pointer;
  color: #E64848;
`
const Nickname = styled.div`
  font-size: 2rem;
  font-family: 'Minseo';
  margin: 0;
  display: flex;
  align-items: center;`

const Hashtag = styled.span`
  font-family: Minseo;
`

const FemaleIcon = styled(IoIosFemale)`
  color: #FF728E
`
const MaleIcon = styled(IoIosMale)`
  color: #009c87
`


const UserProfileModal = ({oppositeUserNo, openUserProfileModal, userReport, myUserNo}) => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const openUserReportModal = () => {
    setIsOpen(!isOpen)
  }
  
  const { userNickname, rateScore, userGender, hashtags, userProfilePicUrl } = useSelector((state) => state.profile)

  const closeUserProfileModal = () => {
    openUserProfileModal(false)}


  
  useEffect(() => {
    console.log("유저넘버 넘어오나", oppositeUserNo)
    dispatch(opponentUserProfile(oppositeUserNo))
      .unwrap()
      .then((res) => {
        console.log("상대유저정보", res.data)
      })
      .catch((err)=> {
        console.log("채팅목록로드에러", err)
  
      })
  }, []) 



  
  return (
    <div>
      <ModalBackdrop>
        <ModalView>
          <BackIcon onClick={closeUserProfileModal} />
          <ProfileBox>
            <div>
              <LogoImg src={logoImg} />
            </div>
          </ProfileBox>
          <div>프로필사진</div>

          <Nickname>
            나는닉네임{userNickname}
            {<RiAlarmWarning onClick={() => { openUserReportModal()}} /> }
            {isOpen ? <UserReportModal openUserReportModal={openUserReportModal} userReport={userReport} oppositeUserNo={oppositeUserNo} myUserNo={myUserNo}/> : null}
          </Nickname>
          <div>
            {userGender === 'f' ? (
              <FemaleIcon></FemaleIcon>
            ) : (
              <MaleIcon></MaleIcon>
            )}
          </div>

          {hashtags &&
            hashtags.map((item, idx) => <Hashtag># {item} </Hashtag>)}
        
          <RateBox>
            <MannerRate size="large" value={rateScore} precision={0.5} readOnly />
            </RateBox>
          </ModalView>
      </ModalBackdrop>
    </div>
  )
};

export default UserProfileModal;