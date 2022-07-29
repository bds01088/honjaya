package com.ssafy.honjaya.api.service;

import com.ssafy.honjaya.db.entity.User;

public interface UserService {
	User findUser(int id);
	boolean hasUserByEmail(String email);
	boolean hasUserByNickname(String Nickname);
	boolean signUp(User user);
	User login(User user);
//	List<User> allUserInfo();
//	User userInfo(int id); // findUser
	boolean userUpdate(User user);
	boolean userDelete(int id);
	void saveRefreshToken(int id, String refreshToken);
	String getRefreshToken(int id);
	void deleRefreshToken(int id);
}
