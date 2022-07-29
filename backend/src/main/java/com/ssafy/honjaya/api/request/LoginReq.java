package com.ssafy.honjaya.api.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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
@ApiModel(value = "LoginReq", description = "로그인 Req")
public class LoginReq {

	@ApiModelProperty(value = "이메일")
	@NotNull(message = "email may not be empty")
	@Email(message = "이메일 형식이 아닙니다.")
	private String userEmail;

	@ApiModelProperty(value = "비밀번호")
	@NotNull(message = "password may not be empty")
	private String userPassword;
	
}
