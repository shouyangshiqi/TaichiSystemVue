<template>
  
  <div class="home-page">
    <div class="header">
      <h1>体育动作展示系统</h1>
      <div>
        <el-button type="primary" @click="$router.push('/upload')" style="margin-right: 10px;">
          上传资源
        </el-button>
        <el-button @click="logout">Logout</el-button>
      </div>
    </div>
    
     <!-- 轮播图区域 -->
    <div class="carousel-section">
      <el-carousel 
        :interval="5000" 
        height="300px"
        :autoplay="true"
        indicator-position="outside">
        <el-carousel-item v-for="item in carouselImages" :key="item.id">
          <div class="carousel-content">
            <div class="carousel-image">
              <img :src="item.image" :alt="item.name" />
            </div>
            <div class="carousel-info">
              <h2>{{ item.name }}</h2>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    
    <!-- 分类展示区域 -->
    <div class="categories-container">
      <div v-for="category in categories" :key="category.id" class="category-section">
        <div class="category-header">
          <h2>{{ category.name }}</h2>
          <!-- <el-button link type="primary" @click="viewAll(category)">查看全部</el-button> -->
        </div>
        
        <div class="category-content">
          <el-card 
            class="image-card" 
            v-for="item in category.images" 
            :key="item.id"
            @click="viewDetails(category)"
          >
            <div class="image-container">
              <img :src="item.image" :alt="item.name" />
            </div>
            <div class="card-info">
              <h4>{{ item.name }}</h4>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import loginBg from '@/assets/login-bg.jpg'
import { getCarouselImages,  getCategories} from '@/api/data'

const router = useRouter()


// 轮播图数据
const carouselImages = ref([])

// 分类数据
const categories = ref([])

// 获取首页数据
const fetchHomeData = async () => {
  try {
    // 获取轮播图数据
    const carouselResponse = await getCarouselImages()
    carouselImages.value = carouselResponse.result
    
    // 获取分类数据
    const categoriesResponse = await getCategories()
    categories.value = categoriesResponse.result
  } catch (error) {
    console.error('获取首页数据失败:', error)
    ElMessage.error('数据加载失败')
  }
}

// 在脚本部分的最后添加
onMounted(() => {
  fetchHomeData()
})

// 查看详情
const viewDetails = (category) => {
  window.open(`/exhibition?itemId=${category.id}`, '_blank');
}

// 查看全部
const viewAll = (category) => {
  router.push(`/category/${category.id}`)
}

// 登出
const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>

/* 优化轮播图区域样式 */
.carousel-section {
  margin: 20px 0 40px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15); /* 增强阴影效果 */
}

.carousel-content {
  display: flex;
  height: 100%;
  /* 更换为更柔和的渐变背景，增强与图片的融合度 */
  background: linear-gradient(135deg, rgba(245, 247, 250, 0.9), rgba(221, 226, 232, 0.9));
  position: relative;
}

/* 添加伪元素营造光影效果 */
.carousel-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%);
  pointer-events: none;
}

.carousel-image {
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8); /* 添加白色半透明背景 */
  border-radius: 8px; /* 添加圆角 */
  margin: 20px; /* 添加边距 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

.carousel-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.6s ease;
}

.el-carousel__item:hover .carousel-image img {
  transform: scale(1.05);
}

.carousel-info {
  flex: 1;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #333; /* 调整文字颜色，增强可读性 */
  height: 100%;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5); /* 添加文字阴影 */
}

.carousel-info h2 {
  margin-bottom: 15px;
  font-size: 28px;
  color: #2c3e50; /* 调整标题颜色 */
}

.carousel-info p {
  font-size: 16px;
  line-height: 1.6;
  color: #555; /* 调整描述文字颜色 */
}

/* 响应式设计 */
@media (max-width: 768px) {
  .carousel-content {
    flex-direction: column;
    height: auto;
  }
  
  .carousel-image {
    margin: 10px;
  }
  
  .carousel-info {
    padding: 20px;
  }
  
  .carousel-info h2 {
    font-size: 24px;
  }
  
  .carousel-info p {
    font-size: 14px;
  }
}

/** Home 样式 */

.home-page {
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.header h1 {
  margin: 0;
  color: #303133;
}


/* 分类区域样式 */
.categories-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.category-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.category-header h2 {
  margin: 0;
  color: #303133;
}

.category-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.image-card {
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.image-container {
  height: 180px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-card:hover .image-container img {
  transform: scale(1.05);
}

.card-info {
  padding: 15px;
}

.card-info h4 {
  margin: 0 0 8px 0;
  color: #303133;
  font-size: 16px;
}

.card-info p {
  margin: 0;
  color: #909399;
  font-size: 13px;
  line-height: 1.4;
}
</style>