/**
 * 中间编辑区域组件
 */
import React from 'react';
import ClassStyle from './index.module.scss';
import AppHone from '../app_edit';

export default function (props) {
    return <div className={ClassStyle.center_edit}>
        <AppHone />
    </div>
}