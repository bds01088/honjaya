package com.ssafy.honjaya.model.service;

import java.util.List;

import com.ssafy.honjaya.model.UserDto;
import com.ssafy.honjaya.model.entity.User;

public interface UserService {
	boolean findUser(int id);
	boolean findUserByEmail(String email);
	boolean findUserByNickname(String Nickname);
	boolean doSignUp(User user);
	UserDto doLogin(UserDto userDto);
	List<UserDto> allUserInfo();
	UserDto userInfo(int id);
	boolean userUpdate(UserDto userDto);
	boolean userDelete(int id);
	void saveRefreshToken(int id, String refreshToken);
	String getRefreshToken(int id);
	void deleRefreshToken(int id);
}
