package com.fullteaching.backend.entry;

import com.fullteaching.backend.comment.Comment;
import com.fullteaching.backend.comment.CommentService;
import com.fullteaching.backend.coursedetails.CourseDetails;
import com.fullteaching.backend.coursedetails.CourseDetailsService;
import com.fullteaching.backend.forum.Forum;
import com.fullteaching.backend.forum.ForumService;
import com.fullteaching.backend.security.AuthorizationService;
import com.fullteaching.backend.user.User;
import com.fullteaching.backend.user.UserComponent;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api-entries")
@Slf4j
public class EntryController {




    private final ForumService forumService;
    private final EntryService entryService;
    private final CommentService commentService;
    private final CourseDetailsService courseDetailsService;
    private final UserComponent user;
    private final AuthorizationService authorizationService;

    public EntryController(ForumService forumService, EntryService entryService, CommentService commentService, CourseDetailsService courseDetailsService, UserComponent user, AuthorizationService authorizationService) {
        this.forumService = forumService;
        this.entryService = entryService;
        this.commentService = commentService;
        this.courseDetailsService = courseDetailsService;
        this.user = user;
        this.authorizationService = authorizationService;
    }

    @RequestMapping(value = "/forum/{id}", method = RequestMethod.POST)
    public ResponseEntity<Object> newEntry(@RequestBody Entry entry, @PathVariable(value = "id") String courseDetailsId) {

        log.info("CRUD operation: Adding new entry");

        ResponseEntity<Object> authorized = authorizationService.checkBackendLogged();
        if (authorized != null) {
            return authorized;
        }
        ;

        long id_i = -1;
        try {
            id_i = Long.parseLong(courseDetailsId);
        } catch (NumberFormatException e) {
            log.error("CourseDetails ID '{}' is not of type Long", courseDetailsId);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        CourseDetails cd = courseDetailsService.getFromId(id_i);

        ResponseEntity<Object> userAuthorized = authorizationService.checkAuthorizationUsers(cd, cd.getCourse().getAttenders());
        if (userAuthorized != null) { // If the user is not an attender of the course
            return userAuthorized;
        } else {

            Forum forum = cd.getForum();

            //Setting the author of the entry
            User userLogged = user.getLoggedUser();
            entry.setUser(userLogged);

            //Setting the author and date of its first comment
            Comment comment = entry.getComments().get(0);
            comment.setUser(userLogged);
            comment.setDate(System.currentTimeMillis());

            //Setting the date of the entry
            entry.setDate(System.currentTimeMillis());

            comment = commentService.save(comment);
            entry = entryService.save(entry);

            forum.getEntries().add(entry);
            forumService.save(forum);

            log.info("New entry succesfully added: {}", entry.toString());
			
			/*Entire forum is returned in order to have the new entry ID available just
			in case the author wants to add to it a new comment without refreshing the page*/
            return new ResponseEntity<>(new NewEntryCommentResponse(entry, comment), HttpStatus.CREATED);
        }
    }

}
