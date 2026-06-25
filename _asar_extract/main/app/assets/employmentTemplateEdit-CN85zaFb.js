const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/customPopUp-1j2cuYYo.js","assets/index-ak5BsCze.js","assets/vendor-react-DLmlTesg.js","assets/vendor-pdf-D5Eab7jE.js","assets/index-D3sbFfH5.css","assets/customDateCalendar-DqCZpPi7.js","assets/index-jnRmlWET.js","assets/isNativeReflectConstruct-XGLLvWSz.js","assets/createClass-BeTC7LXt.js","assets/toPropertyKey-Dg8hKEVS.js","assets/defineProperty-BKLqfx38.js","assets/index-8t4SYTBK.css","assets/moment-B-YVwB4U.js"])))=>i.map(i=>d[i]);
import{_ as be}from"./vendor-pdf-D5Eab7jE.js";import{a as F,j as e,u as Xe,l as s,I as qe,L as ue,b as he}from"./index-ak5BsCze.js";import{b as i,h as We,L as Ge,R as _e}from"./vendor-react-DLmlTesg.js";import{V as He,m as Ze}from"./index-BNUiajTt.js";import{h as A}from"./moment-B-YVwB4U.js";import{C as Je}from"./customPickCalendar-B8EAXH0T.js";import{k as Ye}from"./index-CySRtK6F.js";import{S as Ke,a as Qe}from"./smartEditorViewer-yoNX7knP.js";import{z as et}from"./index-BrjzO1iR.js";import"./extends-CF3RwP-h.js";import"./objectWithoutPropertiesLoose-Dsqj8S3w.js";import"./index-Vcq4gwWv.js";import"./index-jnRmlWET.js";import"./isNativeReflectConstruct-XGLLvWSz.js";import"./createClass-BeTC7LXt.js";import"./toPropertyKey-Dg8hKEVS.js";import"./defineProperty-BKLqfx38.js";const ge=[{name:"ref_employee_id",label:"직원 이름",category:"직원 정보"},{name:"social_security_number",label:"주민등록번호",category:"직원 정보"},{name:"phone",label:"전화번호",category:"직원 정보"},{name:"personal_email",label:"이메일",category:"직원 정보"},{name:"birthday",label:"생년월일",category:"직원 정보"},{name:"road_address",label:"도로명 주소",category:"직원 정보"},{name:"extra_address",label:"상세 주소",category:"직원 정보"},{name:"bankname",label:"은행명",category:"직원 정보"},{name:"bankaccount",label:"계좌번호",category:"직원 정보"},{name:"contract_type",label:"계약 유형",category:"계약 정보"},{name:"work_role",label:"직무",category:"계약 정보"},{name:"division",label:"부서",category:"계약 정보"},{name:"job_title",label:"직책",category:"계약 정보"},{name:"organization",label:"소속 기관",category:"계약 정보"},{name:"contract_period",label:"계약 기간",category:"계약 정보"},{name:"contract_date",label:"계약일",category:"계약 정보"},{name:"entry_date",label:"입사일",category:"계약 정보"},{name:"effective_date",label:"연봉 적용일",category:"계약 정보"},{name:"work_region_text",label:"근무지",category:"계약 정보"},{name:"salary_yearly",label:"연봉",category:"급여 정보"},{name:"salary_yearly/12",label:"월급 (연봉/12)",category:"급여 정보"},{name:"base_salary",label:"기본급",category:"급여 정보"},{name:"meal_allowance",label:"식대",category:"급여 정보"},{name:"vehicle_maintenance_allowance",label:"차량유지비",category:"급여 정보"},{name:"rnd_allowance",label:"연구활동비",category:"급여 정보"},{name:"babysitting_allowance",label:"육아수당",category:"급여 정보"},{name:"personal_development_allowance",label:"자기계발비",category:"급여 정보"},{name:"commuting_allowance",label:"교통비",category:"급여 정보"},{name:"work_support_allowance",label:"업무지원비",category:"급여 정보"},{name:"holurly_rate",label:"시간당 초과수당",category:"급여 정보"},{name:"overtime_pay_hours",label:"초과근무 기준시간",category:"급여 정보"},{name:"company",label:"회사명",category:"회사 정보"},{name:"RepresentativeName",label:"대표자명",category:"회사 정보"},{name:"MainPhoneNumber",label:"회사 전화번호",category:"회사 정보"},{name:"address",label:"회사 주소",category:"회사 정보"},{name:"serviceArea",label:"서비스 지역",category:"회사 정보"},{name:"worker_signature",label:"근로자 서명",category:"서명"},{name:"employer_signature",label:"사용자 서명",category:"서명"}],tt=({fileId:w,fileKey:r,webDriveId:O,onSave:u,readOnly:L=!1,isLocalFile:W=!1})=>{const[b,te]=i.useState(null),[G,y]=i.useState(!0),[$,S]=i.useState(null),[T,P]=i.useState(!1),[C,H]=i.useState(""),[z,n]=i.useState("전체"),[V,d]=i.useState(null),o=i.useRef(null);i.useEffect(()=>{v()},[w,r]);const v=async()=>{try{y(!0),S(null);let l="/API/onlyoffice/getConfig";const c={};if(W){if(l="/API/onlyoffice/getConfigLocal",r){c.fileKey=r;const j=r.split("/").pop()||"document.docx",J=j.split(".").pop()||"docx";c.fileName=j,c.fileExtension=J}}else w&&(c.fileId=w),r&&(c.fileKey=r),O&&(c.webDriveId=O);console.log("[DocxTemplateEditor] Loading config from:",l),console.log("[DocxTemplateEditor] Params:",c);const{data:h}=await F.get(l,{params:c});console.log("[DocxTemplateEditor] API response:",h);const M={documentServerUrl:h.documentServerUrl,...h.config,editorConfig:{...h.config?.editorConfig,mode:L?"view":"edit",customization:{...h.config?.editorConfig?.customization,forcesave:!0,autosave:!0}},events:{onDocumentReady:()=>{console.log("[DocxTemplateEditor] Document ready"),y(!1)},onError:j=>{console.error("[DocxTemplateEditor] Editor error:",j),S("문서 로드 중 오류가 발생했습니다.")}}};console.log("[DocxTemplateEditor] Final config:",M),te(M)}catch(l){console.error("[DocxTemplateEditor] Load config error:",l),S(l.message||"설정을 불러오는 중 오류가 발생했습니다."),y(!1)}},Z=l=>{try{const c=`\${${l}}`;navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(c).then(()=>{console.log("[DocxTemplateEditor] Variable copied to clipboard:",l),d(l),setTimeout(()=>d(null),2e3)}).catch(h=>{console.error("[DocxTemplateEditor] Clipboard write failed:",h),k(c),d(l),setTimeout(()=>d(null),2e3)}):(k(c),d(l),setTimeout(()=>d(null),2e3))}catch(c){console.error("[DocxTemplateEditor] Insert variable error:",c)}},k=l=>{const c=document.createElement("textarea");c.value=l,c.style.position="fixed",c.style.opacity="0",document.body.appendChild(c),c.select();try{document.execCommand("copy"),console.log("[DocxTemplateEditor] Variable copied (fallback):",l)}catch(h){console.error("[DocxTemplateEditor] Fallback copy failed:",h)}document.body.removeChild(c)},B=ge.filter(l=>{const c=C===""||l.name.toLowerCase().includes(C.toLowerCase())||l.label.toLowerCase().includes(C.toLowerCase()),h=z==="전체"||l.category===z;return c&&h}),U=["전체",...Array.from(new Set(ge.map(l=>l.category)))];return $?e.jsxs("div",{className:"docx-editor-error",children:[e.jsx("div",{className:"error-icon",children:"⚠️"}),e.jsx("div",{className:"error-message",children:$}),e.jsx("button",{onClick:v,className:"retry-button",children:"다시 시도"})]}):e.jsxs("div",{className:"docx-template-editor",children:[e.jsxs("div",{className:"editor-toolbar",children:[e.jsx("button",{className:`variable-toggle-button ${T?"active":""}`,onClick:()=>P(!T),title:"변수 삽입 패널 열기/닫기",children:"📝 변수 삽입"}),!L&&e.jsx("div",{className:"toolbar-info",children:e.jsxs("span",{className:"info-text",children:["변수를 클릭하면 ",e.jsxs("code",{children:["$","{변수명}"]})," 형식으로 클립보드에 복사됩니다. 문서에서 Ctrl+V로 붙여넣으세요."]})})]}),e.jsxs("div",{className:"editor-container",children:[T&&!L&&e.jsxs("div",{className:"variable-panel",children:[e.jsxs("div",{className:"panel-header",children:[e.jsx("h3",{children:"템플릿 변수"}),e.jsx("button",{className:"close-button",onClick:()=>P(!1),children:"✕"})]}),e.jsx("div",{className:"panel-search",children:e.jsx("input",{type:"text",placeholder:"변수 검색...",value:C,onChange:l=>H(l.target.value),className:"search-input"})}),e.jsx("div",{className:"panel-categories",children:U.map(l=>e.jsx("button",{className:`category-button ${z===l?"active":""}`,onClick:()=>n(l),children:l},l))}),e.jsx("div",{className:"panel-variables",children:B.length===0?e.jsx("div",{className:"no-results",children:"검색 결과가 없습니다"}):B.map(l=>e.jsxs("div",{className:`variable-item ${V===l.name?"copied":""}`,onClick:()=>Z(l.name),title:`클릭하여 \${${l.name}} 클립보드에 복사`,children:[e.jsxs("div",{className:"variable-name",children:["$","{"+l.name+"}"]}),e.jsx("div",{className:"variable-label",children:l.label}),e.jsx("div",{className:"variable-category",children:l.category}),V===l.name&&e.jsx("div",{style:{position:"absolute",top:"50%",right:"10px",transform:"translateY(-50%)",background:"#4CAF50",color:"white",padding:"4px 8px",borderRadius:"4px",fontSize:"11px",fontWeight:"bold"},children:"✓ 복사됨"})]},l.name))}),e.jsx("div",{className:"panel-footer",children:e.jsxs("div",{className:"usage-note",children:[e.jsx("strong",{children:"사용법:"})," 변수를 클릭하면 커서 위치에 삽입됩니다. 계약서 생성 시 실제 값으로 자동 치환됩니다."]})})]}),e.jsxs("div",{className:"editor-wrapper",children:[G&&e.jsxs("div",{className:"editor-loading",children:[e.jsx("div",{className:"spinner"}),e.jsx("div",{children:"문서를 불러오는 중..."})]}),b&&b.documentServerUrl&&e.jsx(et,{id:"docx-editor",documentServerUrl:b.documentServerUrl,config:{document:b.document,documentType:b.documentType,editorConfig:b.editorConfig,width:b.width,height:b.height,token:b.token,events:b.events},onDocumentReady:()=>{console.log("[DocxTemplateEditor] Editor ready"),y(!1)},ref:o})]})]})]})},st=_e.lazy(()=>be(()=>import("./customPopUp-1j2cuYYo.js"),__vite__mapDeps([0,1,2,3,4]))),ee=_e.lazy(()=>be(()=>import("./customDateCalendar-DqCZpPi7.js"),__vite__mapDeps([5,3,1,2,4,6,7,8,9,10,11,12])));function jt(){const{id:w=""}=We(),[r,O]=i.useState("html"),[u,L]=i.useState(""),[W,b]=i.useState(""),[te,G]=i.useState(""),[y,$]=i.useState(null),[S,T]=i.useState(`
    <div class="templateBox">
        <h1 class="templateTitle">
            근로계약서
        </h1>

        <div class="templateSection">
            <h2 class="sectionTitle">
            제 1 조 【계약당사자】		
            </h2>
            <div class="sectionContent">
            주식회사 오베네프(이하 “사업주”이라 함)와 $ref_employee_id (이하 “근로자”이라 함)은 다음과 같이 근로계약을 체결한다.	
            </div>
        </div>

        <div class="templateSection">
            <h2 class="sectionTitle">
                제 2 조 【근로계약 및 연봉계약 기간】		
            </h2>
            <div class="sectionContent">
                <div class="number">
                    <div class="numberLeft">
                    ① 근로기간 :
                    </div>
                <div class="numberRight">
                    $contract_period
                </div>
                </div>
            <div class="number">
                <div class="numberLeft">
                    ② 연봉적용기간 :
                    </div>
                <div class="numberRight">
                    $effective_date부터 재협상시까지	
                </div>
                </div>
                <div class="number">
                <div class="numberLeft">
                    ③ 
                    </div>
                <div class="numberRight">
                    "제 1항의 기간은 내부 $contract_type (시용)기간으로 협상된 급여의 100%를 지급하며,  
                        내부 평가 기준에 따라 종합평가하여 시용기간 연장 및 정규직 전환 여부를 결정하고, 
                        미전환시 계약이 종료될 수 있다."		
                </div>	
                </div>
            </div>
        </div>


        <div class="templateSection">
            <h2 class="sectionTitle">
                제 3 조 【근무장소 및 종사업종】		
            </h2>
            <div class="sectionContent">
                <div class="number">
                <div class="numberLeft">
                    ① 근무장소 : 
                    </div>
                <div class="numberRight">
                    주식회사 오베네프 / 단, 사업장 전보 및 외근 등 업무가 발생할 수 있다.	
                </div>
                </div>
            <div class="number">
                <div class="numberLeft">
                        ② 종사업종 : 
                    </div>
                <div class="numberRight">
                    $work_role / 단, 업무 내용이 변경될 수 있다.	
                </div>
                </div>
            </div>
        </div>


        <div class="templateSection">
            <h2 class="sectionTitle">
            제 4 조 【근로시간 및 휴게시간】		
            </h2>
            <div class="sectionContent">
                <div class="number">
                    <div class="numberLeft">
                        ① 근로시간 :
                    </div>
                    <div class="numberRight">
                        09:00 ∼ 18:00 (월~금 주5일)	
                    </div>
                </div>
                <div class="number">
                    <div class="numberLeft">
                        ② 휴게시간 :
                    </div>
                    <div class="numberRight">
                        12:00 ∼ 13:00, 18:00 ~ 18:30		
                    </div>
                </div>
            <div class="number">
                <div class="numberLeft">
                        ③
                    </div>
                <div class="numberRight">
                        "사업주는 업무의 특성 또는 사업장 사정에 따라 필요한 경우 
                        제1, 2항의 조건을 변경하거나 연장근로, 야간근로, 및 휴일근로를 명할 수 있으며 
                        근로자는 이에 포괄적으로 합의한  것으로 본다.<br/>
                        (동의함 □ / 동의하지 않음 □)"		
                </div>
                </div>
            <div class="number">
                <div class="numberLeft">
                        ④	
                    </div>
                <div class="numberRight">
                        출장 등 사업장 밖의 근로는 간주근로 합의에 따라 근로시간을 간주하고, 경비 등을 지급한다.	
                </div>
                </div>
            </div>
        </div>



        <div class="templateSection">
            <h2 class="sectionTitle">
            제 5 조 【임 금】			
            </h2>
            <div class="sectionContent">
                <div class="number">
                <div class="numberLeft">
                        ①
                    </div>
                <div class="numberRight">
                        급여 총액은 연간 금	$salary_yearly원으로 한다
                </div>
                </div>
            <div class="number flexColumn">
                <div class="flexbox nones">
                    <div class="numberLeft">
                        ② 월 급여 :
                    </div>
                    <div class="numberRight">
                      금 $salary_yearly/12 원
                    </div>
                </div>
                <div class="flexbox">
                    <div class="numberLeft">
                    </div>
                    <div class="numberRight">
                        수당항목 금액 지급 기준 및 계산 방법
                    </div>
                </div>
                <div class="flexbox">
                    <div class="numberLeft">
                    </div>
                    <div class="numberRight">
                        <div class="boxLeft">
                        기본급 
                        </div>
                        <div class="boxRight">
                            $base_salary 원 / 정액 지급
                        </div>
                    </div>
                </div>
                <div class="flexbox">
                    <div class="numberLeft">
                    </div>
                    <div class="numberRight">
                        <div class="boxLeft">
                        식대
                        </div>
                        <div class="boxRight">
                            $meal_allowance 원 / 지급일 기준 재직자에 한하여 지급
                        </div>
                    </div>
                </div>
                <div class="flexbox">
                    <div class="numberLeft">
                    </div>
                    <div class="numberRight">
                        <div class="boxLeft">
                            차량유지비
                        </div>
                        <div class="boxRight">
                            $vehicle_maintenance_allowance 원 / 자차 소유자가 업무용 차량 사용 시 지급
                        </div>
                    </div>
                </div>
                <div class="flexbox">
                    <div class="numberLeft">
                    </div>
                    <div class="numberRight">
                        <div class="boxLeft">
                            연구활동비
                        </div>
                        <div class="boxRight">
                            $rnd_allowance 원 / 사내 연구인력으로 등록된 재직자에 한하여 지급
                        </div>
                    </div>
                </div>
                <div class="flexbox">
                    <div class="numberLeft">
                    </div>
                    <div class="numberRight">
                        <div class="boxLeft">
                            육아수당
                        </div>
                        <div class="boxRight">
                            $babysitting_allowance 원 / 만 6세 이하의 자녀를 둔 자에 한하여 지급
                        </div>
                    </div>
                </div>
                <div class="flexbox">
                    <div class="numberLeft">
                    </div>
                    <div class="numberRight">
                        <div class="boxLeft">
                            자기계발비
                        </div>
                        <div class="boxRight">
                            $personal_development_allowance 원 / 지급일 기준 출근율이 70% 이상인 자에 한하여 지급	
                        </div>
                    </div>
                </div>
                <div class="flexbox">
                    <div class="numberLeft">
                    </div>
                    <div class="numberRight">
                        <div class="boxLeft">
                        통근교통비
                        </div>
                        <div class="boxRight">
                            $commuting_allowance 원
                        </div>
                    </div>
                </div>
                <div class="flexbox">
                    <div class="numberLeft">
                    </div>
                    <div class="numberRight">
                        <div class="boxLeft">
                        업무지원비
                        </div>
                        <div class="boxRight">
                            $work_support_allowance 원
                        </div>
                    </div>
                </div>
                <div class="flexbox">
                    <div class="numberLeft">
                    </div>
                    <div class="numberRight">
                        <div class="boxLeft">
                            초과근로수당
                        </div>
                        <div class="boxRight">
                            $holurly_rate 원 / 통상시급 x $overtime_pay_hours 시간 X 150
                        </div>
                    </div>
                </div>	
                </div>
            <div class="number noneFlex">
                위 ②의 초과근로수당은 업무 지시에 의한 월 $overtime_pay_hours시간에 해당하는 초과(연장, 야간, 휴일) 근로시간에 대한 대가로서 통상시급의 50%를 가산하여 계산한 금액이다.		
                </div>
            <div class="number">
                <div class="numberLeft">
                        ④ 
                    </div>
                <div class="numberRight">
                    월급여는 상기 1항의 연봉 총액을 1/12로 나눈 금액에서 4대보험 및 주민세 등 법령이 정하는 세금을 공제하고 매월 임금정기지급일에 을의 계좌로 지급한다.	
                </div>
                </div>
            <div class="number">
                <div class="numberLeft">
                        ⑤
                    </div>
                <div class="numberRight">
                    임금 계산기간 : 매월 1일 ∼ 말일
                </div>
                </div>
            <div class="number">
                <div class="numberLeft">
                        ⑥
                    </div>
                <div class="numberRight">
                    임금 정기지급일 : 익월 10일	
                </div>
                </div>
            </div>
        </div>


    <div class="templateSection">
        <h2 class="sectionTitle">
        제 6 조 【휴 일】			
        </h2>
        <div class="sectionContent">
        <div class="number">
            <div class="numberLeft">
                ① 주휴일 : 
                </div>
            <div class="numberRight">
                주휴일은 일요일로 하고 개근 시 주휴일을 유급으로 부여한다. 합의에 따라 주휴일을 다른 요일로 변경할 수 있으며, 토요일은 무급휴일로 한다.
            </div>
            </div>
        <div class="number">
            <div class="numberLeft">
             ② 법정휴일 : 
                </div>
            <div class="numberRight">
                    매년 근로자의 날 등 노동 관련 법령에 따라 유급휴일을 정한다.	
            </div>
            </div>
        <div class="number">
            <div class="numberLeft">
            ③
                </div>
            <div class="numberRight">
                    유급휴일이 중복될 경우에는 하나의 휴일로 본다.	
            </div>
            </div>
        </div>
    </div>


    <div class="templateSection">
        <h2 class="sectionTitle">
        제 7 조 【연차유급휴가】			
        </h2>
        <div class="sectionContent">
            <div class="number">
            <div class="numberLeft">
                    ①
                </div>
            <div class="numberRight">
                    근로기준법에 따라 1년 간 소정근로일수를 8할 이상 출근한 직원에게 15일의 연차유급휴가를 부여하고 계속 근로기간이 1년 미만인 경우 또는 1년간 출근율 80% 미만인 경우에는 1개월 개근 시 1일의 연차휴가를 부여한다.
            </div>
            </div>
        <div class="number">
            <div class="numberLeft">
                    ②
                </div>
            <div class="numberRight">
                여름휴가는 매년 회사 내규에 따라 연차유급휴가일수 내에서 활용할 수 있도록 한다.
            </div>
            </div>
        <div class="number">
            <div class="numberLeft">
                    ③
                </div>
            <div class="numberRight">
                "제1,2,3항의 연차유급휴가와 관련하여 사업주는 근로기준법 제61조(연차유급휴가 사용촉진)과 근로기준법 제62조(유급휴가의 대체)를 실시할 수 있다."		
            </div>
            </div>
        </div>
    </div>



    <div class="templateSection">
        <h2 class="sectionTitle">
        제 8 조 【퇴직 및 퇴직금】		
        </h2>
        <div class="sectionContent">
            <div class="number">
            <div class="numberLeft">
                    ①
                </div>
            <div class="numberRight">
                근로자가 퇴직하고자 할 때에는 퇴직예정일 30일 이전까지 사업주에게 통보하여야 하며 퇴직일까지 업무 인수인계를 충실히 거쳐야 한다.	
            </div>
            </div>
        <div class="number">
            <div class="numberLeft">
                    ②
                </div>
            <div class="numberRight">
                "근로자는 제2항의 기간을 위반한 일방적 퇴직 혹은 불성실한 업무 인수인계 등으로 인하여 사업주에게 손해를 끼친 경우에는 근로자는 민ㆍ형사상의 책임을 진다."		
            </div>
            </div>
        <div class="number">
            <div class="numberLeft">
                    ③
                </div>
            <div class="numberRight">
                "1년 이상 근속하는 경우 사업주가 근로자의 안정적인 노후생활 보장을 위해 설정한 퇴직연금제도에 가입할 수 있으며, 운영 및 지급과 관련된 세부사항은 퇴직연금규약에서 별도로 정한 바에 따른다."	
            </div>
            </div>
        </div>
    </div>
                                                            


    <div class="templateSection">
        <h2 class="sectionTitle">
        제 9 조 【비밀유지의무】
        </h2>
        <div class="sectionContent">
            <div class="number">
            <div class="numberLeft">
                ①	
                </div>
            <div class="numberRight">
                근로자는 재직 중이나 퇴직 후라도 본 계약의 내용(연봉과 관련된 내용 등) 및 업무상 지득한 비밀을 누설하여서는 아니된다.
            </div>
            </div>
        <div class="number">
            <div class="numberLeft">
                ②	
                </div>
            <div class="numberRight">
                근로자는 재직 중이나 퇴직 후라도 업무상 지득한 회사 및 고객에 대한 정보 및 비밀을 누설하거나 개인적인 용도로 사용하여서는 아니된다.
            </div>
            </div>
        <div class="number">
            <div class="numberLeft">
                ③	
                </div>
            <div class="numberRight">
                근로자가 고의 또는 과실로 제1항 내지 제2항을 위반하여 사업주에게 손해를 끼친 경우에는 민·형사상의 책임을 진다.
            </div>
            </div>
        </div>
    </div>



    <div class="templateSection">
        <h2 class="sectionTitle">
        제 10 조 【근로계약 해지사유
        </h2>
        <div class="sectionContent">
            <div class="number">
                사업주는 다음 각 호의 사유가 있을 때에는 근로자와의 근로계약을 해지할 수 있다.	
            </div>

            
            <div class="number">
            <div class="numberLeft">
                ①		
                </div>
            <div class="numberRight">
                취업규칙 또는 정당한 업무명령을 위반하여 해고된 경우	
            </div>
            </div>
        <div class="number">
            <div class="numberLeft">
                ②		
                </div>
            <div class="numberRight">
                학력, 경력을 위조하여 허위로 입사한 경우
            </div>
            </div>
        <div class="number">
            <div class="numberLeft">
                ③			
                </div>
            <div class="numberRight">
                    정당한 사유 없이 무단으로 조퇴 또는 외출, 결근을 지속적으로 반복하는 경우		
            </div>
            </div>
        <div class="number">
            <div class="numberLeft">
                ④		
                </div>
            <div class="numberRight">
                        근로자의 일신상의 사유로 정상적인 근로제공이 불가능한 경우	
            </div>
            </div>
        <div class="number">
            <div class="numberLeft">
                    ⑤		
                </div>
            <div class="numberRight">
                    기타 법령 및 사회상규를 위반하여 사회통념상 계속적으로 근로관계를 유지하기 어려운 경우	
            </div>
            </div>
        </div>
    </div>


    
    <div class="templateSection">
        <div class="sectionContent">
            본 계약서에 없는 사항은 노동관계법령 및 제 규정 및 당사 취업규칙에 따르기로 하고, 본 계약이 쌍방 당사자의 성실하고 진의의 의사표시에 따른 계약을 확인하는 바, 위 당사자가 아래에 서명·날인 후 쌍방이 본 계약서 각 1부씩 보관키로 한다.
        </div>
        <div class="sectionContent flexSection">
            <div class="contLeft">
            (근로계약서 교부확인 :	
            </div>
        <div class="contRight">
            $ref_employee_id  (인))		
        </div>
                            
        </div>
    </div>



    <div class="templateSection">
        <div class="sectionContent">
            $contract_date
        </div>
    </div>


    <div class="templateEnd">
        <div class="signZone">
            <div class="contLeft">
                사업주 : 	
            </div>
            <div class="contRight">
                (주)오베네프 장철훈	(인)
            </div>
                
        </div>
        <div class="signZone">
            <div class="contLeft">
                근로자 :	
            </div>
            <div class="contRight">
                $ref_employee_id (인)
            </div>
        </div>
    </div>
  </div>
`),[P,C]=i.useState(!1),[H,z]=i.useState({}),{register:n,handleSubmit:V,formState:{errors:d},setValue:o,watch:v}=Xe(),[Z,k]=i.useState(!1),[B,U]=i.useState(!1),[l,c]=i.useState({}),[h,M]=i.useState(!1),[j,J]=i.useState([]),[Y,fe]=i.useState(""),[at,it]=i.useState(""),[K,ye]=i.useState(!1),[se,ae]=i.useState(new Date),[ie,le]=i.useState(new Date),[je,Ne]=i.useState(!1),[we,Se]=i.useState(!1),[ne,ce]=i.useState(new Date),[oe,re]=i.useState(new Date),[de,me]=i.useState(new Date),[X,ve]=i.useState([{id:s.random(1e12,9999999999999)}]),[Q,xe]=i.useState(!1),[Ce,pe]=i.useState(!1),Te=v("preInformation");v("contract_type"),v("work_role"),v("salary_yearly"),v("base_salary"),v("meal_allowance"),v("vehicle_maintenance_allowance"),v("rnd_allowance"),v("babysitting_allowance"),v("personal_development_allowance"),v("commuting_allowance"),v("work_support_allowance"),v("holurly_rate"),v("overtime_pay_hours"),v("division");const ke=v("use_custom"),Be=async({id:t})=>{try{const{data:a}=await F.get("/API/salary_contract_template/get",{params:{id:t}});s.isEmpty(s.get(a,"result"))||c(s.get(a,"result.0"))}catch(a){console.log(a)}},Re=async()=>{try{const{data:t}=await F.get("/API/salary_contract_type/getAll");s.isEmpty(t)||J(t.result||t||[])}catch(t){console.log(t)}},De=async t=>{try{const{title:a,id:x,preInformation:p,work_role:m,salary_yearly:g,contract_type:_,base_salary:R,meal_allowance:N,vehicle_maintenance_allowance:D,rnd_allowance:E,babysitting_allowance:$e,personal_development_allowance:Ae,commuting_allowance:Fe,work_support_allowance:Oe,holurly_rate:Pe,overtime_pay_hours:ze,division:Ve,use_custom:Ue,salary_contract_type:Me}=t,I={title:a,body:Y,id:x,salary_contract_type:Me,preInformation:p,template_type:r,preInformation_data:{work_role:m,salary_yearly:g,contract_type:_,base_salary:R,meal_allowance:N,vehicle_maintenance_allowance:D,rnd_allowance:E,babysitting_allowance:$e,personal_development_allowance:Ae,commuting_allowance:Fe,customCheck:X,work_support_allowance:Oe,holurly_rate:Pe,overtime_pay_hours:ze,division:Ve,use_custom:Ue,effective_date:{startDate:ne},contract_date:oe,contract_period:{startTime:se,endTime:ie},entry_date:de}};let q;if(r==="docx"&&y){const f=new FormData;f.append("docxFile",y),f.append("title",I.title),f.append("id",I.id),f.append("template_type","docx"),f.append("preInformation",I.preInformation),f.append("salary_contract_type",I.salary_contract_type),f.append("preInformation_data",JSON.stringify(I.preInformation_data)),q=await F.post("/API/salary_contract_template/audit",f,{headers:{"Content-Type":"multipart/form-data"}})}else q=await F.post("/API/salary_contract_template/audit",{...I});if(!s.isEmpty(q)){const{status:f}=q;f===201?(k(!0),ue({level:"INFO",message:"근로계약서 템플릿 수정 완료",userId:he.get("username"),action:"근로계약서 템플릿 수정",status:"성공",additionalInfo:"근로계약서 템플릿이 성공적으로 수정되었습니다.",page:"근로계약서 템플릿"}),U(!1)):(k(!0),ue({level:"ERROR",message:"근로계약서 템플릿 수정 실패",userId:he.get("username"),action:"근로계약서 템플릿 수정",status:"실패",additionalInfo:"근로계약서 템플릿 수정에 실패하였습니다.",page:"근로계약서 템플릿"}),U(!0))}}catch(a){console.log(a)}};i.useCallback(({prevTemplate:t,setThisCode:a})=>{if(!s.isEmpty(t)&&t!=null&&t!=null){const p=new DOMParser().parseFromString(t,"text/xml"),m=new XMLSerializer().serializeToString(p),[g,_]=i.useState(m);return i.useEffect(()=>{a&&a(m)},[m]),e.jsx(He,{value:g,height:"calc(100vh - 100vh/4)",extensions:[Ze({jsx:!0})],onChange:R=>{_&&a&&(_(R),a(R))}})}},[S]);const Ee=({code:t,selectUser:a})=>{const x=i.useRef(""),p=i.useRef(null),m=i.useMemo(()=>{if(!t||p.current===t)return x.current;let g=s.cloneDeep(t);return x.current=g,p.current=t,g},[t]);return e.jsx(Qe,{content:m})},Ie=i.useCallback(({prevTemplate:t,setThisCode:a,setPrevTemplate:x,saveTemplate:p,setSaveTemplate:m})=>{const g=i.useRef(t);return i.useEffect(()=>{r==="html"&&!s.isEmpty(t)&&t!==g.current&&(g.current=t,a(t),x(t))},[t,r]),r!=="html"?null:e.jsx(Ke,{value:g.current,onChange:_=>{g.current=_,a(_),x(_)},saveTemplate:p,setSaveTemplate:m})},[S,r]),Le=i.useCallback(({idx:t,item:a,customCheck:x})=>{const p=x?.length||0,[m,g]=i.useState(""),_=N=>{const D=s.cloneDeep(N),E={id:s.random(1e12,9999999999999)};D.push(E),ve(D)},R=async N=>{s.set(a,"name_kor",N.target.value);const D=N.target.value.replace(/(\s*)/g,""),E=Ye.romanize(D);g(`$${E}`),s.set(a,"name_eng",`$${E}`)};return i.useEffect(()=>{s.isEmpty(s.get(a,"name_kor"))||(o(`use_custom_check[${t}].name_kor`,s.get(a,"name_kor")),o(`use_custom_check[${t}].name_eng`,`${s.get(a,"name_eng")}`))},[]),e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"addCheckArr",children:[e.jsxs("div",{className:"addLeft",children:[e.jsx("input",{type:"hidden",...n(`use_custom_check[${t}].id`),value:s.get(a,"id")}),e.jsx("input",{...n(`use_custom_check[${t}].name_kor`),placeholder:"변수명을 입력해주십시오",className:"inputText",onChange:N=>{R(N)}})]}),e.jsxs("div",{className:"addRight",children:[e.jsx("div",{className:"inLeftBox",children:"자동변수명"}),e.jsx("div",{className:"inRightBox",children:e.jsx("input",{value:m,...n(`use_custom_check[${t}].name_eng`)})})]})]}),t+1==p&&e.jsx("div",{className:"newAddCheckArrBox",children:e.jsx("div",{className:"newAddCheckArr",onClick:()=>{_(x)},children:"+ 추가"})})]})},[]);return i.useEffect(()=>{Be({id:w}),o("id",w),Re()},[w]),i.useEffect(()=>{if(!s.isEmpty(l)){o("title",s.get(l,"title"));const t=s.get(l,"template_type","html");if(O(t),t==="html"&&T(s.get(l,"template_content","")),t==="docx"&&(L(s.get(l,"docx_file_key","")),b(s.get(l,"docx_file_id","")),G(s.get(l,"docx_original_name",""))),o("preInformation",s.get(l,"preInformation")),s.get(l,"preInformation")=="true"){const a=s.get(l,"preInformation_data");setTimeout(()=>{if(s.get(a,"contract_period.startTime")){const m=A(s.get(a,"contract_period.startTime")).toDate();ae(m)}if(s.get(a,"contract_period.endTime")){const m=A(s.get(a,"contract_period.endTime")).toDate();le(m)}if(s.get(a,"effective_date.startDate")){const m=A(s.get(a,"effective_date.startDate")).toDate();ce(m)}if(s.get(a,"contract_date")){const m=A(s.get(a,"contract_date")).toDate();re(m)}if(s.get(a,"entry_date")){const m=A(s.get(a,"entry_date")).toDate();me(m)}o("contract_type",s.get(a,"contract_type")),o("work_role",s.get(a,"work_role")),o("division",s.get(a,"division")),o("salary_yearly",s.get(a,"salary_yearly")?s.get(a,"salary_yearly"):0),o("base_salary",s.get(a,"base_salary")?s.get(a,"base_salary"):0),o("meal_allowance",s.get(a,"meal_allowance")?s.get(a,"meal_allowance"):0),o("vehicle_maintenance_allowance",s.get(a,"vehicle_maintenance_allowance")?s.get(a,"vehicle_maintenance_allowance"):0),o("rnd_allowance",s.get(a,"rnd_allowance")?s.get(a,"rnd_allowance"):0),o("babysitting_allowance",s.get(a,"babysitting_allowance")?s.get(a,"babysitting_allowance"):0),o("personal_development_allowance",s.get(a,"personal_development_allowance")?s.get(a,"personal_development_allowance"):0),o("commuting_allowance",s.get(a,"commuting_allowance")?s.get(a,"commuting_allowance"):0),o("work_support_allowance",s.get(a,"work_support_allowance")?s.get(a,"work_support_allowance"):0),o("holurly_rate",s.get(a,"holurly_rate")?s.get(a,"holurly_rate"):0),o("overtime_pay_hours",s.get(a,"overtime_pay_hours")?s.get(a,"overtime_pay_hours"):0),o("use_custom",s.get(a,"use_custom"));const x=s.get(a,"customCheck");ve(Array.isArray(x)?x:[{id:s.random(1e12,9999999999999)}])},1e3)}o("salary_contract_type",s.get(l,"salary_contract_type")),M(!0)}},[l,j]),i.useEffect(()=>{if(Q){const t=setTimeout(()=>{pe(!0)},300);return()=>clearTimeout(t)}else pe(!1)},[Q]),e.jsxs(e.Fragment,{children:[Z&&e.jsx(i.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(st,{title:B?"수정이 되지 않았습니다.":"템플릿 수정이 완료되었습니다.",text:B?"에러사항을 확인해주시기 바랍니다.":"수정한 내용으로 반영되었습니다.",buttons:!0,closeState:k,buttonContent:{cancleValue:{text:"확인",link:""}},icon:!B})}),e.jsx("div",{className:"manageBox",children:e.jsxs("div",{className:"editBox wideBox",children:[e.jsx(Ge,{to:"/operator/employmentTemplate",children:e.jsx("div",{className:"backButton",children:e.jsx(qe,{src:"/web/img/prevButtons.svg",alt:""})})}),e.jsxs("form",{onSubmit:V(t=>De({...t})),children:[e.jsx("input",{type:"hidden",...n("id",{required:!0})}),e.jsxs("div",{className:"editTitle",children:[e.jsx("div",{className:"leftText",children:"근로계약 템플릿 수정"}),e.jsxs("div",{className:"rightButton",children:[r==="docx"&&u&&e.jsx("button",{type:"button",className:"saveButton",style:{marginRight:"10px",backgroundColor:"#6c757d"},onClick:()=>{const t=u.split("/").pop()||"";window.open(`/docsviewer/${encodeURIComponent(t)}`,"_blank")},children:"미리보기"}),h&&e.jsx("button",{type:"submit",className:"saveButton",children:"수정"})]})]}),e.jsxs("div",{className:"editBottomBox",children:[e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"제목"}),e.jsx("div",{className:"textInputBox",children:e.jsx("input",{placeholder:"제목을 입력해주세요",...n("title",{required:!0}),className:"custom_input_4"})}),!s.isEmpty(s.get(d,"title"))&&e.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]}),e.jsxs("div",{className:"textBox",children:[e.jsxs("div",{className:"textTitle",children:["계약유형",e.jsx("span",{className:"required"})]}),e.jsxs("div",{className:"textInputBox",children:[e.jsxs("select",{className:"customSelect_2",...n("salary_contract_type",{required:!0}),children:[e.jsx("option",{value:"",children:"유형선택"}),!s.isEmpty(j)&&j.map((t,a)=>e.jsx("option",{value:`${s.get(t,"_hid")}`,children:s.get(t,"salryContractType_name")},`operator_employment_template_emplyee_type_${a}`))]}),!s.isEmpty(s.get(d,"salary_contract_type"))&&e.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"사전데이터 입력여부"}),e.jsxs("div",{className:"textInputBox customRadio",children:[e.jsxs("label",{htmlFor:"true",children:[e.jsx("input",{type:"radio",id:"true",value:"true",...n("preInformation",{required:!0})}),e.jsx("p",{children:"예"})]}),e.jsxs("label",{htmlFor:"false",children:[e.jsx("input",{type:"radio",id:"false",value:"false",...n("preInformation",{required:!0})}),e.jsx("p",{children:"아니오"})]})]}),!s.isEmpty(s.get(d,"preInformation"))&&e.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]}),Te=="true"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flexTextBox",children:[e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"최초입사일 설정"}),e.jsx("div",{className:"textInputBox",children:e.jsx(i.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(ee,{setStartDate:me,startDate:de})})})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"근로기간 설정"}),e.jsx("div",{className:"textInputBox",children:e.jsx(i.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(Je,{isOpen:je,isOpenEnd:we,setIsOpen:Ne,setIsOpenEnd:Se,setStartDate:ae,startDate:se,setEndDate:le,endDate:ie})})})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"연봉적용기간 설정"}),e.jsx("div",{className:"textInputBox",children:e.jsx(i.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(ee,{setStartDate:ce,startDate:ne})})})]})]}),e.jsxs("div",{className:"flexTextBox",children:[e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"계약유형"}),e.jsx("div",{className:"textInputBox",children:e.jsx("input",{placeholder:"계약유형을 입력해주세요",...n("contract_type"),className:"custom_input_4"})})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"소속부서"}),e.jsx("div",{className:"textInputBox",children:e.jsx("input",{placeholder:"소속부서를 입력해주세요",...n("division"),className:"custom_input_4"})})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"종사업종"}),e.jsx("div",{className:"textInputBox",children:e.jsx("input",{placeholder:"종사업종을 입력해주세요",...n("work_role"),className:"custom_input_4"})})]})]}),e.jsxs("div",{className:"flexTextBox",children:[e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"연봉"}),e.jsx("div",{className:"textInputBox",children:e.jsx("input",{type:"number",placeholder:"연봉을 입력해주세요",...n("salary_yearly",{validate:t=>t===""||/^[0-9]+$/g.test(t)&&parseInt(t)>=0}),className:"custom_input_4"})}),!s.isEmpty(s.get(d,"salary_yearly"))&&e.jsx("div",{className:"warningBox",children:"해당값은 정수만 입력가능합니다."})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"기본급"}),e.jsx("div",{className:"textInputBox",children:e.jsx("input",{type:"number",placeholder:"기본급을 입력해주세요",...n("base_salary",{validate:t=>t===""||/^[0-9]+$/g.test(t)&&parseInt(t)>=0}),className:"custom_input_4"})}),!s.isEmpty(s.get(d,"base_salary"))&&e.jsx("div",{className:"warningBox",children:"해당값은 정수만 입력가능합니다."})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"식대"}),e.jsx("div",{className:"textInputBox",children:e.jsx("input",{type:"number",placeholder:"식대를 입력해주세요",...n("meal_allowance",{validate:t=>t===""||/^[0-9]+$/g.test(t)&&parseInt(t)>=0}),className:"custom_input_4"})}),!s.isEmpty(s.get(d,"meal_allowance"))&&e.jsx("div",{className:"warningBox",children:"해당값은 정수만 입력가능합니다."})]})]}),e.jsxs("div",{className:"flexTextBox",children:[e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"차량유지비"}),e.jsx("div",{className:"textInputBox",children:e.jsx("input",{type:"number",placeholder:"차량유지비를 입력해주세요",...n("vehicle_maintenance_allowance",{validate:t=>t===""||/^[0-9]+$/g.test(t)&&parseInt(t)>=0}),className:"custom_input_4"})}),!s.isEmpty(s.get(d,"vehicle_maintenance_allowance"))&&e.jsx("div",{className:"warningBox",children:"해당값은 정수만 입력가능합니다."})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"연구활동비"}),e.jsx("div",{className:"textInputBox",children:e.jsx("input",{type:"number",placeholder:"연구활동비를 입력해주세요",...n("rnd_allowance",{validate:t=>t===""||/^[0-9]+$/g.test(t)&&parseInt(t)>=0}),className:"custom_input_4"})}),!s.isEmpty(s.get(d,"rnd_allowance"))&&e.jsx("div",{className:"warningBox",children:"해당값은 정수만 입력가능합니다."})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"육아수당"}),e.jsx("div",{className:"textInputBox",children:e.jsx("input",{type:"number",placeholder:"육아수당을 입력해주세요",...n("babysitting_allowance",{validate:t=>t===""||/^[0-9]+$/g.test(t)&&parseInt(t)>=0}),className:"custom_input_4"})}),!s.isEmpty(s.get(d,"babysitting_allowance"))&&e.jsx("div",{className:"warningBox",children:"해당값은 정수만 입력가능합니다."})]})]}),e.jsxs("div",{className:"flexTextBox",children:[e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"자기계발비"}),e.jsx("div",{className:"textInputBox",children:e.jsx("input",{type:"number",placeholder:"자기계발비를 입력해주세요",...n("personal_development_allowance",{validate:t=>t===""||/^[0-9]+$/g.test(t)&&parseInt(t)>=0}),className:"custom_input_4"})}),!s.isEmpty(s.get(d,"personal_development_allowance"))&&e.jsx("div",{className:"warningBox",children:"해당값은 정수만 입력가능합니다."})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"통근교통비"}),e.jsx("div",{className:"textInputBox",children:e.jsx("input",{type:"number",placeholder:"통근교통비를 입력해주세요",...n("commuting_allowance",{validate:t=>t===""||/^[0-9]+$/g.test(t)&&parseInt(t)>=0}),className:"custom_input_4"})}),!s.isEmpty(s.get(d,"commuting_allowance"))&&e.jsx("div",{className:"warningBox",children:"해당값은 정수만 입력가능합니다."})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"업무지원비"}),e.jsx("div",{className:"textInputBox",children:e.jsx("input",{type:"number",placeholder:"업무지원비를 입력해주세요",...n("work_support_allowance",{validate:t=>t===""||/^[0-9]+$/g.test(t)&&parseInt(t)>=0}),className:"custom_input_4"})}),!s.isEmpty(s.get(d,"work_support_allowance"))&&e.jsx("div",{className:"warningBox",children:"해당값은 정수만 입력가능합니다."})]})]}),e.jsxs("div",{className:"flexTextBox",children:[e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"초과근로수당"}),e.jsx("div",{className:"textInputBox",children:e.jsx("input",{type:"number",placeholder:"초과근로수당을 입력해주세요",...n("holurly_rate",{validate:t=>t===""||/^[0-9]+$/g.test(t)&&parseInt(t)>=0}),className:"custom_input_4"})}),!s.isEmpty(s.get(d,"holurly_rate"))&&e.jsx("div",{className:"warningBox",children:"해당값은 정수만 입력가능합니다."})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"초과근로 기준시간"}),e.jsx("div",{className:"textInputBox",children:e.jsx("input",{type:"number",placeholder:"초과근로 기준시간을 입력해주세요",...n("overtime_pay_hours",{validate:t=>t===""||/^[0-9]+$/g.test(t)&&parseInt(t)>=0}),className:"custom_input_4"})}),!s.isEmpty(s.get(d,"overtime_pay_hours"))&&e.jsx("div",{className:"warningBox",children:"해당값은 정수만 입력가능합니다."})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"계약작성일 설정"}),e.jsx("div",{className:"textInputBox",children:e.jsx(i.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(ee,{setStartDate:re,startDate:oe})})})]})]}),e.jsx("div",{className:"flexTextBox",children:e.jsxs("div",{className:"flexSpaceWrap",children:[e.jsxs("div",{className:"textBox flexSpace",children:[e.jsx("div",{className:"textTitle",children:"사용자 동의 데이터"}),e.jsx("div",{className:"textInputBox",children:e.jsxs("label",{htmlFor:"customCheck",className:"customCheckBox",children:[e.jsx("input",{type:"checkbox",id:"customCheck",value:"true",...n("use_custom")}),e.jsx("span",{}),e.jsx("p",{children:"사용"})]})})]}),ke=="true"&&!s.isEmpty(X)&&X.map((t,a)=>e.jsx(Le,{item:t,idx:a,customCheck:X},`AddRadioArray_${a}`))]})})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"템플릿 타입"}),e.jsx("div",{className:"textInputBox",children:e.jsxs("div",{style:{padding:"10px",background:"#f5f5f5",borderRadius:"4px"},children:[r==="html"?"📝 HTML 템플릿":"📄 DOCX 템플릿",r==="docx"&&u&&e.jsxs("span",{style:{marginLeft:"15px",color:"#666"},children:["파일명: ",u.split("/").pop()]})]})})]}),r==="docx"&&e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"DOCX 파일 재업로드"}),e.jsx("div",{className:"textInputBox",children:y?e.jsxs("div",{style:{padding:"10px",background:"#e8f5e9",borderRadius:"4px"},children:["✅ 새 파일: ",y.name,e.jsx("button",{type:"button",style:{marginLeft:"15px",padding:"5px 15px",background:"#f44336",color:"white",border:"none",borderRadius:"4px",cursor:"pointer"},onClick:()=>$(null),children:"취소"})]}):e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",style:{padding:"10px 20px",background:"#4CAF50",color:"white",border:"none",borderRadius:"4px",cursor:"pointer"},onClick:()=>{const t=document.createElement("input");t.type="file",t.accept=".docx",t.onchange=a=>{const x=a.target.files[0];x&&$(x)},t.click()},children:"📁 새 DOCX 파일 업로드"}),e.jsx("div",{style:{marginTop:"8px",fontSize:"13px",color:"#666"},children:"새 파일을 업로드하지 않으면 기존 파일이 유지됩니다"})]})})]}),e.jsxs("div",{className:"textBox",children:[e.jsxs("div",{className:"textTitle flexTitle",children:["내용",e.jsx("div",{className:"templateSaveBtn",onClick:()=>{C(!0)},children:"작성내용 확인 및 저장"}),e.jsx("span",{className:K?"variableInfo active":"variableInfo",onClick:()=>{ye(!K)},children:"?"}),K&&e.jsxs("div",{className:"openBox",children:[e.jsxs("div",{className:"leftBox",children:[e.jsxs("div",{className:"inSection",children:["편집기 안에 $ref_employee_id 등의 변수는 실제 ",e.jsx("br",{}),"근로계약서에 사용되는 변수입니다."]}),e.jsx("div",{className:"inSection bolds",children:"해당 변수명을 변경하지 마십시오."}),e.jsxs("div",{className:"inSection",children:["$ref_employee_id : 근로자",e.jsx("br",{}),"$contract_period : 근로기간",e.jsx("br",{}),"$effective_date : 연봉적용기간",e.jsx("br",{}),"$contract_type : 근로계약종류",e.jsx("br",{}),"$work_role : 종사업종",e.jsx("br",{}),"$salary_yearly : 연봉",e.jsx("br",{}),"$base_salary : 기본급",e.jsx("br",{})]})]}),e.jsx("div",{className:"rightBox",children:e.jsxs("div",{className:"inSection",children:["$meal_allowance : 식대",e.jsx("br",{}),"$vehicle_maintenance_allowance : 차량유지비",e.jsx("br",{}),"$rnd_allowance : 연구활동비",e.jsx("br",{}),"$babysitting_allowance : 육아수당",e.jsx("br",{}),"$personal_development_allowance : 자기계발비",e.jsx("br",{}),"$commuting_allowance : 통근교통비",e.jsx("br",{}),"$work_support_allowance : 업무지원비",e.jsx("br",{}),"$holurly_rate : 초과근로수당",e.jsx("br",{}),"$overtime_pay_hours : 초과근로시간 기준",e.jsx("br",{}),"$contract_date : 계약일"]})})]})]}),e.jsxs("div",{className:"textInputBox",children:[r==="html"&&e.jsxs("div",{className:"editorBox employmentBox",style:{width:"-webkit-fill-available;"},children:[e.jsx(Ie,{prevTemplate:S,setThisCode:fe,setPrevTemplate:T,saveTemplate:P,setSaveTemplate:C}),Y&&e.jsx(Ee,{code:Y,selectUser:H})]}),r==="docx"&&u&&e.jsxs("div",{style:{padding:"40px",textAlign:"center",background:"#f9f9f9",borderRadius:"4px"},children:[e.jsxs("p",{style:{marginBottom:"20px",fontSize:"16px",color:"#333"},children:["DOCX 템플릿: ",e.jsx("strong",{children:u?u.split("/").pop():""})]}),e.jsx("button",{type:"button",onClick:()=>xe(!0),style:{padding:"12px 30px",fontSize:"16px",background:"#007bff",color:"white",border:"none",borderRadius:"4px",cursor:"pointer",fontWeight:"bold"},children:"📝 DOCX 템플릿 편집하기"})]}),r==="docx"&&!u&&e.jsx("div",{style:{padding:"40px",textAlign:"center",background:"#f9f9f9",borderRadius:"4px",color:"#666"},children:e.jsx("p",{children:"DOCX 파일을 업로드하면 여기에서 편집할 수 있습니다."})})]})]})]})]})]})}),Q&&r==="docx"&&u&&e.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0, 0, 0, 0.85)",zIndex:9999,display:"flex",padding:0,margin:0},children:e.jsxs("div",{style:{background:"white",width:"100vw",height:"100vh",display:"flex",flexDirection:"column",overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"15px 20px",borderBottom:"1px solid #ddd",display:"flex",justifyContent:"space-between",alignItems:"center",background:"#f8f9fa",flexShrink:0},children:[e.jsxs("h2",{style:{margin:0,fontSize:"18px",fontWeight:"bold"},children:["📝 DOCX 템플릿 편집: ",u?u.split("/").pop():""]}),e.jsx("button",{onClick:()=>xe(!1),style:{padding:"8px 16px",fontSize:"16px",background:"#6c757d",color:"white",border:"none",borderRadius:"4px",cursor:"pointer",fontWeight:"bold"},children:"✕ 닫기"})]}),e.jsx("div",{style:{flex:1,overflow:"hidden",display:"flex"},children:Ce?e.jsx(tt,{fileKey:u,webDriveId:W,readOnly:!1,isLocalFile:!0}):e.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsxs("div",{style:{textAlign:"center",padding:"40px"},children:[e.jsx("div",{style:{fontSize:"18px",color:"#666",marginBottom:"10px"},children:"📄 에디터를 불러오는 중입니다..."}),e.jsx("div",{style:{fontSize:"14px",color:"#999"},children:"잠시만 기다려주세요"})]})})})]})})]})}export{jt as default};
