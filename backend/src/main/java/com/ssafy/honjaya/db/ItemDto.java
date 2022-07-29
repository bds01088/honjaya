package com.ssafy.honjaya.db;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel(value = "Item", description = "아이템")
@Data
public class ItemDto {
	@ApiModelProperty(value = "아이템 번호, PK")
	private int itemNo;
	@ApiModelProperty(value = "이름")
	private String itemName;
	@ApiModelProperty(value = "아이템 분류 코드")
	private String itemCategory;
	@ApiModelProperty(value = "가격")
	private int itemPrice;
	@ApiModelProperty(value = "아이템 설명")
	private String itemComment;
	
}
