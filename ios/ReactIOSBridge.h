//
//  ReactIOSBridge.h
//  ReactExam
//
//  Created by Angelo Espiritu on 15/04/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridge.h"

@interface ReactIOSBridge : NSObject <RCTBridgeModule, NSURLConnectionDelegate>
+ (instancetype)shareBridge;

- (void)sendImageUrlToReact:(NSArray *)arrayUrl;
@end
