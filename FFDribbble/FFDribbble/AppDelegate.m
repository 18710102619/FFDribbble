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
#import <JSPatch/JSPatch.h>
#import <JSPatch/JPEngine.h>
#import "FFNetwork.h"

@interface AppDelegate ()<BuglyDelegate>

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [self setupBugly];
//    [self setupJSPatch];
    [self setupJPEngine];
    
    self.window=[[UIWindow alloc]initWithFrame:[UIScreen mainScreen].bounds];
    [self.window makeKeyAndVisible];
    [self initRootViewController];

    return YES;
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    [JSPatch sync];
}

- (void)initRootViewController
{
    //在FFMain.js中实现
}

#pragma mark - JPEngine

- (void)setupJPEngine
{
    [JPEngine startEngine];

    NSString *sourcePath=[[NSBundle mainBundle]pathForResource:@"main" ofType:@"js"];
    
//    NSString *path=[((NSArray *)NSSearchPathForDirectoriesInDomains(NSLibraryDirectory,NSUserDomainMask,YES)) objectAtIndex:0];
//    NSString *sourcePath=[NSString stringWithFormat:@"%@/JSPatch/1.0.0/main.js",path];
    
    NSString *content=[NSString stringWithContentsOfFile:sourcePath encoding:NSUTF8StringEncoding error:nil];
    NSLog(@"content: %@",content);
    
    [JPEngine evaluateScriptWithPath:sourcePath];
}

#pragma mark - JSPatch

- (void)setupJSPatch
{
#if DEBUG
    
    // 用于发布前测试脚本，调用后，会在当前项目的 bundle 里寻找 main.js 文件执行。注意不能同时调用 +startWithAppKey: 方法，测试完成后需要删除。
    [JSPatch testScriptInBundle];
    // 开发预览
    [JSPatch setupDevelopment];
    
#else
    
    // 传入在平台申请的 appKey，启动 JSPatch SDK。同时会自动执行已下载到本地的 patch 脚本。
    [JSPatch startWithAppKey:@"b131749e6d38c12d"];
    
#endif
   
    // 设置 RSA Public Key
    [JSPatch setupRSAPublicKey:@"-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDtpYOk3suexY6MXh01DnvKmLm4\ngAlMaSVt9sQEnzaealMLSbYlGCV0lK2bvwQzXVu7Ae5Q82Nx3+iVz5vcj8Md6tqa\nsdcvNs4HBqosFS/hbB0RMs81DqmC46LBpKQLjDpXnCFdfkpIb8UC19LGqZWBQxb0\nlzr9RUFjGkvvJwIv6wIDAQAB\n-----END PUBLIC KEY-----"];
    
    // 与 JSPatch 平台后台同步，询问是否有 patch 更新，如果有更新会自动下载并执行。
    [JSPatch sync];
    
    
    /*typedef NS_ENUM(NSInteger, JPCallbackType){
        JPCallbackTypeUnknow        = 0,
        JPCallbackTypeRunScript     = 1,    //执行脚本
        JPCallbackTypeUpdate        = 2,    //脚本有更新
        JPCallbackTypeUpdateDone    = 3,    //已拉取新脚本
        JPCallbackTypeCondition     = 4,    //条件下发
        JPCallbackTypeGray          = 5,    //灰度下发
    };*/
    [JSPatch setupCallback:^(JPCallbackType type, NSDictionary *data, NSError *error) {
        switch (type) {
            case JPCallbackTypeRunScript: {
                NSLog(@"JPCallbackType 执行脚本: %@ %@", data, error);
                
                [self setupJPEngine];
                
                self.window=[[UIWindow alloc]initWithFrame:[UIScreen mainScreen].bounds];
                [self.window makeKeyAndVisible];
                [self initRootViewController];
                
                break;
            }
            case JPCallbackTypeUpdate: {
                NSLog(@"JPCallbackType 脚本有更新: %@ %@", data, error);
                break;
            }
            case JPCallbackTypeUpdateDone: {
                NSLog(@"JPCallbackType 已拉取新脚本: %@ %@", data, error);
                break;
            }
            case JPCallbackTypeCondition: {
                NSLog(@"JPCallbackType 条件下发: %@ %@", data, error);
                break;
            }
            case JPCallbackTypeGray: {
                NSLog(@"JPCallbackType 灰度下发: %@ %@", data, error);
                break;
            }
            default:
            break;
        }
    }];
}

#pragma mark - Bugly

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
