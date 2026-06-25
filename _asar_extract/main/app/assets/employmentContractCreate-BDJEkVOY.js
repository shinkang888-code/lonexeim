const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/customPopUp-1j2cuYYo.js","assets/index-ak5BsCze.js","assets/vendor-react-DLmlTesg.js","assets/vendor-pdf-D5Eab7jE.js","assets/index-D3sbFfH5.css","assets/customPopUpForFunction-BNOnp2sE.js","assets/selectPreData-sGGFHZDt.js","assets/pageNation-BXJ_iC5V.js","assets/moment-B-YVwB4U.js","assets/addPreData-DgKkjFRQ.js","assets/customDateCalendar-DqCZpPi7.js","assets/index-jnRmlWET.js","assets/isNativeReflectConstruct-XGLLvWSz.js","assets/createClass-BeTC7LXt.js","assets/toPropertyKey-Dg8hKEVS.js","assets/defineProperty-BKLqfx38.js","assets/index-8t4SYTBK.css","assets/customPickCalendar-B8EAXH0T.js"])))=>i.map(i=>d[i]);
import{_ as de}from"./vendor-pdf-D5Eab7jE.js";import{b as Te,u as ws,l as t,j as e,I as $s,a as C,L as it}from"./index-ak5BsCze.js";import{b as i,L as Ns,R as me}from"./vendor-react-DLmlTesg.js";import L from"./customDateCalendar-DqCZpPi7.js";import{C as Ss}from"./customPickCalendar-B8EAXH0T.js";import{h as p}from"./moment-B-YVwB4U.js";import{k as Es}from"./index-CySRtK6F.js";import{S as Ds,a as ks}from"./smartEditorViewer-yoNX7knP.js";import"./index-jnRmlWET.js";import"./isNativeReflectConstruct-XGLLvWSz.js";import"./createClass-BeTC7LXt.js";import"./toPropertyKey-Dg8hKEVS.js";import"./defineProperty-BKLqfx38.js";const Bs=me.lazy(()=>de(()=>import("./customPopUp-1j2cuYYo.js"),__vite__mapDeps([0,1,2,3,4]))),Cs=me.lazy(()=>de(()=>import("./customPopUpForFunction-BNOnp2sE.js"),__vite__mapDeps([5,1,2,3,4]))),Ls=me.lazy(()=>de(()=>import("./selectPreData-sGGFHZDt.js"),__vite__mapDeps([6,3,1,2,4,7,8]))),As=me.lazy(()=>de(()=>import("./addPreData-DgKkjFRQ.js"),__vite__mapDeps([9,3,1,2,4,10,11,12,13,14,15,16,8,17])));function Us({user:nt}){const Pe=Te.get("username"),{register:g,handleSubmit:ct,formState:{errors:y},watch:v,setValue:c}=ws(),[ot,pe]=i.useState(!1),rt="근로자 선택",dt=`${p().format("YYYY년 MM월 DD일")} ~ ${p().format("YYYY년 MM월 DD일")}`,mt=p().format("YYYY년 MM월 DD일"),pt="계약종류 입력필요",Ye=0,ut=0,vt=0,_t=0,xt=0,ht=0,gt=0,ft=0,yt=0,bt=0,jt=10,wt=p().format("YYYY년 MM월 DD일"),$t=p().format("YYYY년 MM월 DD일"),Nt="업종 입력필요",St="부서 입력필요",[Et,Oe]=i.useState(`
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
                    "제 1항의 기간은 내부 수습(시용)기간으로 협상된 급여의 100%를 지급하며,  
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
                            $vehicle_maintenance_allowance원 / 자차 소유자가 업무용 차량 사용 시 지급
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
                            $rnd_allowance원 / 사내 연구인력으로 등록된 재직자에 한하여 지급
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
                            $babysitting_allowance원 / 만 6세 이하의 자녀를 둔 자에 한하여 지급
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
                            $personal_development_allowance원 / 지급일 기준 출근율이 70% 이상인 자에 한하여 지급	
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
                            $commuting_allowance원
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
                            $work_support_allowance원
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
                            $holurly_rate원 / 통상시급 x $overtime_pay_hours시간 X 150
                        </div>
                    </div>
                </div>	
                </div>
            <div class="number">
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
`),[Dt,ue]=i.useState(!1),[ve,Me]=i.useState(!1),[_e,kt]=i.useState(""),[Rs,Bt]=i.useState(""),[Ct,Lt]=i.useState(!1),[Fe,At]=i.useState([]),[x,We]=i.useState({}),[Rt,ze]=i.useState(null),[ee,te]=i.useState(!1),[Ve,R]=i.useState(null),[se,qe]=i.useState(null),[Is,It]=i.useState(""),[Ts,Ke]=i.useState(null),[Tt,Xe]=i.useState(!1),[He,Ge]=i.useState([]),[S,Pt]=i.useState([]),[Yt,xe]=i.useState(""),[E,Ot]=i.useState({}),[N,F]=i.useState(new Date),[W,he]=i.useState(new Date),[Mt,Ft]=i.useState(!1),[Wt,zt]=i.useState(!1),[z,ae]=i.useState(new Date),[V,le]=i.useState(new Date),[D,q]=i.useState(new Date),[K,Ze]=i.useState(new Date),[ge,Vt]=i.useState(!1),[qt,Qe]=i.useState(!1),[Je,fe]=i.useState(!1),[n,X]=i.useState({}),[I,ye]=i.useState([{id:t.random(1e12,9999999999999)}]),[Ue,Kt]=i.useState({}),[Xt,Ht]=i.useState(0),[ie,et]=i.useState(new Date),[H,Gt]=i.useState([]),[G,Zt]=i.useState({}),[Z,tt]=i.useState(new Date),[Q,st]=i.useState(new Date),[Qt,T]=i.useState(!1),[Jt,J]=i.useState(""),[Ut,P]=i.useState(!1),[es,Y]=i.useState(""),[ts,O]=i.useState(!1),[ss,M]=i.useState(""),[at,U]=i.useState(""),as=async a=>{try{const{data:l,status:o}=await C.get("/API/privateKey/getAdminKey",{params:{username:a}});o==201&&(t.isEmpty(l)||Kt(l))}catch(l){console.log(l)}},ls=a=>{a.key==="Enter"&&a.preventDefault()},is=async()=>{try{const{data:a}=await C.get("/API/member/getOrgUser");Pt(a),t.isEmpty(a)||a.map((l,o)=>{console.log("???"),o==0&&(xe(t.get(l,"username","")),Ge(t.get(l,"subordinate",[])),c("ref_directSuperior",t.get(l,"username")))})}catch(a){console.log(a)}},ns=async()=>{try{const{data:a}=await C.get("/API/salary_contract_template/getAll");At(a.result||a||[])}catch(a){console.log(a)}},k=v("ref_directSuperior"),ne=v("username"),be=v("contract_type"),je=v("work_role"),ce=v("salary_yearly"),A=v("base_salary"),we=v("meal_allowance"),$e=v("vehicle_maintenance_allowance"),Ne=v("rnd_allowance"),Se=v("babysitting_allowance"),Ee=v("personal_development_allowance"),De=v("commuting_allowance"),ke=v("work_support_allowance"),Be=v("holurly_rate"),Ce=v("overtime_pay_hours"),Le=v("division"),cs=v("use_custom"),Ae=v("prev_company"),os=v("use_employ_end"),rs=v("signature_way"),ds=async()=>{try{const{data:a}=await C.get("/API/company/get");t.isEmpty(a)||Gt(t.get(a,"result"))}catch(a){console.log(a)}},ms=async a=>{try{pe(!0);const{work_role:l,username:o,salary_yearly:r,contract_type:m,base_salary:s,meal_allowance:u,vehicle_maintenance_allowance:j,rnd_allowance:h,babysitting_allowance:b,personal_development_allowance:d,commuting_allowance:w,work_support_allowance:B,holurly_rate:f,overtime_pay_hours:_,division:hs,use_custom:gs,use_employ_end:fs,signature_way:ys,use_only_name:bs}=a;let oe={body:_e,startDate:z,contractStartDate:V,employmentStartDate:N,employmentEndDate:W,entryDate:D,regularWorkDate:K,quitDate:ie,contractInitDate:Z,contractEndDate:Q,prev_company:G,work_role:l,division:hs,contract_type:m,username:o,salary_yearly:"",base_salary:"",meal_allowance:"",vehicle_maintenance_allowance:"",rnd_allowance:"",babysitting_allowance:"",personal_development_allowance:"",commuting_allowance:"",work_support_allowance:"",holurly_rate:"",overtime_pay_hours:"",base_template:x,customCheck:I,use_custom:gs,use_employ_end:fs,signature_way:ys,use_only_name:bs},re={salary_yearly:r||0,hourly_rate:f||0,base_salary:s||0,meal_allowance:u||0,rnd_allowance:h||0,vehicle_maintenance_allowance:j||0,personal_development_allowance:d||0,babysitting_allowance:b||0,commuting_allowance:w||0,work_support_allowance:B||0,overtime_pay:0,overtime_pay_hours:_||0};if(!t.isEmpty(oe)){const{data:lt,status:Ps}=await C.post("/API/privateKey/encrypt/user/salaryContract",{username:o,data:re});t.isEmpty(lt)||(oe={...oe,encryptedData:lt});const{data:Ie,status:js}=await C.post("/API/salary_contract/create",{...oe});if(!t.isEmpty(Ie)&&(localStorage.setItem("reloadContractList","active"),Bt(t.get(Ie,"_id")),!t.isEmpty(Ue))){re={...re,id:t.get(Ie,"_id")};const{data:Ys,status:Os}=await C.post("/API/privateKey/encrypt/admin/salaryContract",{username:o,data:re,adminKey:Ue})}js===201?(ue(!0),it({level:"INFO",message:"근로계약서 생성 완료",userId:Te.get("username"),action:"근로계약서 생성",status:"성공",additionalInfo:"근로계약서가 성공적으로 생성되었습니다.",page:"근로계약서"}),Me(!1)):(ue(!0),it({level:"ERROR",message:"근로계약서 생성 실패",userId:Te.get("username"),action:"근로계약서 생성",status:"실패",additionalInfo:"근로계약서 생성에 실패하였습니다.",page:"근로계약서"}),Me(!0))}}catch(l){console.log(l)}},ps=async()=>{try{te(!0),R(null);const a=t.get(x,"_id"),l=t.get(x,"template_type");if(!a){R("템플릿을 먼저 선택해주세요."),te(!1);return}if(l!=="docx"){R("DOCX 템플릿만 미리보기가 가능합니다."),te(!1);return}const o={ref_employee_id:t.get(E,"employee.fullName",""),contract_type:be||"",work_role:je||"",division:Le||"",salary_yearly:ce||0,base_salary:A||0,meal_allowance:we||0,vehicle_maintenance_allowance:$e||0,rnd_allowance:Ne||0,babysitting_allowance:Se||0,personal_development_allowance:Ee||0,commuting_allowance:De||0,work_support_allowance:ke||0,holurly_rate:Be||0,overtime_pay_hours:Ce||10,contract_period:{startTime:N,endTime:W},effective_date:{startDate:z},contract_date:V,entry_date:D,company:t.get(E,"organization",{}),organization:t.get(E,"organization",{})},r=t.get(E,"employee",{}),m=await C.post("/API/salary_contract/previewDocxTemplate",{templateId:a,employeeData:r,contractData:o});if(m.data.success){const s=m.data.onlyofficeConfig,u=m.data.onlyofficeUrl;qe({...s,events:{onDocumentReady:()=>{console.log("[OnlyOffice] Document loaded successfully")}}}),It(u),ze("onlyoffice"),Ke(m.data.tempFilePath),console.log("[Preview] OnlyOffice viewer initialized")}else R("미리보기 생성에 실패했습니다.")}catch(a){console.error("DOCX 미리보기 생성 오류:",a),R("미리보기 생성 중 오류가 발생했습니다.")}finally{te(!1)}},us=i.useCallback(({selectTemplate:a,setTemplateListOpen:l,templateListOpen:o,prevTemplateList:r})=>{const[m,s]=i.useState(!1),[u,j]=i.useState(!1),[h,b]=i.useState({}),[d,w]=i.useState({}),B=({selectTemplate:f,thisType:_})=>{t.isEmpty(f)?(!t.isEmpty(_)&&_!=null&&_!=null&&(We(_),t.isEmpty(t.get(_,"preInformation_data"))?X({}):X(t.get(_,"preInformation_data"))),l&&l(!1)):t.get(f,"_id")!=t.get(_,"_id")?!t.isEmpty(_)&&_!=null&&_!=null&&(s(!0),b(_),t.isEmpty(t.get(_,"preInformation_data"))?X({}):w(t.get(_,"preInformation_data"))):l&&l(!1)};return i.useEffect(()=>{!t.isEmpty(a)&&u&&!t.isEmpty(h)&&(We(h),t.isEmpty(d)||(X(d),w({})),j(!1),s(!1),b({}),l&&l(!1))},[a,u,h,d]),e.jsxs(e.Fragment,{children:[m&&e.jsx(i.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(Cs,{title:"다른 템플릿으로 변경하시겠습니까?",text:"확인을 누를 경우 해당 입력헀던 내용이 전부 초기화됩니다.<br/>또한 사전입력 데이터가 있을 경우 덮어씌워질 수 있습니다.",buttons:!0,closeState:s,buttonContent:{confirmValue:{text:"확인"},cancleValue:{text:"취소"}},icon:!1,setAlertCheck:j})}),e.jsxs("div",{className:t.isEmpty(a)?"clickSelectBox":"clickSelectBox selected",children:[e.jsx("div",{className:t.isEmpty(a)?"selectedBox":"selectedBox selected",onClick:()=>{l&&l(!o)},children:t.isEmpty(a)?"선택해주세요":e.jsxs(e.Fragment,{children:[t.get(a,"title"),e.jsx("span",{style:{marginLeft:"10px",padding:"3px 10px",background:t.get(a,"template_type","html")==="docx"?"#2196F3":"#4CAF50",color:"white",borderRadius:"10px",fontSize:"12px",fontWeight:"bold"},children:t.get(a,"template_type","html")==="docx"?"📄 DOCX":"📝 HTML"})]})}),o&&e.jsx("div",{className:"templateList",onBlur:()=>{l&&l(!1)},children:!t.isEmpty(r)&&r!=null&&r.map(f=>{const _=t.get(f,"template_type","html");return e.jsx("div",{className:"tempList",onClick:()=>{B({selectTemplate:a,thisType:f})},children:e.jsxs("div",{className:"leftBox",children:[t.get(f,"title"),e.jsx("span",{style:{marginLeft:"10px",padding:"2px 8px",background:_==="docx"?"#2196F3":"#4CAF50",color:"white",borderRadius:"8px",fontSize:"11px",fontWeight:"bold"},children:_==="docx"?"📄 DOCX":"📝 HTML"})]})},t.get(f,"_id"))})})]}),!t.isEmpty(a)&&t.get(a,"template_type")==="docx"&&e.jsxs("div",{style:{marginTop:"10px",padding:"12px",background:"#e3f2fd",border:"1px solid #2196F3",borderRadius:"4px",fontSize:"13px",color:"#1565c0"},children:[e.jsx("strong",{children:"📄 DOCX 템플릿"}),e.jsx("div",{style:{marginTop:"5px"},children:"계약서 생성 시 DOCX 파일이 자동으로 생성되고, 변수가 치환된 후 PDF로 변환됩니다."})]})]})},[Fe,x]),Re=(a,l)=>{!t.isEmpty(a)&&!t.isEmpty(l)&&(a!="기타"?(c(l,a),l=="contract_type"&&(J(a),T(!1)),l=="division"&&(Y(a),P(!1)),l=="work_role"&&(M(a),O(!1))):(c(l,""),l=="contract_type"&&(etContract_type_select_value(a),T(!0)),l=="division"&&(Y(a),P(!0)),l=="work_role"&&(M(a),O(!0))))},vs=i.useCallback(({idx:a,item:l,customCheck:o})=>{const r=o.length,[m,s]=i.useState(""),u=h=>{const b=t.cloneDeep(h),d={id:t.random(1e12,9999999999999)};b.push(d),ye(b)},j=async h=>{t.set(l,"name_kor",h.target.value);const b=h.target.value.replace(/(\s*)/g,""),d=Es.romanize(b);s(`$${d}`),t.set(l,"name_eng",`$${d}`)};return i.useEffect(()=>{t.isEmpty(t.get(l,"name_kor"))||(c(`use_custom_check[${a}].name_kor`,t.get(l,"name_kor")),s(t.get(l,"name_eng")))},[]),e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"addCheckArr",children:[e.jsxs("div",{className:"addLeft",children:[e.jsx("input",{type:"hidden",...g(`use_custom_check[${a}].id`),value:t.get(l,"id")}),e.jsx("input",{...g(`use_custom_check[${a}].name_kor`),placeholder:"변수명을 입력해주십시오",className:"inputText",onChange:h=>{j(h)}})]}),e.jsxs("div",{className:"addRight",children:[e.jsx("div",{className:"inLeftBox",children:"자동변수명"}),e.jsx("div",{className:"inRightBox",children:e.jsx("input",{value:m,...g(`use_custom_check[${a}].name_eng`)})})]})]}),a+1==r&&e.jsx("div",{className:"newAddCheckArrBox",children:e.jsx("div",{className:"newAddCheckArr",onClick:()=>{u(o)},children:"+ 추가"})})]})},[]);i.useEffect(()=>{as(Pe)},[Pe]),i.useEffect(()=>{const a="https://office.lonex.kr",l="onlyoffice-api";if(document.getElementById(l))return;const o=document.createElement("script");return o.id=l,o.src=`${a}/web-apps/apps/api/documents/api.js`,o.async=!0,o.onload=()=>{console.log("[OnlyOffice] DocsAPI loaded successfully")},o.onerror=()=>{console.error("[OnlyOffice] Failed to load DocsAPI")},document.head.appendChild(o),()=>{const r=document.getElementById(l);r&&document.head.removeChild(r)}},[]),i.useEffect(()=>{is(),ns(),ds()},[x]),i.useEffect(()=>{if(se&&window.DocsAPI){const a=document.getElementById("onlyoffice-editor");if(a){a.innerHTML="";try{new window.DocsAPI.DocEditor("onlyoffice-editor",se),console.log("[OnlyOffice] Editor initialized")}catch(l){console.error("[OnlyOffice] Failed to initialize editor:",l),R("OnlyOffice 뷰어 초기화에 실패했습니다.")}}}},[se]),i.useEffect(()=>{if(!t.isEmpty(x)){const a=t.get(x,"salary_contract_type");a=="ade94f220b6c438b86020d862a27c004"?U("noraml"):a=="483e86d9de86fc02cf21ef04ff681dc7"?U("qulify"):a=="09c5af671a54a934cb9c0df62bd959c2"?U("secret"):a=="71583ef062e4ba9408d9ae213098ec2e"?U("parttime"):a=="6c3b68951474a088f2b9865311327cde"&&U("outside"),Xe(!1),c("title",t.get(x,"title"));const l=t.get(x,"template_content");if(l!=null&&!t.isEmpty(l)&&Oe(l),t.get(x,"information.effective_date")){const r=p(t.get(x,"information.effective_date")).toDate();ae(r)}t.get(x,"information.work_role")&&c("work_role",t.get(x,"information.work_role")),setTimeout(()=>{Xe(!0)},500)}},[x]),i.useEffect(()=>{t.isEmpty(k)||xe(k)},[k]),i.useEffect(()=>{!t.isEmpty(S)&&!t.isEmpty(ne)&&S.map(a=>{t.get(a,"username")==k&&(t.isEmpty(t.get(a,"subordinate"))||t.get(a,"subordinate",[]).map(o=>{ne==t.get(o,"employee.username")&&Ot(o)}))})},[S,ne,k]),i.useEffect(()=>{if(t.isEmpty(n))F(new Date),he(new Date),ae(new Date),le(new Date),q(new Date),Ze(new Date),ye([{id:t.random(1e12,9999999999999)}]),c("contract_type",""),c("work_role",""),c("division",""),c("salary_yearly",0),c("base_salary",0),c("meal_allowance",0),c("vehicle_maintenance_allowance",0),c("rnd_allowance",0),c("babysitting_allowance",0),c("personal_development_allowance",0),c("commuting_allowance",0),c("work_support_allowance",0),c("holurly_rate",0),c("overtime_pay_hours",0),c("use_custom","");else{if(t.get(n,"contract_period.startTime")){const l=p(t.get(n,"contract_period.startTime")).toDate();F(l)}if(t.get(n,"contract_period.endTime")){const l=p(t.get(n,"contract_period.endTime")).toDate();he(l)}if(t.get(n,"effective_date.startDate")){const l=p(t.get(n,"effective_date.startDate")).toDate();ae(l)}if(t.get(n,"contract_date")){const l=p(t.get(n,"contract_date")).toDate();le(l)}if(t.get(n,"quit_date")){const l=p(t.get(n,"quit_date")).toDate();et(l)}if(t.get(n,"contract_init_date")){const l=p(t.get(n,"contract_init_date")).toDate();tt(l)}if(t.get(n,"contract_end_date")){const l=p(t.get(n,"contract_end_date")).toDate();st(l)}c("contract_type",t.get(n,"contract_type")),c("work_role",t.get(n,"work_role")),c("division",t.get(n,"division")),J(t.get(n,"contract_type")),M(t.get(n,"work_role")),Y(t.get(n,"division")),t.isEmpty(t.get(n,"contract_type"))||(["정규직","시용","계약직","파트타임"].includes(t.get(n,"contract_type"))?T(!1):(J("기타"),T(!0),setTimeout(()=>{c("contract_type",t.get(n,"contract_type"))},500))),t.isEmpty(t.get(n,"division"))||(["경영전략실","경영전략실 파트타임","교수설계","교수설계 파트타임","디지털마케팅","디지털마케팅 파트타임","미디어","미디어 파트타임","시스템운영","시스템운영 파트타임","디자인","디자인 파트타임","교육서비스","교육서비스 파트타임"].includes(t.get(n,"division"))?P(!1):(Y("기타"),P(!0),setTimeout(()=>{c("division",t.get(n,"division"))},500))),t.isEmpty(t.get(n,"work_role"))||(["대표이사","경영전략 직무","교육콘텐츠 개발(교육기획 및 설계)","교육콘텐츠 개발(디자인 부분)","교육콘텐츠 개발(영상 부분)","에듀테크 솔루션 개발 및 유지보수","교육서비스 총무","운영 및 홍보"].includes(t.get(n,"work_role"))?O(!1):(M("기타"),O(!0),setTimeout(()=>{c("work_role",t.get(n,"work_role"))},500))),c("salary_yearly",t.get(n,"salary_yearly")?t.get(n,"salary_yearly"):0),c("base_salary",t.get(n,"base_salary")?t.get(n,"base_salary"):0),c("meal_allowance",t.get(n,"meal_allowance")?t.get(n,"meal_allowance"):0),c("vehicle_maintenance_allowance",t.get(n,"vehicle_maintenance_allowance")?t.get(n,"vehicle_maintenance_allowance"):0),c("rnd_allowance",t.get(n,"rnd_allowance")?t.get(n,"rnd_allowance"):0),c("babysitting_allowance",t.get(n,"babysitting_allowance")?t.get(n,"babysitting_allowance"):0),c("personal_development_allowance",t.get(n,"personal_development_allowance")?t.get(n,"personal_development_allowance"):0),c("commuting_allowance",t.get(n,"commuting_allowance")?t.get(n,"commuting_allowance"):0),c("work_support_allowance",t.get(n,"work_support_allowance")?t.get(n,"work_support_allowance"):0),c("holurly_rate",t.get(n,"holurly_rate")?t.get(n,"holurly_rate"):0),c("overtime_pay_hours",t.get(n,"overtime_pay_hours")?t.get(n,"overtime_pay_hours"):0),c("use_custom",t.get(n,"use_custom")=="true"?"true":""),c("use_custom",t.get(n,"use_custom")=="true"?"true":""),c("prev_company",t.get(n,"prev_company._id")),c("use_employ_end",t.get(n,"use_employ_end")=="true"?"true":""),c("signature_way",t.get(n,"signature_way")?t.get(n,"signature_way"):"signature"),t.isEmpty(t.get(n,"customCheck"))||ye(t.get(n,"customCheck"))}},[n]);const _s=({code:a,selectUser:l})=>{const o=i.useRef(""),r=i.useRef(null),m=i.useMemo(()=>{if(!a||r.current===a)return o.current;let s=t.cloneDeep(a);if(s.includes("$company")&&(s=s.replaceAll("$company",t.isEmpty(t.get(l,"organization"))?'<span class="light">$company</span>':`<span class="light">${t.get(l,"organization.departmentName")}</span>`)),s.includes("$serviceArea")&&(s=s.replaceAll("$serviceArea",t.isEmpty(t.get(l,"organization"))?'<span class="light">$serviceArea</span>':`<span class="light">${t.get(l,"organization.ServiceArea")}</span>`)),s.includes("$RepresentativeName")&&(s=s.replaceAll("$RepresentativeName",t.isEmpty(t.get(l,"organization"))?'<span class="light">$RepresentativeName</span>':`<span class="light">${t.get(l,"organization.RepresentativeName")}</span>`)),s.includes("$MainPhoneNumber")&&(s=s.replaceAll("$MainPhoneNumber",t.isEmpty(t.get(l,"organization"))?'<span class="light">$MainPhoneNumber</span>':`<span class="light">${t.get(l,"organization.MainPhoneNumber")}</span>`)),s.includes("$address")&&(s=s.replaceAll("$address",t.isEmpty(t.get(l,"organization"))?'<span class="light">$MainPhoneNumber</span>':`<span class="light">${t.get(l,"organization.RepresentativeAddress.road_address")+", "+t.get(l,"organization.RepresentativeAddress.extra_address")}</span>
                ${t.isEmpty(t.get(l,"organization.BranchAddress_1.road_address"))?"":`<br/><span class="light">${t.get(l,"organization.BranchAddress_1.road_address")}, ${t.get(l,"organization.BranchAddress_1.extra_address")}</span>`}
                ${t.isEmpty(t.get(l,"organization.BranchAddress_2.road_address"))?"":`<br/><span class="light">${t.get(l,"organization.BranchAddress_2.road_address")}, ${t.get(l,"organization.BranchAddress_2.extra_address")}</span>`}
                `)),s.includes("$ref_employee_id")&&(s=s.replaceAll("$ref_employee_id",`${t.isEmpty(l)?`<span class="light">${rt}</span>`:`<span class="light">${t.get(l,"employee.fullName")}</span>`}`)),s.includes("$contract_period")&&(s=s.replaceAll("$contract_period",`${N&&W?`<span class="light">${p(N).format("YYYY년 MM월 DD일")} ~ ${p(W).format("YYYY년 MM월 DD일")}</span>`:`<span class="light">${dt}</span>`}`)),s.includes("$effective_date")&&(s=s.replaceAll("$effective_date",`${z?`<span class="light">${p(z).format("YYYY년 MM월 DD일")}</span>`:`<span class="light">${mt}</span>`}`)),s.includes("$regular_work_date")&&(s=s.replaceAll("$regular_work_date",`${K?`<span class="light">${p(K).format("YYYY년 MM월 DD일")}</span>`:`<span class="light">${K}</span>`}`)),s.includes("$contract_type")&&(s=s.replaceAll("$contract_type",`${t.isEmpty(be)?`<span class="light">${pt}</span>`:`<span class="light">${be}</span>`}`)),s.includes("$work_role")&&(s=s.replaceAll("$work_role",`${t.isEmpty(je)?`<span class="light">${Nt}</span>`:`<span class="light">${je}</span>`}`)),s.includes("$division")&&(s=s.replaceAll("$division",`${t.isEmpty(Le)?`<span class="light">${St}</span>`:`<span class="light">${Le}</span>`}`)),s.includes("$salary_yearly/12")){const u=ce||Ye;s=s.replaceAll("$salary_yearly/12",`<span class="light margins">${(u/12).toLocaleString()}</span>`)}return s.includes("$salary_yearly")&&(s=s.replaceAll("$salary_yearly",`${ce?`<span class="light">${parseInt(ce).toLocaleString()}</span>`:`<span class="light">${Ye.toLocaleString()}</span>`}`)),s.includes("$base_salary")&&(s=s.replaceAll("$base_salary",`${A?`<span class="light">${parseInt(A).toLocaleString()}</span>`:`<span class="light">${ut.toLocaleString()}</span>`}`)),s.includes("$meal_allowance")&&(s=s.replaceAll("$meal_allowance",`${we?`<span class="light">${parseInt(we).toLocaleString()}</span>`:`<span class="light">${vt.toLocaleString()}</span>`}`)),s.includes("$vehicle_maintenance_allowance")&&(s=s.replaceAll("$vehicle_maintenance_allowance",`${$e?`<span class="light">${parseInt($e).toLocaleString()}</span>`:`<span class="light">${_t.toLocaleString()}</span>`}`)),s.includes("$rnd_allowance")&&(s=s.replaceAll("$rnd_allowance",`${Ne?`<span class="light">${parseInt(Ne).toLocaleString()}</span>`:`<span class="light">${xt.toLocaleString()}</span>`}`)),s.includes("$babysitting_allowance")&&(s=s.replaceAll("$babysitting_allowance",`${Se?`<span class="light">${parseInt(Se).toLocaleString()}</span>`:`<span class="light">${ht.toLocaleString()}</span>`}`)),s.includes("$personal_development_allowance")&&(s=s.replaceAll("$personal_development_allowance",`${Ee?`<span class="light">${parseInt(Ee).toLocaleString()}</span>`:`<span class="light">${gt.toLocaleString()}</span>`}`)),s.includes("$commuting_allowance")&&(s=s.replaceAll("$commuting_allowance",`${De?`<span class="light">${parseInt(De).toLocaleString()}</span>`:`<span class="light">${ft.toLocaleString()}</span>`}`)),s.includes("$work_support_allowance")&&(s=s.replaceAll("$work_support_allowance",`${ke?`<span class="light">${parseInt(ke).toLocaleString()}</span>`:`<span class="light">${yt.toLocaleString()}</span>`}`)),s.includes("$holurly_rate")&&(s=s.replaceAll("$holurly_rate",`${Be?`<span class="light">${parseInt(Be).toLocaleString()}</span>`:`<span class="light">${bt.toLocaleString()}</span>`}`)),s.includes("$overtime_pay_hours")&&(s=s.replaceAll("$overtime_pay_hours",`${Ce?`<span class="light">${Ce}</span>`:`<span class="light">${jt}</span>`}`)),s.includes("$contract_date")&&(s=s.replaceAll("$contract_date",`${V?`<span class="light">${p(V).format("YYYY년 MM월 DD일")}</span>`:`<span class="light">${wt}</span>`}`)),s.includes("$entry_date")&&(s=s.replaceAll("$entry_date",`${D?`<span class="light">${p(D).format("YYYY년 MM월 DD일")}</span>`:`<span class="light">${$t}</span>`}`)),s.includes("$birthday")&&(s=s.replaceAll("$birthday",`${t.isEmpty(t.get(l,"employee.social_security_number"))?'<span class="light"></span>':'<span class="light">암호화 됨</span>'}`)),s.includes("$social_security_number")&&(s=s.replaceAll("$social_security_number",`${t.isEmpty(t.get(l,"employee.social_security_number"))?'<span class="light"></span>':'<span class="light">암호화 됨</span>'}`)),s.includes("$road_address")&&(s=s.replaceAll("$road_address",`${t.isEmpty(t.get(l,"employee.address.road_address"))?'<span class="light"></span>':`<span class="light">${t.get(l,"employee.address.road_address")}</span>`}`)),s.includes("$extra_address")&&(s=s.replaceAll("$extra_address",`${t.isEmpty(t.get(l,"employee.address.extra_address"))?'<span class="light"></span>':`<span class="light">${t.get(l,"employee.address.extra_address")}</span>`}`)),s.includes("$organization")&&(s=s.replaceAll("$organization",`${t.isEmpty(t.get(l,"organization.branch_ko"))?'<span class="light"></span>':`<span class="light">${t.get(l,"organization.branch_ko")}</span>`}`)),s.includes("$job_title")&&(s=s.replaceAll("$job_title",`${t.isEmpty(t.get(l,"employee.job_title"))?'<span class="light"></span>':`<span class="light">${t.get(l,"employee.job_title")}</span>`}`)),s.includes("$phone")&&(s=s.replaceAll("$phone",`${t.isEmpty(t.get(l,"employee.phone"))?'<span class="light"></span>':`<span class="light">${t.get(l,"employee.phone")}</span>`}`)),s.includes("$bankname")&&(s=s.replaceAll("$bankname",`${t.isEmpty(t.get(l,"employee.bankname"))?'<span class="light"></span>':`<span class="light">${t.get(l,"employee.bankname")}</span>`}`)),s.includes("$bankaccount")&&(s=s.replaceAll("$bankaccount",`${t.isEmpty(t.get(l,"employee.bankaccount"))?'<span class="light"></span>':`<span class="light">${t.get(l,"employee.bankaccount")}</span>`}`)),s.includes("$personal_email")&&(s=s.replaceAll("$personal_email",`${t.isEmpty(t.get(l,"employee.personal_email"))?'<span class="light"></span>':`<span class="light">${t.get(l,"employee.personal_email")}</span>`}`)),t.isEmpty(I)||I.map((u,j)=>{s.includes(t.get(u,"name_eng"))&&(s=s.replaceAll(t.get(u,"name_eng"),`
                            <div class="customRadio margins" style="width:60px";>
                                <label for="select_${j}" class="box">
                                        <input type="radio" id="select_${j}" value="yes" name=${t.get(u,"name_eng")}/>
                                        <p>동의함</p>
                                    </label>
                            </div>
                        `))}),s.includes("$worker_signature")&&(s=s.replaceAll("$worker_signature",'<span class="signClearWorker"></span>')),s.includes("$employer_signature")&&(s=s.replaceAll("$employer_signature",'<span class="signClearEmployer"></span>')),s.includes("$quit_date")&&(s=s.replaceAll("$quit_date",`${ie?`<span class="light">${p(ie).format("YYYY년 MM월 DD일")}</span>`:'<span class="light">$quit_date"</span>'}`)),s.includes("$prev_company")&&(s=s.replaceAll("$prev_company",`${t.isEmpty(G)?'<span class="light">$prev_company</span>':`<span class="light">${t.get(G,"departmentName")}</span>`}`)),s.includes("$Prev_CRN")&&(s=s.replaceAll("$Prev_CRN",`${t.isEmpty(G)?'<span class="light">$Prev_CRN</span>':`<span class="light">${t.get(G,"RepresentativeName")}</span>`}`)),s.includes("$contract_init")&&(s=s.replaceAll("$contract_init",`${Z?`<span class="light">${p(Z).format("YYYY년 MM월 DD일")}</span>`:`<span class="light">${Z}</span>`}`)),s.includes("$contract_end")&&(s=s.replaceAll("$contract_end",`${Q?`<span class="light">${p(Q).format("YYYY년 MM월 DD일")}</span>`:`<span class="light">${Q}</span>`}`)),o.current=s,r.current=a,s},[a]);return e.jsx(ks,{content:m})},xs=i.useCallback(({prevTemplate:a,setThisCode:l,setPrevTemplate:o,saveTemplate:r,setSaveTemplate:m})=>{const s=i.useRef(a);return i.useEffect(()=>{!t.isEmpty(a)&&a!==s.current&&(s.current=a,l(a),o(a))},[a]),e.jsx(Ds,{value:s.current,onChange:u=>{s.current=u,l(u),o(u)},saveTemplate:r,setSaveTemplate:m})},[]),$=i.useCallback(({placeholder:a,type:l,className:o})=>{const r=v(`${l}_view`),m=v(`${l}`),[s,u]=i.useState(""),j=d=>parseInt(d.replaceAll(",","")),h=d=>{if(!d)return d;let w=`${d}`;return parseInt(w.replace(/,/g,"")).toLocaleString()},b=d=>{const{value:w}=d.target,B=d.target.selectionStart,f=h(w);f&&f!="NaN"?(c(`${l}`,j(w)),c(`${l}_view`,f)):(c(`${l}`,0),c(`${l}_view`,0));const _=f.length-w.length;d.target.setSelectionRange(B+_,B+_)};return i.useEffect(()=>{const d=document.getElementById(`${l}_input`);return d&&d.addEventListener("input",b),()=>{d&&d.removeEventListener("input",b)}},[r,l]),i.useEffect(()=>{if(m||m==0){const d=h(m);c(`${l}_view`,d)}},[m,r]),e.jsxs(e.Fragment,{children:[e.jsx("input",{id:`${l}_input`,placeholder:a,...g(`${l}_view`),className:o}),e.jsx("input",{type:"hidden",placeholder:a,...g(`${l}`),className:o})]})},[]);return i.useEffect(()=>{N&&le(N)},[N]),i.useEffect(()=>{if(!t.isEmpty(t.get(E,"employee"))){const a=t.get(E,"employee"),l=t.get(a,"entry_date"),o=t.get(a,"insure_acquisition_date"),r=t.get(a,"division"),m=t.get(a,"work_role"),s=t.get(a,"contract");t.isEmpty(s)||(J(s),["정규직","시용","계약직","파트타임"].includes(s)?T(!1):(J("기타"),T(!0),setTimeout(()=>{c("contract_type",s)},500))),t.isEmpty(r)||(Y(r),["경영전략실","경영전략실 파트타임","교수설계","교수설계 파트타임","디지털마케팅","디지털마케팅 파트타임","미디어","미디어 파트타임","시스템운영","시스템운영 파트타임","디자인","디자인 파트타임","교육서비스","교육서비스 파트타임"].includes(r)?P(!1):(Y("기타"),P(!0),setTimeout(()=>{c("division",r)},500))),t.isEmpty(m)||(M(m),["대표이사","경영전략 직무","교육콘텐츠 개발(교육기획 및 설계)","교육콘텐츠 개발(디자인 부분)","교육콘텐츠 개발(영상 부분)","에듀테크 솔루션 개발 및 유지보수","교육서비스 총무","운영 및 홍보"].includes(m)?O(!1):(M("기타"),O(!0),setTimeout(()=>{c("work_role",m)},500))),l&&o?p(l).startOf("day").isSameOrBefore(p(o).startOf("day"))?q(new Date(l)):q(new Date(o)):o&&q(new Date(o))}},[E]),i.useEffect(()=>{D&&F(D)},[D]),i.useEffect(()=>{if(A||A==0){const a=Math.ceil(A/209);Ht(a)}},[A]),i.useEffect(()=>{Ae&&!t.isEmpty(H)&&H.map(a=>{t.get(a,"_id")==Ae&&Zt(a)})},[Ae,H]),i.useEffect(()=>{!t.isEmpty(k)&&!t.isEmpty(S)&&S.map(a=>{t.get(a,"username")===k&&(xe(t.get(a,"username","")),Ge(t.get(a,"subordinate",[])))})},[Yt,k,S]),e.jsxs(e.Fragment,{children:[Dt&&e.jsx(i.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(Bs,{title:ve?"생성이 되지 않았습니다.":"근로계약서 생성이 완료되었습니다.",text:ve?"에러사항을 확인해주시기 바랍니다.":"확인을 누르면 리스트로 이동합니다.",buttons:!0,closeState:ue,buttonContent:{confirmValue:{text:"확인",link:"/operator/employmentContract"}},icon:!ve})}),qt&&e.jsx(As,{setOpenPop:fe,setOpenInModal:Qe,user:nt}),Je&&e.jsx(Ls,{setSelectPreData:X,setOpenInModal:Qe,setOpenPop:fe,openPop:Je,user:ne}),e.jsx("div",{className:"manageBox",children:e.jsxs("div",{className:"editBox wideBox",children:[e.jsx(Ns,{to:"/operator/employmentContract",children:e.jsx("div",{className:"backButton",children:e.jsx($s,{src:"/web/img/prevButtons.svg",alt:""})})}),e.jsxs("form",{onSubmit:ct(a=>ms({...a})),onKeyPress:ls,children:[e.jsxs("div",{className:"editTitle",children:[e.jsx("div",{className:"leftText",children:"근로계약서 생성"}),e.jsx("div",{className:"rightButton",children:e.jsx("button",{type:"submit",className:"saveButton",children:"생성"})})]}),e.jsxs("div",{className:"editBottomBox",children:[e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"템플릿 선택"}),e.jsx("div",{className:"textInputBox",children:e.jsx(us,{selectTemplate:x,setTemplateListOpen:Lt,templateListOpen:Ct,prevTemplateList:Fe})})]}),!t.isEmpty(x)&&t.get(x,"template_type")==="docx"&&e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"DOCX 템플릿 미리보기"}),e.jsxs("div",{className:"textInputBox",children:[e.jsx("button",{type:"button",className:"openList",onClick:ps,disabled:ee,style:{opacity:ee?.6:1,cursor:ee?"not-allowed":"pointer"},children:ee?"문서 생성 중...":"문서 미리보기 생성"}),Ve&&e.jsx("div",{className:"warningBox",style:{marginTop:"10px"},children:Ve})]})]}),Rt&&se&&e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"문서 미리보기"}),e.jsxs("div",{className:"textInputBox",children:[e.jsx("div",{id:"onlyoffice-editor",style:{width:"100%",height:"800px",border:"1px solid #ddd",borderRadius:"4px",overflow:"hidden"}}),e.jsx("div",{style:{marginTop:"10px"},children:e.jsx("button",{type:"button",className:"openList",onClick:()=>{ze(null),qe(null),Ke(null)},children:"미리보기 닫기"})})]})]}),Tt&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"직속상관"}),e.jsx("div",{className:"textInputBox",children:e.jsx("select",{className:"customSelect_2",...g("ref_directSuperior",{required:!0}),children:!t.isEmpty(S)&&S.map((a,l)=>(console.log(a,"=======items"),e.jsxs("option",{value:t.get(a,"username"),children:[t.get(a,"fullName"),"(",t.get(a,"username"),")"]},`operator_overtime_create_name__manager_${l}`)))})}),!t.isEmpty(t.get(y,"ref_directSuperior"))&&e.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"이름"}),e.jsx("div",{className:"textInputBox",children:e.jsx("select",{className:"customSelect_2",...g("username",{required:!0}),children:!t.isEmpty(He)&&He.map((a,l)=>(console.log(a,"=========items"),e.jsxs("option",{value:`${t.get(a,"username")}`,children:[t.get(a,"fullName")," (",t.get(a,"username"),")"]},`operator_overtime_create_name_${l}`)))})}),!t.isEmpty(t.get(y,"username"))&&e.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"사전정의 데이터 불러오기"}),e.jsx("div",{className:"textInputBox",children:e.jsx("div",{className:"openList",onClick:()=>{fe(!0)},children:"사전정의 데이터 리스트"})})]}),e.jsxs("div",{className:"flexTextBox",children:[e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"최초입사일 설정"}),e.jsx("div",{className:"textInputBox",children:e.jsx(i.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(L,{setStartDate:q,startDate:D})})})]}),e.jsxs("div",{className:"textBox",children:[e.jsxs("div",{className:"textBox flexSpace margins",children:[e.jsx("div",{className:"textTitle",children:"근로기간 설정"}),e.jsx("div",{className:"textInputBox",children:e.jsxs("label",{htmlFor:"customCheckEnd",className:"customCheckBox",children:[e.jsx("input",{type:"checkbox",id:"customCheckEnd",value:"true",...g("use_employ_end")}),e.jsx("span",{}),e.jsx("p",{children:"종료기간 사용"})]})})]}),e.jsx("div",{className:"textInputBox",children:os=="true"?e.jsx(i.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(Ss,{isOpen:Mt,isOpenEnd:Wt,setIsOpen:Ft,setIsOpenEnd:zt,setStartDate:F,startDate:N,setEndDate:he,endDate:W})}):e.jsx(i.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(L,{setStartDate:F,startDate:N})})})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"연봉적용기간 설정"}),e.jsx("div",{className:"textInputBox",children:e.jsx(i.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(L,{setStartDate:ae,startDate:z})})})]})]}),e.jsxs("div",{className:"flexTextBox",children:[e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"계약유형"}),e.jsxs("div",{className:"textInputBox",children:[e.jsxs("select",{className:"customSelect_2",value:Jt,onChange:a=>{Re(a.target.value,"contract_type")},children:[e.jsx("option",{value:"",children:"선택"}),e.jsx("option",{value:"정규직",children:"정규직"}),e.jsx("option",{value:"시용",children:"시용"}),e.jsx("option",{value:"계약직",children:"계약직"}),e.jsx("option",{value:"파트타임",children:"파트타임"}),e.jsx("option",{value:"기타",children:"기타"})]}),e.jsx("input",{placeholder:"계약유형을 입력해주세요",type:Qt?"text":"hidden",...g("contract_type"),className:"custom_input_4"})]})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"소속부서"}),e.jsxs("div",{className:"textInputBox",children:[e.jsxs("select",{className:"customSelect_2",value:es,onChange:a=>{Re(a.target.value,"division")},children:[e.jsx("option",{value:"",children:"선택"}),e.jsx("option",{value:"경영전략실",children:"경영전략실"}),e.jsx("option",{value:"경영전략실 파트타임",children:"경영전략실 파트타임"}),e.jsx("option",{value:"교수설계",children:"교수설계"}),e.jsx("option",{value:"교수설계 파트타임",children:"교수설계 파트타임"}),e.jsx("option",{value:"디지털마케팅",children:"디지털마케팅"}),e.jsx("option",{value:"디지털마케팅 파트타임",children:"디지털마케팅 파트타임"}),e.jsx("option",{value:"미디어",children:"미디어"}),e.jsx("option",{value:"미디어 파트타임",children:"미디어 파트타임"}),e.jsx("option",{value:"시스템운영",children:"시스템운영"}),e.jsx("option",{value:"시스템운영 파트타임",children:"시스템운영 파트타임"}),e.jsx("option",{value:"디자인",children:"디자인"}),e.jsx("option",{value:"디자인 파트타임",children:"디자인 파트타임"}),e.jsx("option",{value:"교육서비스",children:"교육서비스"}),e.jsx("option",{value:"교육서비스 파트타임",children:"교육서비스 파트타임"}),e.jsx("option",{value:"기타",children:"기타"})]}),e.jsx("input",{placeholder:"소속부서를 입력해주세요",type:Ut?"text":"hidden",...g("division"),className:"custom_input_4"})]})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"종사업종"}),e.jsxs("div",{className:"textInputBox",children:[e.jsxs("select",{className:"customSelect_2",value:ss,onChange:a=>{Re(a.target.value,"work_role")},children:[e.jsx("option",{value:"",children:"선택"}),e.jsx("option",{value:"대표이사",children:"대표이사"}),e.jsx("option",{value:"경영전략 직무",children:"경영전략 직무"}),e.jsx("option",{value:"교육콘텐츠 개발(교육기획 및 설계)",children:"교육콘텐츠 개발(교육기획 및 설계)"}),e.jsx("option",{value:"교육콘텐츠 개발(디자인 부분)",children:"교육콘텐츠 개발(디자인 부분)"}),e.jsx("option",{value:"교육콘텐츠 개발(영상 부분)",children:"교육콘텐츠 개발(영상 부분)"}),e.jsx("option",{value:"에듀테크 솔루션 개발 및 유지보수",children:"에듀테크 솔루션 개발 및 유지보수"}),e.jsx("option",{value:"교육서비스 총무",children:"교육서비스 총무"}),e.jsx("option",{value:"운영 및 홍보",children:"운영 및 홍보"}),e.jsx("option",{value:"기타",children:"기타"})]}),e.jsx("input",{placeholder:"종사업종을 입력해주세요",type:ts?"text":"hidden",...g("work_role"),className:"custom_input_4"})]})]})]}),e.jsxs("div",{className:"flexTextBox",children:[e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"연봉"}),e.jsx("div",{className:"textInputBox",children:e.jsx($,{placeholder:"연봉을 입력해주세요",type:"salary_yearly",className:"custom_input_4"})}),!t.isEmpty(t.get(y,"salary_yearly"))&&e.jsx("div",{className:"warningBox",children:"해당값은 정수만 입력가능합니다."})]}),e.jsxs("div",{className:"textBox",children:[e.jsxs("div",{className:"textTitle",children:["기본급 ",e.jsxs("span",{className:"hourlyRate",children:["( 통상시급 : ",Xt.toLocaleString(),"원 )"]})]}),e.jsx("div",{className:"textInputBox",children:e.jsx($,{placeholder:"기본급을 입력해주세요",type:"base_salary",className:"custom_input_4"})}),!t.isEmpty(t.get(y,"base_salary"))&&e.jsx("div",{className:"warningBox",children:"해당값은 정수만 입력가능합니다."})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"식대"}),e.jsx("div",{className:"textInputBox",children:e.jsx($,{placeholder:"식대를 입력해주세요",type:"meal_allowance",className:"custom_input_4"})}),!t.isEmpty(t.get(y,"meal_allowance"))&&e.jsx("div",{className:"warningBox",children:"해당값은 정수만 입력가능합니다."})]})]}),e.jsxs("div",{className:"flexTextBox",children:[e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"차량유지비"}),e.jsx("div",{className:"textInputBox",children:e.jsx($,{placeholder:"차량유지비를 입력해주세요",type:"vehicle_maintenance_allowance",className:"custom_input_4"})}),!t.isEmpty(t.get(y,"vehicle_maintenance_allowance"))&&e.jsx("div",{className:"warningBox",children:"해당값은 정수만 입력가능합니다."})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"연구활동비"}),e.jsx("div",{className:"textInputBox",children:e.jsx($,{placeholder:"연구활동비를 입력해주세요",type:"rnd_allowance",className:"custom_input_4"})}),!t.isEmpty(t.get(y,"rnd_allowance"))&&e.jsx("div",{className:"warningBox",children:"해당값은 정수만 입력가능합니다."})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"육아수당"}),e.jsx("div",{className:"textInputBox",children:e.jsx($,{placeholder:"육아수당을 입력해주세요",type:"babysitting_allowance",className:"custom_input_4"})}),!t.isEmpty(t.get(y,"babysitting_allowance"))&&e.jsx("div",{className:"warningBox",children:"해당값은 정수만 입력가능합니다."})]})]}),e.jsxs("div",{className:"flexTextBox",children:[e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"자기계발비"}),e.jsx("div",{className:"textInputBox",children:e.jsx($,{placeholder:"자기계발비를 입력해주세요",type:"personal_development_allowance",className:"custom_input_4"})}),!t.isEmpty(t.get(y,"personal_development_allowance"))&&e.jsx("div",{className:"warningBox",children:"해당값은 정수만 입력가능합니다."})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"통근교통비"}),e.jsx("div",{className:"textInputBox",children:e.jsx($,{placeholder:"통근교통비를 입력해주세요",type:"commuting_allowance",className:"custom_input_4"})}),!t.isEmpty(t.get(y,"commuting_allowance"))&&e.jsx("div",{className:"warningBox",children:"해당값은 정수만 입력가능합니다."})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"업무지원비"}),e.jsx("div",{className:"textInputBox",children:e.jsx($,{placeholder:"업무지원비를 입력해주세요",type:"work_support_allowance",className:"custom_input_4"})}),!t.isEmpty(t.get(y,"work_support_allowance"))&&e.jsx("div",{className:"warningBox",children:"해당값은 정수만 입력가능합니다."})]})]}),e.jsxs("div",{className:"flexTextBox",children:[e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"초과근로수당"}),e.jsx("div",{className:"textInputBox",children:e.jsx($,{placeholder:"초과근로수당을 입력해주세요",type:"holurly_rate",className:"custom_input_4"})}),!t.isEmpty(t.get(y,"holurly_rate"))&&e.jsx("div",{className:"warningBox",children:"해당값은 정수만 입력가능합니다."})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"초과근로 기준시간"}),e.jsx("div",{className:"textInputBox",children:e.jsx($,{placeholder:"초과근로 기준시간을 입력해주세요",type:"overtime_pay_hours",className:"custom_input_4"})}),!t.isEmpty(t.get(y,"overtime_pay_hours"))&&e.jsx("div",{className:"warningBox",children:"해당값은 정수만 입력가능합니다."})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"계약작성일 설정"}),e.jsx("div",{className:"textInputBox",children:e.jsx(i.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(L,{setStartDate:le,startDate:V})})})]})]}),e.jsxs("div",{className:"flexTextBox",children:[e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"퇴직일 설정"}),e.jsx("div",{className:"textInputBox",children:e.jsx(i.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(L,{setStartDate:et,startDate:ie})})})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"이전 직장"}),e.jsx("div",{className:"textInputBox",children:e.jsx("select",{...g("prev_company"),className:"customSelect_2",children:!t.isEmpty(H)&&H.map((a,l)=>e.jsx("option",{value:t.get(a,"_id"),children:t.get(a,"departmentName")},l))})})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"서명방식 선택"}),e.jsxs("div",{className:"textInputBox customRadio heightW",children:[e.jsxs("label",{htmlFor:"signature",children:[e.jsx("input",{type:"radio",id:"signature",checked:!0,value:"signature",...g("signature_way")}),e.jsx("p",{children:"기명·서명"})]}),rs=="signature"&&e.jsxs("label",{htmlFor:"use_only_name",className:"customCheckBox",children:[e.jsx("input",{type:"checkbox",id:"use_only_name",value:"true",...g("use_only_name")}),e.jsx("span",{}),e.jsx("p",{children:"서명은 인감으로 대체"})]})]})]})]}),e.jsxs("div",{className:"flexTextBox",children:[e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"계약시작일 설정"}),e.jsx("div",{className:"textInputBox",children:e.jsx(i.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(L,{setStartDate:tt,startDate:Z})})})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"계약종료일 설정"}),e.jsx("div",{className:"textInputBox",children:e.jsx(i.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(L,{setStartDate:st,startDate:Q})})})]}),(at!="secret"||at=="parttime")&&e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"정규직전환일 설정"}),e.jsx("div",{className:"textInputBox",children:e.jsx(i.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(L,{setStartDate:Ze,startDate:K})})})]})]}),e.jsx("div",{className:"flexTextBox",children:e.jsxs("div",{className:"flexSpaceWrap wideFlexWrap",children:[e.jsxs("div",{className:"textBox flexSpace",children:[e.jsx("div",{className:"textTitle",children:"사용자 동의 데이터 (예,아니오 선택사항이 있을 경우 반드시 체크)"}),e.jsx("div",{className:"textInputBox",children:e.jsxs("label",{htmlFor:"customCheck",className:"customCheckBox",children:[e.jsx("input",{type:"checkbox",id:"customCheck",value:"true",...g("use_custom")}),e.jsx("span",{}),e.jsx("p",{children:"사용"})]})})]}),cs=="true"&&!t.isEmpty(I)&&I.map((a,l)=>e.jsx(vs,{item:a,idx:l,customCheck:I},`AddRadioArray_${l}`))]})}),!t.isEmpty(x)&&t.get(x,"template_type")!=="docx"&&e.jsxs("div",{className:"textBox",children:[e.jsxs("div",{className:"textTitle flexTitle",children:["내용",e.jsx("span",{className:ge?"variableInfo active":"variableInfo",onClick:()=>{Vt(!ge)},children:"?"}),e.jsx("div",{className:"templateSaveBtn",onClick:()=>{pe(!0)},children:"작성내용 확인 및 저장"}),ge&&e.jsxs("div",{className:"openBox",children:[e.jsxs("div",{className:"leftBox",children:[e.jsxs("div",{className:"inSection",children:["편집기 안에 $ref_employee_id 등의 변수는 실제 ",e.jsx("br",{}),"근로계약서에 사용되는 변수입니다."]}),e.jsx("div",{className:"inSection bolds",children:"해당 변수명을 변경하지 마십시오."}),e.jsxs("div",{className:"inSection",children:["$ref_employee_id : 근로자",e.jsx("br",{}),"$contract_period : 근로기간",e.jsx("br",{}),"$effective_date : 연봉적용기간",e.jsx("br",{}),"$contract_type : 근로계약종류",e.jsx("br",{}),"$work_role : 종사업종",e.jsx("br",{}),"$division : 소속부서",e.jsx("br",{}),"$salary_yearly : 연봉",e.jsx("br",{}),"$base_salary : 기본급",e.jsx("br",{})]})]}),e.jsx("div",{className:"rightBox",children:e.jsxs("div",{className:"inSection",children:["$meal_allowance : 식대",e.jsx("br",{}),"$vehicle_maintenance_allowance : 차량유지비",e.jsx("br",{}),"$rnd_allowance : 연구활동비",e.jsx("br",{}),"$babysitting_allowance : 육아수당",e.jsx("br",{}),"$personal_development_allowance : 자기계발비",e.jsx("br",{}),"$commuting_allowance : 통근교통비",e.jsx("br",{}),"$work_support_allowance : 업무지원비",e.jsx("br",{}),"$holurly_rate : 초과근로수당",e.jsx("br",{}),"$overtime_pay_hours : 초과근로시간 기준",e.jsx("br",{}),"$contract_date : 계약일"]})})]})]}),e.jsx("div",{className:"textInputBox",children:e.jsxs("div",{className:"editorBox employmentBox",style:{width:"-webkit-fill-available;"},children:[e.jsx(xs,{prevTemplate:Et,setThisCode:kt,setPrevTemplate:Oe,saveTemplate:ot,setSaveTemplate:pe}),_e&&e.jsx(_s,{code:_e,selectUser:E})]})})]})]})]})]})]})})]})}export{Us as default};
