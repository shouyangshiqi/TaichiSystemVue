<template>
  <div class="register-page">
    <div class="background-image">
      <img src="@/assets/register-bg.jpg" alt="注册背景图">
    </div>
    
    <div class="overlay"></div>
    
    <div class="content-wrapper">
      <div class="form-container">
        <div class="form-header">
          <h2>用户注册</h2>
          <p>创建新账号，开始您的体验</p>
        </div>
        
        <el-form 
          :model="registerForm" 
          :rules="rules" 
          ref="registerFormRef"
          @submit.native.prevent="handleRegister"
          class="register-form"
        >
          <el-form-item prop="username">
            <el-input 
              v-model="registerForm.username" 
              placeholder="请输入用户名"
              prefix-icon="User"
              size="large"
              clearable
            />
          </el-form-item>
          
          <el-form-item prop="password">
            <el-input 
              v-model="registerForm.password" 
              type="password"
              placeholder="请输入密码"
              prefix-icon="Lock"
              size="large"
              show-password
            />
          </el-form-item>
          
          <el-form-item prop="confirmPassword">
            <el-input 
              v-model="registerForm.confirmPassword" 
              type="password"
              placeholder="请确认密码"
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
              class="register-button"
            >
              注册
            </el-button>
          </el-form-item>
        </el-form>
        
        <div class="form-footer">
          <span>已有账号？</span>
          <el-button type="text" @click="goToLogin">立即登录</el-button>
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
import { register } from '@/api/auth.js'

const router = useRouter()
const registerFormRef = ref()
const loading = ref(false)

const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, message: '用户名长度不能少于3位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 4, message: '密码长度不能少于4位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const handleRegister = async () => {
  try {
    // 注册前清除可能存在的旧token
    localStorage.removeItem('token')

    const valid = await registerFormRef.value.validate()
    
    if (valid) {
      loading.value = true
      // 调用真实的注册API
      const res = await register({
        username: registerForm.username,
        password: registerForm.password
      })
      console.log("注册返回信息0", res)
      if (res.code === 0) {
        ElMessage.success('注册成功')
        console.log('注册成功，跳转到登录页')
        router.push('/login')
      }else{
        ElMessage.error(`注册失败: ${res.msg || '未知错误'}`)
      }
      loading.value = false
    }
  } catch (error) {
    console.error('注册失败:', error)
    ElMessage.error('注册失败')
    loading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.register-page {
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

.register-form :deep(.el-form-item) {
  margin-bottom: 24px;
}

.register-form :deep(.el-input__wrapper) {
  border-radius: 8px;
  padding: 2px 12px;
}

.register-button {
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