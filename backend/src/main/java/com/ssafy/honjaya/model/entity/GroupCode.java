package com.ssafy.honjaya.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

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
@Entity
@Table(name="group_code")
public class GroupCode {
	@Id
	@Column(name="group_code", nullable=false, columnDefinition="char(3)")
	private String groupCode;
	
	@Column(name="group_code_name", length=50)
	private String itemName;
	
}
