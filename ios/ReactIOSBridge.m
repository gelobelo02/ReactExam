//
//  ReactIOSBridge.m
//  ReactExam
//
//  Created by Angelo Espiritu on 15/04/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "ReactIOSBridge.h"
#import "RCTLog.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"

@interface ReactIOSBridge ()
@property (nonatomic, strong) NSMutableData *_responseData;
@end

@implementation ReactIOSBridge

@synthesize bridge = _bridge;

static ReactIOSBridge *sharedInstance = nil;

+ (instancetype)shareBridge {
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedInstance = [[self alloc] init];
  });
  return sharedInstance;
}

#pragma mark 

- (void)sendImageUrlToReact:(NSArray *)arrayUrl {
  [self.bridge.eventDispatcher sendAppEventWithName:@"flickrResponseUpdate"
                                               body:@{@"name": arrayUrl}];
}

#pragma mark React Modules

RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(getFlickerImagesForTag:(NSString *)tag) {

   RCTLogInfo(@"The code is truly code from bridge!");
}


@end
