package com.ssafy.honjaya.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.honjaya.api.request.PointReq;
import com.ssafy.honjaya.db.entity.User;
import com.ssafy.honjaya.db.repository.UserRepository;

@Service
public class PointServiceImpl implements PointService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public int findPoint(int userNo) {
		return userRepository.findById(userNo).get().getUserPoint();
	}

	@Override
	public int updatePoint(PointReq pointReq) {
		User user = userRepository.findById(pointReq.getUserNo()).get();
		user.setUserPoint(pointReq.getPoint());
		return userRepository.save(user).getUserPoint();
	}
	
}
