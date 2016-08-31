//
//  UIView+Extension.h
//  FFDribbble
//
//  Created by 张玲玉 on 16/8/29.
//  Copyright © 2016年 bj.zly.com. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIView (Extension)

@property (nonatomic, assign) CGSize size;
@property (nonatomic, assign) CGPoint origin;

@property (nonatomic, assign) CGFloat x;
@property (nonatomic, assign) CGFloat y;

@property (nonatomic, assign) CGFloat width;
@property (nonatomic, assign) CGFloat height;

@property (nonatomic, assign) CGFloat centerX;
@property (nonatomic, assign) CGFloat centerY;

@property (nonatomic, assign, readonly) CGFloat maxX;
@property (nonatomic, assign, readonly) CGFloat maxY;

@end
