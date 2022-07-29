package com.ssafy.honjaya.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;

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
@IdClass(CodeId.class)
@Table(name="code")
public class Code {
	@Id
	@ManyToOne
	@JoinColumn(name="group_code", nullable=false, columnDefinition="char(3)")
	private GroupCode groupCode;
	
	@Id
	@Column(name="code", nullable=false, columnDefinition="char(3)")
	private String code;
	
	@Column(name="code_name", length=50)
	private String codeName;
	
	@Column(name="code_use_yn", columnDefinition="char(1) CHECK (code_use_yn in ('y', 'n'))")
	@ColumnDefault("'y'")
	private String codeUseYn;
	
}
