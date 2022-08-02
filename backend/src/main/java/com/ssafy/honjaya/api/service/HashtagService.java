package com.ssafy.honjaya.api.service;

import com.ssafy.honjaya.api.request.HashtagReq;
import com.ssafy.honjaya.api.response.HashtagListRes;
import com.ssafy.honjaya.api.response.HashtagRes;

public interface HashtagService {
	HashtagRes insertHashtag(HashtagReq hashtagReq);
	HashtagListRes listHashtag(int userNo);
	void deleteHashtag(int hashNo);
}
