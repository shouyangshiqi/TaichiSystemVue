// src/exhibition/test.js
import "./index.less";
import * as THREE from "three";
import VRHall from "../vrhall";
import Zoomtastic from "zoomtastic";
import { data } from "./pictures2.js";
// 因为模型所需，正常的gltf模型是不需要手动设置贴图的，这里是网上找的模型
import * as m from "./materls.ts";
import { getExhibitionData } from '@/api/data';

// 导出初始化函数，接收container和itemId参数
export async function initExhibition(container, itemId) {

  console.log(self.crossOriginIsolated);
  console.log('Loading exhibition for item:', itemId);
  let apiData = null;
  try {
    const res = await getExhibitionData(itemId);
    apiData = res && (res.result || res.data || res);
  } catch (err) {
    console.error('getExhibitionData failed:', err);
  }
  console.log('apiData:', apiData);
  
  // const data  = res.images;
  // const models = res.models;

  // 实例化
  const vr = new VRHall({
    debugger: false, // 开启调试模式
    maxSize: 20, // 画框最大尺寸
    movieHight: 3, // 移动的高度
    container: container,
    cameraOption: {
      position: { x: 16.928, y: 2, z: 0.699 },
      lookAt: { x: -30.551, y: 2, z: 1.096 },
    },
    onClick: (item) => {
      console.log("你点击了", item);
      if (item.url) {
        Zoomtastic.show(item.url);
      }
    },
  });

  Zoomtastic.mount();

  // 加载厅模型
  vr.loadHall({
    url: "./assets/room2/dm.glb",
    planeName: "dm",
    position: { x: 0, y: 0, z: 0 },
    scale: 1,
    onProgress: (p) => {
      console.log("加载进度", p);
    },
  })
  .then((gltf) => {
    // 设置材质
    const dm_OBJ = gltf.scene.getObjectByName("dm");
    dm_OBJ.material = m.dm_M;
    const dm2_OBJ = gltf.scene.getObjectByName("dm2");
    dm2_OBJ.material = m.wall_M;
    const qiang5_OBJ = gltf.scene.getObjectByName("qiang5");
    qiang5_OBJ.material = m.qiang5_M;
    const huaqiang1_OBJ = gltf.scene.getObjectByName("huaqiang1");
    huaqiang1_OBJ.material = m.huaqiang1_M;
    const huaqiang3_OBJ = gltf.scene.getObjectByName("huaqiang3");
    huaqiang3_OBJ.material = m.huaqiang3_M;
    const huaqiang2_OBJ = gltf.scene.getObjectByName("huaqiang2");
    huaqiang2_OBJ.material = m.huaqiang2_M;
    const qiang2_OBJ = gltf.scene.getObjectByName("qiang2");
    qiang2_OBJ.material = m.qiang2_M;
    const qiang3_OBJ = gltf.scene.getObjectByName("qiang3");
    qiang3_OBJ.material = m.qiang3_M;
    const qiang1_OBJ = gltf.scene.getObjectByName("qiang1");
    qiang1_OBJ.material = m.qiang1_M;
    const men2_OBJ = gltf.scene.getObjectByName("men2");
    men2_OBJ.material = m.men2_M;
    const chuanghu_OBJ = gltf.scene.getObjectByName("chuanghu");
    chuanghu_OBJ.material = m.chuanghu_M;
    const dingtiao_OBJ = gltf.scene.getObjectByName("dingtiao");
    dingtiao_OBJ.material = m.dingtiao_M;
    const dingbian_OBJ = gltf.scene.getObjectByName("dingbian");
    dingbian_OBJ.material = m.dingbian_M;
    const dizuo1_OBJ = gltf.scene.getObjectByName("dizuo1");
    dizuo1_OBJ.material = m.dizuo1_M;
    const qiang4_OBJ = gltf.scene.getObjectByName("qiang4");
    qiang4_OBJ.material = m.qiang4_M;
    const cebaiqiang_OBJ = gltf.scene.getObjectByName("cebaiqiang");
    cebaiqiang_OBJ.material = m.ding_M;
    const boli1_OBJ = gltf.scene.getObjectByName("boli1");
    boli1_OBJ.material = m.boli1_M;
    const deng_OBJ = gltf.scene.getObjectByName("deng");
    deng_OBJ.material = m.deng_M;
    const ding_OBJ = gltf.scene.getObjectByName("ding");
    ding_OBJ.material = m.ding_M;
    const baiding_OBJ = gltf.scene.getObjectByName("baiding");
    baiding_OBJ.material = m.baiding_M;

    // 自定义info
    const info3d = gltf.scene.getObjectByName("jianjieqiang");
    info3d.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: new THREE.TextureLoader().load("./assets/pictures2/main2.png"),
    });
  });


  // 加载高斯模型
  apiData.forEach((item) => {
    vr.loadGaussianSplat({
      url: item.modelObjectKey,
      position: [item.positionX, item.positionY, item.positionZ],
      rotation: [item.rotationX, item.rotationY, item.rotationZ, item.rotationW],
      scale: [item.scaleX, item.scaleY, item.scaleZ],
      splatAlphaRemovalThreshold: 5,
    });
  });

  
  
  vr.moveTo({ x: 13.06, y: 5, z: -5 }, { x: 13.06, y: 2.84, z: 1.04 });

  // 加载画框数据
  vr.loadItems(data);

  // 导览点
  let shtml = "";
  data.forEach((d) => {
    shtml += `<li class="item" data-id="${d.id}">展品:${d.id}</li>`;
  });

  // 确保DOM元素存在
  if (document.querySelector(".view")) {
    document.querySelector(".view").innerHTML = shtml;

    document.querySelectorAll(".item").forEach((target) => {
      target.addEventListener("click", () => {
        const id = target.dataset.id;
        vr.viewItem(id);
      });
    });
  }
}

// 保持原有的window.onload逻辑以兼容直接打开页面的方式
if (typeof window !== 'undefined' && document.getElementById("root")) {
  window.onload = function () {
    initExhibition(document.getElementById("root"));
  };
}