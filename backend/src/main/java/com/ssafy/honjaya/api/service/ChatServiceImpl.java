package com.ssafy.honjaya.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.honjaya.api.request.ChatAskReq;
import com.ssafy.honjaya.api.request.ChatReq;
import com.ssafy.honjaya.api.request.ChatroomReq;
import com.ssafy.honjaya.api.response.ChatroomListRes;
import com.ssafy.honjaya.db.repository.ChatAskRepository;
import com.ssafy.honjaya.db.repository.ChatRepository;
import com.ssafy.honjaya.db.repository.ChatroomRepository;
import com.ssafy.honjaya.db.repository.ChatroomUserRepository;
import com.ssafy.honjaya.db.repository.UserRepository;

@Service
public class ChatServiceImpl implements ChatService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ChatRepository chatRepository;
	
	@Autowired
	private ChatAskRepository chatAskRepository;
	
	@Autowired
	private ChatroomRepository chatroomRepository;
	
	@Autowired
	private ChatroomUserRepository chatroomUserRepository;

//	@Override
//	public HashtagRes insertHashtag(HashtagReq hashtagReq) {
//		Hashtag hashtag = Hashtag.builder()
//				.user(userRepository.getOne(hashtagReq.getUserNo()))
//				.hashText(hashtagReq.getHashText())
//				.build();
//		hashtag = hashtagRepository.save(hashtag);
//		return new HashtagRes(hashtag);
//	}
//
//	@Override
//	public HashtagListRes listHashtag(int userNo) {
//		List<Hashtag> list = hashtagRepository.findByUser_UserNo(userNo);
//		List<HashtagRes> resList = new ArrayList<>();
//		HashtagListRes hashtagListRes = new HashtagListRes();
//		list.forEach(e -> resList.add(new HashtagRes(e)));
//		hashtagListRes.setList(resList);
//		return hashtagListRes;
//	}
//
//	@Override
//	public void deleteHashtag(int hashNo) {
//		hashtagRepository.deleteById(hashNo);
//	}

	@Override
	public void askChat(ChatAskReq chatAskReq) {
		
	}

	@Override
	public void deleteAsk(int userNo) {
		
	}

	@Override
	public void createChatroom(ChatroomReq chatroomReq) {
		
	}

	@Override
	public ChatroomListRes listChatroom(int userNo) {
		return null;
	}

	@Override
	public void deleteChatroom(int chatRoomNo) {
		
	}

	@Override
	public void getMessages(int chatRoomNo) {
		
	}

	@Override
	public void sendMessage(ChatReq chatReq) {
		
	}
	
}
