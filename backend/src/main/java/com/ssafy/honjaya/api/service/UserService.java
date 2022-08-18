package com.ssafy.honjaya.api.service;

import java.security.NoSuchAlgorithmException;

import com.ssafy.honjaya.api.request.LoginReq;
import com.ssafy.honjaya.api.request.SignUpReq;
import com.ssafy.honjaya.api.request.UserUpdateReq;
import com.ssafy.honjaya.api.response.BanRes;
import com.ssafy.honjaya.api.response.ProfileRes;
import com.ssafy.honjaya.api.response.UserProfileInfoRes;
import com.ssafy.honjaya.api.response.UserRes;

public interface UserService {
	boolean signUp(SignUpReq signUpReq) throws NoSuchAlgorithmException;
	UserRes findUser(int userNo);
	UserProfileInfoRes getUserProfileInfo(int userNo);
	boolean hasUserByEmail(String email);
	boolean hasUserByNickname(String Nickname);
	int login(LoginReq loginReq) throws NoSuchAlgorithmException;
//	List<User> allUserInfo();
//	User userInfo(int id); // findUser
	boolean userUpdate(int userNo, UserUpdateReq userUpdateReq) throws NoSuchAlgorithmException;
	boolean userDelete(int userNo);
	void saveRefreshToken(int userNo, String refreshToken);
	String getRefreshToken(int userNo);
	void deleRefreshToken(int userNo);
	
	ProfileRes getProfileImg(int userNo);
	ProfileRes updateProfileImg(int userNo, int imgNo);
	
	BanRes confirmBan(String email);
}
