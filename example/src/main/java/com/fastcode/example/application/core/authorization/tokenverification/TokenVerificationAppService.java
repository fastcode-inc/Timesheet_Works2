package com.fastcode.example.application.core.authorization.tokenverification;

import com.fastcode.example.domain.core.authorization.tokenverification.ITokenverificationRepository;
import com.fastcode.example.domain.core.authorization.tokenverification.Tokenverification;
import com.fastcode.example.domain.core.authorization.users.IUsersRepository;
import com.fastcode.example.domain.core.authorization.users.Users;
import java.util.Date;
import java.util.UUID;
import javax.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TokenVerificationAppService implements ITokenVerificationAppService {

    @NonNull
    private final ITokenverificationRepository _tokenRepository;

    @Qualifier("usersRepository")
    @NonNull
    private final IUsersRepository _usersRepository;

    public static final long PASSWORD_TOKEN_EXPIRATION_TIME = 3_600_000; // 1 hour
    public static final long ACCOUNT_VERIFICATION_TOKEN_EXPIRATION_TIME = 86_400_000;

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public Tokenverification findByTokenAndType(String token, String type) {
        Tokenverification foundToken = _tokenRepository.findByTokenAndTokenType(token, type);

        return foundToken;
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public Tokenverification findByUsersIdAndType(Long usersId, String type) {
        Tokenverification foundToken = _tokenRepository.findByUsersIdAndTokenType(usersId, type);

        return foundToken;
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public Tokenverification generateToken(String type, Long usersId) {
        Users users = _usersRepository
            .findById(usersId)
            .orElseThrow(() -> new EntityNotFoundException("Users not found"));
        Tokenverification entity = _tokenRepository.findByUsersIdAndTokenType(usersId, type);
        if (entity == null) {
            entity = new Tokenverification();
        }
        entity.setTokenType(type);
        entity.setToken(UUID.randomUUID().toString());
        if (type.equalsIgnoreCase("password")) {
            entity.setExpirationTime(new Date(System.currentTimeMillis() + PASSWORD_TOKEN_EXPIRATION_TIME));
        } else if (type.equalsIgnoreCase("registration")) {
            entity.setExpirationTime(new Date(System.currentTimeMillis() + ACCOUNT_VERIFICATION_TOKEN_EXPIRATION_TIME));
        }
        entity.setUsersId(users.getId());
        entity.setUsers(users);

        return _tokenRepository.save(entity);
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public void deleteToken(Tokenverification entity) {
        _tokenRepository.delete(entity);
    }
}
