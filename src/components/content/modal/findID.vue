<script>
export default {
    data(){
        return{

        }
    },
    props:{
        findId: String,
        createAt: String,
    }
}
</script>
<template>
    <div class="container">
        <div class="success-icon-wrapper">
            <div class="success-icon">
                <svg viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
            </div>
            <h1 class="title">가입된 아이디를 찾았어요</h1>
            <p class="subtitle">가입된 정보가 맞다면 아래 계정으로 로그인하세요</p>
        </div>

        <div class="result-box">
            <div class="email">{{ findId }}</div>
            <div class="date">{{ createAt }}</div>
        </div>

        <div class="button-group">
            <button class="button outline">비밀번호 찾기</button>
            <button class="button primary">로그인 하기</button>
        </div>
    </div>
</template>
<style scoped>
.success-icon-wrapper {
    width: 100%; /* container와 동일한 너비 */
    background-color: #fff; /* 흰색 박스 */
    padding: 20px; /* 내부 여백 */
    border-radius: 8px; /* 모서리 둥글게 */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 약간의 그림자 */
    margin-bottom: 20px; /* 아래 콘텐츠와 간격 */
}

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #fff;
        }

        .container {
            width: 100%;
            max-width: 400px;
            padding: 20px;
            text-align: center;
        }

        .success-icon {
            width: 48px;
            height: 48px;
            background-color: #e7f9e7;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
        }

        .success-icon svg {
            width: 24px;
            height: 24px;
            fill: #2ea043;
        }

        .title {
            font-size: 20px;
            font-weight: 600;
            color: #333;
            margin-bottom: 8px;
        }

        .subtitle {
            font-size: 14px;
            color: #666;
            margin-bottom: 24px;
        }

        .result-box {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 24px;
        }

        .email {
            font-size: 16px;
            color: #333;
            margin-bottom: 4px;
        }

        .date {
            font-size: 12px;
            color: #666;
        }

        .button-group {
            display: flex;
            gap: 12px;
        }

        .button {
            flex: 1;
            padding: 14px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            border: 1px solid #ddd;
        }

        .button.outline {
            background-color: #fff;
            color: #333;
        }

        .button.primary {
            background-color: #18171c;
            color: #fff;
            border: none;
        }
</style>