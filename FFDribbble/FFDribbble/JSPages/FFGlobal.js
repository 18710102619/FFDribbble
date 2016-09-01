/* 
  FFGlobal.js
  FFDribbble

  Created by 张玲玉 on 16/8/29.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/


global.SCREEN_WIDTH = require('UIScreen').mainScreen().bounds().width;
global.SCREEN_HEIGHT = require('UIScreen').mainScreen().bounds().height;

global.FFListCell_Gap = 8;
global.FFListView_Width = (SCREEN_WIDTH - global.FFListCell_Gap * 3) / 2;
global.FFListView_Height = global.FFListView_Width * 3/4 + 30;



