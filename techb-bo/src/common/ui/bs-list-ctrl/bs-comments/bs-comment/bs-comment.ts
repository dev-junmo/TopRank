// import {Component, Input, Output, ViewEncapsulation, EventEmitter} from '@angular/core';
// //import {Editor} from '../../ui/editor/editor';
// //import template from './comment';
// // We use our fromNow pipe that converts timestamps to relative
// // times
// //import {FromNowPipe} from '../../pipes/from-now';

// @Component({
//     selector: 'bs-comment',
//     host: {
//         class: 'comment'
//     },
//     templateUrl: './bs-comment.html',
//     //styleUrls: ['./bs-comment.css'],
//     encapsulation: ViewEncapsulation.None,
//     //directives: [Editor],
//     //pipes: [FromNowPipe]
// })

// export class BSComment {

//      editMode: boolean = false;
//     // The time of the comment as a timestamp
//     @Input() time;
//     // The user object of the user who created the comment
//     @Input() user;
//     // The comment content
//     @Input() comment;
//     // If a comment was edited this event will be emitted
//     @Output() commentEdited = new EventEmitter();


//     onContentSaved(content) {
//         if(!this.editMode){
//             this.editMode = true;
//             return;
//         }
//         if(this.editMode){
//             this.editMode = false;
//             this.commentEdited.emit(content);   // fire
//             console.log("this.commentEdited.next(content);", this.comment)
//         }
//     }
// }
