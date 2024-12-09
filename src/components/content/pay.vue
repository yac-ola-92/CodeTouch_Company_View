<script>
const { IMP } = window;                                 // 아임포트

export default {
  name: "test",
  data(){
    return{
      price: 1
    }
  },
    mounted() {
        if(IMP){
            IMP.init("imp22383085");                    // 결제 대행사에서 발급받은 아이디
        }else{
            console.log("SDK 로드 안됨.");
        }
    },
  methods: {
    onPayment:function(){
        if(!IMP){
            console.log("SDK 로드 안됨.");
        }

      IMP.request_pay({                                 // param
        pg: "html5_inicis",                             // PG(Payment Gateway)
        pay_method: "card",                             // 결제 수단
        merchant_uid: `ORD-${new Date().getTime()}`,    // 주문명(이게 주문 코드)
        name: "pd1",                                    // 상품명
        amount: this.price,                             // 상품 가격
        buyer_email: "test@naver.com",                  // 구매자 이메일
        buyer_name: "테스터",                           // 구매자 이름
        buyer_tel: "010-1234-5678",                     // 구매자 번호
        buyer_addr: "서울특별시",                       // 구매자 주소
        buyer_postcode: "07222"                         // 구매자 우편번호
      }, rsp => { // callback                           // 모두 필요한것은 아닌것으로 보임
        console.log(rsp);
        if (rsp.success) {
          console.log("결제 성공");
        } else {
          console.log("결제 실패");
        }
      });

    }
  }
}
</script>

<template>
    <div class="container">
        <div class="left-column">
            <div class="payment-section">
                <h2>서비스 선택</h2>
                <div class="select-wrapper">
                    <select>
                        <option>my1st23500.invites.me (Free)</option>
                    </select>
                </div>

                <h2>서비스 기간</h2>
                <div class="radio-group">
                    <label class="radio-item">
                        <input type="radio" name="period" value="1">
                        <span>1개월</span>
                        <span class="price">20,000원/월</span>
                    </label>
                    <label class="radio-item">
                        <input type="radio" name="period" value="3">
                        <span>3개월</span>
                        <span class="price">18,000원/월</span>
                        <span class="discount">10%할인</span>
                    </label>
                    <label class="radio-item">
                        <input type="radio" name="period" value="6">
                        <span>6개월</span>
                        <span class="price">16,000원/월</span>
                        <span class="discount">20%할인</span>
                    </label>
                    <label class="radio-item">
                        <input type="radio" name="period" value="12">
                        <span>12개월</span>
                        <span class="price">14,000원/월</span>
                        <span class="discount">30%할인</span>
                    </label>
                </div>
            </div>
        </div>

        <div class="payment-details">
            <h2>결제상세</h2>
            <div class="details-row">
                <span>정기결제 금액</span>
                <span>240,000원</span>
            </div>
            <div class="details-row">
                <span>부가서비스 금액</span>
                <span>0원</span>
            </div>
            <div class="details-row">
                <span>할인 금액</span>
                <span class="discount">-28,800원</span>
            </div>
            <div class="total-price">
                <span>총 결제금액</span>
                <span>211,200원</span>
            </div>
            <div class="details-row">
                <span>다음 결제일</span>
                <span>2025-12-05</span>
            </div>
            <button class="payment-button" @click="onPayment">결제하기</button>
            <p class="info-text">
                • 결제일은 구독 시작일 기준으로 선택한 서비스, 사용 기간에 맞춰 자동 구독결제 됩니다.
            </p>
        </div>
    </div>
</template>

<style scoped>
    .container {
        height: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 20px;
        display: grid;
        grid-template-columns: 1fr 400px;
        gap: 24px;
    }
    .payment-section {
        background: white;
        border-radius: 8px;
        padding: 24px;
        margin-bottom: 16px;
    }
    .payment-details {
        background: white;
        border-radius: 8px;
        padding: 24px;
        position: sticky;
        top: 24px;
        height: fit-content;
    }
    h2 {
        font-size: 18px;
        margin-bottom: 20px;
    }
    .select-wrapper {
        margin-bottom: 24px;
    }
    select {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
    }
    .radio-group {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .radio-item {
        display: flex;
        align-items: center;
        padding: 16px;
        border: 1px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
    }
    .radio-item:has(input:checked) {
        border-color: #007bff;
        background-color: #f8f9ff;
    }
    .radio-item input[type="radio"] {
        margin-right: 12px;
    }
    .price {
        margin-left: auto;
        font-weight: bold;
    }
    .discount {
        color: #dc3545;
        font-size: 12px;
        margin-left: 8px;
    }
    .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 24px;
    }
    .checkbox-item {
        display: flex;
        align-items: center;
    }
    .checkbox-item input[type="checkbox"] {
        margin-right: 12px;
    }
    .details-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        font-size: 14px;
    }
    .total-price {
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid #eee;
        font-weight: bold;
        font-size: 18px;
    }
    .payment-button {
        width: 100%;
        padding: 16px;
        background-color: #000;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        font-weight: bold;
        margin-top: 24px;
        cursor: pointer;
    }
    .payment-button:hover {
        background-color: #333;
    }
    .info-text {
        font-size: 12px;
        color: #666;
        margin-top: 12px;
    }
</style>