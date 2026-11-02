const serviceName = "Re:hear";
let isSubscribed = false;
let submitCount = 0;

function makeSubscribeMessage(email, subscribed) {
    if (subscribed == true) {
        return email + " 주소로 받을 피드백 요청서를 확인했습니다. (프로토타입: 실제 이메일 미전송)";
    }

    return "피드백 요청서를 확인한 다음 이메일을 입력해 주세요.";
}

const subscribeForm = document.querySelector("#subscribe-form");
const emailInput = document.querySelector("#email");
const subscribeButton = document.querySelector("#subscribeButton");
const subscribeMessage = document.querySelector("#subscribeMessage");

/* 4주차 삭제
console.log(typeof serviceName);
console.log(typeof isSubscribed);
console.log(typeof submitCount);

console.log(makeSubscribeMessage("", false));
console.log(makeSubscribeMessage("learner@example.com", true));*/

function handleSubscribe(event) {
    event.preventDefault();
    const subscriberEmail = emailInput.value.trim();
    subscribeMessage.classList.remove("is-success", "is-error");
    if (!feedbackReady) {
        subscribeMessage.textContent = "피드백 요청서를 먼저 작성하고 확인해 주세요.";
        subscribeMessage.classList.add("is-error");
        return;
    }
    if (subscriberEmail === "" || !emailInput.validity.valid) {
        subscribeMessage.textContent = "올바른 이메일 주소를 입력해 주세요. (예: name@example.com)";
        subscribeMessage.classList.add("is-error");
        emailInput.focus();
        return;
    }
    isSubscribed = true;
    submitCount += 1;
    subscribeMessage.textContent = makeSubscribeMessage(subscriberEmail, isSubscribed);
    subscribeMessage.classList.add("is-success");
    subscribeButton.textContent = "요청 내용 확인 완료";
    subscribeButton.disabled = true;
}

subscribeForm.addEventListener("submit", handleSubscribe);

// 6주차: click, input, change 이벤트
const themeButton = document.querySelector("#themeButton");
const nicknameInput = document.querySelector("#nickname");
const nicknameCount = document.querySelector("#nicknameCount");
const agreeCheck = document.querySelector("#agreeCheck");
const agreeMessage = document.querySelector("#agreeMessage");
const startButton = document.querySelector("#startButton");

function handleThemeClick() {
    const isDark = document.body.classList.toggle("dark");

    themeButton.textContent = isDark ? "라이트 테마로 바꾸기" : "다크 테마로 바꾸기";
}

themeButton.addEventListener("click", handleThemeClick);

function handleNicknameInput() {
    const maxLength = nicknameInput.maxLength;
    const currentLength = Math.min (nicknameInput.value.length, maxLength);

    nicknameCount.textContent = currentLength + " / " + maxLength;
}

nicknameInput.addEventListener("input", handleNicknameInput);

function handleAgreeChange() {
    const agreed = agreeCheck.checked;

    startButton.disabled = !agreed;
    agreeMessage.textContent = agreed
        ? "수업 신청 설정을 시작할 수 있습니다."
        : "동의 후 수업 신청 설정을 시작할 수 있습니다.";
    
    if (agreed) {
        agreeMessage.classList.add("is-ready");    
    } else {
        agreeMessage.classList.remove("is-ready");
    } 
}

agreeCheck.addEventListener("change", handleAgreeChange);

// 6주차: 선택한 탭과 콘텐츠 하나만 표시
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function resetTabsAndPanels() {
    tabs.forEach(function (tab) {
        tab.classList.remove("is-active");
        tab.setAttribute("aria-selected", "false");
    });
    panels.forEach(function (panel) {
        panel.classList.remove("is-active");
        panel.hidden = true;
    });
}

function activateTab(clickedTab) {
    const targetSelector = clickedTab.dataset.target;
    const targetPanel = document.querySelector(targetSelector);

    clickedTab.classList.add("is-active");
    clickedTab.setAttribute("aria-selected", "true");

    targetPanel.classList.add("is-active");
    targetPanel.hidden = false;
}

function handleTabClick(event) {
    resetTabsAndPanels();
    activateTab(event.currentTarget);
}

