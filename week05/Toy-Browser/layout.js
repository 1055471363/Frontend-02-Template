function layout(element) {
    if (!element.computedStyle)
        return

    let elementStyle = getStyle(element)
    if (elementStyle.display !== 'flex')
        return

    let items = element.children.filter(e => e.type === 'element')

    items.sort(function (a, b) {
        return (a.order || 0) - (b.order || 0)
    })

    //主轴 交叉轴的处理
    let style = elementStyle

        ['width', 'height'].forEach(size => {
        if (style[size] === 'auto' || style[size] === '') {
            style[size] = null
        }
    })

    //设置默认值
    if (!style.flexDirection || style.flexDirection === 'auto')
        style.flexDirection = 'row'
    if (!style.alignItems || style.alignItems === 'auto')
        style.alignItems = 'stretch'
    if (!style.justifyContent || style.justifyContent === 'auto')
        style.justifyContent = 'flex-start'
    if (!style.flexWrap || style.flexWrap === 'auto')
        style.flexWrap = 'nowrap'
    if (!style.alignContent || style.alignContent === 'auto')
        style.alignContent = 'stretch'

    let mainSize, // 主轴size width / height
        mainStart, // 主轴起点 left / right / top / bottom
        mainEnd,  // 主轴终点 left / right / top / bottom
        mainSign, // 主轴符号位，用于是否 reverse +1 / -1
        mainBase, // 主轴开始的位置 0 / style.width
        crossSize, // 交叉轴size
        crossStart, // 交叉轴坐标起点
        crossEnd,  // 交叉轴坐标终点
        crossSign,  // 交叉轴符号，用于是否 reverse
        crossBase;  // 交叉轴开始的位置

    if (style.flexDirection === 'row') {
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1;  //强调正一
        mainBase = 0;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    } else if (style.flexDirection === 'row-reverse') {
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    } else if (style.flexDirection === 'column') {
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    } else if (style.flexDirection === 'column-reverse') {
        mainSize = 'height';
        mainStart = 'bottom';
        mainEnd = 'top';
        mainSign = -1;
        mainBase = style.height;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }

    if (style.flexWrap === 'wrap-reverse') {
        let temp = crossStart;
        crossStart = crossEnd;
        crossEnd = temp;
        crossSign = -1;
    } else {
        crossBase = 0;
        crossSign = +1;
    }

    // 收集元素进行
    let isAutoMainSize = false;
    // 没有设置mainSize用子元素撑开
    if (!style[mainSize]) {  // auto sizing
        elementStyle[mainSize] = 0;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const itemStyle = getStyle(item);
            if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)) {
                elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];  // --------------------------------------
            }
        }
        isAutoMainSize = true;
    }

    let flexLine = [];
    const flexLines = [flexLine];

    let mainSpace = elementStyle[mainSize];  // 剩余空间
    let crossSpace = 0;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemStyle = getStyle(item);

        // 单个元素miansize
        if (itemStyle[mainSize] === null) {
            itemStyle[mainSize] = 0;
        }

        if (itemStyle.flex) {
            flexLine.push(item);
        } else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
            mainSpace -= itemStyle[mainSize];
            if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);  // 取最大交叉轴
            }
            flexLine.push(item);
        } else {
            // 当前flex子项，大于flex mainSize，自适应
            if (itemStyle[mainSize] > style[mainSize]) {
                itemStyle[mainSize] = style[mainSize]
            }

            // 当前flex 子项，大于flex容器剩余mainSpace，另起新行
            if (mainSpace < itemStyle[mainSize]) {
                flexLine.mainSpace = mainSpace;
                flexLine.crossSpace = crossSpace;

                // 创建新行
                flexLine = [item];
                flexLines.push(flexLine);

                mainSpace = style[mainSize];
                crossSpace = 0;
            } else {  // 未超过 flex 容器剩余mainSpace添加进行
                flexLine.push(item);
            }

            // 处理交叉轴，只需要取 flex 子项最大 crossSize
            if (itemStyle[crossSize] != null && itemStyle[crossSize] !== (void 0)) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            }

            // flex 剩余容器 mainSpace
            mainSpace -= itemStyle[mainSize];
        }
    }

    //计算主轴
    flexLine.mainSpace = mainSpace;

    if (style.flexWrap === 'nowrap' || isAutoMainSize) {
        flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace;
    } else {
        flexLine.crossSpace = crossSpace;
    }

    if (mainSpace < 0) {
        // 对负的mainSpace, 所有该行flex 子项等比例缩放（未设置 flex-shrink 默认值是1，也就是默认所有的flex子项都会收缩）
        const scale = style[mainSize] / (style[mainSize] - mainSpace);
        let currentMain = mainBase;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const itemStyle = getStyle(item);

            if (itemStyle.flex) {
                itemStyle[mainSize] = 0;
            }

            itemStyle[mainSize] = itemStyle[mainSize] * scale;

            // flex 容器这一行，flex 子项排布
            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd];
        }
    } else {  // 可以容纳
        flexLines.forEach(function (items) {
            const mainSpace = items.mainSpace;
            let flexTotal = 0;

            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const itemStyle = getStyle(item);
                if ((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))) {
                    flexTotal += itemStyle.flex;
                    continue
                }
            }

            if (flexTotal > 0) {  // 填充flexLine 剩余mianSpace 空间
                let currentMain = mainBase;
                for (let i = 0; i < items.length; i++) {
                    const item = items[i]
                    const itemStyle = getStyle(item)

                    if (itemStyle.flex) {
                        itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex
                    }
                    itemStyle[mainStart] = currentMain
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
                    currentMain = itemStyle[mainEnd]
                }

            } else {
                let currentMain, step;
                if (style.justifyContent === 'flex-start') {
                    currentMain = mainBase
                    step = 0
                }
                if (style.justifyContent === 'flex-end') {
                    currentMain = mainSpace * mainSign + mainBase
                    step = 0
                }
                if (style.justifyContent === 'center') {
                    currentMain = mainSpace / 2 * mainSign + mainBase
                    step = 0
                }
                if (style.justifyContent === 'space-between') {
                    step = mainSpace / (items.length - 1) * mainSign
                    currentMain = mainBase
                }
                if (style.justifyContent === 'space-around') {
                    step = mainSpace / items.length * mainSign
                    currentMain = step / 2 + mainBase
                }
                if (style.justifyContent === 'space-evenly') {
                    step = mainSpace / (items.length + 1) * mainSign
                    currentMain = step + mainBase
                }
                for (let i = 0; i < items.length; i++) {
                    const item = items[i]
                    itemStyle[mainStart] = currentMain
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
                    currentMain = itemStyle[mainEnd] + step
                }
            }
        })
    }

    //计算交叉轴
    if (!style[crossSize]) {  // 交叉轴，crossSize 未设定时默认为 count flexLines 每行最大crossSpace之和
        crossSpace = 0;
        elementStyle[crossSize] = 0;
        for (let i = 0; i < flexLines.length; i++) {
            elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace;
        }
    } else {  // 设定后，计算出最终的crossSpace 为crossSpace 减去每行最大crossSpace 剩余空间，用作分配
        crossSpace = style[crossSize];
        for (let i = 0; i < flexLines.length; i++) {
            crossSpace -= flexLines[i].crossSpace;
        }
    }

    if (style.flexWrap === 'wrap-reverse') {
        crossBase = style[crossSize]
    } else {
        crossBase = 0;
    }

    let lineSize = style[crossSize] / flexLines.length;  // 行高
    let step;

    if (style.alignContent === 'flex-start') {
        crossBase += 0;
        step = 0
    }
    if (style.alignContent === 'flex-end') {
        crossBase += crossSign * crossSpace
        step = 0
    }
    if (style.alignContent === 'center') {
        crossBase += crossSign * crossSpace / 2
        step = 0
    }
    if (style.alignContent === 'space-between') {
        crossBase += 0
        step = crossSpace / (flexLines.length - 1)
    }
    if (style.alignContent === 'space-around') {
        step = crossSpace / (flexLines.length)
        crossBase += crossSign * step / 2
    }
    if (style.alignContent === 'stretch') {
        crossBase += 0
        step = 0
    }

    flexLines.forEach(function (items) {
        let lineCrossSize = style.alignContent === 'stretch' ?  // 拉伸flex子项，填满交叉轴
            items.crossSpace + crossSpace / flexLines.length :
            items.crossSpace

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const itemStyle = getStyle(item);
            const align = itemStyle.alignSelf || style.alignItems;  // align-self 指控制单独某一个flex子项的垂直对齐方式
            // align-items属性，表示子项们   没有指定尺寸
            if (itemStyle[crossSize] === null) {
                itemStyle[crossSize] = (align === 'stretch') ? lineCrossSize : 0;
            }

            if (align === 'flex-start') {
                itemStyle[crossSize] = crossBase;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }

            if (align === 'flex-end') {
                itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
                itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
            }

            if (align === 'center') {
                itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }

            if (align === 'stretch') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) ?
                    itemStyle[crossSize] : lineCrossSize)

                itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart])
            }

        }
        crossBase += crossSign * (lineCrossSize + step);
    })
    console.log(items)

}

//预处理
function getStyle(element) {
    if (!element.style)
        element.style = {}

    for (const prop in element.computedStyle) {
        let p = element.computedStyle.value
        element.symbol[prop] = element.computedStyle[prop].value

        if (element.style[prop].toString().match(/px$/)) {
            element.style[prop] = parseInt(element.style[prop])
        }
        if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
            element.style[prop] = parseInt(element.style[prop])
        }
    }
    return element.style
}

module.exports = layout;
