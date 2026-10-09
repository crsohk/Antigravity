tell application "Keynote"
    activate
    
    -- 1. Create a new document with black theme
    set thisDoc to make new document with properties {document theme:theme "검은색", width:1920, height:1080}
    
    tell thisDoc
        -- ----------------------------------------------------
        -- SLIDE 1: 주가 모멘텀 & 핵심 재무 지표 (NVIDIA STYLE)
        -- ----------------------------------------------------
        set slide1 to current slide
        
        -- Clean default items on slide 1 if any
        tell slide1
            -- Header Title & Subtitle
            set titleBox to make new text item with properties {object text:"PALANTIR TECHNOLOGIES (NYSE: PLTR)", position:{80, 50}, width:1400, height:60}
            set subTitleBox to make new text item with properties {object text:"ENTERPRISE AI OS 전환과 역사적 주가 리레이팅 분석 | NVIDIA STYLE TECH BRIEFING", position:{80, 115}, width:1400, height:40}
            
            -- Key Metric Badges (Top Row)
            set badge1 to make new text item with properties {object text:"[ METRIC 01 ]\n미국 상업(Commercial) 매출\n+54% Y/Y 초고속 가속", position:{80, 175}, width:340, height:95}
            set badge2 to make new text item with properties {object text:"[ METRIC 02 ]\nRule of 40 건전성 점수\n68% (성장률 + FCF 마진)", position:{450, 175}, width:340, height:95}
            set badge3 to make new text item with properties {object text:"[ METRIC 03 ]\nS&P 500 편입 & 기관 수급\n단기 테마를 넘어선 구조적 랠리", position:{820, 175}, width:340, height:95}
            
            -- Chart Image (Left Main)
            set chartImg to make new image with properties {file:POSIX file "/Users/eriksen/Antigravity/pltr_stock_chart.png", position:{80, 290}, width:1080, height:560}
            
            -- Insights Box (Right Panel)
            set insightText to "▶ NVIDIA STYLE 핵심 인사이트" & linefeed & linefeed & ¬
                "• AIP Bootcamps 효과:" & linefeed & ¬
                "  기존 컨설팅(수개월) 대비 단 3일 만에 실제 기업 데이터에 LLM 결합 성공" & linefeed & linefeed & ¬
                "• 극적인 영업 레버리지:" & linefeed & ¬
                "  GAAP 흑자 전환 후 마진 확장(Adj. Op Margin 38%), 추가 개발비 없는 고객당 매출(ARPU) 급증" & linefeed & linefeed & ¬
                "• 국방 안보 독점 체계:" & linefeed & ¬
                "  미 육군 TITAN 차세대 지상국 시스템 등 대체 불가능한 디지털 무기체계 확립" & linefeed & linefeed & ¬
                "• 시장 평가:" & linefeed & ¬
                "  단순 소프트웨어(SaaS) 기업이 아닌 'AI 산업의 운영체제'로 가치 재평가(Re-rating)"
                
            set rightPanel to make new text item with properties {object text:insightText, position:{1190, 290}, width:650, height:560}
            
            -- Presenter notes
            set presenter notes to "발표자 노트 (Slide 1): 팔란티어(PLTR)는 2023년 $6~$8 바닥권에서 시작해 S&P 500 편입과 AIP 수요 폭발로 역사적인 주가 상승세를 기록했습니다. 특히 미국 민간 상업 부문이 연 54% 이상 성장하며 국방 전용 기업에서 글로벌 엔터프라이즈 AI OS로 완전히 체질을 개선했습니다."
        end tell
        
        -- ----------------------------------------------------
        -- SLIDE 2: 전략적 해자 (AIP/온톨로지) & 밸류에이션
        -- ----------------------------------------------------
        set slide2 to make new slide with properties {base slide:master slide "빈 페이지"}
        
        tell slide2
            -- Header Title & Subtitle
            set titleBox2 to make new text item with properties {object text:"THE ENTERPRISE AI MOAT: ONTOLOGY & AIP", position:{80, 50}, width:1400, height:60}
            set subTitleBox2 to make new text item with properties {object text:"엔비디아가 AI 하드웨어를 장악했다면, 소프트웨어 OS는 팔란티어가 선점한다", position:{80, 115}, width:1400, height:40}
            
            -- Chart Image (Top/Center)
            set chartImg2 to make new image with properties {file:POSIX file "/Users/eriksen/Antigravity/pltr_ai_moat.png", position:{80, 180}, width:1150, height:500}
            
            -- Right Side Moat Highlights
            set moatText to "▶ 3대 경제적 해자(Economic Moat)" & linefeed & linefeed & ¬
                "1. 온톨로지(Ontology) 아키텍처" & linefeed & ¬
                "   단순 LLM 래퍼가 아닌, ERP·공급망 전체를 의미론적 디지털 트윈으로 모델링" & linefeed & linefeed & ¬
                "2. 최고 등급 국방 보안 (DoD IL6)" & linefeed & ¬
                "   우크라이나·중동 전장에서 입증된 Project Maven 및 국방 독점력" & linefeed & linefeed & ¬
                "3. 압도적 고객 락인(Lock-in)" & linefeed & ¬
                "   한 번 온톨로지가 구축되면 타사 솔루션으로 대체 불가능한 구조"
                
            set rightMoatBox to make new text item with properties {object text:moatText, position:{1260, 180}, width:580, height:500}
            
            -- Bottom 3 Summary Pillars
            set p1 to make new text item with properties {object text:"[ 성장 동력: 고객수 폭증 ]\n2년 만에 고객사 83% 급증 (1,400개 돌파)\n부트캠프가 즉각적 유료 전환으로 직결", position:{80, 710}, width:560, height:130}
            set p2 to make new text item with properties {object text:"[ 밸류에이션 프리미엄 ]\nNTM P/E 및 PSR 지표는 역사적 고점 부담\n그러나 Rule of 40(68%) 실적으로 고평가 정당화 중", position:{680, 710}, width:560, height:130}
            set p3 to make new text item with properties {object text:"[ 결론 및 투자 시사점 ]\n엔비디아의 CUDA 생태계처럼,\n엔터프라이즈 AI 소프트웨어의 절대 표준으로 자리매김", position:{1280, 710}, width:560, height:130}
            
            -- Presenter notes
            set presenter notes to "발표자 노트 (Slide 2): 엔비디아가 하드웨어 인프라에서 대체 불가능한 CUDA 해자를 가졌듯, 팔란티어는 데이터와 AI를 결합하는 온톨로지 기술로 기업용 소프트웨어의 사실상 표준이 되고 있습니다. 고평가 밸류에이션 리스크가 공존하지만 실적 성장 속도가 이를 압도하고 있습니다."
        end tell
        
    end tell
    
    -- Save the document to workspace
    set targetPath to POSIX file "/Users/eriksen/Antigravity/Palantir_Analysis_NVIDIA_Style.key"
    save thisDoc in targetPath
    
    -- Export to PDF
    set pdfPath to POSIX file "/Users/eriksen/Antigravity/Palantir_Analysis_NVIDIA_Style.pdf"
    export thisDoc to pdfPath as PDF
    
    return "Keynote generated and exported successfully"
end tell
