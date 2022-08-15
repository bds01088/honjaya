package com.ssafy.honjaya.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.honjaya.api.request.EmailReq;
import com.ssafy.honjaya.api.request.LoginReq;
import com.ssafy.honjaya.api.request.SignUpReq;
import com.ssafy.honjaya.api.request.UserUpdateReq;
import com.ssafy.honjaya.api.response.BanRes;
import com.ssafy.honjaya.api.response.BooleanRes;
import com.ssafy.honjaya.api.response.CommonRes;
import com.ssafy.honjaya.api.response.EmailCheckRes;
import com.ssafy.honjaya.api.response.LoginRes;
import com.ssafy.honjaya.api.response.ProfileRes;
import com.ssafy.honjaya.api.response.UserNoRes;
import com.ssafy.honjaya.api.response.UserRes;
import com.ssafy.honjaya.api.service.JwtServiceImpl;
import com.ssafy.honjaya.api.service.MailService;
import com.ssafy.honjaya.api.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "유저 API", tags = {"UserController"})
@RestController
@RequestMapping("/users") // 401 에러 코드는
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
//	private static final String SUCCESS = "success";
//	private static final String FAIL = "fail";

	@Autowired
	private JwtServiceImpl jwtService;

	@Autowired
	private UserService userService;
	
	@Autowired
	private MailService mailService;

	@ApiOperation(value = "회원가입", response = CommonRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping("/signup")
	public ResponseEntity<CommonRes> singUp(@RequestBody SignUpReq signUpReq) {
		logger.debug("sign up");
		CommonRes res = new CommonRes();
		if (userService.signUp(signUpReq)) {
			res.setSuccess(true);
			return new ResponseEntity<CommonRes>(res, HttpStatus.OK);
		}
		return new ResponseEntity<CommonRes>(res, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ApiOperation(value = "회원 정보 수정", response = CommonRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@PutMapping
	public ResponseEntity<CommonRes> userUpdate(@RequestBody UserUpdateReq updateUserReq, HttpServletRequest request) {
		logger.debug("user update");
		CommonRes res = new CommonRes();

		String accessToken = request.getHeader("access-token");
		if (!jwtService.checkToken(accessToken)) {
			logger.error("사용 불가능 토큰!!!");
			res.setError("The token is denied");
			return new ResponseEntity<CommonRes>(res, HttpStatus.UNAUTHORIZED);
		}
		int userNo = jwtService.extractUserNo(accessToken);

		if (userService.userUpdate(userNo, updateUserReq)) {
			res.setSuccess(true);
			return new ResponseEntity<CommonRes>(res, HttpStatus.OK);
		}
		return new ResponseEntity<CommonRes>(res, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ApiOperation(value = "회원 탈퇴", response = CommonRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@DeleteMapping
	public ResponseEntity<CommonRes> userDelete(HttpServletRequest request) {
		logger.debug("user delete");
		CommonRes res = new CommonRes();

		String accessToken = request.getHeader("access-token");
		if (!jwtService.checkToken(accessToken)) {
			logger.error("사용 불가능 토큰!!!");
			res.setError("The token is denied");
			return new ResponseEntity<CommonRes>(res, HttpStatus.UNAUTHORIZED);
		}
		int userNo = jwtService.extractUserNo(accessToken);

		if (userService.userDelete(userNo)) {
			res.setSuccess(true);
			return new ResponseEntity<CommonRes>(res, HttpStatus.OK);
		}
		return new ResponseEntity<CommonRes>(res, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ApiOperation(value = "이메일 중복 유무 파악 (setDuplicated: 중복) 먼저 확인 후 (setBanned: 정지 중) 확인", response = BooleanRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/find/email/{email}")
	public ResponseEntity<EmailCheckRes> findUserByEmail(@PathVariable String email) {
		logger.debug("find email");
		EmailCheckRes res = new EmailCheckRes();
		try {
			if (userService.hasUserByEmail(email)) {
				res.setDuplicated(true);
				res.setSuccess(true);
				return new ResponseEntity<EmailCheckRes>(res, HttpStatus.OK);
			}
			
			BanRes banRes = userService.confirmBan(email);
			if (banRes != null) {
				res.setBanned(true);
				res.setBanEndDate(banRes.getBanEndTime());
			}
			res.setSuccess(true);
			return new ResponseEntity<EmailCheckRes>(res, HttpStatus.OK);
			
		} catch (Exception e) {
			return new ResponseEntity<EmailCheckRes>(res, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation(value = "닉네임 중복 유무 파악 (trueOrFalse: 중복)", response = BooleanRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/find/nickname/{nickname}")
	public ResponseEntity<BooleanRes> findUserByNickname(@PathVariable String nickname) {
		logger.debug("find nickname");
		BooleanRes res = new BooleanRes();
		try {
			if (userService.hasUserByNickname(nickname)) {
				res.setTrueOrFalse(true);
			}
			res.setSuccess(true);
			return new ResponseEntity<BooleanRes>(res, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<BooleanRes>(res, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation(value = "로그인", response = LoginRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 400, message = "이메일 또는 비밀번호 틀림"),
		@ApiResponse(code = 403, message = "이용 정지 중인 유저임"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping("/login")
	public ResponseEntity<LoginRes> login(@RequestBody LoginReq loginReq) {

		LoginRes loginRes = new LoginRes();
		HttpStatus status = null;
		logger.info("로그인 요청");

		try {
			// 이용 정지 중인 유저 체크
			BanRes banRes = userService.confirmBan(loginReq.getUserEmail());
			if (banRes != null) {
				loginRes.setBanRes(banRes);
				status = HttpStatus.FORBIDDEN;
				return new ResponseEntity<LoginRes>(loginRes, status);
			}
			
			int loginResult = userService.login(loginReq);
			if (loginResult >= 0) {
				int userNo = loginResult;
				String accessToken = jwtService.createAccessToken("userNo", userNo); // key, data
				String refreshToken = jwtService.createRefreshToken("userNo", userNo);
				userService.saveRefreshToken(userNo, refreshToken);
				logger.debug("access토큰정보 : {}", accessToken);
				logger.debug("refresh 토큰정보 : {}", refreshToken);
				loginRes.setAccessToken(accessToken);
				loginRes.setRefreshToken(refreshToken);
				loginRes.setSuccess(true);
				status = HttpStatus.OK;
			} else if (loginResult == -1) { // 이메일 또는 비밀번호가 비어 있음
				loginRes.setError("Empty Email or Password!!!");
				status = HttpStatus.BAD_REQUEST;
			} else if (loginResult == -2) { // 이메일 또는 비밀번호가 틀림
				loginRes.setError("Wrong Email or Password!!!");
				status = HttpStatus.BAD_REQUEST;
			}
		} catch (Exception e) {
			logger.error("로그인 실패 : {}", e);
			loginRes.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<LoginRes>(loginRes, status);
	}

	@ApiOperation(value = "회원 정보 가져오기", response = UserRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping
	public ResponseEntity<UserRes> getInfo(HttpServletRequest request) {
		UserRes userRes = new UserRes();
		HttpStatus status = HttpStatus.UNAUTHORIZED;

		String accessToken = request.getHeader("access-token");
		if (jwtService.checkToken(accessToken)) {
			int userNo = jwtService.extractUserNo(accessToken);
			try {
				userRes = userService.findUser(userNo);
				userRes.setSuccess(true);
				status = HttpStatus.OK;
			} catch (Exception e) {
				logger.error("정보조회 실패 : {}", e);
				userRes.setError(e.getMessage());
				status = HttpStatus.INTERNAL_SERVER_ERROR;
			}
		} else {
			logger.error("사용 불가능 토큰!!!");
			userRes.setError("The token is denied");
			status = HttpStatus.UNAUTHORIZED;
		}
		return new ResponseEntity<UserRes>(userRes, status);
	}

//	@ApiOperation(value = "전체 회원 목록 가져오기", response = List.class)
//	@GetMapping("/list")
//	public ResponseEntity<List<User>> allUserInfo(){
//		logger.debug("all user info");
//		return new ResponseEntity<List<User>>(userService.allUserInfo(), HttpStatus.OK);
//	}

	@ApiOperation(value = "로그아웃", response = CommonRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@PutMapping("/logout")
	public ResponseEntity<CommonRes> removeToken(HttpServletRequest request) {

		HttpStatus status = HttpStatus.ACCEPTED;
		CommonRes res = new CommonRes();
		
		try {
			String accessToken = request.getHeader("access-token");
			if (accessToken != null && !accessToken.isEmpty()) {
				int userNo = jwtService.extractUserNo(accessToken);
				userService.deleRefreshToken(userNo);
				res.setSuccess(true);
				status = HttpStatus.OK;
			} else {
				logger.error("토큰 값이 없음");
				res.setError("The token is empty");
				res.setSuccess(true);
				status = HttpStatus.OK; // 토큰 값이 없을 경우에도 프론트에서는 자연스럽게 로그아웃으로 가면 된다.
			}
		} catch (Exception e) {
			logger.error("로그아웃 실패 : {}", e);
			res.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<CommonRes>(res, status);

	}

	@ApiOperation(value = "refresh token을 통해 새로운 토큰 얻어오기", response = LoginRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료")
	})
	@GetMapping("/refresh")
	public ResponseEntity<LoginRes> refreshToken(HttpServletRequest request) {
		LoginRes loginRes = new LoginRes();
		HttpStatus status = HttpStatus.ACCEPTED;
		String refreshToken = request.getHeader("refresh-token");
		
		if (refreshToken == null || refreshToken.isEmpty()) {
			logger.error("리프레쉬 토큰 값 없음");
			loginRes.setError("리프레쉬 토큰 값이 없습니다.");	
			
			return new ResponseEntity<LoginRes>(loginRes, HttpStatus.UNAUTHORIZED);
		}
		
		int userNo = jwtService.extractUserNo(refreshToken);
		
		if (userNo == -1) {
			logger.error("리프레쉬 토큰 유효하지 않음");
			loginRes.setError("리프레쉬 토큰이 유효하지 않습니다. 다시 로그인 하세요.");
			return new ResponseEntity<LoginRes>(loginRes, HttpStatus.UNAUTHORIZED);
		}
		
		if (!jwtService.checkToken(refreshToken)) {
			logger.error("리프레쉬 토큰도 만료");
			loginRes.setError("리프레쉬 토큰도 만료됐습니다. 다시 로그인 하세요.");
			
			userService.deleRefreshToken(userNo);
			return new ResponseEntity<LoginRes>(loginRes, HttpStatus.UNAUTHORIZED);
		}

		if (refreshToken.equals(userService.getRefreshToken(userNo))) {
			String accessToken = jwtService.createAccessToken("userNo", userNo);
			loginRes.setAccessToken(accessToken);
			loginRes.setSuccess(true);
			status = HttpStatus.OK;
		} else {
			logger.error("요청한 리프레쉬 토큰과 저장된 리프레쉬 토큰이 일치하지 않습니다.");
			loginRes.setError("요청한 리프레쉬 토큰과 저장된 리프레쉬 토큰이 일치하지 않습니다.");

			status = HttpStatus.UNAUTHORIZED;
		}

		return new ResponseEntity<LoginRes>(loginRes, status);
	}
	
	@ApiOperation(value = "이메일 인증 코드 전송", response = CommonRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping("/email")
	public ResponseEntity<CommonRes> confirmEmail(@RequestBody EmailReq emailReq) {
		CommonRes res = new CommonRes();
		HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
		try {
			mailService.sendMail(emailReq);
			res.setSuccess(true);
			status = HttpStatus.OK;
		} catch (Exception e) {
			logger.error("이메일 인증 코드 전송 에러");
			res.setError(e.getMessage());
		}
		return new ResponseEntity<CommonRes>(res, status);
	}
	
	@ApiOperation(value = "회원 번호 (userNo) 가져오기", response = UserNoRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/userno")
	public ResponseEntity<UserNoRes> getUserNo(HttpServletRequest request) {
		UserNoRes userNoRes = new UserNoRes();
		HttpStatus status = HttpStatus.UNAUTHORIZED;
		
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				userNoRes.setUserNo(jwtService.extractUserNo(accessToken));
				userNoRes.setSuccess(true);
				status = HttpStatus.OK;
			} else {
				logger.error("사용 불가능 토큰!!!");
				userNoRes.setError("The token is denied");
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			userNoRes.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<UserNoRes>(userNoRes, status);
	}
	
	@ApiOperation(value = "프로필 캐릭터 url 불러오기", response = ProfileRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/profile")
	public ResponseEntity<ProfileRes> getProfileImg(HttpServletRequest request) {
		ProfileRes profileRes = new ProfileRes();
		HttpStatus status;

		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				int userNo = jwtService.extractUserNo(accessToken);
				profileRes = userService.getProfileImg(userNo);
				profileRes.setSuccess(true);
				status = HttpStatus.OK;
			} else {
				logger.error("사용 불가능 토큰!!!");
				profileRes.setError("The token is denied");
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			profileRes.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<ProfileRes>(profileRes, status);
	}
	
	@ApiOperation(value = "프로필 캐릭터 수정", response = ProfileRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@PutMapping("/profile/{imgNo}")
	public ResponseEntity<ProfileRes> updateProfileImg(@PathVariable int imgNo, HttpServletRequest request) {
		ProfileRes profileRes = new ProfileRes();
		HttpStatus status;

		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				int userNo = jwtService.extractUserNo(accessToken);
				profileRes = userService.updateProfileImg(userNo, imgNo);
				profileRes.setSuccess(true);
				status = HttpStatus.OK;
			} else {
				logger.error("사용 불가능 토큰!!!");
				profileRes.setError("The token is denied");
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			profileRes.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<ProfileRes>(profileRes, status);
	}
}
