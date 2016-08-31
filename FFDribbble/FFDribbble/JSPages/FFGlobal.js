/* 
  FFGlobal.js
  FFDribbble

  Created by 张玲玉 on 16/8/29.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/


global.SCREEN_WIDTH = require('UIScreen').mainScreen().bounds().width;
global.SCREEN_HEIGHT = require('UIScreen').mainScreen().bounds().height;

global.FFTimeLineCell_Gap = 8;
global.FFTimeLineView_Width = (SCREEN_WIDTH - global.FFTimeLineCell_Gap * 3) / 2;
global.FFTimeLineView_Height = global.FFTimeLineView_Width * 3/4 + 30;

