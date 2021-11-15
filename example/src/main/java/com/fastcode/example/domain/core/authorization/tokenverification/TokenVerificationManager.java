package com.fastcode.example.domain.core.authorization.tokenverification;

import java.time.*;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TokenVerificationManager implements ITokenVerificationManager {

    @NonNull
    private final ITokenverificationRepository _tokenRepository;

    public Tokenverification findByTokenAndType(String token, String tokenType) {
        return _tokenRepository.findByTokenAndTokenType(token, tokenType);
    }

    public Tokenverification save(Tokenverification entity) {
        return _tokenRepository.save(entity);
    }

    public Tokenverification findByUsersIdAndType(Long id, String tokenType) {
        return _tokenRepository.findByUsersIdAndTokenType(id, tokenType);
    }

    public void delete(Tokenverification entity) {
        _tokenRepository.delete(entity);
    }
}
