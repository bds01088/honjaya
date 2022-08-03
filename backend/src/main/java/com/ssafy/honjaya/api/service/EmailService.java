package com.ssafy.honjaya.api.service;

import com.ssafy.honjaya.api.request.EmailReq;

public interface EmailService {
	void sendMessage(EmailReq emailReq);
}
