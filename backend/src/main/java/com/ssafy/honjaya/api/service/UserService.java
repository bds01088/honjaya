package com.ssafy.honjaya.api.service;

import com.ssafy.honjaya.api.request.LoginReq;
import com.ssafy.honjaya.api.request.SignUpReq;
import com.ssafy.honjaya.api.request.UserUpdateReq;
import com.ssafy.honjaya.api.response.UserRes;

public interface UserService {
	boolean signUp(SignUpReq signUpReq);
	UserRes findUser(int userNo);
	boolean hasUserByEmail(String email);
	boolean hasUserByNickname(String Nickname);
	int login(LoginReq loginReq);
//	List<User> allUserInfo();
//	User userInfo(int id); // findUser
	boolean userUpdate(int userNo, UserUpdateReq userUpdateReq);
	boolean userDelete(int userNo);
	void saveRefreshToken(int userNo, String refreshToken);
	String getRefreshToken(int userNo);
	void deleRefreshToken(int userNo);
}
