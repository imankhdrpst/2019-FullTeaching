import {routing} from './app.routing';

import {InterventionAskedPipe} from './pipes/intervention-asked.pipe';

import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {LoginModalComponent} from './components/login-modal/login-modal.component';
import {PresentationComponent} from './components/presentation/presentation.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CourseDetailsComponent} from './components/course-details/course-details.component'
import {SettingsComponent} from './components/settings/settings.component';
import {ErrorMessageComponent} from './components/error-message/error-message.component';
import {CommentComponent} from './components/comment/comment.component';
import {FileGroupComponent} from './components/file-group/file-group.component';
import {VideoSessionComponent} from './components/video-session/video-session.component';
import {FileUploaderComponent} from './components/file-uploader/file-uploader.component';
import {StreamComponent} from './components/video-session/stream.component';
import {ChatLineComponent} from './components/chat-line/chat-line.component';

import {AuthenticationService} from './services/authentication.service';
import {CourseService} from './services/course.service';
import {SessionService} from './services/session.service';
import {ForumService} from './services/forum.service';
import {FileService} from './services/file.service';
import {CourseDetailsModalDataService} from './services/course-details-modal-data.service';
import {LoginModalService} from './services/login-modal.service';
import {UploaderModalService} from './services/uploader-modal.service';
import {UserService} from './services/user.service';
import {AnimationService} from './services/animation.service';
import {VideoSessionService} from './services/video-session.service';

import {CalendarComponent} from './components/calendar/calendar.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CalendarModule} from 'angular-calendar';
import {EditorModule} from 'primeng/primeng';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    routing,
    CalendarModule,
    EditorModule
  ],
  declarations: [
    AppComponent,
    PresentationComponent,
    DashboardComponent,
    CourseDetailsComponent,
    NavbarComponent,
    FooterComponent,
    LoginModalComponent,
    SettingsComponent,
    ErrorMessageComponent,
    CommentComponent,
    FileGroupComponent,
    CalendarComponent,
    VideoSessionComponent,
    FileUploaderComponent,
    StreamComponent,
    ChatLineComponent,
    InterventionAskedPipe
  ],
  providers: [
    AuthenticationService,
    CourseService,
    SessionService,
    ForumService,
    FileService,
    CourseDetailsModalDataService,
    LoginModalService,
    UploaderModalService,
    UserService,
    AnimationService,
    VideoSessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
