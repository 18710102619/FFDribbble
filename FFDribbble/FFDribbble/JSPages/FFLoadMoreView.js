/* 
  FFLoadMoreView.js
  FFDribbble

  Created by 张玲玉 on 16/8/29.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/

require('UIActivityIndicatorView,UILabel,UIColor')

defineClass('FFLoadMoreView: UIView', {
            
    init: function() {
        self = self.super().init();
        self.setBackgroundColor(UIColor.yellowColor());
        self.setFrame({x:0, y:0, width:SCREEN_WIDTH, height: 50});
            
        var X=(SCREEN_WIDTH-130)/2;
        var H=30;
            
        var loadingView = UIActivityIndicatorView.alloc().initWithActivityIndicatorStyle(2);
        loadingView.setBackgroundColor(UIColor.magentaColor());
        loadingView.startAnimating();
        loadingView.setFrame({x:X, y: 10, width:H, height: H});

        var loadingLabel=UILabel.alloc().init();
        loadingLabel.setBackgroundColor(UIColor.magentaColor());
        loadingLabel.setText('正在加载...');
        loadingLabel.setFrame({x:X+40, y: 10, width:90, height: H});
        loadingLabel.setTextColor(UIColor.grayColor());

        self.addSubview(loadingView);
        self.addSubview(loadingLabel);

        return self;
    },
            
})