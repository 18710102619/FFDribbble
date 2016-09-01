/* 
  FFMain.js
  FFDribbble

  Created by 张玲玉 on 16/8/29.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/

global.SCREEN_WIDTH = require('UIScreen').mainScreen().bounds().width;
global.SCREEN_HEIGHT = require('UIScreen').mainScreen().bounds().height;

// NSDictionary / NSArray / NSString 在通信过程中都会自动转为 JS 类型
autoConvertOCType(1)
include('FFGlobal.js')
include('FFURLAddress.js')
include('FFLoadMoreView.js')
include('FFLoadFinishView.js')
include('FFListViewController.js')

// 在使用Objective-C类之前需要调用 require('className’)
require('UIViewController,UINavigationController')

// defineClass()：定义后会生成对应的 OC 类，并在 alloc 时还是要去到 OC 生成这个对象。
// defineJSClass()：不需要继承 OC 类，只在 JS 使用，所以直接使用 JS 原生类就行了。
defineClass('AppDelegate', {
    initRootViewController:function() {
        var rootVC=FFListViewController.alloc().init();
        var rootNC=UINavigationController.alloc().initWithRootViewController(rootVC);
        self.window().setRootViewController(rootNC);
    }
})