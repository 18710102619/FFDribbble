/* 
  FFDetailViewController.js
  FFDribbble

  Created by 张玲玉 on 16/8/30.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/


require('UIColor')

defineClass('FFDetailViewController: UIViewController', [
    'loadingView',
], {
            
    initWithModel: function(model) {
        self = self.super().init();
        if (self) {
            self.setTitle('详情页');
            
            // 设置背景颜色
            var color = UIColor.colorWithHex(0xFC7274);
            self.view().setBackgroundColor(color);
        }
        return self;
    },
        
            
            
            
            
})