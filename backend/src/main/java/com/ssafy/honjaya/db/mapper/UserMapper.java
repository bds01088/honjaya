package com.ssafy.honjaya.db.mapper;

import java.util.List;

import com.ssafy.honjaya.db.UserDto;

public interface UserMapper {
	int findUser(int userNo);
	int findUserByEmail(String userEmail);
	int findUserByNickname(String userNickname);
	int doSignUp(UserDto userDto);
	UserDto doLogin(UserDto userDto);
	List<UserDto> allUserInfo();
	UserDto userInfo(int userNo);
	int userUpdate(UserDto userDto);
	int userDelete(int userNo);
	public void saveRefreshToken(UserDto userDto);
	public void deleteRefreshToken(UserDto userDto);
	public String getRefreshToken(int userNo);
}
