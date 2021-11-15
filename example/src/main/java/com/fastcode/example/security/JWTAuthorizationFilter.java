package com.fastcode.example.security;

import com.fastcode.example.commons.error.ApiError;
import com.fastcode.example.commons.error.ExceptionMessageConstants;
import com.fastcode.example.commons.logging.LoggingHelper;
import com.fastcode.example.domain.core.authorization.jwtentity.IJwtRepository;
import com.fastcode.example.domain.core.authorization.jwtentity.JwtEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.*;
import java.io.IOException;
import java.io.OutputStream;
import java.util.*;
import java.util.stream.Collectors;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    private SecurityUtils securityUtils;
    private IJwtRepository jwtRepo;

    public JWTAuthorizationFilter(AuthenticationManager authManager, ApplicationContext ctx) {
        super(authManager);
        this.securityUtils = ctx.getBean(SecurityUtils.class);
        this.jwtRepo = ctx.getBean(IJwtRepository.class);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
        throws IOException, ServletException {
        String authenticationToken = securityUtils.getTokenFromCookies(req.getCookies());
        String authorizationToken = req.getHeader(SecurityConstants.HEADER_STRING);

        if (
            authorizationToken == null ||
            authenticationToken == null ||
            !authorizationToken.startsWith(SecurityConstants.TOKEN_PREFIX) ||
            !authenticationToken.startsWith(SecurityConstants.TOKEN_PREFIX)
        ) {
            chain.doFilter(req, res);
            return;
        }

        UsernamePasswordAuthenticationToken authentication = null;
        ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED);
        LoggingHelper logHelper = new LoggingHelper();
        try {
            authentication = getAuthentication(req);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            chain.doFilter(req, res);
            return;
        } catch (ExpiredJwtException exception) {
            apiError.setMessage(ExceptionMessageConstants.TOKEN_EXPIRED);
            logHelper.getLogger().error("An Exception Occurred:", exception);
            res.setStatus(401);
        } catch (UnsupportedJwtException exception) {
            apiError.setMessage(ExceptionMessageConstants.TOKEN_UNSUPPORTED);
            logHelper.getLogger().error("An Exception Occurred:", exception);
            res.setStatus(401);
        } catch (MalformedJwtException exception) {
            apiError.setMessage(ExceptionMessageConstants.TOKEN_MALFORMED);
            logHelper.getLogger().error("An Exception Occurred:", exception);
            res.setStatus(401);
        } catch (SignatureException exception) {
            apiError.setMessage(ExceptionMessageConstants.TOKEN_INCORRECT_SIGNATURE);
            logHelper.getLogger().error("An Exception Occurred:", exception);
            res.setStatus(401);
        } catch (IllegalArgumentException exception) {
            apiError.setMessage(ExceptionMessageConstants.TOKEN_ILLEGAL_ARGUMENT);
            logHelper.getLogger().error("An Exception Occurred:", exception);
            res.setStatus(401);
        } catch (JwtException exception) {
            apiError.setMessage(ExceptionMessageConstants.TOKEN_UNAUTHORIZED);
            logHelper.getLogger().error("An Exception Occurred:", exception);
            res.setStatus(401);
        }

        OutputStream out = res.getOutputStream();
        com.fasterxml.jackson.databind.ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(out, apiError);
        out.flush();
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) throws JwtException {
        String authorizationToken = request.getHeader(SecurityConstants.HEADER_STRING);
        String authenticationToken = securityUtils.getTokenFromCookies(request.getCookies());
        // Check that the token is inactive in the JwtEntity table

        // Check that the token is inactive in the JwtEntity table
        JwtEntity jwt = jwtRepo.findByAuthorizationTokenAndAuthenticationToken(authorizationToken, authenticationToken);

        if (jwt == null) {
            throw new JwtException("Token Does Not Exist");
        }
        Claims claims;
        if (
            StringUtils.isNotEmpty(authenticationToken) &&
            authenticationToken.startsWith(SecurityConstants.TOKEN_PREFIX)
        ) {
            claims =
                Jwts
                    .parser()
                    .setSigningKey(SecurityConstants.SECRET.getBytes())
                    .parseClaimsJws(authenticationToken.replace(SecurityConstants.TOKEN_PREFIX, ""))
                    .getBody();
        }

        if (
            StringUtils.isNotEmpty(authorizationToken) && authorizationToken.startsWith(SecurityConstants.TOKEN_PREFIX)
        ) {
            String userName = null;
            List<GrantedAuthority> authorities = null;
            claims =
                Jwts
                    .parser()
                    .setSigningKey(SecurityConstants.SECRET.getBytes())
                    .parseClaimsJws(authorizationToken.replace(SecurityConstants.TOKEN_PREFIX, ""))
                    .getBody();
            userName = claims.getSubject();
            List<String> scopes = claims.get("scopes", List.class);
            authorities =
                scopes.stream().map(authority -> new SimpleGrantedAuthority(authority)).collect(Collectors.toList());

            if (StringUtils.isNotEmpty(userName)) {
                return new UsernamePasswordAuthenticationToken(userName, null, authorities);
            }
        }
        return null;
    }
}
