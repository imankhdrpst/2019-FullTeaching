import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../../classes/course';
import {CourseService} from '../../services/course.service';
import {AuthenticationService} from '../../services/authentication.service';
import {AnnouncerService} from '../../services/announcer.service';
import {FileGroup} from '../../classes/file-group';
import {User} from '../../classes/user';

@Component({
  selector: 'app-course-details-v2',
  templateUrl: './course-details-v2.component.html',
  styleUrls: ['./course-details-v2.component.css']
})
export class CourseDetailsV2Component implements OnInit {

  public course: Course;
  public isEditing = false;
  public user: User;

  constructor(private builder: FormBuilder,
              private route: ActivatedRoute,
              private courseService: CourseService,
              public authService: AuthenticationService,
              private announcerService: AnnouncerService) {
  }

  ngOnInit() {
    this.authService.reqIsLogged()
      .then(() => {

        this.user = this.authService.getCurrentUser();

        let courseId = this.route.snapshot.paramMap.get('id');
        this.courseService.getCourse(Number(courseId)).subscribe(data => {
          this.course = data;
        });

        this.announcerService.fileGroupDeletedAnnouncer$.subscribe(fileGroupId => {
          if (this.recursiveFileGroupDeletion(this.course.courseDetails.files, fileGroupId)) {
            if (this.course.courseDetails.files.length == 0) {
              this.isEditing = false;
            } //If there are no fileGroups, mode edit is closed
          }
        });


        this.announcerService.fileInFileGroupUpdatedAnnouncer.subscribe(objs => {
          let fg = objs[0];
          let file = objs[1];
          if (fg) {
            console.log(`File group updated ${fg.id}`)
          }
        });


        this.announcerService.fileGroupAddedAnnouncer.subscribe(newFg => {
          this.recursiveFileGroupAdd(this.course.courseDetails.files, newFg)
        });


        this.announcerService.fileUploadedAnnouncer.subscribe(data => {

          let fg = data.fg;
          let course = data.course;

          if (this.course.id === course.id) {
            for (let parent of this.course.courseDetails.files) {
              let updated = this.updateFilesInFileGroup(parent, fg);
              if (updated) {
                break;
              }
            }
          }
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  updateFilesInFileGroup(parent: FileGroup, fileGroup: FileGroup) {
    if (parent.id === fileGroup.id) {
      parent.files = fileGroup.files;
      return true;
    } else {
      for (let child of parent.fileGroups) {
        let updated = this.updateFilesInFileGroup(child, fileGroup);
        if (updated) {
          console.log(child, fileGroup)
          return updated;
        }
      }
    }
  }


  //Deletes a fileGroup from this.course.courseDetails.files recursively, given a fileGroup id
  recursiveFileGroupDeletion(fileGroupLevel: FileGroup[], fileGroupDeletedId: number): boolean {
    if (fileGroupLevel) {
      for (let i = 0; i < fileGroupLevel.length; i++) {
        if (fileGroupLevel[i].id == fileGroupDeletedId) {
          fileGroupLevel.splice(i, 1);
          return true;
        }
        let deleted = this.recursiveFileGroupDeletion(fileGroupLevel[i].fileGroups, fileGroupDeletedId);
        if (deleted) {
          return deleted;
        }
      }
    }
  }


  //Deletes a fileGroup from this.course.courseDetails.files recursively, given a fileGroup id
  recursiveFileGroupAdd(fileGroupLevel: FileGroup[], newFileGroup: FileGroup): boolean {
    if (fileGroupLevel) {
      for (let i = 0; i < fileGroupLevel.length; i++) {
        if (fileGroupLevel[i].id == newFileGroup.fileGroupParent.id) {
          console.log(fileGroupLevel[i])
          fileGroupLevel[i].fileGroups.push(newFileGroup);
          return true;
        }
        let added = this.recursiveFileGroupAdd(fileGroupLevel[i].fileGroups, newFileGroup);
        if (added) {
          return added;
        }
      }
    }
  }

  toggleEditionMode() {
    this.isEditing = !this.isEditing;
  }
}
