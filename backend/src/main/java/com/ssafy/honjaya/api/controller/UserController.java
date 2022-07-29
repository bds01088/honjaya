package com.ssafy.honjaya.api.controller;

import java.util.Map;

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

import com.ssafy.honjaya.api.request.LoginReq;
import com.ssafy.honjaya.api.request.SignUpReq;
import com.ssafy.honjaya.api.request.UserUpdateReq;
import com.ssafy.honjaya.api.response.CommonRes;
import com.ssafy.honjaya.api.response.LoginRes;
import com.ssafy.honjaya.api.response.UserRes;
import com.ssafy.honjaya.api.service.JwtServiceImpl;
import com.ssafy.honjaya.api.service.UserService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/user") // 401 에러 코드는 
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
//	private static final String SUCCESS = "success";
//	private static final String FAIL = "fail";
	
	@Autowired
	private JwtServiceImpl jwtService;

	@Autowired
	private UserService userService;

	@ApiOperation(value = "회원가입", response = String.class)
//	@ApiResponses({
//  @ApiResponse(code = 200, message = "로그인 성공(헤더에도 토근 있음)", response = TokenRes.class),
//  @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
//  @ApiResponse(code = 500, message = "서버 오류", response = ErrorResponse.class)
//})
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

	@ApiOperation(value = "회원 정보 수정", response = String.class)
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

	@ApiOperation(value = "회원 탈퇴", response = String.class)
	@DeleteMapping()
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
	
	@ApiOperation(value = "이메일 중복 유무 파악", response = Boolean.class)
	@GetMapping("/find/email/{email}")
	public ResponseEntity<CommonRes> findUserByEmail(@PathVariable String email){
		logger.debug("find email");
		CommonRes res = new CommonRes();
		if(userService.hasUserByEmail(email)) {
			res.setSuccess(true);
			return new ResponseEntity<CommonRes>(res, HttpStatus.OK);
		}
		return new ResponseEntity<CommonRes>(res, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ApiOperation(value = "이메일 중복 유무 파악", response = Boolean.class)
	@GetMapping("/find/nickname/{nickname}")
	public ResponseEntity<CommonRes> findUserByNickname(@PathVariable String nickname){
		logger.debug("find nickname");
		CommonRes res = new CommonRes();
		if(userService.hasUserByNickname(nickname)) {
			res.setSuccess(true);
			return new ResponseEntity<CommonRes>(res, HttpStatus.OK);
		}
		return new ResponseEntity<CommonRes>(res, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ApiOperation(value = "로그인", response = LoginRes.class)
//	@ApiResponses({
//        @ApiResponse(code = 200, message = "로그인 성공(헤더에도 토근 있음)", response = TokenRes.class),
//        @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
//		  @ApiResponse(code = 404, message = "이메일 또는 패스워드 틀림", response = ErrorResponse.class),
//        @ApiResponse(code = 500, message = "서버 오류", response = ErrorResponse.class)
//	})
	@PostMapping("/login")
	public ResponseEntity<LoginRes> login(@RequestBody LoginReq loginReq) {
		
		LoginRes loginRes = new LoginRes();
		HttpStatus status = null;
		logger.info("로그인 요청");
		
		try {
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
			} else if (loginResult == -1) { // 이메일이나 패스워드가 비어 있음
				status = HttpStatus.BAD_REQUEST;
			} else if (loginResult == -2) { // 비밀번호가 틀림
				status = HttpStatus.NOT_FOUND;
			}
		} catch (Exception e) {
			logger.error("로그인 실패 : {}", e);
			loginRes.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<LoginRes>(loginRes, status);
	}
	
	@ApiOperation(value = "회원 정보 가져오기", response = Map.class)
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
				status = HttpStatus.ACCEPTED;
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
	
	@ApiOperation(value = "로그아웃", response = Map.class)
	@PutMapping("logout")
	public ResponseEntity<CommonRes> removeToken(HttpServletRequest request) {
		
		HttpStatus status = HttpStatus.ACCEPTED;
		CommonRes res = new CommonRes();
		
		String accessToken = request.getHeader("access-token");
		int userNo = jwtService.extractUserNo(accessToken);
		
		try {
			userService.deleRefreshToken(userNo);
			res.setSuccess(true);
			status = HttpStatus.ACCEPTED;
		} catch (Exception e) {
			logger.error("로그아웃 실패 : {}", e);
			res.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<CommonRes>(res, status);
				
	}
	
	@ApiOperation(value = "refresh token을 통해 새로운 토큰 얻어오기", response = Map.class)
	@GetMapping("/refresh")
	public ResponseEntity<LoginRes> refreshToken(HttpServletRequest request){
		LoginRes loginRes = new LoginRes();
		HttpStatus status = HttpStatus.ACCEPTED;
		String refreshToken = request.getHeader("refresh-token");
		int userNo = jwtService.extractUserNo(refreshToken);
		
		if (!jwtService.checkToken(refreshToken)) {
			logger.error("리프레쉬 토큰도 만료됐습니다. 다시 로그인 하세요.");
			loginRes.setError("리프레쉬 토큰도 만료됐습니다. 다시 로그인 하세요.");
			
			userService.deleRefreshToken(userNo);
			return new ResponseEntity<LoginRes>(loginRes, HttpStatus.UNAUTHORIZED);
		}
		
		if (refreshToken.equals(userService.getRefreshToken(userNo))) {
			String accessToken = jwtService.createAccessToken("userNo", userNo);
			loginRes.setAccessToken(accessToken);
			loginRes.setSuccess(true);
			status = HttpStatus.ACCEPTED;
		} else {
			logger.error("요청한 리프레쉬 토큰과 저장된 리프레쉬 토큰이 일치하지 않습니다.");
			loginRes.setError("요청한 리프레쉬 토큰과 저장된 리프레쉬 토큰이 일치하지 않습니다.");
			
			status = HttpStatus.UNAUTHORIZED;
		}
		
		return new ResponseEntity<LoginRes>(loginRes, status);
	}
}
