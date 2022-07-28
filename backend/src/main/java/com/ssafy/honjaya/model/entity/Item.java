package com.ssafy.honjaya.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.sun.istack.NotNull;

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
@Table(name="item")
public class Item {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) // AutoIncrement
	@Column(name="item_no", nullable=false, updatable=false) // columnDefinition="char",
	private int itemNo;
	
	@Column(name="item_name", length=20, nullable=false)
	@NotNull
	private String itemName;
	
	@Column(name="item_category", columnDefinition="char(3)")
	private String itemCategory;
	
	@Column(name="item_price")
	private int itemPrice;
	
	@Column(name="item_comment", length=255)
	private String itemComment;
	
}
