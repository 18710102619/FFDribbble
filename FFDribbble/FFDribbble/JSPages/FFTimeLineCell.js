/* 
  FFTimeLineCell.js
  FFDribbble

  Created by 张玲玉 on 16/8/29.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/

include('FFTimeLineView.js')

defineClass('FFTimeLineCell: UITableViewCell', [
'itemView1',
'itemView2',
'tapCallback',
], {
   
    initWithStyle_reuseIdentifier: function(style, reuseIdentifier) {
        self = self.super().initWithStyle_reuseIdentifier(style, reuseIdentifier);
        if (self) {
            self.setSelectionStyle(0);
            self.contentView().setBackgroundColor(UIColor.colorWithWhite_alpha(.9, 1));
            self._initItemView();
        }
        return self;
    },
            
    _initItemView: function(){
        var itemView1 = FFTimeLineView.alloc().init();
        var itemView2 = FFTimeLineView.alloc().init();
        
        itemView1.setFrame({x: FFTimeLineCell_Gap, y: FFTimeLineCell_Gap, width: itemView1.frame().width, height: itemView1.frame().height});
        itemView2.setFrame({x:FFTimeLineCell_Gap*2 + itemView1.frame().width, y: FFTimeLineCell_Gap, width: itemView2.frame().width, height: itemView2.frame().height});
        
        self.setItemView1(itemView1);
        self.setItemView2(itemView2);
        
        self.addSubview(itemView1);
        self.addSubview(itemView2);
    },
            
})