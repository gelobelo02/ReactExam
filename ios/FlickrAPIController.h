//
//  FlickrAPIController.h
//  ReactExam
//
//  Created by Angelo Espiritu on 15/04/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ObjectiveFlickr.h"

@interface FlickrAPIController : NSObject <OFFlickrAPIRequestDelegate>
+ (instancetype)sharedController;

- (void)requestFlickrPhotosWithTag:(NSString *)tag;
@end
