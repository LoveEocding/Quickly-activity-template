import React from 'react';
import { useDrag } from 'react-dnd'



function ImgComponent() {
    const [{ isDragging }, drag] = useDrag({
        item: {
            type: 'UseTool.Img',
            id: 'img-origin',
            isHave:false,
            dataAttr: [{
                lable: '图片链接',
                type: 'text',
                value: ''
            }],
            styleAttr: {
                width: {
                    lable: '宽',
                    type: 'text',
                    value: '20px'
                }, height: {
                    lable: '高',
                    type: 'text',
                    value: '20px'
                }, display: {
                    lable: '盒类型',
                    type: 'select',
                    value: '',
                    select: ['flex', 'block', 'inline-block']
                },
                position: {
                    lable: '定位',
                    type: 'select',
                    value: '',
                    select: ['fixed', 'relative', 'absolute']
                },
                top: {
                    lable: '上定位',
                    type: 'text',
                    value: '',
                },
                left: {
                    lable: '左定位',
                    type: 'text',
                    value: ''
                },
                alignItems: {
                    lable: '主轴方向对齐方式',
                    type: 'select',
                    value: '',
                    select: ['center', 'flex-end', 'flex-start']
                }, justifyContent: {
                    lable: '副轴对齐方式',
                    type: 'select',
                    value: '',
                    select: ['center', 'flex-end', 'flex-start']
                }, marginLeft: {
                    lable: '左间距',
                    type: 'text',
                    value: '0px'
                }, marginTop: {
                    lable: '上间距',
                    type: 'text',
                    value: '0px'
                },
                backgroundColor:{
                    lable:'背景颜色',
                    type:'color',
                    value:'#FFFFFF'
                },
                color:{
                    lable:'字体颜色',
                    type:'color',
                    value:'#FFFFFF'
                }
            },
            collect: monitor => ({
                isDragging: !!monitor.isDragging(),
            }),
        }
    })
    return <div id="img-origin" ref={drag}
        style={{
            // opacity: isDragging ? 0.5 : 1,
            cursor: 'move',
            marginRight: 20,
            height: 64,
            width: 64
        }}><svg t="1601022964170" class="icon" viewBox="0 0 1375 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3170" width="64" height="64"><path d="M1243.25337324 962H90.11994013A28.11994013 28.11994013 0 0 1 62 933.88005987V90.1334331A28.11994013 28.11994013 0 0 1 90.11994013 62.01349297h1153.13343311a28.11994013 28.11994013 0 0 1 28.11994014 28.11994013v843.74662677A28.11994013 28.11994013 0 0 1 1243.25337324 962zM118.25337324 905.76011972h1096.86656689V118.25337324H118.25337324z" fill="" p-id="3171"></path><path d="M175.2758624 872.53973018a30.5082457 30.5082457 0 0 1-10.40329863-1.9835086c-9.18890596-3.37331338-23.47826045-13.14242842-15.8410793-40.79010497a27.97151396 27.97151396 0 0 1 7.28635694-12.4812589c84.14392763-178.40779629 183.71064463-237.42728614 252.76911504-255.41379316 73.71364307-19.22788565 151.48875586-3.26536699 231.53073486 47.38830557 33.36881573-63.51274336 120.54872549-203.55922002 238.37181416-197.95952022 115.46176904 5.31634219 215.81109404 141.77361357 306.59370293 417.19790127a28.11994013 28.11994013 0 1 1-53.41979004 17.5412294c-101.45577217-307.75412285-195.04497744-375.73313379-255.69715166-378.58020997-91.16041992-3.71064463-174.81859102 138.99400313-199.10644629 194.53223409a28.11994013 28.11994013 0 0 1-42.32833593 11.50974492c-75.49475273-54.90404824-146.7661166-74.21289346-211.84407862-57.19790127-58.11544248 15.19340362-143.3253375 67.56071924-218.90104893 231.22039043-3.10344786 6.70614697-11.55022471 25.01649141-29.01049453 25.01649141zM1074.49325352 343.25337324a84.37331338 84.37331338 0 1 1 84.37331338-84.37331337 84.46776592 84.46776592 0 0 1-84.37331338 84.37331337z m0-112.49325351a28.11994013 28.11994013 0 1 0 28.11994013 28.11994014 28.16041992 28.16041992 0 0 0-28.11994013-28.13343311z" fill="" p-id="3172"></path></svg>
        图片
        </div>

}


export default ImgComponent;

