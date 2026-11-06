// 질문 및 선택지 데이터
const questions = [
    {
        q: "중요한 약속이 있는 날, 당신의 옷장 앞 모습은?",
        options: [
            { text: "전날 밤에 미리 완벽하게 세팅해 둔 옷을 입는다.", type: "M" },
            { text: "그날의 기분과 날씨에 따라 감각적으로 매치한다.", type: "C" },
            { text: "가장 편안하고 내 몸에 잘 맞는 익숙한 옷을 집어 든다.", type: "N" }
        ]
    },
    {
        q: "새로운 옷을 살 때 가장 중요하게 생각하는 것은?",
        options: [
            { text: "오래 입을 수 있는 퀄리티와 클래식한 디자인", type: "M" },
            { text: "트렌디함과 남들이 잘 입지 않는 유니크함", type: "C" },
            { text: "소재의 부드러움과 활동할 때의 편안함", type: "N" }
        ]
    },
    {
        q: "옷차림에 포인트를 준다면 어떤 방식을 선호하나요?",
        options: [
            { text: "시계나 벨트 등 깔끔하고 고급스러운 아이템", type: "M" },
            { text: "눈에 띄는 컬러나 화려한 액세서리 레이어링", type: "C" },
            { text: "모자나 에코백 등 실용적이고 자연스러운 소품", type: "N" }
        ]
    }
];

// 결과 데이터 정의
const results = {
    M: { 
        title: "모던 완벽주의자", 
        desc: "깔끔하고 정돈된 스타일을 선호하는 당신! 내면 역시 체계적이고 계획적인 성향이 강합니다. 단정함 속에서 은은한 카리스마가 돋보입니다." 
    },
    C: { 
        title: "크리에이티브 트렌드세터", 
        desc: "개성을 중요시하고 감각이 뛰어난 당신! 정해진 틀에 얽매이지 않고 새로운 도전을 즐기는 자유로운 영혼의 소유자입니다." 
    },
    N: { 
        title: "내추럴 마인드", 
        desc: "꾸민 듯 안 꾸민 듯한 자연스러움이 매력인 당신! 타인의 시선보다는 나의 편안함과 내면의 평화를 가장 중요하게 생각합니다." 
    }
};

// 상태 관리 변수
let currentQIdx = 0;
let scores = { M: 0, C: 0, N: 0 };

// 화면 전환 함수
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// 테스트 시작
function startTest() {
    currentQIdx = 0;
    scores = { M: 0, C: 0, N: 0 };
    showQuestion();
    switchScreen('quiz-screen');
}

// 질문 표시 및 프로그레스 바 업데이트
function showQuestion() {
    if (currentQIdx >= questions.length) {
        calculateResult();
        return;
    }
    
    const qData = questions[currentQIdx];
    document.getElementById('question-text').innerText = qData.q;
    document.getElementById('progress-fill').style.width = `${((currentQIdx + 1) / questions.length) * 100}%`;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = ''; // 기존 선택지 초기화
    
    qData.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn option-btn';
        btn.innerText = opt.text;
        btn.onclick = () => selectOption(opt.type);
        optionsContainer.appendChild(btn);
    });
}

// 선택지 클릭 처리
function selectOption(type) {
    scores[type]++;
    currentQIdx++;
    showQuestion();
}

// 결과 계산 및 표시 (로딩 페이크 포함)
function calculateResult() {
    switchScreen('loading-screen');
    
    setTimeout(() => {
        // 가장 점수가 높은 타입 추출
        let maxType = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
        const resData = results[maxType];
        
        document.getElementById('result-title').innerText = resData.title;
        document.getElementById('result-desc').innerText = resData.desc;
        
        switchScreen('result-screen');
    }, 2000); // 2초간 로딩 화면 노출
}