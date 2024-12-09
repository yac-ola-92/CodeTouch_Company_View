<script>
import axios from 'axios';
const { IMP } = window;  

export default {
    data() {
        return {
            activeTab: '아이디 찾기', // 현재 활성화된 탭
            imp_uid:'',
        };
    },
    methods: {
        switchTab(tabName) {
            this.activeTab = tabName; // 탭 전환
        },
        certification(){
        IMP.certification(
            {},
            function(rep){
              if(rep.success){
                console.log("성공!");
                this.imp_uid= rep.imp_uid;

                // 서버에서 해당 유저 id 찾아주기
                this.axios.get(`pass/certifications/${this.imp_uid}`,
                    { withCredentials: true }
                )
                .then(response => {
                  console.log(response.data);
                })
                .catch(error => {
                  console.error(error);
                });
                }
                    else{
                        alert("실패!!" + rep.error_msg);
                    }
                }
            )
        },
    },
    mounted() {
        if(IMP){
            IMP.init("imp22383085");                    // 결제 대행사에서 발급받은 아이디
        }else{
            console.log("SDK 로드 안됨.");
        }
    },    
};
</script>

<template>
    <div class="container">
        <header class="header">
            <svg class="header-icon" viewBox="0 0 24 24" fill="#2196f3">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <h1 class="header-title">아이디·비밀번호 찾기</h1>
        </header>

        <div class="tabs">
            <a href="#" 
               class="tab" 
               :class="{ active: activeTab === '아이디 찾기' }"
               @click.prevent="switchTab('아이디 찾기')">
               아이디 찾기
            </a>
            <a href="#" 
               class="tab" 
               :class="{ active: activeTab === '비밀번호 찾기' }"
               @click.prevent="switchTab('비밀번호 찾기')">
               비밀번호 찾기
            </a>
        </div>

        <!-- 아이디 찾기 콘텐츠 -->
        <div class="content" v-show="activeTab === '아이디 찾기'">
            <p class="description">아이디를 찾으시려면<br>본인인증을 진행해 주세요</p>
            <button class="button outline" @click="certification">본인인증</button>
        </div>

        <!-- 비밀번호 찾기 콘텐츠 -->
        <div class="content" v-show="activeTab === '비밀번호 찾기'">
            <p class="description">비밀번호를 찾고자하는<br>이메일을 입력해주세요</p>
            <input type="email" class="input-field" placeholder="example@imweb.me">
            <button class="button">비밀번호 찾기</button>
        </div>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: #fff;
}

.container {
    width: 100%;
    max-width: 400px;
    padding: 40px 20px;
}

.header {
    text-align: center;
    margin-bottom: 40px;
}

.header-icon {
    width: 48px;
    height: 48px;
    margin-bottom: 16px;
}

.header-title {
    font-size: 20px;
    font-weight: 600;
    color: #333;
}

.tabs {
    display: flex;
    margin-bottom: 40px;
    border-bottom: 1px solid #eee;
}

.tab {
    flex: 1;
    padding: 16px;
    text-align: center;
    cursor: pointer;
    color: #666;
    text-decoration: none;
}

.tab.active {
    color: #333;
    font-weight: 600;
    border-bottom: 2px solid #333;
}

.content {
    text-align: center;
}

.description {
    margin-bottom: 20px;
    color: #333;
    font-size: 15px;
    line-height: 1.5;
}

.input-field {
    width: 100%;
    padding: 12px;
    margin-bottom: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.input-field::placeholder {
    color: #999;
}

.button {
    width: 100%;
    padding: 14px;
    background-color: #18171c;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
}

.button.outline {
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    color: #333;
}
</style>
