package com.ssafy.honjaya.api.request;

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
@ApiModel(value = "BlockReq", description = "차단 Req")
public class BlockReq {
	@ApiModelProperty(value = "차단 한 사람")
	private int blockFrom;
	
	@ApiModelProperty(value = "차단 당한 사람")
	private int blockTo;
	
}
