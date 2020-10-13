import React, { useState, useEffect } from 'react';
import './index.scss';
import { useDrop } from 'react-dnd';
import PhoneList from '../../../phone.config.js'; //机型数据配置文件
import { Menu, Dropdown } from 'antd';
import UseTool from '../../tools-use/index.js'; //引入真实使用的组件
import { SketchPicker } from 'react-color';

function Content() {
    //瀑布流已经有的高度
    var treeHeight = 0;
    //历史路由状态树
    const [routerData, setRouteData] = useState([]);
    //生成状态树
    const [treeData, setTreeData] = useState([]);
    // 声明一个叫 "count" 的 state 变量
    const [phoneIndex, setPhoneIndex] = useState(0);
    //设置样式属性 数组
    const [currentStyle, setCurrentStyle] = useState([]);
    //声明一个当前正在编辑的ID
    const [localDomId, setLocalDomId] = useState('');
    //颜色选择题是否显示
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [{ isOver }, drop] = useDrop({
        accept: ['UseTool.Img', 'text', 'wheel'],
        drop: (item, monitor) => dragEnd(item, monitor),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })
    //拖拽函数
    const dragEnd = (item, monitor) => {
        let phoneNode = document.getElementById('phone_canvas');
        let { x, y } = monitor.getSourceClientOffset();
        let [originY, originX] = [phoneNode.offsetTop, phoneNode.offsetLeft]
        let styleSheet = {
            top: y - originY - treeHeight,
            left: x - originX,
            position: 'absolute'
        }
        treeAdd(item, styleSheet);
        treeHeight += (y - originY - treeHeight + 64);
        console.log(treeHeight);
    }
    //往状态树插入一个div
    const treeAdd = (item, styleSheet) => {
        let node = undefined;
        switch (item.type) {
            case 'UseTool.Img':
                node = UseTool.Img;
            default:
        }
        treeData.push({ name: node, dataAttr: item.dataAttr, id:makeOnlyId(), styleAttr: item.styleAttr, styleSheet: styleSheet, childNode: [] });
        //setTreeData(treeData);
        console.log(treeData);
    }
    //生成唯一ID
    const makeOnlyId=()=>{
        return new Date().getTime()-1000;
    }
    //快速查找某个节点
    const findNode=(id,tree,styleSheet)=>{
        console.log(tree,id);
        if(tree.length===0){
            return tree;
        }
        all:for(let i=0;i<tree.length;i++){
            if(tree[i].id===id){
                tree[i].styleSheet=styleSheet;
                break all;
            }else{
                tree[i].childNode=findNode(id,tree[i].childNode,styleSheet);
            }
        }
        return tree;
    }
    //快速删除某个节点
    //状态树渲染
    const treeRender = (tree) => {
        if (tree.length === 0) {
            return '';
        }
        return tree.map(item => <item.name callback={localEditComponent} dataAttr={item.dataAttr} styleAttr={item.styleAttr} styleSheet={item.styleSheet} key={item.id} localDomId={localDomId} id={item.id} >{treeRender(item.childNode)}</item.name>);

    }
    //点击编辑当前 
    const localEditComponent = (item) => {
        setLocalDomId(item.id);
        let styleSheet = document.getElementById(item.id).style;
        let tempSheet = [];
        for (let i in item.styleAttr) {
            tempSheet.push({
                mean: i,
                lable:item.styleAttr[i].lable,
                value: styleSheet[i],
                type: item.styleAttr[i].type,
                select: item.styleAttr[i].select
            })
        }
        setCurrentStyle(tempSheet);
    }
    //颜色改变 
    const onCompleteColor = (e) => {
        console.log(e);
        currentStyle.background = e.hex;
        setCurrentStyle({ ...currentStyle });
        console.log(currentStyle);
    }

    //显示与否颜色选择器
    const colorPickerHand = (boolen) => {
        setDisplayColorPicker(boolen);
    }

    //设置机型选择菜单
    const menu = (
        <Menu onClick={({ key }) => setPhoneIndex(key)}>
            {PhoneList.map((item, index) => <Menu.Item key={index}>{item.name}</Menu.Item>)}
        </Menu>
    );
    //设置选择框菜单
    const styleMenu = (attr, item) => {
        return <Menu onClick={({ key }) => selectChange(attr, key)}>
            {item.map(itemx => <Menu.Item key={itemx}>{itemx}</Menu.Item>)}
        </Menu>

    }
    //获取当前渲染页面的html
    const getLocalEditHtml = () => {
        console.log(document.getElementById('phone_canvas').innerHTML);
    }
    //编辑当前样式输入框
    const styleChange = (event, mean) => {
        let styleSheet={};
        for(let i in currentStyle){
            if(currentStyle[i].mean===mean){
                currentStyle[i].value=Number(event.target.value)
            }
            styleSheet[currentStyle[i].mean]=currentStyle[i].value;
        }
        setTreeData([].concat(findNode(localDomId,treeData,styleSheet)));
    }
    //编辑当前样式选择框
    const selectChange = (mean, value) => {

        let styleSheet={};
        for (let i in currentStyle) {
            if(currentStyle[i].mean===mean){
                currentStyle[i].value=value;
            }
            styleSheet[currentStyle[i].mean]=currentStyle[i].value;
        }
        setCurrentStyle([].concat(currentStyle));
        setTreeData([].concat(findNode(localDomId,treeData,styleSheet)));

    }
    return <div className="content" id="content">
        <div className="console">
            <div className="btn">上一页</div>
            <Dropdown className="i_lable" overlay={menu} placement="bottomLeft">
                <div onClick={e => e.preventDefault()}>
                    {PhoneList[phoneIndex].name}
                </div>
            </Dropdown>
            <div className="i_info">{PhoneList[phoneIndex].width}</div>
             x &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="i_info">{PhoneList[phoneIndex].height}</div>
            <div className="btn" onClick={getLocalEditHtml} >获取HTML代码</div>
            <div className="btn">预览</div>
        </div>
        <div className="content_panel">
            {/* 功能属性*/}
            <div className="panel_attributes" style={{ marginLeft: 'inherit' }}>

                <div className="panel_head" >功能属性</div>
                <div className="describe">
                    <div className="lable">图片链接：</div>
                    <div className="value"><input /></div>
                </div>
            </div>
            <div className="phone_canvas" id="phone_canvas" ref={drop} style={{ width: PhoneList[phoneIndex].width, height: PhoneList[phoneIndex].height, border: isOver ? '1px solid #e80a0a' : '1px solid #f7f7f7' }}>
                {treeRender(treeData)}
            </div>

            {/* 属性面板 */}
            <div className="panel_attributes">
                <div className="panel_head" >样式属性</div>
                {currentStyle.map(item =>
                    <div className="describe">
                        <div className="lable">{item.lable}：</div>
                        {item.type === 'select' ? <Dropdown className="value" overlay={() => styleMenu(item.mean, item.select)} placement="bottomLeft">
                            <div onClick={e => e.preventDefault()}>
                                {item.value}
                            </div>
                        </Dropdown> : <div className="value" ><input mean={item.mean} onChange={(event) => styleChange(event, item.mean)} /></div>}
                    </div>)}
                <div className="describe">
                    <div className="lable">背景颜色：</div>
                    <div className="value" onClick={() => colorPickerHand(true)}>{currentStyle.background}</div>
                    <div onClick={() => colorPickerHand(true)} style={{ width: 30, height: 30, backgroundColor: currentStyle.background }}></div>
                    {displayColorPicker ? <div style={{ position: 'absolute', top: 50, zIndex: 2 }}>
                        <div style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                        }} onClick={() => colorPickerHand(false)} />
                        <SketchPicker color={currentStyle.background} onChangeComplete={onCompleteColor} />
                    </div> : null}
                </div>

            </div>
        </div>

    </div>
}



export default Content;