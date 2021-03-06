import React from 'react';
import { useDrag } from 'react-dnd'



function ImgUse({styleSheet,dataAttr,styleAttr,callback,id,localDomId}) {
    console.log(id,localDomId);
    const [{ isDragging }, drag] = useDrag({
        item: { type: 'UseComponent.Img', id:id,isHave:true},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })
    return <div id={id} key={id}  ref={drag} onClick={callback.bind(this,{styleSheet,dataAttr,styleAttr,id})}
        style={{
            opacity: isDragging ? 0 : 1,
            cursor: 'move',
            border:localDomId===id?'1px dotted red':'',
            ...styleSheet
        }}  >
        点击
        </div>

}


export default ImgUse;