tabs.forEach(function (tab) {
    tab.addEventListener("click", handleTabClick);
});

const trainingFlow = document.querySelector("#training-flow");
const flowSteps = trainingFlow.querySelectorAll(".step");
const progressItems = trainingFlow.querySelectorAll(".progress__item");
const titleInput = document.querySelector("#presentation-title");
const titleError = document.querySelector("#title-error");
const titleNext = document.querySelector("#title-next");
const durationRange = document.querySelector("#duration-range");
const durationValue = document.querySelector("#duration-value");
const qnaOption = document.querySelector("#qna-option");
const qnaOptions = document.querySelector("#qna-options");
const optionPrev = document.querySelector("#option-prev");
const optionNext = document.querySelector("#option-next");
const summaryPrev = document.querySelector("#summary-prev");
const finishButton = document.querySelector("#finish-button");
const restartButton = document.querySelector("#restart-button");
const summaryTitle = document.querySelector("#summary-title");
const summaryDuration = document.querySelector("#summary-duration");
const summaryQna = document.querySelector("#summary-qna");
const durationValues = ["30", "60", "90"];

const formData = {
    title: "", duration: "60", qna: false, qnaCount: "2"
};


function showStep(index) {
    flowSteps.forEach((step, i) => { step.hidden = i !== index; });
    progressItems.forEach((item, i) => {
        item.classList.toggle("is-active", i === index);
    });
}

const recordingDialog = document.querySelector("#recording-dialog");
const recordingCancel = document.querySelector("#recording-cancel");
const recordingConfirm = document.querySelector("#recording-confirm");

function revokeRecordingAgreement() {
    agreeCheck.checked = false;
    trainingFlow.hidden = true;
    handleAgreeChange();
    agreeCheck.focus();
}

startButton.addEventListener("click", () => {
    if (!agreeCheck.checked) return;
    recordingDialog.showModal();
});

recordingCancel.addEventListener("click", () => {
    recordingDialog.close();
    revokeRecordingAgreement();        
});

recordingDialog.addEventListener("cancel", revokeRecordingAgreement);
recordingConfirm.addEventListener("click", () => {
    if (!agreeCheck.checked) return;
    recordingDialog.close();
    trainingFlow.hidden = false;
    showStep(0);
    trainingFlow.scrollIntoView({ behavior: "smooth" });
    titleInput.focus();
});


function validateTitle() {
    const value = titleInput.value.trim();
    if (!value) {
        titleError.textContent = "수업에서 배우고 싶은 학습 목표를 입력해 주세요.";
        titleInput.classList.add("has-error");
        titleInput.focus();
        return false;
    }
    titleError.textContent = "";
    titleInput.classList.remove("has-error");
    formData.title = value;
    return true;
}

titleNext.addEventListener("click", () => {
    if (!validateTitle()) return;
    showStep(1);
});

durationRange.addEventListener("input", () => {
    durationValue.value = durationValues[durationRange.value] + "분";
});

qnaOption.addEventListener("change", () => {     
    qnaOptions.hidden = !qnaOption.checked;
});

optionPrev.addEventListener("click", () => showStep(0));
optionNext.addEventListener("click", () => {
    formData.duration = durationValues[durationRange.value];
    formData.qna = qnaOption.checked;
    const count = document.querySelector('input[name="qna-count"]:checked');
    formData.qnaCount = count.value;
    summaryTitle.textContent = formData.title;
    summaryDuration.textContent = formData.duration + "분";
    summaryQna.textContent = formData.qna ? formData.qnaCount + "개 포함" : "미포함";
    showStep(2);
});

summaryPrev.addEventListener("click", () => showStep(1));
finishButton.addEventListener("click", () => showStep(3));
restartButton.addEventListener("click", () => {
    formData.title = "";
    formData.duration = "60";
    formData.qna = false;
    formData.qnaCount = "2";
    titleInput.value = "";
    titleError.textContent = "";
    titleInput.classList.remove("has-error");
    durationRange.value = "1";
    durationValue.value = "60분";
    qnaOption.checked = false;
    qnaOptions.hidden = true;
    document.querySelector('input[name="qna-count"][value="2"]').checked = true;
    summaryTitle.textContent = "";
    summaryDuration.textContent = "";
    summaryQna.textContent = "";
    showStep(0);
});

