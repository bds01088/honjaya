package com.ssafy.honjaya.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class CommonUtil {
	public static java.sql.Date stringToDate(String date) {
		return java.sql.Date.valueOf(date);
	}
	
	public static String sha256(String text) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(text.getBytes());

        StringBuilder builder = new StringBuilder();
        byte[] bytes = md.digest();
        for (byte b : bytes) {
            builder.append(String.format("%02x", b));
        }
        
        return builder.toString();
    }
}
