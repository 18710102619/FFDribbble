/* 
  FFListCell.js
  FFDribbble

  Created by 张玲玉 on 16/8/29.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/

include('FFListView.js')

defineClass('FFListCell: UITableViewCell', [
'itemView1',
'itemView2',
'tapCallBack',
                                            
], {
   
    initWithStyle_reuseIdentifier: function(style, reuseIdentifier) {
        self = self.super().initWithStyle_reuseIdentifier(style, reuseIdentifier);
        if (self) {
            self.setSelectionStyle(0);
            self.contentView().setBackgroundColor(UIColor.colorWithWhite_alpha(.9, 1));
            
            var itemView1 = FFListView.alloc().init();
            var itemView2 = FFListView.alloc().init();
            
            itemView1.setFrame({x: FFListView_Gap, y: FFListView_Gap, width: itemView1.frame().width, height: itemView1.frame().height});
            itemView2.setFrame({x:FFListView_Gap*2 + itemView1.frame().width, y: FFListView_Gap, width: itemView2.frame().width, height: itemView2.frame().height});
            
            self.addSubview(itemView1);
            self.addSubview(itemView2);
            
            self.setItemView1(itemView1);
            self.setItemView2(itemView2);
        }
        return self;
    },

    setModels: function(model1,model2) {
        if (model1) {
            self.itemView1().setModel(model1);
        }
        if (model2) {
            self.itemView2().setModel(model2);
        }
        self.itemView1().setHidden(!model1);
        self.itemView2().setHidden(!model2);

        var slf = self
        self.itemView1().setTapCallBack(function() {
            var cb = slf.tapCallBack();
            if (cb) {
                cb(model1);
            }
        });
        self.itemView2().setTapCallBack(function(){
            var cb = slf.tapCallBack();
            if (cb) {
                cb(model2);
            }
        });
    },
            
})