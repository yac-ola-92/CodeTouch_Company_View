<script>
import axios from 'axios';
const { IMP } = window;       

export default {
  data() {
    return{
      imp_uid: null,
      userName: '',
      userPhone: '',
      userBirth: '',
      userGender: 0,
      verification: false,
      emailError: '',
      passwordError: '',
      email: '',
      password: '',
      checkPassword: '',
      checkPasswordError: '',
    	agreeCheckList: ["terms", "privacy"],	// 비교를 위한 전체 CheckList 변수
    	agreeChecked: [],			// 체크 된 목록을 담을 배열 변수
    }
  },
  computed:{
    agreeAll:{
      get() {
        return this.agreeCheckList.length == this.agreeChecked.length;
      },
      set(event){
        this.agreeChecked = event? this.agreeCheckList:[];
      },
    },
    isSubmitDisabled() {
      return this.agreeCheckList.length !== this.agreeChecked.length;
    },
  },
  mounted() {
    if(IMP){
        IMP.init("imp22383085");                    // 결제 대행사에서 발급받은 아이디
    }else{
        console.log("SDK 로드 안됨.");
    }
  },
  methods: {
    submitForm() {
      // 폼 검증
      this.validateEmail();
      this.validatePassword();
      this.confirmPassword();

      if (this.emailError || this.passwordError || this.checkPasswordError) {
        alert('폼을 올바르게 작성해주세요.');
        return;
      }

      if (!this.agreeAll) {
        alert('약관에 동의해주세요.');
        return;
      }

      const requestData = {
        email: this.email,
        name: this.userName,
        nickname: this.$refs.nickname.value,
        password: this.password,
        phone: this.userPhone,
        birth: this.userBirth,
        gender: this.userGender,
      };

      console.log(requestData);

      axios.post(`http://192.168.5.10:8888/회사/회원/회원가입`, 
      requestData,
      { withCredentials: true }
      )
            .then(response => {
              if(response.status == 200){
                this.$router.push('/login');
              }
            })
            .catch(error => {
              console.error(error);
            });
    },
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
        confirmPassword(){
          if (this.password != this.checkPassword){
            this.checkPasswordError = "비밀번호가 일치하지 않습니다.";
          } else {
                this.checkPasswordError = null;
          }
        },
        certification(){
          IMP.certification(
            {},
            (rep) => {
              if(rep.success){
                this.verification = true;
                this.imp_uid= rep.imp_uid;

                axios.get(`http://192.168.5.10:8888/패스/인증/${this.imp_uid}`, { withCredentials: true })
                .then(response => {
                  const user = response.data.data;
                  this.userName = user.name;
                  this.userPhone = user.phone;
                  this.userBirth = user.birth;
                  this.userGender = user.gender;
                })
                .catch(error => {
                  console.error(error);
                });
              }
              else{
                console.log("테스트 3");
              }
            }
          )
        }
      },
      checkAll() {
        const isChecked = event.target.checked; // 전체 동의 체크박스 상태
        this.agreeTerms = isChecked;
        this.agreePrivacy = isChecked;
    },

      updateAgreeAll() {
        this.agreeAll = this.agreeTerms && this.agreePrivacy;
      },
    }
</script>

