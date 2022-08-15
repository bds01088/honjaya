package com.ssafy.honjaya.api.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.honjaya.api.request.LoginReq;
import com.ssafy.honjaya.api.request.SignUpReq;
import com.ssafy.honjaya.api.request.UserUpdateReq;
import com.ssafy.honjaya.api.response.BanRes;
import com.ssafy.honjaya.api.response.ProfileRes;
import com.ssafy.honjaya.api.response.UserProfileInfoRes;
import com.ssafy.honjaya.api.response.UserRes;
import com.ssafy.honjaya.db.entity.Ban;
import com.ssafy.honjaya.db.entity.Hashtag;
import com.ssafy.honjaya.db.entity.User;
import com.ssafy.honjaya.db.repository.BanRepository;
import com.ssafy.honjaya.db.repository.ChatroomRepository;
import com.ssafy.honjaya.db.repository.HashtagRepository;
import com.ssafy.honjaya.db.repository.RateRepository;
import com.ssafy.honjaya.db.repository.UserRepository;
import com.ssafy.honjaya.util.CommonUtil;

@Service
public class UserServiceImpl implements UserService {

	private static final int SIGN_UP_POINT = 0; // 가입 시 포인트
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RateRepository rateRepository;
	
	@Autowired
	private HashtagRepository hashtagRepository;
	
	@Autowired
	private ChatroomRepository chatroomRepository;
	
	@Autowired
	private BanRepository banRepository;
	
	@Override
	@Transactional
	public boolean signUp(SignUpReq signUpReq) {
		int randomProfileNo = (int) (Math.random() * 5) + 1;
		String userProfilePicUrl = "/" + String.format("%03d", randomProfileNo) + ".png";
		User user = User.builder()
				.userEmail(signUpReq.getUserEmail())
				.userPassword(signUpReq.getUserPassword())
				.userNickname(signUpReq.getUserNickname())
				.userName(signUpReq.getUserName())
				.userBirthday(CommonUtil.stringToDate(signUpReq.getUserBirthday()))
				.userGender(signUpReq.getUserGender())
				.userPhone(signUpReq.getUserPhone())
				.userProfilePicUrl(userProfilePicUrl)
				.userPoint(SIGN_UP_POINT)
				.build();
		return userRepository.save(user) != null;
	}

	@Override
	public UserRes findUser(int userNo) {
		User user = userRepository.findById(userNo).get();
		UserRes userRes = new UserRes(user);
		return userRes;
	}
	
	@Override
	public boolean hasUserByEmail(String email) {
		return userRepository.countByUserEmail(email) == 1;
	}
	
	@Override
	public boolean hasUserByNickname(String nickname) {
		return userRepository.countByUserNickname(nickname) == 1;
	}

	@Override
	public int login(LoginReq loginReq) {
		String email = loginReq.getUserEmail();
		String password = loginReq.getUserPassword();
		if (email == null || password == null) {
			return -1;
		}
		User user = userRepository.findByUserEmail(email);
		if (user == null || !user.getUserPassword().equals(password)) {
			return -2; // 이메일 또는 비밀번호 오답
		}
		return user.getUserNo();
	}
	
	@Override
	public UserProfileInfoRes getUserProfileInfo(int userNo) {
		UserProfileInfoRes userProfileInfoRes = new UserProfileInfoRes();
		User user = userRepository.findById(userNo).get();
		userProfileInfoRes.setUserNickname(user.getUserNickname());
		userProfileInfoRes.setUserProfilePicUrl(user.getUserProfilePicUrl());
		userProfileInfoRes.setUserGender(user.getUserGender());
		List<Hashtag> list = hashtagRepository.findByUser_UserNo(userNo);
		List<String> hashtags = new ArrayList<String>();
		list.forEach(e -> hashtags.add(e.getHashText()));
		userProfileInfoRes.setHashtags(hashtags);
		Double averageRate = rateRepository.getAverageRate(userNo);
		userProfileInfoRes.setRateScore(averageRate != null ? averageRate : 0.0);
		return userProfileInfoRes;
	}

//	@Override
//	public List<UserDto> allUserInfo() {
//		return userRepository.findAll();
//	}

//	@Override
//	public User userInfo(int userNo) { // findUser
//		return userMapper.userInfo(userNo);
//	}

	@Override
	@Transactional
	public boolean userUpdate(int userNo, UserUpdateReq userUpdateReq) {
		User user = userRepository.findById(userNo).get();
		if (user == null) {
			return false;
		}
		user.setUserPassword(userUpdateReq.getUserPassword());
		user.setUserNickname(userUpdateReq.getUserNickname());
		user.setUserName(userUpdateReq.getUserName());
		user.setUserBirthday(CommonUtil.stringToDate(userUpdateReq.getUserBirthday()));
		user.setUserGender(userUpdateReq.getUserGender());
		user.setUserPhone(userUpdateReq.getUserPhone());
		user.setUserProfilePicUrl(userUpdateReq.getUserProfilePicUrl());
		
		return userRepository.save(user) != null;
	}

	@Override
	@Transactional
	public boolean userDelete(int userNo) {
		chatroomRepository.deleteByUserNo(userNo);
		userRepository.deleteById(userNo);
		return true;
	}

	@Override
	@Transactional
	public void saveRefreshToken(int userNo, String refreshToken) {
		User user = userRepository.findById(userNo).get();
		user.setUserToken(refreshToken);
		
		userRepository.save(user);
	}

	@Override
	public String getRefreshToken(int userNo) {
		return userRepository.findById(userNo).get().getUserToken();
	}

	@Override
	@Transactional
	public void deleRefreshToken(int userNo) {
		User user = userRepository.findById(userNo).get();
		user.setUserToken(null);
		
		userRepository.save(user);
	}
	
	@Override
	public ProfileRes getProfileImg(int userNo) {
		ProfileRes profileRes = new ProfileRes();
		User user = userRepository.findById(userNo).get();
		profileRes.setProfileUrl(user.getUserProfilePicUrl());
		return profileRes;
	}
	
	@Override
	public ProfileRes updateProfileImg(int userNo, int imgNo) {
		ProfileRes profileRes = new ProfileRes();
		User user = userRepository.findById(userNo).get();
		String userProfilePicUrl = "/" + String.format("%03d", imgNo) + ".png";
		user.setUserProfilePicUrl(userProfilePicUrl);
		userRepository.save(user);
		profileRes.setProfileUrl(user.getUserProfilePicUrl());
		return profileRes;
	}
	
	@Override
	public BanRes confirmBan(String email) {
		Ban ban = banRepository.findByBanUserEmail(email);
		if (ban == null) {
			return null;
		}
		if (ban.getBanEndTime().isBefore(LocalDateTime.now())) {
			banRepository.deleteById(ban.getBanNo());
			return null;
		}
		return new BanRes(ban);
	}

}
