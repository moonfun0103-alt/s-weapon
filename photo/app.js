// DOM 요소 참조
const videoElement = document.getElementById('webcam');
const overlay = document.getElementById('ai-overlay');
const statusText = document.getElementById('ai-status-text');
const resultOverlay = document.getElementById('result-overlay');
const captureBtn = document.getElementById('capture-btn');

let currentStream = null;
let useFrontCamera = true;

// 1. 웹캠 시작 및 스트림 연결 함수
async function startCamera() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
    }

    const constraints = {
        video: { 
            facingMode: useFrontCamera ? 'user' : 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
        },
        audio: false
    };

    try {
        currentStream = await navigator.mediaDevices.getUserMedia(constraints);
        videoElement.srcObject = currentStream;
    } catch (err) {
        console.error("카메라 접근 실패:", err);
        alert("카메라 권한이 거부되었거나 지원하지 않는 기기입니다. 브라우저 설정을 확인해주세요.");
    }
}

// 2. 전면/후면 카메라 전환
function switchCamera() {
    useFrontCamera = !useFrontCamera;
    startCamera();
}

// 3. 사진 캡처 및 AI 분석 시뮬레이션 프로세스
function captureAndAnalyze() {
    overlay.classList.remove('hidden');
    captureBtn.style.pointerEvents = 'none';

    // AI 분석 단계별 메시지 배열
    const steps = [
        "📷 카메라 프레임 고화질 캡처 완료...",
        "🌐 주변 배경 공간 조명 및 무드 분석 중...",
        "🎨 사용자 피팅 비율 및 맞춤형 스타일 매칭 중..."
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
        stepIdx++;
        if (stepIdx < steps.length) {
            statusText.innerText = steps[stepIdx];
        }
    }, 700);

    // 2.2초 후 분석 완료 및 결과 노출
    setTimeout(() => {
        clearInterval(interval);
        overlay.classList.add('hidden');
        
        // 무작위 AI 패션 결과 데이터 풀
        const resultsPool = [
            { 
                title: "어반 미니멀 룩", 
                desc: "현재 배경의 차분한 톤에 맞춘 뉴트럴 컬러 슬랙스와 오버핏 자켓 조합입니다." 
            },
            { 
                title: "소프트 캐주얼 데일리", 
                desc: "편안하면서도 세련된 실루엣을 강조하는 미니멀 니트와 와이드 팬츠 코디입니다." 
            },
            { 
                title: "스트릿 빈티지 무드", 
                desc: "활동성과 개성을 살려주는 레이어드 아우터 및 액세서리 스타일링입니다." 
            }
        ];
        
        const randomRes = resultsPool[Math.floor(Math.random() * resultsPool.length)];

        document.getElementById('outfit-title').innerText = randomRes.title;
        document.getElementById('outfit-desc').innerText = randomRes.desc;

        resultOverlay.classList.remove('hidden');
    }, 2200);
}

// 4. 초기화 및 다시 촬영하기
function resetCamera() {
    resultOverlay.classList.add('hidden');
    captureBtn.style.pointerEvents = 'auto';
}

// 5. 페이지 로드 시 카메라 자동 실행
window.addEventListener('load', () => {
    startCamera();
});