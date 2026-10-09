import subprocess
import os

applescript = '''
tell application "Keynote"
    activate
    
    -- Close all documents cleanly
    try
        close every document saving no
    end try
    
    -- 1. Create a new document with black theme and set widescreen 1920x1080
    set thisDoc to make new document with properties {document theme:theme "검은색"}
    tell thisDoc
        set width to 1920
        set height to 1080
        set base slide of slide 1 to master slide "빈 페이지"
        
        -- ====================================================
        -- SLIDE 1: 주가 모멘텀 & 핵심 재무 지표 (NVIDIA STYLE)
        -- ====================================================
        set s1 to slide 1
        tell s1
            -- Category Tag (NVIDIA Lime Green)
            set tag1 to make new text item with properties {object text:"[ AI ENTERPRISE OS / MARKET MOMENTUM BRIEFING ]", position:{80, 40}, width:1200}
            set font of object text of tag1 to "Helvetica Neue Bold"
            set size of object text of tag1 to 15
            set color of object text of tag1 to {30840, 47545, 0}
            
            -- Main Title (Pure White)
            set title1 to make new text item with properties {object text:"PALANTIR TECHNOLOGIES (NYSE: PLTR)", position:{80, 68}, width:1400}
            set font of object text of title1 to "Helvetica Neue Bold"
            set size of object text of title1 to 40
            set color of object text of title1 to {65535, 65535, 65535}
            
            -- Subtitle (Light Gray)
            set sub1 to make new text item with properties {object text:"S&P 500 편입과 AIP 수요 폭발이 견인한 역사적 주가 리레이팅 분석", position:{80, 122}, width:1400}
            set font of object text of sub1 to "Helvetica Neue"
            set size of object text of sub1 to 18
            set color of object text of sub1 to {52000, 54000, 58000}
            
            -- Metric Card 1
            set m1 to make new text item with properties {object text:"[ METRIC 01 ]\\r+54% Y/Y\\r미국 상업(Commercial) 매출 가속", position:{80, 168}, width:340}
            set font of object text of m1 to "Helvetica Neue Bold"
            set size of object text of m1 to 16
            set color of object text of m1 to {30840, 47545, 0}
            
            -- Metric Card 2
            set m2 to make new text item with properties {object text:"[ METRIC 02 ]\\r68% Rule of 40\\r성장률 + FCF 마진의 효율", position:{440, 168}, width:340}
            set font of object text of m2 to "Helvetica Neue Bold"
            set size of object text of m2 to 16
            set color of object text of m2 to {30840, 47545, 0}
            
            -- Metric Card 3
            set m3 to make new text item with properties {object text:"[ METRIC 03 ]\\r38% Adj. Op Margin\\rGAAP 흑자 이후 마진 레버리지", position:{800, 168}, width:340}
            set font of object text of m3 to "Helvetica Neue Bold"
            set size of object text of m3 to 16
            set color of object text of m3 to {30840, 47545, 0}
            
            -- Chart Image (Left Main)
            make new image with properties {file:POSIX file "/Users/eriksen/Antigravity/pltr_stock_chart.png", position:{80, 260}, width:1060, height:580}
            
            -- Insight Box (Right Panel)
            set insight1 to make new text item with properties {object text:"▶ NVIDIA STYLE 핵심 분석 인사이트\\r\\r• AIP Bootcamps의 전환 혁신\\r  전통 IT 컨설팅(수개월 소요) 대비 단 3일 만에 실제 기업 데이터에 LLM을 결합하여 계약 성사율 폭증\\r\\r• 구조적 영업 레버리지 효과\\r  추가적인 원가 부담 없이 고객당 매출(ARPU)이 급증하며 순이익률이 가파르게 상승\\r\\r• 미 국방 안보 독점 체계\\r  미 육군 TITAN 차세대 지상국 시스템 등 대체 불가능한 국가 안보 디지털 무기체계 확립\\r\\r• 밸류에이션 리레이팅\\r  단순 소프트웨어 기업이 아닌 'AI 산업의 엔터프라이즈 운영체제'로 시장 평가 재정립", position:{1180, 260}, width:660}
            set font of object text of insight1 to "Helvetica Neue"
            set size of object text of insight1 to 16
            set color of object text of insight1 to {65535, 65535, 65535}
            
            -- Footer Status
            set foot1 to make new text item with properties {object text:"PALANTIR TECHNOLOGIES BRIEFING  |  NVIDIA DESIGN SYSTEM  |  CONFIDENTIAL", position:{80, 1020}, width:1760}
            set font of object text of foot1 to "Helvetica Neue"
            set size of object text of foot1 to 12
            set color of object text of foot1 to {36000, 40000, 46000}
            
            set presenter notes to "발표자 노트 (Slide 1): 팔란티어(PLTR)는 2023년 $6~$8 바닥권에서 시작해 S&P 500 편입과 AIP 수요 폭발로 역사적인 주가 상승세를 기록했습니다. 특히 미국 민간 상업 부문이 연 54% 이상 성장하며 국방 전용 기업에서 글로벌 엔터프라이즈 AI OS로 완전히 체질을 개선했습니다."
        end tell
        
        -- ====================================================
        -- SLIDE 2: 전략적 해자 (AIP/온톨로지) & 밸류에이션
        -- ====================================================
        set s2 to make new slide with properties {base slide:master slide "빈 페이지"}
        tell s2
            -- Category Tag
            set tag2 to make new text item with properties {object text:"[ STRATEGIC MOAT & VALUATION ANALYSIS ]", position:{80, 40}, width:1200}
            set font of object text of tag2 to "Helvetica Neue Bold"
            set size of object text of tag2 to 15
            set color of object text of tag2 to {30840, 47545, 0}
            
            -- Main Title
            set title2 to make new text item with properties {object text:"THE ENTERPRISE AI MOAT: ONTOLOGY & AIP", position:{80, 68}, width:1400}
            set font of object text of title2 to "Helvetica Neue Bold"
            set size of object text of title2 to 40
            set color of object text of title2 to {65535, 65535, 65535}
            
            -- Subtitle
            set sub2 to make new text item with properties {object text:"엔비디아가 AI 하드웨어를 독점했다면, 소프트웨어 OS는 팔란티어가 선점한다", position:{80, 122}, width:1400}
            set font of object text of sub2 to "Helvetica Neue"
            set size of object text of sub2 to 18
            set color of object text of sub2 to {52000, 54000, 58000}
            
            -- Chart Image (Top Left)
            make new image with properties {file:POSIX file "/Users/eriksen/Antigravity/pltr_ai_moat.png", position:{80, 180}, width:1080, height:500}
            
            -- Right Moat Analysis
            set moatBox to make new text item with properties {object text:"▶ 3대 경제적 해자 (Economic Moat)\\r\\r1. 온톨로지(Ontology) 아키텍처\\r   단순 챗봇이 아닌, ERP·공급망 전체를 의미론적 디지털 트윈으로 모델링하여 AI가 실시간 비즈니스 액션 수행\\r\\r2. 최고 보안 등급 (DoD IL6)\\r   우크라이나·중동 전장에서 검증된 Project Maven 및 미 국방부 최상위 안보 라이선스 보유\\r\\r3. 압도적 고객 락인(Lock-in)\\r   기업 핵심 데이터 파이프라인에 깊이 결합되어 타사 솔루션으로의 교체가 사실상 불가능한 구조", position:{1190, 180}, width:650}
            set font of object text of moatBox to "Helvetica Neue"
            set size of object text of moatBox to 16
            set color of object text of moatBox to {65535, 65535, 65535}
            
            -- Bottom 3 Pillar Cards
            set p1 to make new text item with properties {object text:"[ 성장 동력: 고객수 폭증 ]\\r2년 만에 고객사 83% 급증 (1,420개사 돌파)\\r부트캠프가 즉각적 유료 계약으로 직결", position:{80, 720}, width:550}
            set font of object text of p1 to "Helvetica Neue Bold"
            set size of object text of p1 to 15
            set color of object text of p1 to {30840, 47545, 0}
            
            set p2 to make new text item with properties {object text:"[ 밸류에이션 프리미엄 분석 ]\\rNTM P/E 및 PSR 지표는 역사적 고점 부담\\r그러나 Rule of 40(68%) 실적이 고평가 우려 압도", position:{670, 720}, width:550}
            set font of object text of p2 to "Helvetica Neue Bold"
            set size of object text of p2 to 15
            set color of object text of p2 to {30840, 47545, 0}
            
            set p3 to make new text item with properties {object text:"[ 결론: 장기 투자 시사점 ]\\r엔비디아의 CUDA 생태계처럼, 팔란티어는\\r엔터프라이즈 AI 소프트웨어의 절대 표준", position:{1260, 720}, width:580}
            set font of object text of p3 to "Helvetica Neue Bold"
            set size of object text of p3 to 15
            set color of object text of p3 to {30840, 47545, 0}
            
            -- Footer Status
            set foot2 to make new text item with properties {object text:"PALANTIR TECHNOLOGIES BRIEFING  |  NVIDIA DESIGN SYSTEM  |  CONFIDENTIAL", position:{80, 1020}, width:1760}
            set font of object text of foot2 to "Helvetica Neue"
            set size of object text of foot2 to 12
            set color of object text of foot2 to {36000, 40000, 46000}
            
            set presenter notes to "발표자 노트 (Slide 2): 엔비디아가 하드웨어 인프라에서 대체 불가능한 CUDA 해자를 가졌듯, 팔란티어는 데이터와 AI를 결합하는 온톨로지 기술로 기업용 소프트웨어의 사실상 표준이 되고 있습니다. 고평가 밸류에이션 리스크가 공존하지만 실적 성장 속도가 이를 압도하고 있습니다."
        end tell
        
    end tell
    
    -- Save as .key
    set targetPath to POSIX file "/Users/eriksen/Antigravity/Palantir_Analysis_NVIDIA_Style.key"
    save thisDoc in targetPath
    
    -- Export to PDF
    set pdfPath to POSIX file "/Users/eriksen/Antigravity/Palantir_Analysis_NVIDIA_Style.pdf"
    export thisDoc to pdfPath as PDF
    
    -- Export to PNGs
    set expFolder to POSIX file "/Users/eriksen/Antigravity/exports"
    export thisDoc to expFolder as slide images with properties {image format:PNG}
    
    return "Done"
end tell
'''

res = subprocess.run(['osascript', '-e', applescript], capture_output=True, text=True)
print("STDOUT:", res.stdout)
print("STDERR:", res.stderr)
