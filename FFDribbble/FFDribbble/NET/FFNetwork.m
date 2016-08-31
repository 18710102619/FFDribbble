//
//  FFNetwork.m
//  FFDribbble
//
//  Created by 张玲玉 on 16/8/31.
//  Copyright © 2016年 bj.zly.com. All rights reserved.
//

#import "FFNetwork.h"
#import "AFNetworking.h"

#define kTimeoutInterval 20
#define kAuthorization @"Bearer deeb37c0823d3866650db12df9e36730a0453a5a7b8e6493e0ac5ece15929613"

@implementation FFNetwork

+ (void)get:(NSString *)url
     params:(NSDictionary *)params
    success:(void (^)(id responseObject))success
    failure:(void (^)(id error))failure
{
    AFHTTPRequestOperationManager * manager = [AFHTTPRequestOperationManager manager];
    [manager.requestSerializer setValue:kAuthorization forHTTPHeaderField:@"Authorization"];
    
    [manager GET:url parameters:params success:^(AFHTTPRequestOperation *operation, id responseObject) {
        success(responseObject);
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        failure(error);
    }];
}

+ (void)get:(NSString *)url
  pageindex:(int)pageindex
  pagecount:(int)pagecount
    success:(void (^)(id responseObject))success
    failure:(void (^)(id error))failure;
{
    NSMutableDictionary *params=[NSMutableDictionary dictionary];
    [params setObject:[NSString stringWithFormat:@"%d",pageindex] forKey:@"page"];
    [params setObject:[NSString stringWithFormat:@"%d",pagecount] forKey:@"per_page"];
    [self get:url params:params success:success failure:failure];
}

@end
