/* 
  FFDetailViewController.js
  FFDribbble

  Created by 张玲玉 on 16/8/30.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/


include('FFDetailHeaderView.js')

require('UIColor,UITableViewCell,UIActivityIndicatorView')

defineClass('FFDetailViewController: UITableViewController', [
'model',
'modelArray',
'currPage',
'loadingView',
'isLoading',
], {
            
    initWithModel: function(model) {
        self = self.super().init();
        if (self) {
            self.setTitle(model['title']);
            self.view().setBackgroundColor(UIColor.whiteColor());
            
            var headerView = FFDetailHeaderView.alloc().initWithModel(model);
            self.tableView().setTableHeaderView(headerView);
            
            var size=40;
            var X=(SCREEN_WIDTH - size)/2;
            var Y=headerView.height()+(SCREEN_HEIGHT-headerView.height()-size)/2;
            
            var loadingView = UIActivityIndicatorView.alloc().initWithActivityIndicatorStyle(2);
            loadingView.setFrame({x: X, y: Y, width:size, height:size});
            loadingView.startAnimating();
            self.view().addSubview(loadingView);
            self.setLoadingView(loadingView);
            
            self.setModel(model);
            self.setModelArray([]);
            self.currPage(1);
            self._loadData();
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