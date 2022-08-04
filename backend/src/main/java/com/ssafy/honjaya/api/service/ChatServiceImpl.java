package com.ssafy.honjaya.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.honjaya.api.request.ChatAskReq;
import com.ssafy.honjaya.api.request.ChatReq;
import com.ssafy.honjaya.api.response.ChatroomListRes;
import com.ssafy.honjaya.api.response.ChatroomRes;
import com.ssafy.honjaya.api.response.HashtagListRes;
import com.ssafy.honjaya.api.response.HashtagRes;
import com.ssafy.honjaya.db.entity.ChatAsk;
import com.ssafy.honjaya.db.entity.Chatroom;
import com.ssafy.honjaya.db.entity.ChatroomUser;
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
	public boolean askChat(ChatAskReq chatAskReq) {
		int chatAskFrom = chatAskReq.getChatAskFrom();
		int chatAskTo = chatAskReq.getChatAskTo();
		ChatAsk chatAsk = chatAskRepository.findByChatAskFrom_UserNoAndChatAskTo_UserNo(chatAskTo, chatAskFrom);
		if (chatAsk != null) {
			// 지금 대화 신청을 받는 사람이 지금 대화 신청을 한 사람에게 이전에 대화 신청을 한 적이 있는 경우 (방을 나가기 전)
			createChatroom(chatAskFrom, chatAskTo);
			chatAskRepository.delete(chatAsk);
			return true;
		}
		chatAsk = ChatAsk.builder()
				.chatAskFrom(userRepository.getOne(chatAskFrom))
				.chatAskTo(userRepository.getOne(chatAskTo))
				.build();
		chatAskRepository.save(chatAsk);
		return false;
	}

	@Override
	public void deleteAsk(int userNo) { // 유저가 미팅룸을 나갈 때, 다른 사람에게 대화 신청을 하지 못하므로 그 유저에게 들어온 대화 신청은 전부 삭제됨
		chatAskRepository.deleteByChatAskTo_UserNo(userNo);
	}

	@Override
	public ChatroomListRes listChatroom(int userNo) {
		List<ChatroomUser> list = chatroomUserRepository.listChatroom(userNo);
		List<ChatroomRes> resList = new ArrayList<>();
		ChatroomListRes chatroomListRes = new ChatroomListRes();
		list.forEach(e -> resList.add(new ChatroomRes(e)));
		chatroomListRes.setList(resList);
		return chatroomListRes;
	}

	@Override
	public void deleteChatroom(int chatRoomNo) { // 둘 중 한 명이 채팅을 나갔거나 탈퇴를 한 경우 발동
		
	}

	@Override
	public void getMessages(int chatRoomNo) {
		
	}

	@Override
	public void sendMessage(ChatReq chatReq) {
		
	}
	
	private void createChatroom(int userNo1, int userNo2) {
		Chatroom chatroom = chatroomRepository.save(new Chatroom());
		ChatroomUser chatroomUser1 = ChatroomUser.builder()
				.chatroom(chatroom)
				.user(userRepository.getOne(userNo1))
				.build();
		ChatroomUser chatroomUser2 = ChatroomUser.builder()
				.chatroom(chatroom)
				.user(userRepository.getOne(userNo2))
				.build();
		
		chatroomUserRepository.save(chatroomUser1);
		chatroomUserRepository.save(chatroomUser2);
	}
}
