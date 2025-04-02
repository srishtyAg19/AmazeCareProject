package com.hexaware.AmazeCare.customException;

import java.time.LocalDateTime;

public class ErrorDetails {
	private LocalDateTime timestamp;
	private String errormessage;
	private String apipath;
	private String errorcode;
	
	public ErrorDetails() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ErrorDetails(LocalDateTime timestamp, String errormessage, String apipath, String errorcode) {
		super();
		this.timestamp = timestamp;
		this.errormessage = errormessage;
		this.apipath = apipath;
		this.errorcode = errorcode;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public String getErrormessage() {
		return errormessage;
	}

	public void setErrormessage(String errormessage) {
		this.errormessage = errormessage;
	}

	public String getApipath() {
		return apipath;
	}

	public void setApipath(String apipath) {
		this.apipath = apipath;
	}

	public String getErrorcode() {
		return errorcode;
	}

	public void setErrorcode(String errorcode) {
		this.errorcode = errorcode;
	}

	@Override
	public String toString() {
		return "ErrorDetails [timestamp=" + timestamp + ", errormessage=" + errormessage + ", apipath=" + apipath
				+ ", errorcode=" + errorcode + "]";
	}

	

	
	
	
}
