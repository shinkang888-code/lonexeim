const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/customPopUp-1j2cuYYo.js","assets/index-ak5BsCze.js","assets/vendor-react-DLmlTesg.js","assets/vendor-pdf-D5Eab7jE.js","assets/index-D3sbFfH5.css","assets/selectPreData-sGGFHZDt.js","assets/pageNation-BXJ_iC5V.js","assets/moment-B-YVwB4U.js","assets/addPreData-DgKkjFRQ.js","assets/customDateCalendar-DqCZpPi7.js","assets/index-jnRmlWET.js","assets/isNativeReflectConstruct-XGLLvWSz.js","assets/createClass-BeTC7LXt.js","assets/toPropertyKey-Dg8hKEVS.js","assets/defineProperty-BKLqfx38.js","assets/index-8t4SYTBK.css","assets/customPickCalendar-B8EAXH0T.js","assets/inputPrivateKey-DLOxuGu-.js","assets/ko-C39F15y_.js","assets/vendor-excel-CVVhhIhe.js"])))=>i.map(i=>d[i]);
import{_ as Se,h as Ns,E as As}from"./vendor-pdf-D5Eab7jE.js";import{u as Cs,l as e,j as a,I as Ys,a as N,L as Ya,b as La}from"./index-ak5BsCze.js";import{b as c,h as Ls,L as Bs,R as Ne}from"./vendor-react-DLmlTesg.js";import{V as Rs,m as Is}from"./index-BNUiajTt.js";import F from"./customDateCalendar-DqCZpPi7.js";import{C as Ps}from"./customPickCalendar-B8EAXH0T.js";import{h as u}from"./moment-B-YVwB4U.js";import{k as Ms}from"./index-CySRtK6F.js";import{S as Ts,a as Fs}from"./smartEditorViewer-yoNX7knP.js";import{H as zs,r as Ws}from"./handsontable.full.min-BlQD0w7P.js";import"./extends-CF3RwP-h.js";import"./objectWithoutPropertiesLoose-Dsqj8S3w.js";import"./index-Vcq4gwWv.js";import"./index-jnRmlWET.js";import"./isNativeReflectConstruct-XGLLvWSz.js";import"./createClass-BeTC7LXt.js";import"./toPropertyKey-Dg8hKEVS.js";import"./defineProperty-BKLqfx38.js";import"./get-substitution-DOpaHQH6.js";const Xe=Ne.lazy(()=>Se(()=>import("./customPopUp-1j2cuYYo.js"),__vite__mapDeps([0,1,2,3,4]))),Os=Ne.lazy(()=>Se(()=>import("./selectPreData-sGGFHZDt.js"),__vite__mapDeps([5,3,1,2,4,6,7]))),Vs=Ne.lazy(()=>Se(()=>import("./addPreData-DgKkjFRQ.js"),__vite__mapDeps([8,3,1,2,4,9,10,11,12,13,14,15,7,16]))),Hs=Ne.lazy(()=>Se(()=>import("./inputPrivateKey-DLOxuGu-.js"),__vite__mapDeps([17,3,1,2,4,7,18,19])));Ws();function _t({user:Ba}){const Ra=c.useRef(null),{register:k,handleSubmit:Ia,formState:{errors:E},watch:b,setValue:r}=Cs(),{id:ae=""}=Ls(),[Pa,Ge]=c.useState(!1),Ze="근로자 선택",Je=`${u().format("YYYY년 MM월 DD일")} ~ ${u().format("YYYY년 MM월 DD일")}`,Qe=u().format("YYYY년 MM월 DD일"),ea="계약종류 입력필요",fe=0,aa=0,sa=0,ta=0,na=0,la=0,ia=0,ca=0,ra=0,oa=0,da=10,pa=u().format("YYYY년 MM월 DD일"),ma="업종 입력필요",ga="부서 입력필요",ua=u().format("YYYY년 MM월 DD일"),[_a,va]=c.useState(`
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
`),[Ma,Ae]=c.useState(!1),[Ce,ha]=c.useState(!1),[Ye,Ta]=c.useState(""),[s,Fa]=c.useState({}),[za,Wa]=c.useState(!1),[se,Oa]=c.useState([]),[te,ya]=c.useState({}),[ne,fa]=c.useState(!1),[Va,Ha]=c.useState({}),[A,$e]=c.useState(new Date),[W,Le]=c.useState(new Date),[qa,Ka]=c.useState(!1),[Ua,Xa]=c.useState(!1),[O,Be]=c.useState(new Date),[V,xe]=c.useState(new Date),[H,le]=c.useState(new Date),[B,$a]=c.useState(new Date),[Re,Ga]=c.useState(!1),[R,Ie]=c.useState([{id:e.random(1e12,9999999999999)}]),[Za,xa]=c.useState(!1),[ba,Pe]=c.useState(!1),[d,Ja]=c.useState({}),[be,wa]=c.useState(!1),[Qa,ja]=c.useState(!1),[ie,es]=c.useState({}),[w,Da]=c.useState(!1),[as,Me]=c.useState(!1),[D,ss]=c.useState(""),[ts,ns]=c.useState(0),[q,Te]=c.useState(new Date),[ce,ls]=c.useState([]),[C,Fe]=c.useState({}),[I,ze]=c.useState(new Date),[P,We]=c.useState(new Date),[is,K]=c.useState(!1),[cs,U]=c.useState(""),[rs,X]=c.useState(!1),[os,G]=c.useState(""),[ds,Z]=c.useState(!1),[ps,J]=c.useState(""),[we,ka]=c.useState(null),[qs,ms]=c.useState(""),[Oe,Ea]=c.useState(!1),[Sa,Ve]=c.useState(!1),[Na,re]=c.useState(null),[Aa,oe]=c.useState(""),He=(l,i)=>{!e.isEmpty(l)&&!e.isEmpty(i)&&(l!="기타"?(r(i,l),i=="contract_type"&&(U(l),K(!1)),i=="division"&&(G(l),X(!1)),i=="work_role"&&(J(l),Z(!1))):(r(i,""),i=="contract_type"&&(U(l),K(!0)),i=="division"&&(G(l),X(!0)),i=="work_role"&&(J(l),Z(!0))))},gs=async l=>{try{const i=e.get(l,"username"),{data:p,status:o}=await N.get("/API/privateKey/getAdminKey",{params:{username:i}});o==201&&(e.isEmpty(p)||es(p))}catch(i){console.log(i)}};c.useEffect(()=>{e.isEmpty(s)||(gs(e.get(s,"user")),e.isEmpty(e.get(s,"SalaryContractForAdmin"))&&Da(!0))},[s]);const us=async()=>{try{const{data:l}=await N.get("/API/company/get");e.isEmpty(l)||ls(e.get(l,"result"))}catch(l){console.log(l)}},_s=async()=>{try{const{data:l}=await N.get("/API/member/getOrgUser");e.isEmpty(l)||l.map((i,p)=>{p==0&&r("ref_directSuperior",e.get(i,"username"))})}catch(l){console.log(l)}},vs=async()=>{try{const{data:l}=await N.get("/API/salary_contract_template/getAll");Oa(l.result||l||[])}catch(l){console.log(l)}},je=b("contract_type"),De=b("work_role"),z=b("salary_yearly"),Y=b("base_salary"),de=b("meal_allowance"),pe=b("vehicle_maintenance_allowance"),me=b("rnd_allowance"),ge=b("babysitting_allowance"),ue=b("personal_development_allowance"),_e=b("commuting_allowance"),ve=b("work_support_allowance"),he=b("holurly_rate"),ye=b("overtime_pay_hours"),ke=b("division"),hs=b("use_custom"),qe=b("prev_company"),ys=b("use_employ_end"),fs=b("signature_way"),$s=async l=>{try{const{id:i,work_role:p,username:o,salary_yearly:_,contract_type:v,base_salary:x,meal_allowance:f,vehicle_maintenance_allowance:j,rnd_allowance:t,babysitting_allowance:n,personal_development_allowance:m,commuting_allowance:y,work_support_allowance:g,holurly_rate:h,overtime_pay_hours:$,division:M,use_custom:L,use_employ_end:Ke,signature_way:Ue,use_only_name:Q}=l;let ee={id:i,body:Ye,startDate:O,contractStartDate:V,employmentStartDate:A,employmentEndDate:W,regularWorkDate:B,quitDate:q,contractInitDate:I,contractEndDate:P,prev_company:C,use_employ_end:Ke,work_role:p,entryDate:H,contract_type:v,username:o,division:M,work_support_allowance:g,base_template:te,customCheck:R,use_custom:L,salary_yearly:"",base_salary:"",meal_allowance:"",vehicle_maintenance_allowance:"",rnd_allowance:"",babysitting_allowance:"",personal_development_allowance:"",commuting_allowance:"",work_support_allowance:"",holurly_rate:"",overtime_pay_hours:"",signature_way:Ue,use_only_name:Q};if(!e.isEmpty(ee)){if(!e.isEmpty(ie)&&(w||e.isEmpty(e.get(s,"SalaryContractForAdmin")))){let T={salary_yearly:_||0,hourly_rate:h||0,base_salary:x||0,meal_allowance:f||0,rnd_allowance:t||0,vehicle_maintenance_allowance:j||0,personal_development_allowance:m||0,babysitting_allowance:n||0,commuting_allowance:y||0,work_support_allowance:g||0,overtime_pay:0,overtime_pay_hours:$||0};const{data:Ee,status:Ks}=await N.post("/API/privateKey/encrypt/user/salaryContract",{username:o,data:T});if(!e.isEmpty(Ee)){ee={...ee,encryptedData:Ee},T={...T,id:i};const{data:Us,status:Xs}=await N.post("/API/privateKey/encrypt/admin/salaryContract",{username:o,data:T,adminKey:ie})}}const{status:S}=await N.post("/API/salary_contract/audit",{...ee});S===201?(Ae(!0),Ya({level:"INFO",message:"근로계약서 수정 완료",userId:La.get("username"),action:"근로계약서 수정",status:"성공",additionalInfo:"근로계약서가 성공적으로 수정되었습니다.",page:"근로계약서"}),ha(!1)):(Ae(!0),Ya({level:"ERROR",message:"근로계약서 수정 실패",userId:La.get("username"),action:"근로계약서 수정",status:"실패",additionalInfo:"근로계약서 수정에 실패하였습니다.",page:"근로계약서"}),ha(!0))}}catch(i){console.log(i)}};c.useCallback(({placeholder:l,type:i,className:p,adminVeified:o})=>{const _=b(`${i}_view`),v=b(`${i}`),[x,f]=c.useState(""),j=m=>parseInt(m.replaceAll(",","")),t=m=>{if(!m)return m;let y=`${m}`;return parseInt(y.replace(/,/g,"")).toLocaleString()},n=m=>{const{value:y}=m.target,g=m.target.selectionStart,h=t(y);h&&h!="NaN"?(r(`${i}`,j(y)),r(`${i}_view`,h)):(r(`${i}`,0),r(`${i}_view`,0));const $=h.length-y.length;m.target.setSelectionRange(g+$,g+$)};return c.useEffect(()=>{if(!o)r(`${i}_view`,"암호화 됨");else{const m=document.getElementById(`${i}_input`);return m&&m.addEventListener("input",n),()=>{m&&m.removeEventListener("input",n)}}},[_,i,o]),c.useEffect(()=>{if(v!="암호화 됨"&&(v||v==0)){const m=t(v);r(`${i}_view`,m)}},[v,_]),a.jsxs(a.Fragment,{children:[a.jsx("input",{id:`${i}_input`,placeholder:l,readOnly:!o,...k(`${i}_view`),className:p}),a.jsx("input",{type:"hidden",id:`${i}_input_origin`,placeholder:l,...k(`${i}`),className:p})]})},[w,s]);const xs=l=>{l.key==="Enter"&&l.preventDefault()},bs=async l=>{try{const{data:i}=await N.get("/API/salary_contract/getData",{params:{id:l}});e.isEmpty(i)||Fa(i[0])}catch(i){console.log(i)}},ws=({selectTemplate:l,setTemplateListOpen:i,templateListOpen:p,prevTemplateList:o})=>{const[_,v]=c.useState(!1),x=({selectTemplate:f,thisType:j})=>{v(!0),e.isEmpty(f)||e.get(f,"_id")!=e.get(j,"_id")?v(!0):i&&i(!1)};return a.jsxs(a.Fragment,{children:[_&&a.jsx(c.Suspense,{fallback:a.jsx(a.Fragment,{}),children:a.jsx(Xe,{title:"템플릿을 변경할 수 없습니다.",text:"수정시엔 다른 템플릿으로 변경이 불가능합니다.",buttons:!0,closeState:v,buttonContent:{cancleValue:{text:"확인",link:"/"}},icon:!1})}),a.jsxs("div",{className:e.isEmpty(l)?"clickSelectBox":"clickSelectBox selected",children:[a.jsx("div",{className:e.isEmpty(l)?"selectedBox":"selectedBox selected",onClick:()=>{i&&i(!p)},children:e.isEmpty(l)?"선택해주세요":e.get(l,"title")}),p&&a.jsx("div",{className:"templateList",onBlur:()=>{i&&i(!1)},children:!e.isEmpty(o)&&o!=null&&o.map(f=>a.jsx("div",{className:"tempList",onClick:()=>{i&&x({selectTemplate:l,thisType:f})},children:a.jsx("div",{className:"leftBox",children:e.get(f,"title")})},e.get(f,"_id")))})]})]})},js=c.useCallback(({idx:l,item:i,customCheck:p})=>{const o=p.length,[_,v]=c.useState(""),x=j=>{const t=e.cloneDeep(j),n={id:e.random(1e12,9999999999999)};t.push(n),Ie(t)},f=async j=>{e.set(i,"name_kor",j.target.value);const t=j.target.value.replace(/(\s*)/g,""),n=Ms.romanize(t);v(`$${n}`),e.set(i,"name_eng",`$${n}`)};return c.useEffect(()=>{e.isEmpty(e.get(i,"name_kor"))||r(`use_custom_check[${l}].name_kor`,e.get(i,"name_kor")),e.isEmpty(e.get(i,"name_eng"))||v(e.get(i,"name_eng"))},[]),a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"addCheckArr",children:[a.jsxs("div",{className:"addLeft",children:[a.jsx("input",{type:"hidden",...k(`use_custom_check[${l}].id`),value:e.get(i,"id")}),a.jsx("input",{...k(`use_custom_check[${l}].name_kor`),placeholder:"변수명을 입력해주십시오",className:"inputText",onChange:j=>{f(j)}})]}),a.jsxs("div",{className:"addRight",children:[a.jsx("div",{className:"inLeftBox",children:"자동변수명"}),a.jsx("div",{className:"inRightBox",children:a.jsx("input",{value:_,...k(`use_custom_check[${l}].name_eng`)})})]})]}),l+1==o&&a.jsx("div",{className:"newAddCheckArrBox",children:a.jsx("div",{className:"newAddCheckArr",onClick:()=>{x(p)},children:"+ 추가"})})]})},[]);c.useEffect(()=>{const l="https://office.lonex.kr",i="onlyoffice-api";if(document.getElementById(i))return;const p=document.createElement("script");return p.id=i,p.src=`${l}/web-apps/apps/api/documents/api.js`,p.async=!0,p.onload=()=>{console.log("[OnlyOffice] DocsAPI loaded successfully")},p.onerror=()=>{console.error("[OnlyOffice] Failed to load DocsAPI")},document.head.appendChild(p),()=>{const o=document.getElementById(i);o&&document.head.removeChild(o)}},[]),c.useEffect(()=>{if(we&&window.DocsAPI&&Oe){const l=document.getElementById("onlyoffice-viewer-edit");if(l){l.innerHTML="";try{new window.DocsAPI.DocEditor("onlyoffice-viewer-edit",we),console.log("[OnlyOffice] Viewer initialized in edit page")}catch(i){console.error("[OnlyOffice] Failed to initialize viewer:",i),re("OnlyOffice 뷰어 초기화에 실패했습니다.")}}}},[we,Oe]),c.useEffect(()=>{_s(),vs(),us()},[]),c.useEffect(()=>{bs(ae),r("id",ae)},[ae]),c.useEffect(()=>{if(!e.isEmpty(se)&&!e.isEmpty(s)){const l=[],i=e.get(s,"base_template");se.map(p=>{l.push(e.get(p,"_id"))}),!e.isEmpty(l)&&!e.isEmpty(i)&&i!=null&&i!=null&&(l.includes(i)?se.map(p=>{e.get(p,"_id")==i&&ya(p)}):ya({_id:i,title:"(삭제된 템플릿입니다.)"}))}},[se,s]),c.useEffect(()=>{if(!e.isEmpty(te)&&!e.isEmpty(s)){const l=e.get(te,"salary_contract_type");l=="ade94f220b6c438b86020d862a27c004"?oe("noraml"):l=="483e86d9de86fc02cf21ef04ff681dc7"?oe("qulify"):l=="09c5af671a54a934cb9c0df62bd959c2"?oe("secret"):l=="71583ef062e4ba9408d9ae213098ec2e"?oe("parttime"):l=="6c3b68951474a088f2b9865311327cde"&&oe("outside"),fa(!1),r("username",e.get(s,"ref_user"));const i={fullName:e.get(s,"name","")};if(Ha(i),r("name",`${e.get(s,"name")} (${e.get(s,"ref_user")})`),r("use_custom",e.get(s,"use_custom")=="true"?"true":""),va(e.get(s,"body","")),e.get(s,"contract_period.startTime")){const _=u(e.get(s,"contract_period.startTime")).toDate();$e(_)}if(e.get(s,"contract_period.endTime")){const _=u(e.get(s,"contract_period.endTime")).toDate();Le(_)}if(e.get(s,"effective_date.startDate")){const _=u(e.get(s,"effective_date.startDate")).toDate();Be(_)}if(e.get(s,"contract_date")){const _=u(e.get(s,"contract_date")).toDate();xe(_)}if(e.get(s,"entry_date")){const _=u(e.get(s,"entry_date")).toDate();le(_)}if(e.get(s,"regular_work_date")){const _=u(e.get(s,"regular_work_date")).toDate();$a(_)}if(e.get(s,"quit_date")){const _=u(e.get(s,"quit_date")).toDate();Te(_)}if(e.get(s,"contract_init_date")){const _=u(e.get(s,"contract_init_date")).toDate();ze(_)}if(e.get(s,"contract_end_date")){const _=u(e.get(s,"contract_end_date")).toDate();We(_)}r("contract_type",e.get(s,"contract_type")),r("work_role",e.get(s,"work_role")),r("division",e.get(s,"division")),U(e.get(s,"contract_type")),J(e.get(s,"work_role")),G(e.get(s,"division")),e.isEmpty(e.get(s,"contract_type"))||(["정규직","시용","계약직","파트타임"].includes(e.get(s,"contract_type"))?K(!1):(U("기타"),K(!0),setTimeout(()=>{r("contract_type",e.get(s,"contract_type"))},500))),e.isEmpty(e.get(s,"division"))||(["경영전략실","경영전략실 파트타임","교수설계","교수설계 파트타임","디지털마케팅","디지털마케팅 파트타임","미디어","미디어 파트타임","시스템운영","시스템운영 파트타임","디자인","디자인 파트타임","교육서비스","교육서비스 파트타임"].includes(e.get(s,"division"))?X(!1):(G("기타"),X(!0),setTimeout(()=>{r("division",e.get(s,"division"))},500))),e.isEmpty(e.get(s,"work_role"))||(["대표이사","경영전략 직무","교육콘텐츠 개발(교육기획 및 설계)","교육콘텐츠 개발(디자인 부분)","교육콘텐츠 개발(영상 부분)","에듀테크 솔루션 개발 및 유지보수","교육서비스 총무","운영 및 홍보"].includes(e.get(s,"work_role"))?Z(!1):(J("기타"),Z(!0),setTimeout(()=>{r("work_role",e.get(s,"work_role"))},500))),r("salary_yearly",e.get(s,"salary_yearly")?e.get(s,"salary_yearly"):0),r("base_salary",e.get(s,"base_salary")?e.get(s,"base_salary"):0),r("meal_allowance",e.get(s,"meal_allowance")?e.get(s,"meal_allowance"):0),r("vehicle_maintenance_allowance",e.get(s,"vehicle_maintenance_allowance")?e.get(s,"vehicle_maintenance_allowance"):0),r("rnd_allowance",e.get(s,"rnd_allowance")?e.get(s,"rnd_allowance"):0),r("babysitting_allowance",e.get(s,"babysitting_allowance")?e.get(s,"babysitting_allowance"):0),r("personal_development_allowance",e.get(s,"personal_development_allowance")?e.get(s,"personal_development_allowance"):0),r("commuting_allowance",e.get(s,"commuting_allowance")?e.get(s,"commuting_allowance"):0),r("work_support_allowance",e.get(s,"work_support_allowance")?e.get(s,"work_support_allowance"):0),r("holurly_rate",e.get(s,"holurly_rate")?e.get(s,"holurly_rate"):0),r("overtime_pay_hours",e.get(s,"overtime_pay_hours")?e.get(s,"overtime_pay_hours"):0),r("prev_company",e.get(s,"prev_company._id")),r("use_employ_end",e.get(s,"use_employ_end")=="true"?"true":""),r("signature_way",e.get(s,"signature_way")?e.get(s,"signature_way"):"signature"),e.get(s,"organization.departmentName")?Fe(e.get(s,"organization")):e.get(s,"user.companyPlace.departmentName")&&Fe(e.get(s,"user.companyPlace")),setTimeout(()=>{r("use_only_name",e.get(s,"use_only_name"))},500),e.isEmpty(e.get(s,"customCheck"))||Ie(e.get(s,"customCheck"));const p=e.get(s,"body");p&&(p.includes("$worker_signature")&&!p.includes("$employer_signature")&&(!e.isEmpty(e.get(s,"worker_signature.sign_data"))||!e.isEmpty(e.get(s,"worker_signature.sign_applicant")))&&wa(!0),p.includes("$worker_signature")&&p.includes("$employer_signature")&&(!e.isEmpty(e.get(s,"employer_signature.sign_data"))||!e.isEmpty(e.get(s,"employer_signature.sign_applicant")))&&(!e.isEmpty(e.get(s,"worker_signature.sign_data"))||!e.isEmpty(e.get(s,"worker_signature.sign_applicant")))&&wa(!0)),e.isEmpty(e.get(s,"encryptedData"))||(r("salary_yearly","암호화 됨"),r("holurly_rate","암호화 됨"),r("base_salary","암호화 됨"),r("meal_allowance","암호화 됨"),r("rnd_allowance","암호화 됨"),r("vehicle_maintenance_allowance","암호화 됨"),r("personal_development_allowance","암호화 됨"),r("babysitting_allowance","암호화 됨"),r("commuting_allowance","암호화 됨"),r("work_support_allowance","암호화 됨"),r("overtime_pay","암호화 됨"),r("overtime_pay_hours","암호화 됨")),setTimeout(()=>{fa(!0)},500)}},[te,s]),c.useEffect(()=>{if(!e.isEmpty(d)&&ne){if(e.get(d,"contract_period.startTime")){const i=u(e.get(d,"contract_period.startTime")).toDate();$e(i)}if(e.get(d,"contract_period.endTime")){const i=u(e.get(d,"contract_period.endTime")).toDate();Le(i)}if(e.get(d,"effective_date.startDate")){const i=u(e.get(d,"effective_date.startDate")).toDate();Be(i)}if(e.get(d,"contract_date")){const i=u(e.get(d,"contract_date")).toDate();xe(i)}if(e.get(d,"quit_date")){const i=u(e.get(d,"quit_date")).toDate();Te(i)}if(e.get(d,"contract_init_date")){const i=u(e.get(d,"contract_init_date")).toDate();ze(i)}if(e.get(d,"contract_end_date")){const i=u(e.get(d,"contract_end_date")).toDate();We(i)}r("contract_type",e.get(d,"contract_type")),r("work_role",e.get(d,"work_role")),r("division",e.get(d,"division")),U(e.get(d,"contract_type")),J(e.get(d,"work_role")),G(e.get(d,"division")),e.isEmpty(e.get(d,"contract_type"))||(["정규직","시용","계약직","파트타임"].includes(e.get(d,"contract_type"))?K(!1):(U("기타"),K(!0),setTimeout(()=>{r("contract_type",e.get(d,"contract_type"))},500))),e.isEmpty(e.get(d,"division"))||(["경영전략실","경영전략실 파트타임","교수설계","교수설계 파트타임","디지털마케팅","디지털마케팅 파트타임","미디어","미디어 파트타임","시스템운영","시스템운영 파트타임","디자인","디자인 파트타임","교육서비스","교육서비스 파트타임"].includes(e.get(d,"division"))?X(!1):(G("기타"),X(!0),setTimeout(()=>{r("division",e.get(d,"division"))},500))),e.isEmpty(e.get(d,"work_role"))||(["대표이사","경영전략 직무","교육콘텐츠 개발(교육기획 및 설계)","교육콘텐츠 개발(디자인 부분)","교육콘텐츠 개발(영상 부분)","에듀테크 솔루션 개발 및 유지보수","교육서비스 총무","운영 및 홍보"].includes(e.get(d,"work_role"))?Z(!1):(J("기타"),Z(!0),setTimeout(()=>{r("work_role",e.get(d,"work_role"))},500))),r("salary_yearly",e.get(d,"salary_yearly")?e.get(d,"salary_yearly"):0),r("base_salary",e.get(d,"base_salary")?e.get(d,"base_salary"):0),r("meal_allowance",e.get(d,"meal_allowance")?e.get(d,"meal_allowance"):0),r("vehicle_maintenance_allowance",e.get(d,"vehicle_maintenance_allowance")?e.get(d,"vehicle_maintenance_allowance"):0),r("rnd_allowance",e.get(d,"rnd_allowance")?e.get(d,"rnd_allowance"):0),r("babysitting_allowance",e.get(d,"babysitting_allowance")?e.get(d,"babysitting_allowance"):0),r("personal_development_allowance",e.get(d,"personal_development_allowance")?e.get(d,"personal_development_allowance"):0),r("commuting_allowance",e.get(d,"commuting_allowance")?e.get(d,"commuting_allowance"):0),r("work_support_allowance",e.get(d,"work_support_allowance")?e.get(d,"work_support_allowance"):0),r("holurly_rate",e.get(d,"holurly_rate")?e.get(d,"holurly_rate"):0),r("overtime_pay_hours",e.get(d,"overtime_pay_hours")?e.get(d,"overtime_pay_hours"):0),r("use_custom",e.get(d,"use_custom")=="true"?"true":""),r("prev_company",e.get(d,"prev_company._id")),r("use_employ_end",e.get(d,"use_employ_end")=="true"?"true":""),r("signature_way",e.get(d,"signature_way")?e.get(d,"signature_way"):"signature"),e.isEmpty(e.get(d,"customCheck"))||Ie(e.get(d,"customCheck"))}},[d,ne]);const Ca=async()=>{try{Ve(!0),re(null);const l=ae;if(!l){re("계약서 ID를 찾을 수 없습니다.");return}if(e.get(s,"template_type")!=="docx"){re("DOCX 타입의 계약서만 조회할 수 있습니다.");return}console.log("[ViewDocx] Loading DOCX viewer for contract:",l);const p=await N.get("/API/salary_contract/viewDocxContract",{params:{id:l}});if(p.data.success){const o=p.data.onlyofficeConfig,_=p.data.onlyofficeUrl;ka({...o,events:{onDocumentReady:()=>{console.log("[OnlyOffice] Document loaded successfully"),Ve(!1)}}}),ms(_),Ea(!0),console.log("[ViewDocx] OnlyOffice viewer configured")}}catch(l){console.error("DOCX 조회 오류:",l),re("문서를 불러오는 중 오류가 발생했습니다."),Ve(!1)}},Ds=async(l,i)=>{if(l.current)try{const o=await Ns(l.current,{scale:2,backgroundColor:"#FFFFFF"}),_=o.toDataURL("image/jpg"),v=new As("p","mm","a4"),x=v.internal.pageSize.getWidth(),f=v.internal.pageSize.getHeight(),j=`${e.get(i,"user.address.road_address")}_${e.get(i,"user.address.extra_address")}`;let t=!1;e.get(i,"user.address.extra_address")&&j.length>32&&(t=!0);let n=5,m=5;const y=e.get(i,"base_template");y=="66726bc980df5ad79b871f8d"?m=6.5:y=="667a229bfafeafb5bf9c4aaf"?m=10:y=="65efe856a206ba08f9515e3c"?(m=6,t&&(m=13)):y=="65f0f80fa206ba08f951724e"?m=9:y=="65f10a5fa206ba08f951740a"&&(m=14);const g=x-n*2,h=f-m*2,$=v.getImageProperties(_),M=g,L=$.height*M/$.width,Ke=Math.ceil(L/h);for(let Q=0;Q<Ke;Q++){Q>0&&v.addPage();const ee=Q*h*(o.height/L),S=document.createElement("canvas");S.width=o.width,S.height=h*(o.height/L);const T=S.getContext("2d");T.fillStyle="#FFFFFF",T.fillRect(0,0,S.width,S.height),T.drawImage(o,0,ee,o.width,S.height,0,0,S.width,S.height);const Ee=S.toDataURL("image/jpeg",1);v.addImage(Ee,"JPEG",n,m,M,h)}const Ue=`${e.get(i,"name","default_name")}_${e.get(i,"title","default_title")}.pdf`;v.save(Ue),console.log("PDF generated and saved successfully.")}catch(p){console.error("Error generating PDF:",p)}else console.error("contentRef.current is not available.")},ks=({code:l,selectUser:i})=>{const[p,o]=c.useState(""),[_,v]=c.useState(""),x=c.useRef(""),f=c.useRef(null),j=c.useMemo(()=>{if(!l||f.current===l)return x.current;let t=e.cloneDeep(l),n=e.cloneDeep(l);if(t!=null&&t!=null){const m=e.isEmpty(e.get(s,"encryptedData"))?!1:!w;if(t.includes("$company")&&(t=t.replaceAll("$company",e.isEmpty(e.get(s,"organization"))?'<span class="light">$company</span>':`<span class="light">${e.get(s,"organization.departmentName")}</span>`)),t.includes("$serviceArea")&&(t=t.replaceAll("$serviceArea",e.isEmpty(e.get(s,"organization"))?'<span class="light">$serviceArea</span>':`<span class="light">${e.get(s,"organization.ServiceArea")}</span>`)),t.includes("$RepresentativeName")&&(t=t.replaceAll("$RepresentativeName",e.isEmpty(e.get(s,"organization"))?'<span class="light">$RepresentativeName</span>':`<span class="light">${e.get(s,"organization.RepresentativeName")}</span>`)),t.includes("$MainPhoneNumber")&&(t=t.replaceAll("$MainPhoneNumber",e.isEmpty(e.get(s,"organization"))?'<span class="light">$MainPhoneNumber</span>':`<span class="light">${e.get(s,"organization.MainPhoneNumber")}</span>`)),t.includes("$address")&&(t=t.replaceAll("$address",e.isEmpty(e.get(s,"organization"))?'<span class="light">$MainPhoneNumber</span>':`<span class="light">${e.get(s,"organization.RepresentativeAddress.road_address")+", "+e.get(s,"organization.RepresentativeAddress.extra_address")}</span>
                        ${e.isEmpty(e.get(s,"organization.BranchAddress_1.road_address"))?"":`<br/><span class="light">${e.get(s,"organization.BranchAddress_1.road_address")}, ${e.get(s,"organization.BranchAddress_1.extra_address")}</span>`}
                        ${e.isEmpty(e.get(s,"organization.BranchAddress_2.road_address"))?"":`<br/><span class="light">${e.get(s,"organization.BranchAddress_2.road_address")}, ${e.get(s,"organization.BranchAddress_2.extra_address")}</span>`}
                        `)),t.includes("$ref_employee_id")&&(t=t.replaceAll("$ref_employee_id",`${e.isEmpty(i)?`<span class="light">${Ze}</span>`:`<span class="light">${e.get(i,"fullName")}</span>`}`)),t.includes("$contract_period")&&(t=t.replaceAll("$contract_period",`${A&&W?`<span class="light">${u(A).format("YYYY년 MM월 DD일")} ~ ${u(W).format("YYYY년 MM월 DD일")}</span>`:`<span class="light">${Je}</span>`}`)),t.includes("$effective_date")&&(t=t.replaceAll("$effective_date",`${O?`<span class="light">${u(O).format("YYYY년 MM월 DD일")}</span>`:`<span class="light">${Qe}</span>`}`)),t.includes("$contract_type")&&(t=t.replaceAll("$contract_type",`${e.isEmpty(je)?`<span class="light">${ea}</span>`:`<span class="light">${je}</span>`}`)),t.includes("$regular_work_date")&&(t=t.replaceAll("$regular_work_date",`${B?`<span class="light">${u(B).format("YYYY년 MM월 DD일")}</span>`:`<span class="light">${B}</span>`}`)),t.includes("$work_role")&&(t=t.replaceAll("$work_role",`${e.isEmpty(De)?`<span class="light">${ma}</span>`:`<span class="light">${De}</span>`}`)),t.includes("$salary_yearly/12")){const g=z||fe;t=t.replaceAll("$salary_yearly/12",`<span class="light margins">${m?"암호화 됨":(g/12).toLocaleString()}</span>`)}if(t.includes("$salary_yearly")&&(t=t.replaceAll("$salary_yearly",`${z?`<span class="light">${m?"암호화 됨":parseInt(z).toLocaleString()}</span>`:`<span class="light">${fe.toLocaleString()}</span>`}`)),t.includes("$base_salary")&&(t=t.replaceAll("$base_salary",`${Y?`<span class="light">${m?"암호화 됨":parseInt(Y).toLocaleString()}</span>`:`<span class="light">${aa.toLocaleString()}</span>`}`)),t.includes("$meal_allowance")&&(t=t.replaceAll("$meal_allowance",`${de?`<span class="light">${m?"암호화 됨":parseInt(de).toLocaleString()}</span>`:`<span class="light">${sa.toLocaleString()}</span>`}`)),t.includes("$vehicle_maintenance_allowance")&&(t=t.replaceAll("$vehicle_maintenance_allowance",`${pe?`<span class="light">${m?"암호화 됨":parseInt(pe).toLocaleString()}</span>`:`<span class="light">${ta.toLocaleString()}</span>`}`)),t.includes("$rnd_allowance")&&(t=t.replaceAll("$rnd_allowance",`${me?`<span class="light">${m?"암호화 됨":parseInt(me).toLocaleString()}</span>`:`<span class="light">${na.toLocaleString()}</span>`}`)),t.includes("$babysitting_allowance")&&(t=t.replaceAll("$babysitting_allowance",`${ge?`<span class="light">${m?"암호화 됨":parseInt(ge).toLocaleString()}</span>`:`<span class="light">${la.toLocaleString()}</span>`}`)),t.includes("$personal_development_allowance")&&(t=t.replaceAll("$personal_development_allowance",`${ue?`<span class="light">${m?"암호화 됨":parseInt(ue).toLocaleString()}</span>`:`<span class="light">${ia.toLocaleString()}</span>`}`)),t.includes("$commuting_allowance")&&(t=t.replaceAll("$commuting_allowance",`${_e?`<span class="light">${m?"암호화 됨":parseInt(_e).toLocaleString()}</span>`:`<span class="light">${ca.toLocaleString()}</span>`}`)),t.includes("$work_support_allowance")&&(t=t.replaceAll("$work_support_allowance",`${ve?`<span class="light">${m?"암호화 됨":parseInt(ve).toLocaleString()}</span>`:`<span class="light">${ra.toLocaleString()}</span>`}`)),t.includes("$holurly_rate")&&(t=t.replaceAll("$holurly_rate",`${he?`<span class="light">${m?"암호화 됨":parseInt(he).toLocaleString()}</span>`:`<span class="light">${oa.toLocaleString()}</span>`}`)),t.includes("$overtime_pay_hours")&&(t=t.replaceAll("$overtime_pay_hours",`${ye?`<span class="light">${m?"암호화 됨":ye}</span>`:`<span class="light">${da}</span>`}`)),t.includes("$contract_date")&&(t=t.replaceAll("$contract_date",`${V?`<span class="light">${u(V).format("YYYY년 MM월 DD일")}</span>`:`<span class="light">${pa}</span>`}`)),t.includes("$entry_date")&&(t=t.replaceAll("$entry_date",`${H?`<span class="light">${u(H).format("YYYY년 MM월 DD일")}</span>`:`<span class="light">${ua}</span>`}`)),t.includes("$division")&&(t=t.replaceAll("$division",`${e.isEmpty(ke)?`<span class="light">${ga}</span>`:`<span class="light">${ke}</span>`}`)),t.includes("$birthday")){let g;e.isEmpty(e.get(s,"UserForAdmin"))?w?e.get(s,"user.social_security_number")&&(e.get(s,"user.social_security_number").includes("-")?g=e.get(s,"user.social_security_number").split("-")[0]:D?D.includes("-")?g=D.split("-")[0]:g=D:g=e.get(s,"user.social_security_number")):g="암호화 됨":w?D&&(D.includes("-")?g=D.split("-")[0]:g=D):g="암호화 됨",t=t.replaceAll("$birthday",`${e.isEmpty(e.get(s,"user.social_security_number"))?'<span class="light"></span>':`<span class="light">${g}</span>`}`)}if(t.includes("$social_security_number")){let g=e.isEmpty(e.get(s,"user.UserForAdmin"))?e.get(s,"user.social_security_number"):w?D:"암호화 됨";t=t.replaceAll("$social_security_number",`${e.isEmpty(e.get(s,"user.social_security_number"))?'<span class="light"></span>':`<span class="light">${g}</span>`}`)}t.includes("$road_address")&&(t=t.replaceAll("$road_address",`${e.isEmpty(e.get(s,"user.address.road_address"))?'<span class="light"></span>':`<span class="light">${e.get(s,"user.address.road_address")}</span>`}`)),t.includes("$extra_address")&&(t=t.replaceAll("$extra_address",`${e.isEmpty(e.get(s,"user.address.extra_address"))?'<span class="light"></span>':`<span class="light">${e.get(s,"user.address.extra_address")}</span>`}`)),t.includes("$organization")&&(t=t.replaceAll("$organization",`${e.isEmpty(e.get(s,"organization.branch_ko"))?'<span class="light"></span>':`<span class="light">${e.get(s,"organization.branch_ko")}</span>`}`)),t.includes("$job_title")&&(t=t.replaceAll("$job_title",`${e.isEmpty(e.get(s,"user.job_title"))?'<span class="light"></span>':`<span class="light">${e.get(s,"user.job_title")}</span>`}`)),t.includes("$phone")&&(t=t.replaceAll("$phone",`${e.isEmpty(e.get(s,"user.phone"))?'<span class="light"></span>':`<span class="light">${e.get(s,"user.phone")}</span>`}`)),t.includes("$bankname")&&(t=t.replaceAll("$bankname",`${e.isEmpty(e.get(s,"user.bankname"))?'<span class="light"></span>':`<span class="light">${e.get(s,"user.bankname")}</span>`}`)),t.includes("$bankaccount")&&(t=t.replaceAll("$bankaccount",`${e.isEmpty(e.get(s,"user.bankaccount"))?'<span class="light"></span>':`<span class="light">${e.get(s,"user.bankaccount")}</span>`}`)),t.includes("$personal_email")&&(t=t.replaceAll("$personal_email",`${e.isEmpty(e.get(s,"user.personal_email"))?'<span class="light"></span>':`<span class="light">${e.get(s,"user.personal_email")}</span>`}`)),e.isEmpty(R)||R.map((g,h)=>{t.includes(e.get(g,"name_eng"))&&(t=t.replaceAll(e.get(g,"name_eng"),`
                                    <div class="customRadio margins">
                                        <label for="select_${h}" class="box">
                                                <input type="radio" id="select_${h}" value="yes" name=${e.get(g,"name_eng")}/>
                                                <p>동의함</p>
                                            </label>
                                    </div>
                                `))});const y=e.get(s,"organization.departmentName")?e.get(s,"organization.departmentName"):e.get(s,"user.companyPlace.departmentName");if(t.includes("$worker_signature")){const g=e.get(s,"worker_signature.sign_data"),h=e.get(s,"worker_sings.filePath"),$=e.get(s,"worker_name.filePath"),M=e.get(s,"use_only_name")=="true";if(e.isEmpty($))t=t.replaceAll("$worker_signature",`${e.isEmpty(g)?'<span class="signClearWorker"></span>':`
                                <span class="signClearWorker">
                                    <span class='orgName'>${y}</span><br/>
                                    전자서명완료<br/><span class="times">${u(e.get(s,"worker_signature.createdAt")).format("YYYY-MM-DD HH:mm:ss")}</span>
                                </span>`}`);else if(M){const L=e.get(s,"companyPlace.corporateSealData.filePath");t=t.replaceAll("$worker_signature",`${e.isEmpty($)?'<span class="signClearWorker"></span>':`
                                    <span class="signClearWorker">
                                      <span class='orgName'>${y}</span>
                                       <div class="imageBox">
                                            <img src="/${$}" class="signImages"/>
                                            <img src="/${L}" class="signImages"/>
                                        </div> 
                                      <span class="times notPre">
                                        ${u(e.get(s,"worker_signature.createdAt")).format("YYYY-MM-DD HH:mm:ss")}
                                      </span>
                                    </span>`}`)}else t=t.replaceAll("$worker_signature",`${e.isEmpty(h)?'<span class="signClearWorker"></span>':`
                                    <span class="signClearWorker">
                                      <span class='orgName'>${y}</span>
                                       <div class="imageBox">
                                            <img src="/${$}" class="signImages"/>
                                            <img src="/${h}" class="signImages"/>
                                        </div> 
                                      <span class="times notPre">
                                        ${u(e.get(s,"worker_signature.createdAt")).format("YYYY-MM-DD HH:mm:ss")}
                                      </span>
                                    </span>`}`)}if(t.includes("$employer_signature")){const g=e.get(s,"employer_signature.sign_data"),h=e.get(s,"employer_sings.filePath"),$=e.get(s,"employer_name.filePath"),M=e.get(s,"use_only_name")=="true";if(e.isEmpty($))t=t.replaceAll("$employer_signature",`${e.isEmpty(g)?'<span class="signClearEmployer"></span>':`
                                <span class="signClearEmployer">
                                   <span class='orgName'>${y}</span><br/>
                                    전자서명완료<br/><span class="times">${u(e.get(s,"employer_signature.createdAt")).format("YYYY-MM-DD HH:mm:ss")}</span>
                                </span>`}`);else if(M){const L=e.get(s,"companyPlace.corporateSealData.filePath");t=t.replaceAll("$employer_signature",`${e.isEmpty($)?'<span class="signClearWorker"></span>':`
                                    <span class="signClearEmployer">
                                      <span class='orgName'>${y}</span>
                                      <div class="imageBox">
                                        <img src="/${$}" class="signImages"/>
                                        <img src="/${L}" class="signImages"/>
                                      </div> 
                                      <span class="times notPre">
                                        ${u(e.get(s,"employer_signature.createdAt")).format("YYYY-MM-DD HH:mm:ss")}
                                      </span>
                                    </span>`}`)}else t=t.replaceAll("$employer_signature",`${e.isEmpty(h)?'<span class="signClearWorker"></span>':`
                                    <span class="signClearEmployer">
                                      <span class='orgName'>${y}</span>
                                      <div class="imageBox">
                                        <img src="/${$}" class="signImages"/>
                                        <img src="/${h}" class="signImages"/>
                                      </div> 
                                      <span class="times notPre">
                                        ${u(e.get(s,"employer_signature.createdAt")).format("YYYY-MM-DD HH:mm:ss")}
                                      </span>
                                    </span>`}`)}t.includes("$quit_date")&&(t=t.replaceAll("$quit_date",`${q?`<span class="light">${u(q).format("YYYY년 MM월 DD일")}</span>`:'<span class="light">$quit_date"</span>'}`)),t.includes("$prev_company")&&(t=t.replaceAll("$prev_company",`${e.isEmpty(C)?'<span class="light">$prev_company</span>':`<span class="light">${e.get(C,"departmentName")}</span>`}`)),t.includes("$Prev_CRN")&&(t=t.replaceAll("$Prev_CRN",`${e.isEmpty(C)?'<span class="light">$Prev_CRN</span>':`<span class="light">${e.get(C,"RepresentativeName")}</span>`}`)),t.includes("$contract_init")&&(t=t.replaceAll("$contract_init",`${I?`<span class="light">${u(I).format("YYYY년 MM월 DD일")}</span>`:`<span class="light">${I}</span>`}`)),t.includes("$contract_end")&&(t=t.replaceAll("$contract_end",`${P?`<span class="light">${u(P).format("YYYY년 MM월 DD일")}</span>`:`<span class="light">${P}</span>`}`)),o(t)}if(n!=null&&n!=null){const m=e.isEmpty(e.get(s,"encryptedData"))?!1:!w;if(n.includes("$company")&&(n=n.replaceAll("$company",e.isEmpty(e.get(s,"organization"))?'<span class="light">$company</span>':`<span class="light">${e.get(s,"organization.departmentName")}</span>`)),n.includes("$serviceArea")&&(n=n.replaceAll("$serviceArea",e.isEmpty(e.get(s,"organization"))?'<span class="light">$serviceArea</span>':`<span class="light">${e.get(s,"organization.ServiceArea")}</span>`)),n.includes("$RepresentativeName")&&(n=n.replaceAll("$RepresentativeName",e.isEmpty(e.get(s,"organization"))?'<span class="light">$RepresentativeName</span>':`<span class="light">${e.get(s,"organization.RepresentativeName")}</span>`)),n.includes("$MainPhoneNumber")&&(n=n.replaceAll("$MainPhoneNumber",e.isEmpty(e.get(s,"organization"))?'<span class="light">$MainPhoneNumber</span>':`<span class="light">${e.get(s,"organization.MainPhoneNumber")}</span>`)),n.includes("$address")&&(n=n.replaceAll("$address",e.isEmpty(e.get(s,"organization"))?'<span class="light">$MainPhoneNumber</span>':`<span class="light">${e.get(s,"organization.RepresentativeAddress.road_address")+", "+e.get(s,"organization.RepresentativeAddress.extra_address")}</span>
                        ${e.isEmpty(e.get(s,"organization.BranchAddress_1.road_address"))?"":`<br/><span class="light">${e.get(s,"organization.BranchAddress_1.road_address")}, ${e.get(s,"organization.BranchAddress_1.extra_address")}</span>`}
                        ${e.isEmpty(e.get(s,"organization.BranchAddress_2.road_address"))?"":`<br/><span class="light">${e.get(s,"organization.BranchAddress_2.road_address")}, ${e.get(s,"organization.BranchAddress_2.extra_address")}</span>`}
                        `)),n.includes("$ref_employee_id")&&(n=n.replaceAll("$ref_employee_id",`${e.isEmpty(i)?`<span class="light">${Ze}</span>`:`<span class="light">${e.get(i,"fullName")}</span>`}`)),n.includes("$contract_period")&&(n=n.replaceAll("$contract_period",`${A&&W?`<span class="light">${u(A).format("YYYY년 MM월 DD일")} ~ ${u(W).format("YYYY년 MM월 DD일")}</span>`:`<span class="light">${Je}</span>`}`)),n.includes("$effective_date")&&(n=n.replaceAll("$effective_date",`${O?`<span class="light">${u(O).format("YYYY년 MM월 DD일")}</span>`:`<span class="light">${Qe}</span>`}`)),n.includes("$contract_type")&&(n=n.replaceAll("$contract_type",`${e.isEmpty(je)?`<span class="light">${ea}</span>`:`<span class="light">${je}</span>`}`)),n.includes("$regular_work_date")&&(n=n.replaceAll("$regular_work_date",`${B?`<span class="light">${u(B).format("YYYY년 MM월 DD일")}</span>`:`<span class="light">${B}</span>`}`)),n.includes("$work_role")&&(n=n.replaceAll("$work_role",`${e.isEmpty(De)?`<span class="light">${ma}</span>`:`<span class="light">${De}</span>`}`)),n.includes("$salary_yearly/12")){const g=z||fe;n=n.replaceAll("$salary_yearly/12",`<span class="light margins">${m?"암호화 됨":(g/12).toLocaleString()}</span>`)}if(n.includes("$salary_yearly")&&(n=n.replaceAll("$salary_yearly",`${z?`<span class="light">${m?"암호화 됨":parseInt(z).toLocaleString()}</span>`:`<span class="light">${fe.toLocaleString()}</span>`}`)),n.includes("$base_salary")&&(n=n.replaceAll("$base_salary",`${Y?`<span class="light">${m?"암호화 됨":parseInt(Y).toLocaleString()}</span>`:`<span class="light">${aa.toLocaleString()}</span>`}`)),n.includes("$meal_allowance")&&(n=n.replaceAll("$meal_allowance",`${de?`<span class="light">${m?"암호화 됨":parseInt(de).toLocaleString()}</span>`:`<span class="light">${sa.toLocaleString()}</span>`}`)),n.includes("$vehicle_maintenance_allowance")&&(n=n.replaceAll("$vehicle_maintenance_allowance",`${pe?`<span class="light">${m?"암호화 됨":parseInt(pe).toLocaleString()}</span>`:`<span class="light">${ta.toLocaleString()}</span>`}`)),n.includes("$rnd_allowance")&&(n=n.replaceAll("$rnd_allowance",`${me?`<span class="light">${m?"암호화 됨":parseInt(me).toLocaleString()}</span>`:`<span class="light">${na.toLocaleString()}</span>`}`)),n.includes("$babysitting_allowance")&&(n=n.replaceAll("$babysitting_allowance",`${ge?`<span class="light">${m?"암호화 됨":parseInt(ge).toLocaleString()}</span>`:`<span class="light">${la.toLocaleString()}</span>`}`)),n.includes("$personal_development_allowance")&&(n=n.replaceAll("$personal_development_allowance",`${ue?`<span class="light">${m?"암호화 됨":parseInt(ue).toLocaleString()}</span>`:`<span class="light">${ia.toLocaleString()}</span>`}`)),n.includes("$commuting_allowance")&&(n=n.replaceAll("$commuting_allowance",`${_e?`<span class="light">${m?"암호화 됨":parseInt(_e).toLocaleString()}</span>`:`<span class="light">${ca.toLocaleString()}</span>`}`)),n.includes("$work_support_allowance")&&(n=n.replaceAll("$work_support_allowance",`${ve?`<span class="light">${m?"암호화 됨":parseInt(ve).toLocaleString()}</span>`:`<span class="light">${ra.toLocaleString()}</span>`}`)),n.includes("$holurly_rate")&&(n=n.replaceAll("$holurly_rate",`${he?`<span class="light">${m?"암호화 됨":parseInt(he).toLocaleString()}</span>`:`<span class="light">${oa.toLocaleString()}</span>`}`)),n.includes("$overtime_pay_hours")&&(n=n.replaceAll("$overtime_pay_hours",`${ye?`<span class="light">${m?"암호화 됨":ye}</span>`:`<span class="light">${da}</span>`}`)),n.includes("$contract_date")&&(n=n.replaceAll("$contract_date",`${V?`<span class="light">${u(V).format("YYYY년 MM월 DD일")}</span>`:`<span class="light">${pa}</span>`}`)),n.includes("$entry_date")&&(n=n.replaceAll("$entry_date",`${H?`<span class="light">${u(H).format("YYYY년 MM월 DD일")}</span>`:`<span class="light">${ua}</span>`}`)),n.includes("$division")&&(n=n.replaceAll("$division",`${e.isEmpty(ke)?`<span class="light">${ga}</span>`:`<span class="light">${ke}</span>`}`)),n.includes("$birthday")){let g;e.isEmpty(e.get(s,"UserForAdmin"))?w?e.get(s,"user.social_security_number")&&(e.get(s,"user.social_security_number").includes("-")?g=e.get(s,"user.social_security_number").split("-")[0]:D?D.includes("-")?g=D.split("-")[0]:g=D:g=e.get(s,"user.social_security_number")):g="암호화 됨":w?D&&(D.includes("-")?g=D.split("-")[0]:g=D):g="암호화 됨",n=n.replaceAll("$birthday",`${e.isEmpty(e.get(s,"user.social_security_number"))?'<span class="light"></span>':`<span class="light">${g}</span>`}`)}if(n.includes("$social_security_number")){let g=e.isEmpty(e.get(s,"user.UserForAdmin"))?e.get(s,"user.social_security_number"):w?D:"암호화 됨";n=n.replaceAll("$social_security_number",`${e.isEmpty(e.get(s,"user.social_security_number"))?'<span class="light"></span>':`<span class="light">${g}</span>`}`)}n.includes("$road_address")&&(n=n.replaceAll("$road_address",`${e.isEmpty(e.get(s,"user.address.road_address"))?'<span class="light"></span>':`<span class="light">${e.get(s,"user.address.road_address")}</span>`}`)),n.includes("$extra_address")&&(n=n.replaceAll("$extra_address",`${e.isEmpty(e.get(s,"user.address.extra_address"))?'<span class="light"></span>':`<span class="light">${e.get(s,"user.address.extra_address")}</span>`}`)),n.includes("$organization")&&(n=n.replaceAll("$organization",`${e.isEmpty(e.get(s,"organization.branch_ko"))?'<span class="light"></span>':`<span class="light">${e.get(s,"organization.branch_ko")}</span>`}`)),n.includes("$job_title")&&(n=n.replaceAll("$job_title",`${e.isEmpty(e.get(s,"user.job_title"))?'<span class="light"></span>':`<span class="light">${e.get(s,"user.job_title")}</span>`}`)),n.includes("$phone")&&(n=n.replaceAll("$phone",`${e.isEmpty(e.get(s,"user.phone"))?'<span class="light"></span>':`<span class="light">${e.get(s,"user.phone")}</span>`}`)),n.includes("$bankname")&&(n=n.replaceAll("$bankname",`${e.isEmpty(e.get(s,"user.bankname"))?'<span class="light"></span>':`<span class="light">${e.get(s,"user.bankname")}</span>`}`)),n.includes("$bankaccount")&&(n=n.replaceAll("$bankaccount",`${e.isEmpty(e.get(s,"user.bankaccount"))?'<span class="light"></span>':`<span class="light">${e.get(s,"user.bankaccount")}</span>`}`)),n.includes("$personal_email")&&(n=n.replaceAll("$personal_email",`${e.isEmpty(e.get(s,"user.personal_email"))?'<span class="light"></span>':`<span class="light">${e.get(s,"user.personal_email")}</span>`}`)),e.isEmpty(R)||R.map((g,h)=>{n.includes(e.get(g,"name_eng"))&&(n=n.replaceAll(e.get(g,"name_eng"),`
                                    <div class="customRadio margins">
                                        <label class="box">
                                                <input type="radio"  value="yes" checked/>
                                                <p>동의함</p>
                                            </label>
                                    </div>
                                `))});const y=e.get(s,"organization.departmentName")?e.get(s,"organization.departmentName"):e.get(s,"user.companyPlace.departmentName");if(n.includes("$worker_signature")){const g=e.get(s,"worker_signature.sign_data"),h=e.get(s,"worker_sings.filePath"),$=e.get(s,"worker_name.filePath");e.isEmpty(h)?n=n.replaceAll("$worker_signature",`${e.isEmpty(g)?'<span class="signClearWorker"></span>':`
                                <span class="signClearWorker">
                                    <span class='orgName'>${y}</span><br/>
                                    전자서명완료<br/><span class="times">${u(e.get(s,"worker_signature.createdAt")).format("YYYY-MM-DD HH:mm:ss")}</span>
                                </span>`}`):n=n.replaceAll("$worker_signature",`${e.isEmpty(h)?'<span class="signClearWorker"></span>':`
                                <span class="signClearWorker">
                                  <span class='orgName'>${y}</span>
                                   <div class="imageBox">
                                        <img src="/${$}" class="signImages"/>
                                        <img src="/${h}" class="signImages"/>
                                    </div> 
                                  <span class="times notPre">
                                    ${u(e.get(s,"worker_signature.createdAt")).format("YYYY-MM-DD HH:mm:ss")}
                                  </span>
                                </span>`}`)}if(n.includes("$employer_signature")){const g=e.get(s,"employer_signature.sign_data"),h=e.get(s,"employer_sings.filePath"),$=e.get(s,"employer_name.filePath");e.isEmpty(h)?n=n.replaceAll("$employer_signature",`${e.isEmpty(g)?'<span class="signClearEmployer"></span>':`
                                <span class="signClearEmployer">
                                   <span class='orgName'>${y}</span><br/>
                                    전자서명완료<br/><span class="times">${u(e.get(s,"employer_signature.createdAt")).format("YYYY-MM-DD HH:mm:ss")}</span>
                                </span>`}`):n=n.replaceAll("$employer_signature",`${e.isEmpty(h)?'<span class="signClearWorker"></span>':`
                                <span class="signClearEmployer">
                                  <span class='orgName'>${y}</span>
                                  <div class="imageBox">
                                    <img src="/${$}" class="signImages"/>
                                    <img src="/${h}" class="signImages"/>
                                  </div> 
                                  <span class="times notPre">
                                    ${u(e.get(s,"employer_signature.createdAt")).format("YYYY-MM-DD HH:mm:ss")}
                                  </span>
                                </span>`}`)}return n.includes("$quit_date")&&(n=n.replaceAll("$quit_date",`${q?`<span class="light">${u(q).format("YYYY년 MM월 DD일")}</span>`:'<span class="light">$quit_date"</span>'}`)),n.includes("$prev_company")&&(n=n.replaceAll("$prev_company",`${e.isEmpty(C)?'<span class="light">$prev_company</span>':`<span class="light">${e.get(C,"departmentName")}</span>`}`)),n.includes("$Prev_CRN")&&(n=n.replaceAll("$Prev_CRN",`${e.isEmpty(C)?'<span class="light">$Prev_CRN</span>':`<span class="light">${e.get(C,"RepresentativeName")}</span>`}`)),n.includes("$contract_init")&&(n=n.replaceAll("$contract_init",`${I?`<span class="light">${u(I).format("YYYY년 MM월 DD일")}</span>`:`<span class="light">${I}</span>`}`)),n.includes("$contract_end")&&(n=n.replaceAll("$contract_end",`${P?`<span class="light">${u(P).format("YYYY년 MM월 DD일")}</span>`:`<span class="light">${P}</span>`}`)),v(n),x.current=t,f.current=l,t}},[l]);return a.jsx(Fs,{content:j})};c.useCallback(({prevTemplate:l,setThisCode:i})=>{if(!e.isEmpty(l)&&l!=null&&l!=null){const o=new DOMParser().parseFromString(l,"text/xml"),_=new XMLSerializer().serializeToString(o),[v,x]=c.useState(_);return c.useEffect(()=>{i&&i(_)},[_]),a.jsx(Rs,{value:v,height:"calc(100vh - 100vh/4)",extensions:[Is({jsx:!0})],onChange:f=>{i&&x&&(x(f),i(f))}})}},[_a]),c.useEffect(()=>{A&&xe(A)},[A]),c.useEffect(()=>{if(!e.isEmpty(e.get(s,"user"))&&!be){const l=e.get(s,"user"),i=e.get(l,"entry_date"),p=e.get(l,"insure_acquisition_date");i&&p?u(i).startOf("day").isSameOrBefore(u(p).startOf("day"))?le(new Date(i)):le(new Date(p)):p&&le(new Date(p))}},[s,be]);const Es=async({getData:l,adminKeyData:i})=>{try{if(!e.isEmpty(l)&&!e.isEmpty(i)){const p=e.get(l,"user.username"),{data:o,status:_}=await N.post("/API/privateKey/decrypt/admin/salaryContract",{username:p,id:ae,adminKey:i});if(!e.isEmpty(o)){r("salary_yearly",e.get(o,"salary_yearly")),r("holurly_rate",e.get(o,"hourly_rate")),r("base_salary",e.get(o,"base_salary")),r("meal_allowance",e.get(o,"meal_allowance")),r("rnd_allowance",e.get(o,"rnd_allowance")),r("vehicle_maintenance_allowance",e.get(o,"vehicle_maintenance_allowance")),r("personal_development_allowance",e.get(o,"personal_development_allowance")),r("babysitting_allowance",e.get(o,"babysitting_allowance")),r("commuting_allowance",e.get(o,"commuting_allowance")),r("work_support_allowance",e.get(o,"work_support_allowance")),r("overtime_pay",e.get(o,"overtime_pay")),r("overtime_pay_hours",e.get(o,"overtime_pay_hours"));const{data:v,status:x}=await N.post("/API/privateKey/decrypt/admin/socialSecurity",{username:p,adminKey:i});e.isEmpty(v)||ss(e.get(v,"social_security_number"))}}}catch(p){console.log(p,"error")}};c.useEffect(()=>{w&&Es({getData:s,adminKeyData:ie})},[w,s,ie]),c.useEffect(()=>{if(Y||Y==0){const l=Math.ceil(Y/209);ns(l)}},[Y]),c.useEffect(()=>{qe&&!e.isEmpty(ce)&&ce.map(l=>{e.get(l,"_id")==qe&&Fe(l)})},[qe,ce]);const Ss=c.useCallback(({prevTemplate:l,setThisCode:i,setPrevTemplate:p,saveTemplate:o,setSaveTemplate:_})=>{const v=c.useRef(l);return c.useEffect(()=>{!e.isEmpty(l)&&l!==v.current&&(v.current=l,i(l),p(l))},[l]),a.jsx(Ts,{value:v.current,onChange:x=>{v.current=x,i(x),p(x)},saveTemplate:o,setSaveTemplate:_})},[]);return a.jsxs(a.Fragment,{children:[Ma&&a.jsx(c.Suspense,{fallback:a.jsx(a.Fragment,{}),children:a.jsx(Xe,{title:Ce?"수정이 되지 않았습니다.":"근로계약서 수정이 완료되었습니다.",text:Ce?"에러사항을 확인해주시기 바랍니다.":"수정한 내용으로 반영이 완료되었습니다.",buttons:!0,closeState:Ae,buttonContent:{cancleValue:{text:"확인",link:""}},icon:!Ce})}),Qa&&a.jsx(c.Suspense,{fallback:a.jsx(a.Fragment,{}),children:a.jsx(Xe,{title:"해당 계약서는 수정이 불가능합니다.",text:"서명이 모두 체결된 계약서는 수정이 불가능합니다.",buttons:!0,closeState:ja,buttonContent:{cancleValue:{text:"확인",link:"/"}},icon:!1})}),Za&&a.jsx(Vs,{setOpenPop:Pe,setOpenInModal:xa,user:Ba}),ba&&a.jsx(Os,{setSelectPreData:Ja,setOpenInModal:xa,setOpenPop:Pe,openPop:ba,user:e.get(s,"ref_user")}),as&&a.jsx(Hs,{setOpenPop:Me,setVerified:Da,adminKeyData:ie}),a.jsx("div",{className:"manageBox",children:a.jsxs("div",{className:"editBox wideBox",children:[a.jsx(Bs,{to:"/operator/employmentContract",children:a.jsx("div",{className:"backButton",children:a.jsx(Ys,{src:"/web/img/prevButtons.svg",alt:""})})}),a.jsxs("form",{onSubmit:Ia(l=>$s({...l})),onKeyPress:xs,children:[a.jsx("input",{type:"hidden",...k("id",{required:!0})}),a.jsxs("div",{className:"editTitle",children:[a.jsx("div",{className:"leftText",children:"근로계약서 수정"}),a.jsxs("div",{className:"rightButton",children:[ne&&!be?a.jsxs(a.Fragment,{children:[e.get(s,"template_type")==="docx"&&a.jsx("div",{className:"saveButton wideButtons",onClick:()=>{Ca()},style:{marginRight:"10px"},children:Sa?"로딩 중...":"DOCX 문서 보기"}),!w&&!e.isEmpty(e.get(s,"SalaryContractForAdmin"))&&a.jsx("div",{className:"saveButton wideButtons",onClick:()=>{Me(!0)},children:"계약서 데이터 보기"}),w&&a.jsx("button",{type:"submit",className:"saveButton",children:"수정"})]}):a.jsxs(a.Fragment,{children:[e.get(s,"template_type")==="docx"&&a.jsx("div",{className:"saveButton wideButtons",onClick:()=>{Ca()},style:{marginRight:"10px"},children:Sa?"로딩 중...":"DOCX 문서 보기"}),!w&&!e.isEmpty(e.get(s,"SalaryContractForAdmin"))&&a.jsx("div",{className:"saveButton wideButtons",onClick:()=>{Me(!0)},children:"계약서 데이터 보기"}),w&&a.jsx("div",{type:"submit",className:"saveButton notEditable",onClick:()=>{ja(!0)},children:"수정"})]}),w&&ne&&be&&a.jsx("div",{type:"submit",className:"saveButton wideButtons anoterButtons",onClick:()=>{Ds(Ra,s)},children:"PDF로 다운받기"})]})]}),a.jsxs("div",{className:"editBottomBox",children:[a.jsxs("div",{className:"textBox",children:[a.jsx("div",{className:"textTitle",children:"템플릿 선택"}),a.jsx("div",{className:"textInputBox",children:a.jsx(ws,{selectTemplate:te,setTemplateListOpen:Wa,templateListOpen:za,prevTemplateList:se})})]}),Oe&&we&&a.jsxs("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0, 0, 0, 0.9)",zIndex:9999,display:"flex",flexDirection:"column"},children:[a.jsxs("div",{style:{padding:"15px 20px",backgroundColor:"#333",color:"white",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[a.jsx("h3",{style:{margin:0,fontSize:"18px"},children:"DOCX 문서 뷰어"}),a.jsx("button",{type:"button",onClick:()=>{Ea(!1),ka(null)},style:{padding:"8px 20px",backgroundColor:"#dc3545",color:"white",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"14px",fontWeight:"bold"},children:"닫기 ✕"})]}),a.jsx("div",{id:"onlyoffice-viewer-edit",style:{flex:1,width:"100%",backgroundColor:"white"}}),Na&&a.jsx("div",{style:{padding:"15px",backgroundColor:"#f8d7da",color:"#721c24",borderTop:"1px solid #f5c6cb"},children:Na})]}),ne&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"textBox",children:[a.jsx("div",{className:"textTitle",children:"이름"}),a.jsxs("div",{className:"textInputBox",children:[a.jsx("input",{type:"text",className:"custom_input_4 readonly",readOnly:!0,...k("name",{required:!0})}),a.jsx("input",{type:"hidden",className:"custom_input_4",readOnly:!0,...k("username",{required:!0})})]}),!e.isEmpty(e.get(E,"username"))&&a.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]}),a.jsxs("div",{className:"textBox",children:[a.jsx("div",{className:"textTitle",children:"사전정의 데이터 불러오기"}),a.jsx("div",{className:"textInputBox",children:a.jsx("div",{className:"openList",onClick:()=>{Pe(!0)},children:"사전정의 데이터 리스트"})})]}),a.jsxs("div",{className:"flexTextBox",children:[a.jsxs("div",{className:"textBox",children:[a.jsx("div",{className:"textTitle",children:"최초입사일 설정"}),a.jsx("div",{className:"textInputBox",children:a.jsx(c.Suspense,{fallback:a.jsx(a.Fragment,{}),children:a.jsx(F,{setStartDate:le,startDate:H})})})]}),a.jsxs("div",{className:"textBox",children:[a.jsxs("div",{className:"textBox flexSpace margins",children:[a.jsx("div",{className:"textTitle",children:"근로기간 설정"}),a.jsx("div",{className:"textInputBox",children:a.jsxs("label",{htmlFor:"customCheckEnd",className:"customCheckBox",children:[a.jsx("input",{type:"checkbox",id:"customCheckEnd",value:"true",...k("use_employ_end")}),a.jsx("span",{}),a.jsx("p",{children:"종료기간 사용"})]})})]}),a.jsx("div",{className:"textInputBox",children:ys=="true"?a.jsx(c.Suspense,{fallback:a.jsx(a.Fragment,{}),children:a.jsx(Ps,{isOpen:qa,isOpenEnd:Ua,setIsOpen:Ka,setIsOpenEnd:Xa,setStartDate:$e,startDate:A,setEndDate:Le,endDate:W})}):a.jsx(c.Suspense,{fallback:a.jsx(a.Fragment,{}),children:a.jsx(F,{setStartDate:$e,startDate:A})})})]}),a.jsxs("div",{className:"textBox",children:[a.jsx("div",{className:"textTitle",children:"연봉적용기간 설정"}),a.jsx("div",{className:"textInputBox",children:a.jsx(c.Suspense,{fallback:a.jsx(a.Fragment,{}),children:a.jsx(F,{setStartDate:Be,startDate:O})})})]})]}),a.jsxs("div",{className:"flexTextBox",children:[a.jsxs("div",{className:"textBox",children:[a.jsx("div",{className:"textTitle",children:"계약유형"}),a.jsxs("div",{className:"textInputBox",children:[a.jsxs("select",{className:"customSelect_2",value:cs,onChange:l=>{He(l.target.value,"contract_type")},children:[a.jsx("option",{value:"",children:"선택"}),a.jsx("option",{value:"정규직",children:"정규직"}),a.jsx("option",{value:"시용",children:"시용"}),a.jsx("option",{value:"계약직",children:"계약직"}),a.jsx("option",{value:"파트타임",children:"파트타임"}),a.jsx("option",{value:"기타",children:"기타"})]}),a.jsx("input",{placeholder:"계약유형을 입력해주세요",type:is?"text":"hidden",...k("contract_type"),className:"custom_input_4"})]}),!e.isEmpty(e.get(E,"contract_type"))&&a.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]}),a.jsxs("div",{className:"textBox",children:[a.jsx("div",{className:"textTitle",children:"소속부서"}),a.jsxs("div",{className:"textInputBox",children:[a.jsxs("select",{className:"customSelect_2",value:os,onChange:l=>{He(l.target.value,"division")},children:[a.jsx("option",{value:"",children:"선택"}),a.jsx("option",{value:"경영전략실",children:"경영전략실"}),a.jsx("option",{value:"경영전략실 파트타임",children:"경영전략실 파트타임"}),a.jsx("option",{value:"교수설계",children:"교수설계"}),a.jsx("option",{value:"교수설계 파트타임",children:"교수설계 파트타임"}),a.jsx("option",{value:"디지털마케팅",children:"디지털마케팅"}),a.jsx("option",{value:"디지털마케팅 파트타임",children:"디지털마케팅 파트타임"}),a.jsx("option",{value:"미디어",children:"미디어"}),a.jsx("option",{value:"미디어 파트타임",children:"미디어 파트타임"}),a.jsx("option",{value:"시스템운영",children:"시스템운영"}),a.jsx("option",{value:"시스템운영 파트타임",children:"시스템운영 파트타임"}),a.jsx("option",{value:"디자인",children:"디자인"}),a.jsx("option",{value:"디자인 파트타임",children:"디자인 파트타임"}),a.jsx("option",{value:"교육서비스",children:"교육서비스"}),a.jsx("option",{value:"교육서비스 파트타임",children:"교육서비스 파트타임"}),a.jsx("option",{value:"기타",children:"기타"})]}),a.jsx("input",{placeholder:"소속부서를 입력해주세요",type:rs?"text":"hidden",...k("division"),className:"custom_input_4"})]})]}),a.jsxs("div",{className:"textBox",children:[a.jsx("div",{className:"textTitle",children:"종사업종"}),a.jsxs("div",{className:"textInputBox",children:[a.jsxs("select",{className:"customSelect_2",value:ps,onChange:l=>{He(l.target.value,"work_role")},children:[a.jsx("option",{value:"",children:"선택"}),a.jsx("option",{value:"대표이사",children:"대표이사"}),a.jsx("option",{value:"경영전략 직무",children:"경영전략 직무"}),a.jsx("option",{value:"교육콘텐츠 개발(교육기획 및 설계)",children:"교육콘텐츠 개발(교육기획 및 설계)"}),a.jsx("option",{value:"교육콘텐츠 개발(디자인 부분)",children:"교육콘텐츠 개발(디자인 부분)"}),a.jsx("option",{value:"교육콘텐츠 개발(영상 부분)",children:"교육콘텐츠 개발(영상 부분)"}),a.jsx("option",{value:"에듀테크 솔루션 개발 및 유지보수",children:"에듀테크 솔루션 개발 및 유지보수"}),a.jsx("option",{value:"교육서비스 총무",children:"교육서비스 총무"}),a.jsx("option",{value:"운영 및 홍보",children:"운영 및 홍보"}),a.jsx("option",{value:"기타",children:"기타"})]}),a.jsx("input",{placeholder:"종사업종을 입력해주세요",type:ds?"text":"hidden",...k("work_role"),className:"custom_input_4"})]}),!e.isEmpty(e.get(E,"work_role"))&&a.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]})]}),a.jsxs("div",{className:"salaryHandsontable",style:{marginBottom:"20px"},children:[a.jsx(zs,{data:[[z||0,Y||0,de||0,pe||0,me||0,ge||0,ue||0,_e||0,ve||0,he||0,ye||0]],colHeaders:["연봉",w?`기본급<br/><span style="font-size: 11px; font-weight: normal; color: #666;">(통상시급: ${ts.toLocaleString()}원)</span>`:"기본급","식대","차량유지비","연구활동비","육아수당","자기계발비","통근교통비","업무지원비","초과근로수당","초과근로<br/>기준시간"],colWidths:[100,120,100,100,100,100,100,100,100,100,100],rowHeaders:!1,width:"100%",height:"auto",licenseKey:"non-commercial-and-evaluation",readOnly:!w,afterChange:(l,i)=>{i==="edit"&&l&&l.forEach(([p,o,_,v])=>{const f=["salary_yearly","base_salary","meal_allowance","vehicle_maintenance_allowance","rnd_allowance","babysitting_allowance","personal_development_allowance","commuting_allowance","work_support_allowance","holurly_rate","overtime_pay_hours"][o],j=parseInt(String(v).replace(/,/g,""))||0;r(f,j),r(`${f}_view`,j.toLocaleString())})},columns:[{type:"numeric",numericFormat:{pattern:"0,0"}},{type:"numeric",numericFormat:{pattern:"0,0"}},{type:"numeric",numericFormat:{pattern:"0,0"}},{type:"numeric",numericFormat:{pattern:"0,0"}},{type:"numeric",numericFormat:{pattern:"0,0"}},{type:"numeric",numericFormat:{pattern:"0,0"}},{type:"numeric",numericFormat:{pattern:"0,0"}},{type:"numeric",numericFormat:{pattern:"0,0"}},{type:"numeric",numericFormat:{pattern:"0,0"}},{type:"numeric",numericFormat:{pattern:"0,0"}},{type:"numeric",numericFormat:{pattern:"0,0"}}],className:"htCenter"}),w&&a.jsx("div",{style:{fontSize:"11px",color:"#999",marginTop:"8px"},children:(!e.isEmpty(e.get(E,"salary_yearly"))||!e.isEmpty(e.get(E,"base_salary"))||!e.isEmpty(e.get(E,"meal_allowance"))||!e.isEmpty(e.get(E,"vehicle_maintenance_allowance"))||!e.isEmpty(e.get(E,"rnd_allowance"))||!e.isEmpty(e.get(E,"babysitting_allowance"))||!e.isEmpty(e.get(E,"personal_development_allowance"))||!e.isEmpty(e.get(E,"commuting_allowance"))||!e.isEmpty(e.get(E,"work_support_allowance"))||!e.isEmpty(e.get(E,"holurly_rate"))||!e.isEmpty(e.get(E,"overtime_pay_hours")))&&a.jsx("div",{className:"warningBox",style:{fontSize:"12px",marginTop:"5px"},children:"정수만 입력하세요"})})]}),a.jsx("div",{className:"flexTextBox",children:a.jsxs("div",{className:"textBox",children:[a.jsx("div",{className:"textTitle",children:"계약작성일 설정"}),a.jsx("div",{className:"textInputBox",children:a.jsx(c.Suspense,{fallback:a.jsx(a.Fragment,{}),children:a.jsx(F,{setStartDate:xe,startDate:V})})})]})}),a.jsxs("div",{className:"flexTextBox",children:[a.jsxs("div",{className:"textBox",children:[a.jsx("div",{className:"textTitle",children:"퇴직일 설정"}),a.jsx("div",{className:"textInputBox",children:a.jsx(c.Suspense,{fallback:a.jsx(a.Fragment,{}),children:a.jsx(F,{setStartDate:Te,startDate:q})})})]}),a.jsxs("div",{className:"textBox",children:[a.jsx("div",{className:"textTitle",children:"이전 직장"}),a.jsx("div",{className:"textInputBox",children:a.jsx("select",{...k("prev_company"),className:"customSelect_2",children:!e.isEmpty(ce)&&ce.map((l,i)=>a.jsx("option",{value:e.get(l,"_id"),children:e.get(l,"departmentName")},`operator_employment_contaract_prev_org_${i}`))})})]}),a.jsxs("div",{className:"textBox",children:[a.jsx("div",{className:"textTitle",children:"서명방식 선택"}),a.jsxs("div",{className:"textInputBox customRadio heightW",children:[a.jsxs("label",{htmlFor:"kakao",children:[a.jsx("input",{type:"radio",id:"kakao",value:"kakao",...k("signature_way")}),a.jsx("p",{children:"카카오서명(~2025.01 종료)"})]}),a.jsxs("label",{htmlFor:"signature",children:[a.jsx("input",{type:"radio",id:"signature",value:"signature",...k("signature_way")}),a.jsx("p",{children:"기명·서명"})]}),fs=="signature"&&a.jsxs("label",{htmlFor:"use_only_name",className:"customCheckBox",children:[a.jsx("input",{type:"checkbox",id:"use_only_name",value:"true",...k("use_only_name")}),a.jsx("span",{}),a.jsx("p",{children:"서명은 인감으로 대체"})]})]})]})]}),a.jsxs("div",{className:"flexTextBox",children:[a.jsxs("div",{className:"textBox",children:[a.jsx("div",{className:"textTitle",children:"계약시작일 설정"}),a.jsx("div",{className:"textInputBox",children:a.jsx(c.Suspense,{fallback:a.jsx(a.Fragment,{}),children:a.jsx(F,{setStartDate:ze,startDate:I})})})]}),a.jsxs("div",{className:"textBox",children:[a.jsx("div",{className:"textTitle",children:"계약종료일 설정"}),a.jsx("div",{className:"textInputBox",children:a.jsx(c.Suspense,{fallback:a.jsx(a.Fragment,{}),children:a.jsx(F,{setStartDate:We,startDate:P})})})]}),(Aa!="secret"||Aa=="parttime")&&a.jsxs("div",{className:"textBox",children:[a.jsx("div",{className:"textTitle",children:"정규직전환일 설정"}),a.jsx("div",{className:"textInputBox",children:a.jsx(c.Suspense,{fallback:a.jsx(a.Fragment,{}),children:a.jsx(F,{setStartDate:$a,startDate:B})})})]})]}),a.jsx("div",{className:"flexTextBox",children:a.jsxs("div",{className:"flexSpaceWrap wideFlexWrap",children:[a.jsxs("div",{className:"textBox flexSpace",children:[a.jsx("div",{className:"textTitle",children:"사용자 동의 데이터 (예,아니오 선택사항이 있을 경우 반드시 체크)"}),a.jsx("div",{className:"textInputBox",children:a.jsxs("label",{htmlFor:"customCheck",className:"customCheckBox",children:[a.jsx("input",{type:"checkbox",id:"customCheck",value:"true",...k("use_custom")}),a.jsx("span",{}),a.jsx("p",{children:"사용"})]})})]}),hs=="true"&&!e.isEmpty(R)&&R.map((l,i)=>a.jsx(js,{item:l,idx:i,customCheck:R},`AddRadioArray_${i}`))]})}),e.get(s,"template_type")!=="docx"&&a.jsxs("div",{className:"textBox",children:[a.jsxs("div",{className:"textTitle flexTitle",children:["내용",a.jsx("span",{className:Re?"variableInfo active":"variableInfo",onClick:()=>{Ga(!Re)},children:"?"}),a.jsx("div",{className:"templateSaveBtn",onClick:()=>{Ge(!0)},children:"작성내용 확인하기"}),Re&&a.jsxs("div",{className:"openBox",children:[a.jsxs("div",{className:"leftBox",children:[a.jsxs("div",{className:"inSection",children:["편집기 안에 $ref_employee_id 등의 변수는 실제 ",a.jsx("br",{}),"근로계약서에 사용되는 변수입니다."]}),a.jsx("div",{className:"inSection bolds",children:"해당 변수명을 변경하지 마십시오."}),a.jsxs("div",{className:"inSection",children:["$ref_employee_id : 근로자",a.jsx("br",{}),"$contract_period : 근로기간",a.jsx("br",{}),"$effective_date : 연봉적용기간",a.jsx("br",{}),"$contract_type : 근로계약종류",a.jsx("br",{}),"$work_role : 종사업종",a.jsx("br",{}),"$salary_yearly : 연봉",a.jsx("br",{}),"$base_salary : 기본급",a.jsx("br",{})]})]}),a.jsx("div",{className:"rightBox",children:a.jsxs("div",{className:"inSection",children:["$meal_allowance : 식대",a.jsx("br",{}),"$vehicle_maintenance_allowance : 차량유지비",a.jsx("br",{}),"$rnd_allowance : 연구활동비",a.jsx("br",{}),"$babysitting_allowance : 육아수당",a.jsx("br",{}),"$personal_development_allowance : 자기계발비",a.jsx("br",{}),"$commuting_allowance : 통근교통비",a.jsx("br",{}),"$work_support_allowance : 업무지원비",a.jsx("br",{}),"$holurly_rate : 초과근로수당",a.jsx("br",{}),"$overtime_pay_hours : 초과근로시간 기준",a.jsx("br",{}),"$contract_date : 계약일"]})})]})]}),a.jsx("div",{className:"textInputBox",children:a.jsxs("div",{className:"editorBox employmentBox",style:{width:"-webkit-fill-available;"},children:[a.jsx(Ss,{prevTemplate:_a,setThisCode:Ta,setPrevTemplate:va,saveTemplate:Pa,setSaveTemplate:Ge}),Ye&&a.jsx(ks,{code:Ye,selectUser:Va})]})})]})]})]})]})]})})]})}export{_t as default};
