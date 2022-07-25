package com.ssafy.honjaya.model.mapper;

import java.util.List;
import java.util.Map;

import com.ssafy.honjaya.model.UserDto;

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
