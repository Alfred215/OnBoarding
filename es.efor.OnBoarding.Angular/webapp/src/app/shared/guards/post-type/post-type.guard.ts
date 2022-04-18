// import { Injectable } from '@angular/core';
// import { CanLoad, UrlSegment } from '@angular/router';
// import { Observable } from 'rxjs';
// import { Route } from '@angular/compiler/src/core';
// import { PostTypeEnum } from '../../api/models';

// @Injectable({
//   providedIn: 'root'
// })
// export class PostTypeGuard implements CanLoad {
//   private postTypes = Object.keys(PostTypeEnum)
//     .map((k) => PostTypeEnum[k].toString().toLowerCase());

//   canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
//     return new Promise<boolean>((resolve) => {
//       const postTypeSegment = this.getPostTypeSegment(segments);
//       const isValid = this.isPostTypeValid(postTypeSegment);
      
//       resolve(isValid);
//     });
//   }

//   private getPostTypeSegment(segments: UrlSegment[]) {
//     const postSegmentIndex = segments.findIndex(s => s.path === 'post');
//     if (postSegmentIndex >= 0) {
//       return segments[postSegmentIndex + 1];
//     }
//     return null;
//   }
//   private isPostTypeValid(segment: UrlSegment) {
//     const postType = this.postTypes.find((p) => p === segment.path);

//     return postType != null;
//   }
// }
