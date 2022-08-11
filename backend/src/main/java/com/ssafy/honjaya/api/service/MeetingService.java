package com.ssafy.honjaya.api.service;

import org.springframework.web.context.request.async.DeferredResult;

import com.ssafy.honjaya.api.request.MeetingReq;
import com.ssafy.honjaya.api.response.MeetingRes;

public interface MeetingService {
	void readyMeeting(MeetingReq meetingReq, DeferredResult<MeetingRes> deferredResult);
	void cancelChatRoom(MeetingReq meetingReq);
	void timeout(MeetingReq meetingReq);
	
	void connectUser(String chatRoomId, String websocketSessionId);
	void disconnectUser(String websocketSessionId);
}
