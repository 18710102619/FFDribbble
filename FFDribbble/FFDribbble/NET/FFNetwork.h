//
//  FFNetwork.h
//  FFDribbble
//
//  Created by 张玲玉 on 16/8/31.
//  Copyright © 2016年 bj.zly.com. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface FFNetwork : NSObject

+ (void)get:(NSString *)url
     params:(NSDictionary *)params
    success:(void (^)(id responseObject))success
    failure:(void (^)(id error))failure;

+ (void)get:(NSString *)url
       page:(int)page
      count:(int)count
    success:(void (^)(id responseObject))success
    failure:(void (^)(id error))failure;

@end
