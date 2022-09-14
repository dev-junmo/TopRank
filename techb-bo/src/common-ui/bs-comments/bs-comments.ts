// import { Http, Headers, RequestOptions, Response } from '@angular/http';
// import {Component, Inject, Input, Output, ViewEncapsulation, ViewChild, EventEmitter} from '@angular/core';
// //import template from './comments.html!text';
// //import {Editor} from '../ui/editor/editor';
// import {BSComment} from './bs-comment/bs-comment';
// //import {UserService} from '../user/user-service/user-service';

// @Component({
//     selector: 'bs-comments',
//     host: {
//         class: 'comments'
//     },
//     templateUrl: './bs-comments.html',
//     styleUrls: ['./bs-comments.scss'],
//     encapsulation: ViewEncapsulation.None,
//     //directives: [Comment, Editor]
// })
// export class BSComments {
//     // A list of comment objects
//     private comments;
//     private comment;
//     // Event when the list of comments have been updated
//     @Output() commentsUpdated = new EventEmitter();
//     // We are using an editor for adding new comments and control it
//     // directly using a reference
//     @ViewChild('newCommentEditor') newCommentEditor;

//     // We're using the user service to obtain the currently logged
//     // in user
//     constructor(/*@Inject(UserService) userService*/private http: Http) {
//         //this.userService = userService;
//     }
//     ngOnInit() {
//     this.http.get('http://breezestudio.co.kr:9000/comments?article_id=10')
//         .map((response: Response) => response.json())
//         .subscribe(data => {
//             console.log("cm data", data);
//             // set items to json response
//             this.comments = data;

//         });
//     }

//     loadComments(){
//         this.http.get('http://breezestudio.co.kr:9000/comments?article_id=10')
//         .map((response: Response) => response.json())
//         .subscribe(data => {
//             console.log("cm data", data);
//             // set items to json response
//             this.comments = data;

//         });
//     }
//     createComment(comment, article_id){
//         this.http.post('http://breezestudio.co.kr:9000/comments', {comment: comment, article_id: article_id})
//         .map((response: Response) => response.json())
//         .subscribe(data => {
//             this.loadComments();
//         });
//     }
//     updateComment(comment){
//         this.http.put('http://breezestudio.co.kr:9000/comments/' + comment.id, {comment: comment.comment})
//         .map(resp => resp.json()).subscribe(resp => {
//             console.log("updateItem = ", resp);
//             this.loadComments();
//         });
//     }
//     // We use input change tracking to prevent dealing with
//     // undefined comment list
//     ngOnChanges(changes) {
//         if (changes.comments &&
//             changes.comments.currentValue === undefined) {
//             this.comments = [];
//         }
//     }

//     // Adding a new comment from the newCommentContent field that is
//     // bound to the editor content
//     addNewComment() {

//         this.createComment(this.comment, 10);

//         this.comment = '';

//         /*
//         const comments = this.comments.slice();
//         comments.splice(0, 0, {
//             //user: this.userService.currentUser,
//             time: +new Date(),
//             content: content
//         });
//         */
//         //this.commentsUpdated.next(this.comments);
//     }

//     // This method deals with edited comments
//     onCommentEdited(comment, content) {

//         comment.comment = content;
//         this.updateComment(comment);


//         // If the comment was edited with e zero length content, we
//         // will delete the comment from the list
//         /*const comments = this.comments.slice();
//         if (content.length === 0) {
//             comments.splice(comments.indexOf(comment), 1);
//         } else {
//             // Otherwise we're replacing the existing comment
//             comments.splice(comments.indexOf(comment), 1, {
//                 user: comment.user,
//                 time: comment.time,
//                 content
//             });
//         }
//         */
//         // Emit event so the updated comment list can be persisted
//         // outside the component
//         //this.commentsUpdated.next(comments);
//     }
// }
