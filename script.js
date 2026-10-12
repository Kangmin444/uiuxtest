// 5주차: JavaScript로 이메일 신청 화면에 피드백 주기
console.log("JavaScript가 연결되었습니다.");

// HTML 요소를 선택합니다.
const subscribeForm = document.querySelector("#subscribeForm");
const emailInput = document.querySelector("#email");
const subscribeButton = document.querySelector("#subscribeButton");
const subscribeMessage = document.querySelector("#subscribeMessage");

// 신청 완료 상태를 저장합니다.
let isSubscribed = false;

// 상태에 따라 안내 문구를 만듭니다.
function makeSubscribeMessage(subscribed) {
  if (subscribed === true) {
    return "이메일 입력을 확인했습니다. 실제 전송은 하지 않습니다.";
  } else {
    return "이메일을 입력한 뒤 신청해 주세요.";
  }
}

// 폼을 제출할 때 실행할 함수입니다.
function handleSubscribe(event) {
  event.preventDefault();

  const subscriberEmail = emailInput.value.trim();

  if (subscriberEmail === "") {
    subscribeMessage.textContent = "이메일을 입력한 뒤 신청해 주세요.";
    subscribeMessage.classList.remove("is-success");
    subscribeMessage.classList.add("is-error");
    emailInput.focus();
    return;
  }

  isSubscribed = true;
  subscribeMessage.textContent = makeSubscribeMessage(isSubscribed);
  subscribeMessage.classList.remove("is-error");
  subscribeMessage.classList.add("is-success");
  subscribeButton.textContent = "확인 완료";
  subscribeButton.disabled = true;
}

// 폼 제출과 함수를 연결합니다.
subscribeForm.addEventListener("submit", handleSubscribe);
