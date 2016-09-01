/* 
  FFListView.js
  FFDribbble

  Created by 张玲玉 on 16/8/29.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/

require('UIFont,UIColor,UILabel,UIButton,UIImageView')

var gap=5;

global.FFListView_Gap = 8;
global.FFListView_Width = (SCREEN_WIDTH - FFListView_Gap * 3) / 2;
global.FFListView_Height = FFListView_Width * 3/4 + 30;

defineClass('FFListView: UIView', [
'iconButton',
'iconImage',
'titleLabel',
'tapCallBack',
], {
    
    init: function() {
        self=self.super().init();
        self.setBackgroundColor(UIColor.whiteColor());
        self.setFrame({x: 0, y: 0, width: FFListView_Width, height: FFListView_Height});
     
        var W=FFListView_Width - 10;
        var iconButton = UIButton.alloc().initWithFrame({x: gap, y: gap, width: W, height: W*3/4});
        //iconButton.setBackgroundColor(UIColor.orangeColor());
        iconButton.addTarget_action_forControlEvents(self, 'iconButtonClicked', 1 <<  6);
        self.addSubview(iconButton);
        self.setIconButton(iconButton);
            
        var Y=iconButton.frame().y+iconButton.frame().height+7;
        var iconImage = UIImageView.alloc().initWithFrame({x: gap, y: Y, width: 18, height: 18});
        //iconImage.setBackgroundColor(UIColor.orangeColor());
        self.addSubview(iconImage);
        self.setIconImage(iconImage);
        
        var X=gap+18+7;
        var titleLabel = UILabel.alloc().initWithFrame({x: X, y: Y, width:FFListView_Width-X-gap, height:18});
        //titleLabel.setBackgroundColor(UIColor.orangeColor());
        titleLabel.setFont(UIFont.systemFontOfSize(12));
        titleLabel.setTextColor(UIColor.grayColor());
        self.addSubview(titleLabel);
        self.setTitleLabel(titleLabel);
            
        return self;
    },
         
    // 点击事件
    iconButtonClicked: function() {
        var cb = self.tapCallBack();
        if (cb) {
            cb();
        }
    },
            
    // 赋值
    setModel :function(model) {
        self.iconButton().sd__setImageWithURL_forState(require('NSURL').URLWithString(model['images']['normal']), 0);
        self.iconImage().sd__setImageWithURL(require('NSURL').URLWithString(model['user']['avatar_url']));
        self.titleLabel().setText(model['user']['name']);
    },
})