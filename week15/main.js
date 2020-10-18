import { createElement } from "./framework.js";
import { Carousel } from "./Carousel.js";
import { Button } from "./Button.js";
import { List } from "./List.js";
// import {
//     TimeLine,
//     Animation
// } from './animation.js'

let d = [
  {
    img: "http://art25.photozou.jp/pub/530/263530/photo/54773394.jpg",
    url: "https://time.geekbang.org/",
    title: "1",
  },
  {
    img: "https://ranking.xgoo.jp/tool/images/column/2020/01/0128_9.jpg",
    url: "https://time.geekbang.org/",
    title: "2",
  },
  {
    img:
      "http://i2.sinaimg.cn/bj/p/2008-07-28/U2285P52T4D174043F159DT20080728173551.jpg",
    url: "https://time.geekbang.org/",
    title: "3",
  },
  {
    img:
      "https://tse3-mm.cn.bing.net/th/id/OIP.dmeW_ZESlpuSd0OHXABX3wHaFG?pid=Api&rs=1",
    url: "https://time.geekbang.org/",
    title: "4",
  },
];
/*
let a = <Carousel src={d} onChange={event => console.log(event.detail.position)} onClick={event => window.location.href =event.detail.data.url}/>;*/

let a = (
  <List data={d}>
    {(recode) => (
      <div>
        <img src={recode.img}></img>
        <a href={recode.url}>{recode.title}</a>
      </div>
    )}
  </List>
);
a.mountTo(document.body);
