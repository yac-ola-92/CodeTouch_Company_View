<script>
export default{
  data() {
        return {
          showlogin: true,
        };
    },
    mounted(){
        const token = localStorage.getItem("AuthToken");
        if(token){
          this.showlogin = false;
        }else{
          this.showlogin = true;
        }
    },
}
</script>

<template>
  <header class="header">
    <nav class="navbar">
      <div class="container">
        <a href="/" class="navbar-brand">
          <img
            src="/images/CodeTouchTextFlex.png"
            width="100px"
            height="80px"
          />
        </a>
        <ul class="nav-menu">
          <li><router-link to="/introduce">기능소개</router-link></li>
          <li><a href="/pricing">템플릿</a></li>
          <li><router-link to="/payment">요금</router-link></li>
          <li><a href="/partner">팀원소개</a></li>
        </ul>
        <div class="auth-buttons">

          <div class="login-container" v-if="!showlogin">
            <div class="login-text">내 사이트</div>
            <div class="login-circle"></div>
          </div>
          <router-link to="/login" v-if="showlogin">
            <button class="btn btn-outline">로그인</button>
          </router-link>
          </div>
        
      </div>
    </nav>
  </header>
</template>

<style scoped>
        .login-container {
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .login-text {
            font-size: 14px;
            color: #333;
            font-weight: 500;
        }

        .login-circle {
            width: 24px;
            height: 24px;
            background-color: #e0e0e0;
            border-radius: 50%;
        }

.header {
  position: sticky;
  top: 0;
  background-color: #fbf6fd;
  z-index: 1000;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.container {
  width: 100%;
  margin: 0;
  padding: 0 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  list-style-type: none;
  margin: 0 0 0 2rem;
  padding: 0;
}

.nav-menu li {
  margin-right: 1.5rem;
}

.nav-menu li a {
  color: #333;
  text-decoration: none;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
  margin-left: auto;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #df9aff;
  color: #d651ff;
}

.btn-outline:hover {
  background-color: #d651ff; /* 보라색 배경 */
  color: #ffffff; /* 텍스트를 흰색으로 변경 */
  border-color: #d651ff; /* 테두리도 보라색으로 */
}

.btn-primary {
  background-color: #007bff;
  border: 1px solid #007bff;
  color: #ffffff;
}
</style>