// 중간고사 신규 기능: 수업 설정 완료 → 강사 피드백 요청서 작성 → 이메일 확인
const feedbackOpen = document.querySelector("#feedback-open");
const feedbackSection = document.querySelector("#feedback-request");
const feedbackClass = document.querySelector("#feedback-class");
const feedbackDetail = document.querySelector("#feedback-detail");
const courseFinished = document.querySelector("#course-finished");
const feedbackError = document.querySelector("#feedback-error");
const feedbackInputs = document.querySelector("#feedback-inputs");
const feedbackPreview = document.querySelector("#feedback-preview");
const feedbackCheck = document.querySelector("#feedback-check");
const feedbackCancel = document.querySelector("#feedback-cancel");
const feedbackEdit = document.querySelector("#feedback-edit");
const feedbackToEmail = document.querySelector("#feedback-to-email");
let feedbackReady = false;
let applicationCompleted = false;

function resetFeedback() {
    feedbackSection.hidden = true;
    feedbackDetail.value = "";
    courseFinished.checked = false;
    document.querySelectorAll('input[name="feedback-topic"]').forEach(function (radio) {
        radio.checked = false;
    });
    feedbackError.textContent = "";
    feedbackInputs.hidden = false;
    feedbackPreview.hidden = true;
    feedbackReady = false;
    emailInput.value = "";
    subscribeButton.disabled = false;
    subscribeButton.textContent = "이메일로 피드백 요청 완료하기";
    subscribeMessage.textContent = "피드백 요청서를 먼저 작성한 다음 이메일을 입력해 주세요.";
    subscribeMessage.classList.remove("is-success", "is-error");
    isSubscribed = false;
}

// 기존 완료·다시 설정 버튼에 새 사용 경로를 연결
finishButton.addEventListener("click", function () {
    applicationCompleted = true;
});
restartButton.addEventListener("click", function () {
    applicationCompleted = false;
    resetFeedback();
});

feedbackOpen.addEventListener("click", function () {
    if (!applicationCompleted) return;
    feedbackSection.hidden = false;
    feedbackClass.textContent = "학습 목표: " + formData.title;
    feedbackSection.scrollIntoView({ behavior: "smooth" });
});

feedbackCheck.addEventListener("click", function () {
    const selectedTopic = document.querySelector('input[name="feedback-topic"]:checked');
    const detail = feedbackDetail.value.trim();
    feedbackError.textContent = "";
    if (!courseFinished.checked) {
        feedbackError.textContent = "수업을 수강한 뒤 확인란을 선택해 주세요.";
        courseFinished.focus();
        return;
    }
    if (!selectedTopic) {
        feedbackError.textContent = "피드백받을 항목을 하나 선택해 주세요.";
        return;
    }
    if (!detail) {
        feedbackError.textContent = "강사에게 요청할 내용을 입력해 주세요.";
        feedbackDetail.focus();
        return;
    }
    document.querySelector("#feedback-summary-class").textContent = formData.title;
    document.querySelector("#feedback-summary-topic").textContent = selectedTopic.value;
    document.querySelector("#feedback-summary-detail").textContent = detail;
    feedbackInputs.hidden = true;
    feedbackPreview.hidden = false;
    feedbackReady = false;
});

feedbackEdit.addEventListener("click", function () {
    feedbackPreview.hidden = true;
    feedbackInputs.hidden = false;
    feedbackReady = false;
    feedbackDetail.focus();
});

feedbackCancel.addEventListener("click", function () {
    resetFeedback();
    subscribeMessage.textContent = "피드백 요청서 작성을 취소했습니다. 수업 신청 완료 화면에서 다시 시작할 수 있습니다.";
    trainingFlow.scrollIntoView({ behavior: "smooth" });
});

feedbackToEmail.addEventListener("click", function () {
    feedbackReady = true;
    subscribeMessage.textContent = "요청서 확인을 완료했습니다. 피드백받을 이메일을 입력해 주세요.";
    subscribeMessage.classList.remove("is-error", "is-success");
    document.querySelector("#subscribe").scrollIntoView({ behavior: "smooth" });
    emailInput.focus();
});
