//
//  AppDelegate.m
//  FFDribbble
//
//  Created by 张玲玉 on 16/8/29.
//  Copyright © 2016年 bj.zly.com. All rights reserved.
//

#import "AppDelegate.h"
#import <SDWebImage/UIImageView+WebCache.h>
#import <Bugly/Bugly.h>
#import "JPEngine.h"
#import "Masonry.h"
#import "FFNetwork.h"

@interface AppDelegate ()<BuglyDelegate>

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [self setupBugly];
    
    [JPEngine startEngine];
    NSString *sourcePath=[[NSBundle mainBundle]pathForResource:@"FFMain" ofType:@"js"];
    [JPEngine evaluateScriptWithPath:sourcePath];
    
    self.window=[[UIWindow alloc]initWithFrame:[UIScreen mainScreen].bounds];
    [self.window makeKeyAndVisible];
    [self initRootViewController];
    
    [FFNetwork get:@"https://api.dribbble.com/v1/shots" pageindex:1 pagecount:20 success:^(id responseObject) {
        
    } failure:^(id error) {
        
    }];
    
    return YES;
}

- (void)initRootViewController
{
    //在FFMain.js中实现
}

- (void)setupBugly
{
    BuglyConfig * config = [[BuglyConfig alloc] init];
    config.delegate = self;
    
#if DEBUG
    // SDK Debug 信息开关, 默认关闭
    config.debugMode = YES;
#endif
    
    // 控制自定义日志上报，默认值为BuglyLogLevelWarn，只上报Warn、Error的日志
    // 设置为BuglyLogLevelSilent可关闭日志上报
    config.reportLogLevel = BuglyLogLevelWarn;
    
    // 卡顿监控开关，默认关闭
    config.blockMonitorEnable = YES;
    
    // 卡顿监控判断间隔，单位为秒
    config.blockMonitorTimeout = 1.5;
    
    // 设置自定义渠道标识
    config.channel = @"Bugly";
    
    // 使用指定配置初始化Bugly
    [Bugly startWithAppId:@"900050966"
#if DEBUG
        developmentDevice:YES
#endif
                   config:config];
    // 设置用户标识
    [Bugly setUserIdentifier:[NSString stringWithFormat:@"User: %@", [UIDevice currentDevice].name]];
    
    //设置关键数据，随崩溃信息上报
    [Bugly setUserValue:[NSProcessInfo processInfo].processName forKey:@"Process"];
    
    [self performSelectorInBackground:@selector(testLogOnBackground) withObject:nil];
}

- (void)testLogOnBackground {
    int count = 0;
    while (1) {
        count++;
        
        switch (count % 5) {
            case 0:
            BLYLogError(@"BLYLogError：%d", count);
            break;
            case 4:
            BLYLogWarn(@"BLYLogWarn：%d", count);
            break;
            case 3:
            BLYLogInfo(@"BLYLogInfo：%d", count);
            BLYLogv(BuglyLogLevelWarn, @"BuglyLogLevelWarn", NULL);
            break;
            case 2:
            BLYLogDebug(@"BLYLogDebug ：%d", count);
            BLYLog(BuglyLogLevelError, @"BuglyLogLevelError", NULL);
            break;
            case 1:
            default:
            BLYLogVerbose(@"BLYLogVerbose ：%d", count);
            break;
        }
        sleep(1);
    }
}

/**
 *  发生异常时回调
 *
 *  @param exception 异常信息
 *
 *  @return 返回需上报记录，随异常上报一起上报
 */
- (NSString * BLY_NULLABLE)attachmentForException:(NSException * BLY_NULLABLE)exception;
{
    NSLog(@"Callback: trap exception: %@", exception);
    
    return @"This is an attachment";
}

@end
