// 1. 질문 데이터 배열 (이 부분을 자유롭게 추가/수정하시면 됩니다)
const qnaList = [
  {
    q: "연락이 1시간 동안 안 될 때 나의 반응은?",
    a: [
      { text: "바쁜가 보다 하고 내 할 일을 한다.", type: "T", menhera: 0 },
      { text: "무슨 일 있나? 서운하고 불안해진다.", type: "F", menhera: 5 }
    ]
  },
  {
    q: "주말에 시간이 났을 때 나는?",
    a: [
      { text: "친구들을 만나서 신나게 놀아야지!", type: "E", menhera: 2 },
      { text: "집에서 넷플릭스 보면서 푹 쉬어야지.", type: "I", menhera: 1 }
    ]
  }
  // 질문을 계속 추가할 수 있습니다.
];

// 점수 누적용 객체
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0, menhera: 0 };
let currentQuestionIndex = 0;

// 화면 전환 함수
function switchScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}

// 테스트 시작
function startTest() {
  switchScreen('question-screen');
  showQuestion();
}

// 질문과 버튼을 화면에 그리는 함수
function showQuestion() {
  const qData = qnaList[currentQuestionIndex];
  document.getElementById('question-text').innerText = qData.q;
  
  const btnContainer = document.getElementById('answer-buttons');
  btnContainer.innerHTML = ''; // 기존 버튼 지우기
  
  qData.a.forEach(answer => {
    const btn = document.createElement('button');
    btn.innerText = answer.text;
    btn.onclick = () => selectAnswer(answer.type, answer.menhera);
    btnContainer.appendChild(btn);
  });
}

// 답변 선택 시 점수 누적 및 다음 문제로 이동
function selectAnswer(mbtiType, menheraScore) {
  scores[mbtiType] += 1;
  scores.menhera += menheraScore;
  
  currentQuestionIndex++;
  
  if (currentQuestionIndex < qnaList.length) {
    showQuestion();
  } else {
    // 모든 문제를 다 풀었을 때
    switchScreen('loading-screen');
    
    // 2초(2000ms) 동안 분석하는 척 로딩 화면을 보여준 뒤 결과 계산
    setTimeout(() => {
      calculateResult();
    }, 2000);
  }
}

// 최종 결과 계산 및 출력
function calculateResult() {
  let finalMBTI = "";
  finalMBTI += (scores.E >= scores.I) ? "E" : "I";
  finalMBTI += (scores.S >= scores.N) ? "S" : "N";
  finalMBTI += (scores.T >= scores.F) ? "T" : "F";
  finalMBTI += (scores.J >= scores.P) ? "J" : "P";
  
  // 멘헤라 수치 판별 (예시)
  let menheraLevel = "";
  if (scores.menhera >= 10) menheraLevel = "의존도 최상 (중증)";
  else if (scores.menhera >= 5) menheraLevel = "의존도 보통 (경증)";
  else menheraLevel = "독립적인 성향";

  // 결과 화면에 데이터 삽입
  document.getElementById('result-mbti').innerText = finalMBTI;
  document.getElementById('result-menhera').innerText = menheraLevel;
  
  // (옵션) 결과에 맞는 이미지 띄우기
  // document.getElementById('result-image').src = `${finalMBTI}_${scores.menhera >= 10 ? 'high' : 'low'}.png`;
  // document.getElementById('result-image').style.display = 'block';
  
  switchScreen('result-screen');
}