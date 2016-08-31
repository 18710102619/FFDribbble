/* 
  FFDetailViewController.js
  FFDribbble

  Created by 张玲玉 on 16/8/30.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/


include('FFDetailHeaderView.js')

require('UIColor,UITableViewCell')

defineClass('FFDetailViewController: UITableViewController', [
'model',
'loadingView',
], {
            
    initWithModel: function(model) {
        self = self.super().init();
        if (self) {
            self.setModel(model);
            
            self.setTitle(model['title']);
            self.view().setBackgroundColor(UIColor.whiteColor());
            
            var headerView = FFDetailHeaderView.alloc().initWithModel(model);
            self.tableView().setTableHeaderView(headerView);
            
        }
        return self;
    },
        
            
    // UITableViewDataSource
    tableView_numberOfRowsInSection: function(tableView, section) {
        return 50;
    },
    tableView_cellForRowAtIndexPath: function(tableView, indexPath) {
        var cell = tableView.dequeueReusableCellWithIdentifier("cell")
        if (!cell) {
            cell = UITableViewCell.alloc().initWithStyle_reuseIdentifier(0, "cell")
            cell.setBackgroundColor(UIColor.magentaColor());
        }
    return cell
    },

    // UITableViewDelegate
    tableView_heightForRowAtIndexPath: function(tableView, indexPath) {
    return 60;
    },
            
            
})