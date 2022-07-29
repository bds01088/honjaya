package com.ssafy.honjaya.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.honjaya.db.entity.User;
import com.ssafy.honjaya.db.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public User findUser(int id) {
		return userRepository.findById(id).get();
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
	@Transactional
	public boolean signUp(User user) {
		return userRepository.save(user) != null;
	}

	@Override
	public User login(User user) {
		String email = user.getUserEmail();
		String password = user.getUserPassword();
		if (email == null || password == null) {
			return null;
		}
		user = userRepository.findByUserEmail(email);
		if (user.getUserPassword() != password) {
			return null; // 비밀번호 오답
		}
		return user;
	}

//	@Override
//	public List<UserDto> allUserInfo() {
//		return userRepository.findAll();
//	}

//	@Override
//	public User userInfo(int id) { // findUser
//		return userMapper.userInfo(id);
//	}

	@Override
	@Transactional
	public boolean userUpdate(User user) {
		return userRepository.save(user) != null;
	}

	@Override
	@Transactional
	public boolean userDelete(int id) {
		userRepository.deleteById(id);
		return true;
	}

	@Override
	@Transactional
	public void saveRefreshToken(int id, String refreshToken) {
		User user = userRepository.findById(id).get();
		user.setUserToken(refreshToken);
		
		userRepository.save(user);
	}

	@Override
	public String getRefreshToken(int id) {
		return userRepository.findById(id).get().getUserToken();
	}

	@Override
	@Transactional
	public void deleRefreshToken(int id) {
		User user = userRepository.findById(id).get();
		user.setUserToken(null);
		
		userRepository.save(user);
	}

}
