import React from 'react';
import ClassStyle from './index.module.scss';
import { useState } from 'react';
import LeftMenu from '@common/components/left_menu';
export default function (props) {

    //收缩
    const [expend, setExpend] = useState(true);
    return <div className={expend ? `${ClassStyle.left_tools}` : `${ClassStyle.left_tools} ${ClassStyle.shrink}`}>
        <div className={ClassStyle.main}> <LeftMenu /></div>
        <div className={ClassStyle.line}>

            <div className={ClassStyle.expend} onClick={() => {
                setExpend(!expend);
            }}>
                <svg viewBox="64 64 896 896" data-icon="vertical-right" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M326 164h-64c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V172c0-4.4-3.6-8-8-8zm444 72.4V164c0-6.8-7.9-10.5-13.1-6.1L335 512l421.9 354.1c5.2 4.4 13.1.7 13.1-6.1v-72.4c0-9.4-4.2-18.4-11.4-24.5L459.4 512l299.2-251.1c7.2-6.1 11.4-15.1 11.4-24.5z"></path></svg>
            </div>
        </div>

    </div>
}