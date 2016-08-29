//
//  AppDelegate.m
//  FFDribbble
//
//  Created by 张玲玉 on 16/8/29.
//  Copyright © 2016年 bj.zly.com. All rights reserved.
//

#import "AppDelegate.h"
#import <SDWebImage/UIImageView+WebCache.h>
#import "AFHTTPRequestOperationManager.h"
#import "JPEngine.h"

@interface AppDelegate ()

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [JPEngine startEngine];
    NSString *sourcePath=[[NSBundle mainBundle]pathForResource:@"FFMain" ofType:@"js"];
    [JPEngine evaluateScriptWithPath:sourcePath];
    
    self.window=[[UIWindow alloc]initWithFrame:[UIScreen mainScreen].bounds];
    [self.window makeKeyAndVisible];
    [self initRootViewController];

    [UIColor yellowColor];
    [UIColor orangeColor];
    [UIColor magentaColor];
    
    return YES;
}

- (void)initRootViewController
{
    //在FFMain.js中实现
}

@end
