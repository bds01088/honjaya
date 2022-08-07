package com.ssafy.honjaya.api.request;

import org.springframework.web.context.request.async.DeferredResult;

import com.ssafy.honjaya.api.response.MeetingRes;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MeetingSet {
	MeetingReq meetingReqs;
	
	DeferredResult<MeetingRes> deferredResults;
}
