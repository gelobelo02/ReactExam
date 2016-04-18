//
//  FlickrAPIController.m
//  ReactExam
//
//  Created by Angelo Espiritu on 15/04/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "FlickrAPIController.h"
#import "ReactIOSBridge.h"

#define API_KEY @"e02b57790bd8a91640ba334149621e48"
#define API_SHARED_SECRET @"a446eafa236cdece"

@interface FlickrAPIController ()
@property (nonatomic, strong) OFFlickrAPIRequest *requestObject;
@property (nonatomic, strong) OFFlickrAPIContext *apiContext;
@end

@implementation FlickrAPIController

static FlickrAPIController *sharedInstance = nil;

+ (instancetype)sharedController {
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedInstance = [[self alloc] init];
  });
  return sharedInstance;
}

- (instancetype)init {
  if (self = [super init]) {
    [self setUpFlickrAPI];
  }
  return self;
}

- (void)requestFlickrPhotosWithTag:(NSString *)tag {
  NSMutableDictionary *params = [NSMutableDictionary dictionary];
  [params setObject:tag forKey:@"tags"];

  [self.requestObject callAPIMethodWithGET:@"flickr.photos.search" arguments:params];

}

- (void)setUpFlickrAPI {
  self.apiContext = [[OFFlickrAPIContext alloc] initWithAPIKey:API_KEY sharedSecret:API_SHARED_SECRET];
  self.requestObject = [[OFFlickrAPIRequest alloc] initWithAPIContext:self.apiContext];
  [self.requestObject setDelegate:self];
}

- (void)flickrAPIRequest:(OFFlickrAPIRequest *)inRequest didCompleteWithResponse:(NSDictionary *)inResponseDictionary {

  NSLog(@"Request get response");
  NSMutableArray *arraySourceImages = [NSMutableArray array];

  for (NSDictionary *photoDict in [inResponseDictionary valueForKeyPath:@"photos.photo"]) {
    NSURL *staticPhotoURL = [self.apiContext photoSourceURLFromDictionary:photoDict size:OFFlickrSmallSize];

    [arraySourceImages addObject:staticPhotoURL];
  }

 // [[ReactIOSBridge shareBridge] sendImageUrlToReact:arraySourceImages];

}
- (void)flickrAPIRequest:(OFFlickrAPIRequest *)inRequest didFailWithError:(NSError *)inError {
   NSLog(@"Request failed");
}


- (void)flickrAPIRequest:(OFFlickrAPIRequest *)inRequest imageUploadSentBytes:(NSUInteger)inSentBytes totalBytes:(NSUInteger)inTotalBytes {
  
}
@end
