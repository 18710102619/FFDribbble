/* 
  FFAuthorViewController.js
  FFDribbble

  Created by 张玲玉 on 16/9/1.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/


defineClass('FFAuthorViewController: UIViewController', [
            
], {

    init: function(model) {
        self=self.super().init();
        if (self) {
            self.setTitle('作者');

            self.view().setBackgroundColor(UIColor.colorWithWhite_alpha(.9, 1));


        }
        return self;
    },


})