package com.fullteaching.backend.session;

import com.fullteaching.backend.struct.FTService;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@Getter
public class SessionService implements FTService<Session, Long> {

    private final SessionRepository repo;


    @Autowired
    public SessionService(SessionRepository repo) {
        this.repo = repo;
    }
}
