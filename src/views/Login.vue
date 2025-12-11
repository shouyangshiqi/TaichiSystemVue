<template>
  <div class="login-page">
    <div class="background-image">
      <img src="@/assets/login-bg.jpg" alt="登录背景图">
    </div>
    
    <div class="overlay"></div>
    
    <div class="content-wrapper">
      <div class="form-container">
        <div class="form-header">
          <h2>体育动作展示系统登录</h2>
          <p>欢迎回来，请输入您的账号信息</p>
        </div>
        
        <el-form 
          :model="loginForm" 
          :rules="rules" 
          ref="loginFormRef"
          @submit.native.prevent="handleLogin"
          class="login-form"
        >
          <el-form-item prop="username">
            <el-input 
              v-model="loginForm.username" 
              placeholder="请输入用户名"
              prefix-icon="User"
              size="large"
              clearable
            />
          </el-form-item>
          
          <el-form-item prop="password">
            <el-input 
              v-model="loginForm.password" 
              type="password"
              placeholder="请输入密码"
              prefix-icon="Lock"
              size="large"
              show-password
            />
          </el-form-item>
          
          <el-form-item>
            <el-button 
              type="primary" 
              native-type="submit"
              size="large"
              :loading="loading"
              class="login-button"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
        
        <div class="form-footer">
          <span>还没有账号？</span>
          <el-button type="text" @click="goToRegister">立即注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { login } from '@/api/auth.js'

const router = useRouter()
const loginFormRef = ref()
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 4, message: '密码长度不能少于4位', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  try {
    // 登录前清除可能存在的旧token
    localStorage.removeItem('token')

    const valid = await loginFormRef.value.validate()
    if (valid) {
      loading.value = true
      // 调用真实的登录API
      const res = await login(loginForm)
      console.log(res)
      if (res.code === 0) {
        ElMessage.success('登录成功')
        localStorage.setItem('token', res.result.token)
        router.push('/home')
      }else{
        ElMessage.error(res.msg)
      }
      loading.value = false
    }
  } catch (error) {
    ElMessage.error('登录失败，请检查用户名和密码')
    loading.value = false
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.background-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2;
}

.content-wrapper {
  position: relative;
  z-index: 3;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.form-container {
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 40px 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
}

.form-header h2 {
  font-size: 28px;
  color: #303133;
  margin-bottom: 10px;
  font-weight: 600;
}

.form-header p {
  font-size: 14px;
  color: #909399;
}

.login-form :deep(.el-form-item) {
  margin-bottom: 24px;
}

.login-form :deep(.el-input__wrapper) {
  border-radius: 8px;
  padding: 2px 12px;
}

.login-button {
  width: 100%;
  margin-top: 10px;
  border-radius: 8px;
  height: 48px;
  font-size: 16px;
}

.form-footer {
  text-align: center;
  margin-top: 20px;
  color: #606266;
  font-size: 14px;
}

@media (max-width: 768px) {
  .form-container {
    margin: 10px;
    padding: 30px 20px;
  }
}

@media (max-width: 480px) {
  .form-header h2 {
    font-size: 24px;
  }
  
  .form-container {
    padding: 25px 15px;
  }
}
</style>