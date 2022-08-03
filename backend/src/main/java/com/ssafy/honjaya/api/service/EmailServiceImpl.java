package com.ssafy.honjaya.api.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.ssafy.honjaya.api.request.EmailReq;

@Service
public class EmailServiceImpl implements EmailService {

	private JavaMailSender emailSender;
	 
    public void sendMessage(EmailReq emailReq) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("honjaya3@gmail.com");
        message.setTo(emailReq.getEmail());
        message.setSubject("<혼자야?> 서비스의 회원가입 이메일 인증 코드입니다.");
        message.setText("안녕하세요? 화상미팅 서비스 <혼자야?>팀입니다.\n귀하의 이메일 인증 코드는  [ " + emailReq.getCode() + " ]  입니다.\n인증 코드 입력 창에 위 코드를 입력해주세요.");
        emailSender.send(message);
    }
	
}
