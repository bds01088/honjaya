package com.ssafy.honjaya.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
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
@Table(name="notice")
public class Notice {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) // AutoIncrement
	@Column(name="notice_no", nullable=false, updatable=false)
	private int noticeNo;
	
	@ManyToOne
	@JoinColumn(name="admin_no", nullable=true)
	private User user;
	
	@Column(name="notice_title", length=100)
	private String noticeTitle;
	
	@Column(name="notice_content", length=10000)
	private String noticeContent;
	
	@Column(name="notice_time", updatable=false, columnDefinition = "datetime")
	private LocalDateTime noticeTime;
	
	@Column(name="notice_read_count")
	private int noticeReadCount;
	
	@PrePersist
	public void createdAt() {
		this.noticeTime = LocalDateTime.now();
	}
}
