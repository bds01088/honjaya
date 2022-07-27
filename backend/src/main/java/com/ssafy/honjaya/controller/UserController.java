package com.ssafy.honjaya.controller;

import java.util.HashMap;
import java.util.List;
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

import com.ssafy.honjaya.model.UserDto;
import com.ssafy.honjaya.model.entity.User;
import com.ssafy.honjaya.model.service.JwtServiceImpl;
import com.ssafy.honjaya.model.service.UserService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/user")
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	private JwtServiceImpl jwtService;

	@Autowired
	private UserService userService;

	@ApiOperation(value = "회원가입", response = String.class)
	@PostMapping("/signup")
	public ResponseEntity<String> doSingUp(@RequestBody User user) {
		logger.debug("sign up");
		if (userService.doSignUp(user)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}

	@ApiOperation(value = "회원 정보 수정", response = String.class)
	@PutMapping("{id}")
	public ResponseEntity<String> userUpdate(@RequestBody UserDto userDto) {
		logger.debug("user update");
		if (userService.userUpdate(userDto)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}

	@ApiOperation(value = "회원 탈퇴", response = String.class)
	@DeleteMapping("{id}")
	public ResponseEntity<String> userDelete(@PathVariable int id) {
		logger.debug("user delete");
		if (userService.userDelete(id)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}

	@ApiOperation(value = "회원 유무 파악", response = Boolean.class)
	@GetMapping("/find/id/{id}")
	public ResponseEntity<Boolean> findUser(@PathVariable int id){
		logger.debug("find user");
		if(userService.findUser(id)) {
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		}
		return new ResponseEntity<Boolean>(false, HttpStatus.OK);
	}
	
	@ApiOperation(value = "이메일 중복 유무 파악", response = Boolean.class)
	@GetMapping("/find/email/{email}")
	public ResponseEntity<Boolean> findUserByEmail(@PathVariable String email){
		logger.debug("find email");
		if(userService.findUserByEmail(email)) {
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		}
		return new ResponseEntity<Boolean>(false, HttpStatus.OK);
	}
	
	@ApiOperation(value = "이메일 중복 유무 파악", response = Boolean.class)
	@GetMapping("/find/nickname/{nickname}")
	public ResponseEntity<Boolean> findUserByNickname(@PathVariable String nickname){
		logger.debug("find nickname");
		if(userService.findUserByNickname(nickname)) {
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		}
		return new ResponseEntity<Boolean>(false, HttpStatus.OK);
	}

	@ApiOperation(value = "로그인", response = Map.class)
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> doLogin(@RequestBody UserDto userDto) {
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		logger.info("로그인 요청");
		
		try {
			UserDto loginUser = userService.doLogin(userDto);
			if (loginUser != null) {
				String accessToken = jwtService.createAccessToken("id", loginUser.getUserNo()); // key, data
				String refreshToken = jwtService.createRefreshToken("id", loginUser.getUserNo());
				userService.saveRefreshToken(loginUser.getUserNo(), refreshToken);
				logger.debug("access토큰정보 : {}", accessToken);
				logger.debug("refresh 토큰정보 : {}", refreshToken);
				resultMap.put("access-token", accessToken);
				resultMap.put("refresh-token", refreshToken);
				resultMap.put("id", loginUser.getUserNo());
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} else {
				resultMap.put("message", FAIL);
				status = HttpStatus.ACCEPTED;
			}
		} catch (Exception e) {
			logger.error("로그인 실패 : {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	@ApiOperation(value = "회원 정보 가져오기", response = Map.class)
	@GetMapping("/{id}")
	public ResponseEntity<Map<String, Object>> getInfo(@PathVariable int id,
			HttpServletRequest request) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.UNAUTHORIZED;
	
		if (jwtService.checkToken(request.getHeader("access-token"))) {
			logger.info("사용 가능한 토큰!!!");
			try {
				UserDto userDto = userService.userInfo(id);
				resultMap.put("userInfo", userDto);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} catch (Exception e) {
				logger.error("정보조회 실패 : {}", e);
				resultMap.put("message", e.getMessage());
				status = HttpStatus.INTERNAL_SERVER_ERROR;
			}
		} else {
			logger.error("사용 불가능 토큰!!!");
			resultMap.put("message", FAIL);
			status = HttpStatus.UNAUTHORIZED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	@ApiOperation(value = "전체 회원 목록 가져오기", response = List.class)
	@GetMapping("/list")
	public ResponseEntity<List<UserDto>> allUserInfo(){
		logger.debug("all user info");
		return new ResponseEntity<List<UserDto>>(userService.allUserInfo(), HttpStatus.OK);
	}
	
	@ApiOperation(value = "로그아웃", response = Map.class)
	@PutMapping("logout/{id}")
	public ResponseEntity<?> removeToken(@PathVariable int id){
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		
		try {
			userService.deleRefreshToken(id);
			resultMap.put("message", SUCCESS);
			status = HttpStatus.ACCEPTED;
		} catch (Exception e) {
			logger.error("로그아웃 실패 : {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
				
	}
	
	@ApiOperation(value = "refresh token을 통해 새로운 토큰 얻어오기", response = Map.class)
	@PostMapping("/refresh.do/{id}")
	public ResponseEntity<?> refreshToken(@PathVariable int id, HttpServletRequest request){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = HttpStatus.ACCEPTED;
		String token = request.getHeader("refresh-token");
		jwtService.checkToken(token);
		
		if(token.equals(userService.getRefreshToken(id))) {
			String accessToken = jwtService.createAccessToken("id", id);
			resultMap.put("access-token", accessToken);
			resultMap.put("message", SUCCESS);
			status = HttpStatus.ACCEPTED;
		}else {
			status = HttpStatus.UNAUTHORIZED;
		}
		
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
}
