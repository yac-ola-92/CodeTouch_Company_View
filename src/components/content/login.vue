<script>
import axios from 'axios';
import CryptoJS from 'crypto-js';

const secretKey = 'codetouchPWhashKey'; // 대칭키

export default {
    data() {
        return {
            email: "",
            password: "",
            hashedPassword: "",
            emailError: null,
            passwordError: null,
            googleUser: {},
            remember: false,
        };
    },
    mounted(){
        this.googleInit();
        
        const email = localStorage.getItem('email');
        const pw = localStorage.getItem('pw');

        if (email === !null){
            this.email = email;
            this.pw = this.decrypt(pw);
            this.remember = true;
        }
    },
    methods: {
        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.email) {
                this.emailError = "이메일을 입력해주세요.";
            } else if (!emailRegex.test(this.email)) {
                this.emailError = "유효한 이메일 형식을 입력해주세요.";
            } else {
                this.emailError = null;
            }
        },
        validatePassword() {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
            if (!this.password) {
                this.passwordError = "비밀번호를 입력해주세요.";
            } else if (!passwordRegex.test(this.password)) {
                this.passwordError = "비밀번호는 6자리 이상, 숫자와 영어 조합이어야 합니다.";
            } else {
                this.passwordError = null;
            }
        },
        validateForm() {
            this.validateEmail();
            this.validatePassword();

            if (!this.emailError && !this.passwordError) {
                axios.get(`/`, 
                { withCredentials: true })
                .then(response => {
                    if(response.status == 200){
                        console.log(response.data);
                        if(this.remember){
                            localStorage.setItem('email', this.email); 
                            localStorage.setItem('pw', this.hashPassword(this.password));
                        }
                    }
                })
                .catch(error => {
                  console.error(error);
                });
            }
        },
        hashPassword(data){
            return CryptoJS.AES.encrypt(data, secretKey).toString();
        },
        decrypt(data){
            const bytes = CryptoJS.AES.decrypt(data, secretKey);
            return bytes.toString(CryptoJS.enc.Utf8);
        },
        googleInit(){
            const google = window.google;
                google.accounts.id.initialize({
                    client_id: "658713303257-brn65aovf2r5mmeb0d1aijftdihd7uqe.apps.googleusercontent.com",
                    callback: this.googleCallback,
                });

                // 버튼 렌더링
                google.accounts.id.renderButton(
                    document.getElementById("G_OAuth_btn"), // 버튼이 렌더링될 엘리먼트
                    {
                        theme: "outline", // 테마 설정
                        size: "large",    // 버튼 크기 설정
                    }
                );
                
                document.getElementById("G_OAuth_btn").classList.add("google-button-custom");
        },
        googleCallback(res){
            console.log("res: ", res);

            console.log(res.credential);
        }
    }
};
</script>

<template>
    <div class="container">
        <div class="login-form">
            <div class="logo">
                <router-link to="/">
                    <img src="/images/CodeTouchBWNoText.png" alt="로고">
                </router-link>
            </div>
            <h1>로그인하고 나만의 브랜드를<br>시작해 보세요</h1>
            <form @submit.prevent="validateForm">
                <input 
                    type="email" 
                    placeholder="example@imweb.me" 
                    v-model="email"
                    @blur="validateEmail"
                    :class="{ 'invalid': emailError }" 
                    required
                >
                <span v-if="emailError" class="error">{{ emailError }}</span>
                
                <input 
                    type="password" 
                    placeholder="••••••••" 
                    v-model="password"
                    @blur="validatePassword"
                    :class="{ 'invalid': passwordError }" 
                    required
                >
                <span v-if="passwordError" class="error">{{ passwordError }}</span>

                <div class="form-footer">
                    <label>
                        <input type="checkbox" id="remember" v-model="remember">
                        <span>로그인 유지</span>
                    </label>
                    <router-link to="/findInfo">아이디·비밀번호 찾기</router-link>
                </div>
                <button type="submit">로그인</button>
            </form>
            <div class="divider">또는</div>
            <div>
                <div class="G_btn_class">
                    <div id="G_OAuth_btn"></div>
                </div>    
            </div>
            <p class="signup-link">
                아직 아이디가 없으신가요? <router-link to="/singup">회원가입</router-link>
            </p>
        </div>
    </div>
</template>

<style scoped>
.G_btn_class{
    display: flex; /* Flexbox 설정 */
    justify-content: center; /* 가로 정렬 */
    align-items: center; /* 세로 정렬 */
}
.container {
    width: 100%;
    max-width: 400px;
    padding: 20px;
}

.login-form {
    text-align: center;
}

.logo img {
    width: 128px;
    height: 128px;
    margin-bottom: 20px;
}

h1 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 30px;
}

form {
    display: flex;
    flex-direction: column;
}

input[type="email"],
input[type="password"] {
    height: 48px;
    padding: 0 15px;
    margin-bottom: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 16px;
}

.form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    font-size: 14px;
}

.form-footer label {
    display: flex;
    align-items: center;
}

.form-footer input[type="checkbox"] {
    margin-right: 5px;
}

.forgot-password {
    color: #666;
    text-decoration: none;
}

button[type="submit"] {
    height: 48px;
    background-color: #000000;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}

.divider {
    position: relative;
    text-align: center;
    margin: 30px 0;
}

.divider::before,
.divider::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background-color: #e0e0e0;
}

.divider::before {
    left: 0;
}

.divider::after {
    right: 0;
}

.kakao { background-color: #FEE500; }
.naver { background-color: #03C75A; }
.facebook { background-color: #1877F2; }
.google { 
    background-color: #ffffff;
    border: 1px solid #e0e0e0 !important;
}

.signup-link {
    font-size: 14px;
    color: #666;
}

.signup-link a {
    color: #1877F2;
    text-decoration: none;
}

.invalid {
    border: 1px solid red;
}
.error {
    color: red;
    font-size: 12px;
    display: block;
    padding-bottom: 5px;
}

</style>