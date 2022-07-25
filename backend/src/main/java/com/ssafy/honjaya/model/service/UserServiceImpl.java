package com.ssafy.honjaya.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.honjaya.model.UserDto;
import com.ssafy.honjaya.model.mapper.UserMapper;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserMapper userMapper;
	
	@Override
	public boolean findUser(int id) {
		return userMapper.findUser(id) == 0;
	}
	
	@Override
	public boolean findUserByEmail(String email) {
		return userMapper.findUserByEmail(email) == 0;
	}
	
	@Override
	public boolean findUserByNickname(String nickname) {
		return userMapper.findUserByNickname(nickname) == 0;
	}

	@Override
	@Transactional
	public boolean doSignUp(UserDto userDto) {
		return userMapper.doSignUp(userDto) == 1;
	}

	@Override
	public UserDto doLogin(UserDto userDto) {
		if (userDto.getUserEmail() == null || userDto.getUserPassword() == null) {
			return null;
		}
		UserDto dto = userMapper.doLogin(userDto);
		System.out.println(dto);
		return dto;
	}

	@Override
	public List<UserDto> allUserInfo() {
		return userMapper.allUserInfo();
	}

	@Override
	public UserDto userInfo(int id) {
		return userMapper.userInfo(id);
	}

	@Override
	@Transactional
	public boolean userUpdate(UserDto userDto) {
		return userMapper.userUpdate(userDto) == 1;
	}

	@Override
	@Transactional
	public boolean userDelete(int id) {
		return userMapper.userDelete(id) == 1;
	}

	@Override
	@Transactional
	public void saveRefreshToken(int id, String refreshToken) {
		UserDto userDto = new UserDto();
		userDto.setUserNo(id);
		userDto.setUserToken(refreshToken);
		
		userMapper.saveRefreshToken(userDto);
	}

	@Override
	public String getRefreshToken(int id) {
		return userMapper.getRefreshToken(id);
	}

	@Override
	@Transactional
	public void deleRefreshToken(int id) {
		UserDto userDto = new UserDto();
		userDto.setUserNo(id);
		userDto.setUserToken(null);
		
		userMapper.deleteRefreshToken(userDto);
	}

}