<template>
<div>
  <div class="form-header">   
    <h1>이메일 회원가입</h1>
  </div>

  <div class="form-container">
    <form @submit.prevent="submitForm">
      <!-- 이메일 -->
      <div class="mb-3">
        <div class="input-font">이메일</div>
        <input 
          type="email"
          id="email"
          name="email"
          placeholder="이메일을 입력하세요"
          @blur="validateEmail"
          :class="{ 'invalid': emailError }" 
          v-model="email"
          required
        >
        <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>

      <!-- 닉네임 -->
      <div class="mb-3">
        <div class="input-font">닉네임</div>
        <input type="text" ref="nickname" id="nickname" name="nickname" placeholder="닉네임을 입력하세요" required>
      </div>

      <!-- 비밀번호 -->
      <div class="mb-3">
        <div class="input-font">비밀번호</div>

        <input 
        type="password" 
        id="password" 
        name="password" 
        placeholder="비밀번호를 입력하세요" 
        @blur="validatePassword"
        :class="{ 'invalid': passwordError }" 
        v-model="password"
        required>

        <span v-if="passwordError" class="error">{{ passwordError }}</span>
      </div>

      <!-- 비밀번호 확인 -->
      <div class="mb-3">
        <input 
        type="password" 
        id="confirm-password" 
        name="confirm-password" 
        placeholder="비밀번호를 다시 입력하세요" 
        v-model="checkPassword"
        @blur="confirmPassword"
        required>

        <span v-if="checkPasswordError" class="error">{{ checkPasswordError }}</span>
      </div>

      <!-- 본인 인증 -->
      <div class="mb-3" v-if="!verification">
        <div class="input-font">본인 인증</div>
        <div class="form-row">
          <button type="button" class="btn btn-outline-secondary" @click="certification">본인 인증</button>
        </div>
      </div>

      <!-- 이름과 전화번호 -->
      <div class="form-col is-verification" v-if="verification">
        <div class="mb-3">
          <div class="input-font">이름</div>
          <input type="text" id="name" name="name" v-model="userName" placeholder="이름을 입력하세요">
        </div>
        <div class="mb-3">
          <div class="input-font">전화번호</div>
          <input type="text" id="phone" name="phone" v-model="userPhone" placeholder="번호를 입력하세요">
        </div>
      </div>

      <!-- 약관 -->
      <div class="mb-3">
      <div class="input-font">약관</div>
      <div class="terms-container">
        <!-- 전체 동의 -->
        <label>
          <input type="checkbox" v-model="agreeAll" value="all">
          전체 동의
        </label>
        <hr>
        <!-- 이용 약관 동의 -->
        <label>
          <input type="checkbox" v-model="agreeChecked" value="terms">
          (필수) 이용약관 동의
        </label>
        <!-- 개인정보 처리방침 동의 -->
        <label>
          <input type="checkbox" v-model="agreeChecked" value="privacy">
          (필수) 개인정보 처리방침 동의
        </label>
      </div>
      </div>

      <!-- 가입 버튼 -->
      <div class="d-grid">
        <button type="submit" class="btn btn-primary" :disabled="isSubmitDisabled">가입</button>
      </div>
    </form>
  </div>
</div>
</template>

<style>
.form-header {
  text-align: center;
  margin-bottom: 20px;
}

.form-container {
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  background: white;
}

.input-font {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 3px;
  display: block;
  text-align: left;
}

.form-container input,
.form-container textarea,
.form-container button {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

/* .is-verification input{
    background: #c2c2c28f;
    pointer-events: none;
}  */

.form-container input:focus,
.form-container textarea:focus {
  border-color: #6c63ff;
  outline: none;
  background: #fff;
}

.form-row {
  display: flex;
  gap: 10px;
}

.form-row input {
  flex: 1;
}

textarea {
  resize: none;
}

.btn {
  background-color: #6c63ff;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #5347c6;
}

.btn-outline-secondary {
  background-color: transparent;
  border: 1px solid #6c63ff;
  color: #6c63ff;
  transition: all 0.3s ease;
}

.btn-outline-secondary:hover {
  background-color: #6c63ff;
  color: white;
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
.terms-container {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
}

.terms-container label {
  display: flex; /* 플렉스 박스로 설정 */
  align-items: center; /* 체크박스와 텍스트를 위아래로 가운데 정렬 */
  gap: 10px; /* 체크박스와 텍스트 간 간격 */
  margin-bottom: 10px;
}

.terms-container input[type="checkbox"] {
  flex-shrink: 0; /* 크기가 줄어들지 않도록 설정 */
  width: 20px; /* 고정된 너비 */
  height: 20px; /* 고정된 높이 */
  margin: 0; /* 기본 여백 제거 */
  vertical-align: middle; /* 텍스트와 수직 정렬 */
}

.terms-container span {
  flex-grow: 1; /* 텍스트가 남은 공간을 차지하도록 설정 */
  line-height: 1.5; /* 텍스트 높이 설정 */
}


</style>