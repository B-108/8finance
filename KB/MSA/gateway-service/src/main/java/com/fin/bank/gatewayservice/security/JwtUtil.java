package com.fin.bank.gatewayservice.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class JwtUtil {
    private final Key key;

    public JwtUtil(@Value("${jwt.secret}") String secretKey) {
        byte[] secretByteKey = DatatypeConverter.parseBase64Binary(secretKey);
        this.key = Keys.hmacShaKeyFor(secretByteKey);
    }

    public boolean isJwtValid(String jwt) {
        try {
            Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(jwt);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT Token", e);
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT Token", e);
        } catch (UnsupportedJwtException e) {
            log.info("Unsurported JWT Token", e);
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty", e);
        }
        return false;
    }

    public Map<String, String> parseClaims(String token) {
        Claims parse = Jwts.parser().setSigningKey(key)
                .parseClaimsJws(token)
                .getBody();

        Map<String, String> result = new HashMap<>();

        result.put("userPk", parse.get("userPk").toString());
//        result.put("accountNo", parse.get("accountNo").toString());
//        result.put("scope", parse.get("scope").toString());

        return result;
    }
}
