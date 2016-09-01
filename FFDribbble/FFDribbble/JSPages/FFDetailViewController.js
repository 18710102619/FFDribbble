/* 
  FFDetailViewController.js
  FFDribbble

  Created by 张玲玉 on 16/8/30.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/


include('FFDetailHeaderView.js')
include('FFLoadMoreView.js')
include('FFDetailCell.js')

require('UIColor,UITableViewCell,UIActivityIndicatorView')

defineClass('FFDetailViewController: UITableViewController', [
'model',
'modelArray',
'page',
'loadingView',
'isLoading',
], {
            
    initWithModel: function(model) {
        self = self.super().init();
        if (self) {
            self.setTitle(model['title']);
            self.tableView().setBackgroundColor(UIColor.colorWithWhite_alpha(.9, 1));
            
            var headerView = FFDetailHeaderView.alloc().initWithModel(model);
            self.tableView().setTableHeaderView(headerView);
            
            var size=40;
            var X=(SCREEN_WIDTH - size)/2;
            var Y=headerView.height()+(SCREEN_HEIGHT-headerView.height()-size)/2-40;
            
            var loadingView = UIActivityIndicatorView.alloc().initWithActivityIndicatorStyle(2);
            loadingView.setFrame({x: X, y: Y, width:size, height:size});
            loadingView.startAnimating();
            self.view().addSubview(loadingView);
            self.setLoadingView(loadingView);
            
            self.setModel(model);
            self.setModelArray([]);
            self.setPage(1);
            self._loadModelArray();
        }
        return self;
    },
          
    // 加载数据
    _loadModelArray: function() {
        self.setIsLoading(1)
        var count = 20;
        var slf = self;
        var url=URL_Detail+self.model()['id']+'/comments';
            
        FFNetwork.get_page_count_success_failure(url, self.page(), count, block('id', function(responseObject) {
            slf.loadingView().removeFromSuperview();
            slf.setModelArray(slf.modelArray().concat(responseObject));
            slf.setPage(slf.page() + 1);
            slf.setIsLoading(0);
            if (responseObject.length >= count) {
                slf.tableView().setTableFooterView(FFLoadMoreView.alloc().init());
            } else {
                slf.tableView().setTableFooterView(FFLoadFinishView.alloc().init());
            }
            slf.tableView().reloadData();
        }), block('id', function(error) {

        }));
    },
            
    // UITableViewDataSource
    tableView_numberOfRowsInSection: function(tableView, section) {
        return self.modelArray().length;
    },
    tableView_cellForRowAtIndexPath: function(tableView, indexPath) {
        var cell = tableView.dequeueReusableCellWithIdentifier("cell")
        if (!cell) {
            cell = FFDetailCell.alloc().initWithStyle_reuseIdentifier(0, "cell")
        }
        cell.setModel(self.modelArray()[indexPath.row()]);
        return cell
    },

    // UITableViewDelegate
    tableView_heightForRowAtIndexPath: function(tableView, indexPath) {
        var cell = self.tableView_cellForRowAtIndexPath(tableView, indexPath);
        return cell.cellHeight();
    },
    

    // UIScrollViewDelegate
    scrollViewDidScroll: function(scrollView) {
        var contentOffset = scrollView.contentOffset();
        var contentSize = scrollView.contentSize();
        var offset=contentSize.height-contentOffset.y;

        if (!self.isLoading() && offset < SCREEN_HEIGHT-20) {
            self._loadModelArray();
        }
    },
})

