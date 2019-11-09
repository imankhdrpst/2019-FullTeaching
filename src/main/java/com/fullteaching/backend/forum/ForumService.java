package com.fullteaching.backend.forum;

import com.fullteaching.backend.struct.FTService;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Getter
@Service
@Slf4j
public class ForumService implements FTService<Forum, Long> {


    private final ForumRepository repo;


    @Autowired
    public ForumService(ForumRepository repo) {
        this.repo = repo;
    }
}
