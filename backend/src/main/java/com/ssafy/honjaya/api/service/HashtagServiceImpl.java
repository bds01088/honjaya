package com.ssafy.honjaya.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.honjaya.api.request.HashtagReq;
import com.ssafy.honjaya.api.response.HashtagListRes;
import com.ssafy.honjaya.api.response.HashtagRes;
import com.ssafy.honjaya.db.entity.Hashtag;
import com.ssafy.honjaya.db.repository.HashtagRepository;
import com.ssafy.honjaya.db.repository.UserRepository;

@Service
public class HashtagServiceImpl implements HashtagService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private HashtagRepository hashtagRepository;

	@Override
	public HashtagRes insertHashtag(HashtagReq hashtagReq) {
		Hashtag hashtag = Hashtag.builder()
				.user(userRepository.getOne(hashtagReq.getUserNo()))
				.hashText(hashtagReq.getHashText())
				.build();
		hashtag = hashtagRepository.save(hashtag);
		return new HashtagRes(hashtag);
	}

	@Override
	public HashtagListRes listHashtag(int userNo) {
		List<Hashtag> list = hashtagRepository.findByUser_UserNo(userNo);
		List<HashtagRes> resList = new ArrayList<>();
		HashtagListRes hashtagListRes = new HashtagListRes();
		list.forEach(e -> resList.add(new HashtagRes(e)));
		hashtagListRes.setList(resList);
		return hashtagListRes;
	}

	@Override
	public void deleteHashtag(int hashNo) {
		hashtagRepository.deleteById(hashNo);
	}
	
}
