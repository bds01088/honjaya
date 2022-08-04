package com.ssafy.honjaya.db;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel(value = "BlockDto", description = "회원 정보")
@Data
public class BlockDto {
	@ApiModelProperty(value = "차단목록 번호, PK")
	private int blockNo;
	@ApiModelProperty(value = "차단 한 사람")
	private String blockFrom;
	@ApiModelProperty(value = "차단 당한 사람")
	private String blockTo;
}
