package com.ssafy.honjaya.api.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

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
@ApiModel(value = "SignUpReq", description = "회원 가입 Req")
public class SignUpReq {

	@ApiModelProperty(value = "이메일")
	@NotNull(message = "email may not be empty")
	@Email(message = "이메일 형식이 아닙니다.")
	@Size(min = 3, max = 50)
	private String userEmail;

	@ApiModelProperty(value = "비밀번호")
	@NotNull(message = "password may not be empty")
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{8,15}$",
			message = "비밀번호는 영문, 숫자, 특수문자가 적어도 1개 이상씩 포함된 8자 ~ 15자의 비밀번호여야 합니다.")
	private String userPassword;

	@ApiModelProperty(value = "닉네임")
	@Pattern(regexp = "^[0-9a-zA-Z가-힣]*$", message = "닉네임은 숫자, 영어, 한글만 가능합니다.")
	@Size(min = 2, max = 10)
	private String userNickname;

	@ApiModelProperty(value = "이름")
	@Size(min = 2, max = 30)
	private String userName;

	@ApiModelProperty(value = "생일 (yyyy-MM-dd (2021-01-01))")
	@Pattern(regexp = "^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))$", message = "닉네임은 숫자, 영어, 한글만 가능합니다.")
	private String userBirthday; // yyyy-MM-dd (2021-01-01)

	@ApiModelProperty(value = "성별 (m/f)")
	@Pattern(regexp = "^[mf]*$", message = "m 또는 f 값만 넘겨주세요.")
	@Size(min = 1)
	private String userGender;

	@ApiModelProperty(value = "전화번호")
	private String userPhone;

//	@ApiModelProperty(value = "프로필 사진")
//	private String userProfilePicUrl;

}
