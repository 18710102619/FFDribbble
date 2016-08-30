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
            self.view().setBackgroundColor(UIColor.yellowColor);
        }
        return self;
    },
        
            
            
            
            
})