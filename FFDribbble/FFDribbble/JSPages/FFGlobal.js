/* 
  FFGlobal.js
  FFDribbble

  Created by 张玲玉 on 16/8/29.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/

var global = this;

global.SCREEN_WIDTH = require('UIScreen').mainScreen().bounds().width;
global.SCREEN_HEIGHT = require('UIScreen').mainScreen().bounds().height;

global.FFTimeLineCell_Gap = 8
global.FFTimeLineView_Width = (SCREEN_WIDTH - global.FFTimeLineCell_Gap * 3) / 2
global.FFTimeLineView_Height = global.FFTimeLineView_Width * 3/4 + 30

global.UIHelper = {
    bottomY: function(view) {
        var f = view.frame();
        return f.height + f.y;
    },
    rightX: function(view) {
        var f = view.frame();
        return f.width + f.x;
    },
    setWidth: function(view, width) {
        var f = view.frame();
        f.width = width
        view.setFrame(f)
    },
    setHeight: function(view, height) {
        var f = view.frame();
        f.height = height
        view.setFrame(f)
    },
    setX: function(view, x) {
        var f = view.frame();
        f.x = x
        view.setFrame(f)
    },
    setY: function(view, y) {
        var f = view.frame();
        f.y = y
        view.setFrame(f)
    }
}