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
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
@Table(
name="report",
uniqueConstraints = {
		@UniqueConstraint(name="UK_REPORT_FROM_TO", columnNames={"report_from", "report_to"})
}
)
public class Report {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) // AutoIncrement
	@Column(name="report_no", nullable=false, updatable=false) // columnDefinition="char",
	private int reportNo;
	
	@ManyToOne
	@JoinColumn(name="report_from", nullable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@NotNull
	private User reportFrom;
	
	@ManyToOne
	@JoinColumn(name="report_to", nullable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@NotNull
	private User reportTo;
	
	@Column(name="report_type", nullable=false, columnDefinition="char(3)")
	@NotNull
	private String reportType;
	
	@Column(name="report_message", length=255)
	private String reportMessage;
	
	@Column(name="report_time", updatable=false, columnDefinition = "datetime")
	private LocalDateTime reportTime;
	
	@PrePersist
	public void createdAt() {
		this.reportTime = LocalDateTime.now();
	}
	
}
