const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/customPopUp-1j2cuYYo.js","assets/index-ak5BsCze.js","assets/vendor-react-DLmlTesg.js","assets/vendor-pdf-D5Eab7jE.js","assets/index-D3sbFfH5.css"])))=>i.map(i=>d[i]);
import{_ as xs,h as fs,E as js}from"./vendor-pdf-D5Eab7jE.js";import{b as ja,l as e,j as a,I as re,a as X}from"./index-ak5BsCze.js";import{b as o,L as Qe,R as Ls}from"./vendor-react-DLmlTesg.js";import{h as S}from"./moment-B-YVwB4U.js";import"./ko-C39F15y_.js";import{L as Ns}from"./index.es-Bd6IuInA.js";import{l as Ss}from"./loading-CBWb7kyW.js";import"./vendor-excel-CVVhhIhe.js";S.locale("ko");const Ts=Ls.lazy(()=>xs(()=>import("./customPopUp-1j2cuYYo.js"),__vite__mapDeps([0,1,2,3,4])));function Rs({user:Ne}){ja.get("employment_status");const[Se,Te]=o.useState([]),[Z,La]=o.useState(S().format("YYYY")),[ee,Na]=o.useState(S().format("MM")),[be,Pe]=o.useState(!1),[M,Sa]=o.useState(!1),[Ta,ba]=o.useState(!1),Ge=async()=>{try{let t=ja.get("_hid");const{data:y,status:u}=await X.get(`/API/payslip/myPayslipsData?hid=${t}&year=${Z}&month=${ee}`);u===201?e.isEmpty(e.get(y,"result"))||Te(e.get(y,"result.0")):Te([])}catch(t){Te([]),X.isAxiosError(t)&&t.response?t.response.status===403?console.log("error 발생"):console.log("다른 HTTP 오류: ",t.response.status):console.error("네트워크 또는 알 수 없는 오류: ",t)}},Pa=async t=>{try{const{data:y,status:u}=await X.get("/API/member/getMyData",{params:{_hid:e.get(t,"_hid")}});u==201&&(ba(!0),e.isEmpty(e.get(y,"result.0"))||Sa(e.get(y,"result.0")))}catch(y){console.log(y)}},wa=o.useCallback(({userData:t})=>{const[y,u]=o.useState(!0),[Y,ae]=o.useState([]),[$,E]=o.useState(["","","","",""]),[ve,R]=o.useState(!1),[we,ge]=o.useState("odd"),[x,H]=o.useState(!1),[se,K]=o.useState(!1),[te,q]=o.useState(!1),[ie,I]=o.useState(!1),[De,Be]=o.useState(!1),ye=e.get(t,"employment_status"),he=async({inputText:g,userData:r})=>{if(!e.isEmpty(g))try{let m="";if(g.map(f=>{m+=f}),!e.isEmpty(m)){const{data:f,status:P}=await X.post("/API/privateKey/verify",{username:e.get(r,"username"),password:m});P==200||P==201?Pe(!1):(I(!0),U())}}catch(m){console.log(m),I(!0),U()}},le=()=>{const r=S().seconds();r&&(r%2==0?ge("even"):ge("odd"))},pe=(g,r)=>{const m=`${g}`;if(!e.isEmpty(m)){const f=e.cloneDeep(r);let P=[];f.map(($e,_e)=>{e.isEmpty($e)&&P.push(_e)}),e.isEmpty(P)||(R(!0),le(),f[P[0]]=`${g}`,E(f),setTimeout(()=>{R(!1)},100))}},U=()=>{K(!0),E(["","","","",""]),setTimeout(()=>{K(!1)},100)},me=g=>{const r=e.cloneDeep(g),m=[];r.map((f,P)=>{e.isEmpty(f)||m.push(P)}),e.isEmpty(m)||(R(!0),H(!0),le(),r[m[m.length-1]]="",E(r),setTimeout(()=>{R(!1),H(!1)},100))},ue=()=>{const g=[...Array(10).keys(),"",""],r=ce(g);ae(r)};function ce(g){for(let r=g.length-1;r>0;r--){const m=Math.floor(Math.random()*(r+1));[g[r],g[m]]=[g[m],g[r]]}return g}return o.useEffect(()=>{ue()},[]),o.useEffect(()=>{if(q(!1),!e.isEmpty($)){const g=[];$.map((r,m)=>{e.isEmpty(r)&&g.push(m)}),e.isEmpty(g)&&q(!0)}},[$]),o.useEffect(()=>{setTimeout(()=>{u(!1)},2e3)},[]),a.jsxs("div",{className:y?"checkPrivateKey":"checkPrivateKey whiteBack allBack",children:[y&&a.jsx("div",{className:"loading",children:a.jsx(Ns,{animationData:Ss,loop:!0})}),!y&&a.jsxs("div",{className:"registerKey checkInBox",children:[a.jsxs("div",{className:"topBox",children:[a.jsxs(Qe,{to:ye=="quit"?"/dashboardQuitter":"/dashboard",className:"prevButton",children:[a.jsx("div",{className:"imgBox",children:a.jsx(re,{src:"/web/img/left_button.svg",alt:"이전"})}),a.jsx("div",{className:"rightTitle",children:"이전"})]}),te?a.jsx("div",{className:"meslinks",onClick:()=>{he({inputText:$,userData:t})},children:a.jsxs("div",{className:"nextButton nextBlueButton",children:[a.jsx("div",{className:"leftTitle",children:"제출"}),a.jsx("div",{className:"imgBox",children:a.jsx(re,{src:"/web/img/right_button.svg",alt:"다음"})})]})}):a.jsx("div",{className:"meslinks",children:a.jsxs("div",{className:"nextButton",children:[a.jsx("div",{className:"leftTitle",children:"제출"}),a.jsx("div",{className:"imgBox",children:a.jsx(re,{src:"/web/img/right_button.svg",alt:"다음"})})]})})]}),a.jsx("div",{className:"registerTitle",children:"개인 암호키를 입력해주세요"}),a.jsx("div",{className:"numsBox",children:$&&$.map((g,r)=>{const m=e.isEmpty(g)?"":"active";return a.jsx("div",{className:`numbers ${m}`},`payroll_privat_key_number_${r}`)})}),a.jsx("div",{className:"registerText",children:"※ 비밀번호 재설정은 개인키등록에서 가능합니다."}),a.jsxs("div",{className:"numberInputButtonBox",children:[!e.isEmpty(Y)&&Y.map((g,r)=>{const m=[0,2,5,7,8,10];let f=!1;return we=="even"?f=!!m.includes(r):f=!m.includes(r),a.jsx("div",{className:`numberButton box_${r} ${ve&&f?"changing":""}`,onClick:()=>{pe(g,$)},children:g},`payroll_numberButton_box_${r}`)}),a.jsx("div",{className:se?"allErase changing":"allErase",onClick:()=>{U()},children:"전체 지움"}),a.jsx("div",{className:x?"lastErase changing":"lastErase",onClick:()=>{me($)},children:a.jsx("img",{src:"/web/img/erase_arrow.svg",className:"erase_arrow",alt:"닫기이미지"})})]})]}),ie&&a.jsx(o.Suspense,{fallback:a.jsx(a.Fragment,{}),children:a.jsx(Ts,{title:"개인 암호키가 다릅니다",text:"비밀번호를 다시 입력해주세요.",buttons:!0,closeState:I,buttonContent:{cancleValue:{text:"확인",link:"/"}},icon:!1})})]})},[M]),Da=t=>{La(t.target.value)},Ba=t=>{Na(t.target.value)},$a=o.useCallback(({item:t,currentYear:y,currentMonth:u})=>{const Y=o.useRef(null),[ae,$]=o.useState(""),[E,ve]=o.useState(!1),[R,we]=o.useState({}),ge=e.get(t,"gross_salary.base_salary"),x=e.get(t,"gross_salary.hourly_late"),H=e.get(t,"gross_salary.meal_allowance"),se=e.get(t,"gross_salary.vehicle_maintenance_allowance"),K=e.get(t,"gross_salary.rnd_allowance"),te=e.get(t,"gross_salary.babysitting_allowance"),q=e.get(t,"gross_salary.commuting_allowance"),ie=e.get(t,"gross_salary.personal_development_allowance"),I=e.get(t,"gross_salary.work_support_allowance"),De=e.get(t,"gross_salary.annual_leave_allowance",0),Be=e.get(t,"deductions.national_pension"),ye=e.get(t,"deductions.health_insurance"),he=e.get(t,"deductions.long_term_care_insurance"),le=e.get(t,"deductions.employment_insurance"),pe=e.get(t,"deductions.income_tax"),U=e.get(t,"deductions.local_income_tax"),me=e.get(t,"deductions.advance_payment"),ue=e.get(t,"deductions.other_deductions"),ce=e.get(t,"deductions.agricultural_special_tax"),g=e.get(t,"deductions.health_insurance_adjustment"),r=e.get(t,"deductions.long_term_care_insurance_adjustment"),m=e.get(t,"gross_salary.year_end_tax_adjustment"),f=e.get(t,"gross_salary.withholding_tax_adjustment"),P=e.get(t,"gross_salary.severance_pay"),$e=ce+g+r+f+P+De+m;let _e=Be+ye+he+le+pe+U+ce+g+r+me+ue,ka=e.get(t,"payslipAttendanceRecordSummary.holiday_regular_hours"),ke=e.get(t,"payslipAttendanceRecordSummary.weekday_overtime_hours"),Ca=e.get(t,"payslipAttendanceRecordSummary.night_work_hours"),Ra=e.get(t,"payslipAttendanceRecordSummary.holiday_regular_break_hours"),Ce=e.get(t,"payslipAttendanceRecordSummary.weekday_overtime_break_hours"),Aa=e.get(t,"payslipAttendanceRecordSummary.night_work_break_hours"),Ea=e.get(t,"payslipAttendanceRecordSummary.holiday_overtime_hours"),Ia=e.get(t,"payslipAttendanceRecordSummary.holiday_overtime_break_hours"),Fa=e.get(t,"payslipAttendanceRecordSummary.holiday_overtime_night_hours",0),Wa=e.get(t,"payslipAttendanceRecordSummary.holiday_overtime_night_break_hours",0);const Re=e.get(t,"gross_salary.unfaidLeaveSalary",0);let Je=e.get(t,"payslipAttendanceRecordSummary.unfaidLeave"),Xe=e.get(t,"payslipAttendanceRecordSummary.remote_work_allowance");e.get(t,"payslipAttendanceRecordSummary.remoteWorkLength");let Ze=e.get(t,"payslipAttendanceRecordSummary.expense_claim"),ea=e.get(t,"payslipAttendanceRecordSummary.expenseLength");e.get(t,"payslipAttendanceRecordSummary.tardiness"),e.get(t,"payslipAttendanceRecordSummary.work_days");let Oa=e.isEmpty(e.get(t,"social_security_number"))?"":e.get(t,"social_security_number").split("-")[0];const Ma=e.get(t,"gross_salary.overtime_pay_hours"),aa=e.get(t,"prorated_calculation_salary"),Ya=e.get(t,"gross_salary.overtime_pay_hours",0),sa=e.get(t,"gross_salary.night_work_allowance",0),ta=e.get(t,"gross_salary.holiday_allowance",0),ia=e.get(t,"gross_salary.holiday_overtime_allowance",0),Ae=e.get(t,"gross_salary.holiday_night_allowance",0),Ha=parseFloat(e.get(t,"gross_salary.additional_bonus")),la=parseFloat(e.get(t,"gross_salary.other_allowances")),Ka=Ya+sa+ta+ia+Ae,ca=e.get(t,"note"),qa=ge+I+ie+Ka+Ze+Xe+Ha+H+se+K+te+q+la-Re;let Ua=e.get(t,"payslipAttendanceRecordSummary.weekday_overtime_adjusted_hours",0)+e.get(t,"payslipAttendanceRecordSummary.holiday_overtime_adjusted_hours",0)+e.get(t,"payslipAttendanceRecordSummary.holiday_regular_adjusted_hours",0)+e.get(t,"payslipAttendanceRecordSummary.night_work_adjusted_hours",0);const F=e.get(t,"leaveRecord",[]).filter(s=>e.some(e.get(s,"leave_days"),l=>{const p=S(l);return p.year()===parseInt(y)&&p.month()+1===parseInt(u)})),Va=e.get(t,"remoteWorkRecord",[]).filter(s=>e.some(e.get(s,"remoteWork_days"),l=>{const p=S(l);return p.year()===parseInt(y)&&p.month()+1===parseInt(u)})),za=e.get(t,"expenseBills",[]).filter(s=>e.some(e.get(s,"expenseBasisDays"),l=>{const p=S(l);return p.year()===parseInt(y)&&p.month()+1===parseInt(u)})),Qa=e.get(t,"overtimeRecord",[]).filter(s=>{const l=S(e.get(s,"overtime_days"));return l.year()===parseInt(y)&&l.month()+1===parseInt(u)}),Ga=e.get(t,"attendanceRecord",[]).filter(s=>{const l=S(e.get(s,"attendance_date"));return l.year()===parseInt(y)&&l.month()+1===parseInt(u)}),da=e.get(t,"leaveTypeArray"),V=e.get(t,"payslipAttendanceRecordSummary");let i={yearly:0,public:0,summer:0},k={week:0,night:0,holi:0,holiOver:0,holiNight:0};const Ja=async()=>{const{data:s}=await X.get("/API/remoteWork/getRemoteWorkType");return s.result},Xa=async s=>{let l={};const p=await Ja();return p.forEach(v=>{l[v.remoteWork_name]={title:v.remoteWork_name,length:0}}),e.isEmpty(e.get(s,"remoteWorkRecord"))||e.get(s,"remoteWorkRecord",[]).forEach(v=>{if(v.status==="approved"){const n=v.remoteWorkType,D=p.find(L=>L._hid===n);if(D){const L=D.remoteWork_name;l[L]?l[L].length+=1:l[L]={title:L,length:1}}}}),l};o.useEffect(()=>{(async()=>{const l=await Xa(t);we(l)})()},[t]),!e.isEmpty(F)&&!e.isEmpty(da)&&(F.map(s=>{const l=e.get(s,"grandtedLeaveType"),p=[],v=[];da.map(n=>{e.isEmpty(l)||l.map(D=>{if(e.get(n,"_id")==D&&!v.includes(e.get(n,"_id"))){const L={type:D,item:n};p.push(L),v.push(e.get(n,"_id"))}})}),e.set(s,"thisType",p)}),F.map(s=>{const l=e.get(s,"leaveType");e.get(s,"leaveTypes");const p=e.get(s,"thisType"),v=e.get(s,"leave_days").length;switch(l){case"08837ddb96c10e1d671cb32abb1d9c80":p.map(n=>{e.get(n,"item.grantedleaveType")=="2fdefe0ced933153e866aada6c30c0f0"?i.yearly=e.get(i,"yearly")+1*v:e.get(n,"item.grantedleaveType")=="da99772580491fd593a0a502b9c8890c"?i.summer=e.get(i,"summer")+1*v:e.get(n,"item.grantedleaveType")=="354b1141d54c61eed37070d52688c81c"&&(i.public=e.get(i,"public")+1*v)});break;case"4cf3a26024ad7e79d191f5c8ad111ecc":p.map(n=>{e.get(n,"item.grantedleaveType")=="2fdefe0ced933153e866aada6c30c0f0"?i.yearly=e.get(i,"yearly")+.5:e.get(n,"item.grantedleaveType")=="da99772580491fd593a0a502b9c8890c"?i.summer=e.get(i,"summer")+.5:e.get(n,"item.grantedleaveType")=="354b1141d54c61eed37070d52688c81c"&&(i.public=e.get(i,"public")+.5)});break;case"3b7dd60060104dffc38e0c22a336157c":p.map(n=>{e.get(n,"item.grantedleaveType")=="2fdefe0ced933153e866aada6c30c0f0"?i.yearly=e.get(i,"yearly")+.25:e.get(n,"item.grantedleaveType")=="da99772580491fd593a0a502b9c8890c"?i.summer=e.get(i,"summer")+.25:e.get(n,"item.grantedleaveType")=="354b1141d54c61eed37070d52688c81c"&&(i.public=e.get(i,"public")+.25)});break;case"23d777aa78406d830af56709de83ef6e":break;case"1a556209f3592e3189ea9cf151ca9b9a":p.map(n=>{e.get(n,"item.grantedleaveType")=="2fdefe0ced933153e866aada6c30c0f0"?i.yearly=e.get(i,"yearly")+1*v:e.get(n,"item.grantedleaveType")=="da99772580491fd593a0a502b9c8890c"?i.summer=e.get(i,"summer")+1*v:e.get(n,"item.grantedleaveType")=="354b1141d54c61eed37070d52688c81c"&&(i.public=e.get(i,"public")+1*v)});break;case"cb66232ca771c7f7ae6e003a0bc65bd5":p.map(n=>{e.get(n,"item.grantedleaveType")=="2fdefe0ced933153e866aada6c30c0f0"?i.yearly=e.get(i,"yearly")+1*v:e.get(n,"item.grantedleaveType")=="da99772580491fd593a0a502b9c8890c"?i.summer=e.get(i,"summer")+1*v:e.get(n,"item.grantedleaveType")=="354b1141d54c61eed37070d52688c81c"&&(i.public=e.get(i,"public")+1*v)});break;default:p.map(n=>{e.get(n,"item.grantedleaveType")=="2fdefe0ced933153e866aada6c30c0f0"?i.yearly=e.get(i,"yearly")+.5:e.get(n,"item.grantedleaveType")=="da99772580491fd593a0a502b9c8890c"?i.summer=e.get(i,"summer")+.5:e.get(n,"item.grantedleaveType")=="354b1141d54c61eed37070d52688c81c"&&(i.public=e.get(i,"public")+.5)});break}})),e.isEmpty(V)||(k.week=e.get(V,"weekday_overtime_adjusted_hours",0),k.night=e.get(V,"night_work_adjusted_hours",0),k.holi=e.get(V,"holiday_regular_adjusted_hours",0),k.holiOver=e.get(V,"holiday_overtime_adjusted_hours",0),k.holiNight=e.get(V,"holiday_overtime_night_adjusted_hours",0));let Ee="";if(aa==!0){const s=e.get(t,"payslipAttendanceRecordSummary.overtime_pay_hours"),l=e.get(t,"prorated_calculation_day");ke-Ce>s?l&&(Ee=`${x.toLocaleString()}원 * 1.5배수 * ${ke-Ce}시간`):Ee=`(${(x*1.5*s).toLocaleString()}원 * ${x.toLocaleString()}원 * 1.5배수 * (12/365) * ${l}일)`}e.set(t,"leaveRecord",F),e.set(t,"remoteWorkRecord",Va),e.set(t,"attendanceRecord",Ga),e.set(t,"overtimeRecord",Qa),e.set(t,"expenseBills",za),e.isEmpty(e.get(t,"attendanceRecord",[]))||e.get(t,"attendanceRecord",[]).forEach(s=>{e.get(s,"attendance_status"),e.get(s,"attendance_status")==="lateArrival"||e.get(s,"attendance_status")==="regularAttendance"||e.get(s,"attendance_status")});const w=s=>Number.isInteger(s)?s.toString():s.toFixed(2),d=s=>Math.ceil(s);o.useEffect(()=>{const s=`${y}-${u}-10`;if(s){const l=S(s).add(1,"months");$(l.format("YYYY-MM-DD"));const p=parseInt(y),v=parseInt(u),n=[2024],D=[5,6,7,8,9,10];n.includes(p)&&D.includes(v)?ve(!0):ve(!1)}},[y,u]);const Za=async()=>{if(Y.current){const l=await fs(Y.current,{scale:2,backgroundColor:"#FFFFFF"}),p=l.toDataURL("image/jpg"),v=new js("p","mm","a4"),n=v.internal.pageSize.getWidth(),D=v.internal.pageSize.getHeight();let L=5,_=5;const de=n-L*2,A=D-_*2,z=v.getImageProperties(p),Q=de,W=z.height*Q/z.width,ne=Math.ceil(W/A);for(let O=0;O<ne;O++){O>0&&v.addPage();const fe=O*A*(l.height/W),T=document.createElement("canvas");T.width=l.width,T.height=A*(l.height/W);const G=T.getContext("2d");G.fillStyle="#FFFFFF",G.fillRect(0,0,T.width,T.height),G.drawImage(l,0,fe,l.width,T.height,0,0,T.width,T.height);const je=T.toDataURL("image/jpeg",1);v.addImage(je,"JPEG",L,_,Q,A)}const oe=`${y}년 ${u}월분_${e.get(t,"user.fullName")}님 급여명세서`;v.save(oe);const xe={title:`${y}년 ${u}월분 ${e.get(t,"user.fullName")}님 급여 명세서`,thisUser:e.get(t,"user"),document_id:e.get(t,"_id"),state:"approved"},{data:Ie,status:Fe}=await X.post("/API/documentLog/registerLog",xe)}},es=o.useCallback(({item:s,totalRemote:l,salaryDay:p,hideWeekNight:v})=>{if(!e.isEmpty(s)){const[n,D]=o.useState("");return o.useEffect(()=>{const L=e.get(s,"gross_salary.base_salary"),_=e.get(s,"gross_salary.hourly_late"),de=e.get(s,"gross_salary.meal_allowance"),A=e.get(s,"gross_salary.vehicle_maintenance_allowance"),z=e.get(s,"gross_salary.rnd_allowance"),Q=e.get(s,"gross_salary.babysitting_allowance"),W=e.get(s,"gross_salary.commuting_allowance"),ne=e.get(s,"gross_salary.personal_development_allowance"),oe=e.get(s,"gross_salary.work_support_allowance"),xe=e.get(s,"gross_salary.annual_leave_allowance",0),Ie=e.get(s,"deductions.national_pension"),Fe=e.get(s,"deductions.health_insurance"),O=e.get(s,"deductions.long_term_care_insurance"),fe=e.get(s,"deductions.employment_insurance"),T=e.get(s,"deductions.income_tax"),G=e.get(s,"deductions.local_income_tax"),je=e.get(s,"deductions.advance_payment"),na=e.get(s,"deductions.other_deductions"),We=e.get(s,"deductions.agricultural_special_tax"),Oe=e.get(s,"deductions.health_insurance_adjustment"),Me=e.get(s,"deductions.long_term_care_insurance_adjustment"),oa=e.get(s,"gross_salary.year_end_tax_adjustment"),ra=e.get(s,"gross_salary.withholding_tax_adjustment"),va=e.get(s,"gross_salary.severance_pay"),as=We+Oe+Me+ra+va+xe+oa;let ga=Ie+Fe+O+fe+T+G+We+Oe+Me+je+na,ss=e.get(s,"payslipAttendanceRecordSummary.holiday_regular_hours"),Ye=e.get(s,"payslipAttendanceRecordSummary.weekday_overtime_hours"),ts=e.get(s,"payslipAttendanceRecordSummary.night_work_hours"),is=e.get(s,"payslipAttendanceRecordSummary.holiday_regular_break_hours"),He=e.get(s,"payslipAttendanceRecordSummary.weekday_overtime_break_hours"),ls=e.get(s,"payslipAttendanceRecordSummary.night_work_break_hours"),cs=e.get(s,"payslipAttendanceRecordSummary.holiday_overtime_hours"),ds=e.get(s,"payslipAttendanceRecordSummary.holiday_overtime_break_hours"),ns=e.get(s,"payslipAttendanceRecordSummary.holiday_overtime_night_hours",0),os=e.get(s,"payslipAttendanceRecordSummary.holiday_overtime_night_break_hours",0),Ke=e.get(s,"payslipAttendanceRecordSummary.remote_work_allowance");e.get(s,"payslipAttendanceRecordSummary.remoteWorkLength");let qe=e.get(s,"payslipAttendanceRecordSummary.expense_claim"),Le=e.get(s,"payslipAttendanceRecordSummary.expenseLength");e.get(s,"payslipAttendanceRecordSummary.tardiness"),e.get(s,"payslipAttendanceRecordSummary.work_days");let rs=e.isEmpty(e.get(s,"social_security_number"))?"":e.get(s,"social_security_number").split("-")[0],vs=e.get(s,"payslipAttendanceRecordSummary.weekday_overtime_adjusted_hours",0)+e.get(s,"payslipAttendanceRecordSummary.holiday_overtime_adjusted_hours",0)+e.get(s,"payslipAttendanceRecordSummary.holiday_regular_adjusted_hours",0)+e.get(s,"payslipAttendanceRecordSummary.night_work_adjusted_hours",0);const J=e.get(s,"payslipAttendanceRecordSummary");let c={yearly:0,public:0,summer:0},C={week:0,night:0,holi:0,holiOver:0,holiNight:0};const ya=e.get(s,"leaveTypeArray"),gs=e.get(s,"gross_salary.overtime_pay_hours"),ha=e.get(s,"prorated_calculation_salary"),Ue=e.get(s,"gross_salary.unfaidLeaveSalary",0);let pa=e.get(s,"payslipAttendanceRecordSummary.unfaidLeave");const ma=e.get(s,"note");let Ve="";if(ha==!0){const j=e.get(s,"payslipAttendanceRecordSummary.overtime_pay_hours");let N=e.get(s,"prorated_calculation_day");N&&(N=w(e.get(s,"prorated_calculation_day"))),Ye-He>j?N&&(Ve=`(${Ye-He} * ${_.toLocaleString()}원 * 1.5배수)`):Ve=`(${(_*1.5*j).toLocaleString()}원 * ${_.toLocaleString()}원 * 1.5배수 * (12/365) * ${N}일)`}!e.isEmpty(F)&&!e.isEmpty(ya)&&(F.map(j=>{const N=e.get(j,"grandtedLeaveType"),B=[],b=[];ya.map(h=>{e.isEmpty(N)||N.map(fa=>{if(e.get(h,"_id")==fa&&!b.includes(e.get(h,"_id"))){const _s={type:fa,item:h};B.push(_s),b.push(e.get(h,"_id"))}})}),e.set(j,"thisType",B)}),F.map(j=>{const N=e.get(j,"leaveType");e.get(j,"leaveTypes");const B=e.get(j,"thisType"),b=e.get(j,"leave_days").length;switch(N){case"08837ddb96c10e1d671cb32abb1d9c80":B.map(h=>{e.get(h,"item.grantedleaveType")=="2fdefe0ced933153e866aada6c30c0f0"?c.yearly=e.get(c,"yearly")+1*b:e.get(h,"item.grantedleaveType")=="da99772580491fd593a0a502b9c8890c"?c.summer=e.get(c,"summer")+1*b:e.get(h,"item.grantedleaveType")=="354b1141d54c61eed37070d52688c81c"&&(c.public=e.get(c,"public")+1*b)});break;case"4cf3a26024ad7e79d191f5c8ad111ecc":B.map(h=>{e.get(h,"item.grantedleaveType")=="2fdefe0ced933153e866aada6c30c0f0"?c.yearly=e.get(c,"yearly")+.5:e.get(h,"item.grantedleaveType")=="da99772580491fd593a0a502b9c8890c"?c.summer=e.get(c,"summer")+.5:e.get(h,"item.grantedleaveType")=="354b1141d54c61eed37070d52688c81c"&&(c.public=e.get(c,"public")+.5)});break;case"3b7dd60060104dffc38e0c22a336157c":B.map(h=>{e.get(h,"item.grantedleaveType")=="2fdefe0ced933153e866aada6c30c0f0"?c.yearly=e.get(c,"yearly")+.25:e.get(h,"item.grantedleaveType")=="da99772580491fd593a0a502b9c8890c"?c.summer=e.get(c,"summer")+.25:e.get(h,"item.grantedleaveType")=="354b1141d54c61eed37070d52688c81c"&&(c.public=e.get(c,"public")+.25)});break;case"23d777aa78406d830af56709de83ef6e":break;case"1a556209f3592e3189ea9cf151ca9b9a":B.map(h=>{e.get(h,"item.grantedleaveType")=="2fdefe0ced933153e866aada6c30c0f0"?c.yearly=e.get(c,"yearly")+1*b:e.get(h,"item.grantedleaveType")=="da99772580491fd593a0a502b9c8890c"?c.summer=e.get(c,"summer")+1*b:e.get(h,"item.grantedleaveType")=="354b1141d54c61eed37070d52688c81c"&&(c.public=e.get(c,"public")+1*b)});break;case"cb66232ca771c7f7ae6e003a0bc65bd5":B.map(h=>{e.get(h,"item.grantedleaveType")=="2fdefe0ced933153e866aada6c30c0f0"?c.yearly=e.get(c,"yearly")+1*b:e.get(h,"item.grantedleaveType")=="da99772580491fd593a0a502b9c8890c"?c.summer=e.get(c,"summer")+1*b:e.get(h,"item.grantedleaveType")=="354b1141d54c61eed37070d52688c81c"&&(c.public=e.get(c,"public")+1*b)});break;default:B.map(h=>{e.get(h,"item.grantedleaveType")=="2fdefe0ced933153e866aada6c30c0f0"?c.yearly=e.get(c,"yearly")+.5:e.get(h,"item.grantedleaveType")=="da99772580491fd593a0a502b9c8890c"?c.summer=e.get(c,"summer")+.5:e.get(h,"item.grantedleaveType")=="354b1141d54c61eed37070d52688c81c"&&(c.public=e.get(c,"public")+.5)});break}})),e.isEmpty(J)||(C.week=e.get(J,"weekday_overtime_adjusted_hours",0),C.night=e.get(J,"night_work_adjusted_hours",0),C.holi=e.get(J,"holiday_regular_adjusted_hours",0),C.holiOver=e.get(J,"holiday_overtime_adjusted_hours",0),C.holiNight=e.get(J,"holiday_overtime_night_adjusted_hours",0));const ys=e.get(s,"gross_salary.overtime_pay_hours",0),ua=e.get(s,"gross_salary.night_work_allowance",0),_a=e.get(s,"gross_salary.holiday_allowance",0),xa=e.get(s,"gross_salary.holiday_overtime_allowance",0),ze=parseFloat(e.get(s,"gross_salary.other_allowances")),hs=parseFloat(e.get(s,"gross_salary.additional_bonus")),ps=ys+ua+_a+xa,ms=L+oe+ne+ps+qe+Ke+hs+de+A+z+Q+W+ze-Ue,us=`
                    <div class="payrollDetail">
                        <h3 class="payrollDetailTitle">
                            ${y}년 ${u}월분 급여 명세서
                        </h3>

                        <div class="inFlex">
                             <div class="payrollInfo">
                                <div class="leftName">
                                    회사명 :
                                </div>
                                <div class="rightInfos">
                                    ${e.get(s,"comp_data.0.departmentName")} 
                                </div>
                            </div>

                             <div class="payrollInfo">
                                <div class="leftName">
                                    성명 :
                                </div>
                                <div class="rightInfos">
                                    ${e.get(s,"user.fullName")}
                                </div>
                            </div>

                             <div class="payrollInfo">
                                <div class="leftName">
                                    생년월일 (사번) :
                                </div>
                                <div class="rightInfos">
                                    ${rs} (${e.get(s,"user.ref_employee_id")})
                                </div>
                            </div>

                             <div class="payrollInfo">
                                <div class="leftName">
                                    4대보험 가입일 :
                                </div>
                                <div class="rightInfos">
                                    ${S(e.get(s,"user.insure_acquisition_date")).format("YYYY-MM-DD")}
                                </div>
                            </div>

                             <div class="payrollInfo">
                                <div class="leftName">
                                    지급일 :
                                </div>
                                <div class="rightInfos">
                                    ${p}
                                </div>
                            </div>
                        </div>
                       


                        <div class="rightPos">
                           ${e.get(s,"comp_data.0.departmentName")} 
                        </div>

                        <div class="rightPos margin_20">
                            대표이사  ${e.get(s,"comp_data.0.RepresentativeName")}
                            <div class="seal">
                                <img src="/${e.get(s,"comp_data.0.corporateSealData.filePath")}"/>
                            </div>
                        </div>

                        귀하의 노고에 감사드립니다.
                    </div>


                    <div class="resultPayBox">
                        <div class="resultPayText">
                            공제후 실 수령액 계 (공제액 계)
                        </div>
                        <div class="bottomRe">
                              <div class="resultPay">
                                ${d(e.get(s,"net_pay")).toLocaleString()}원
                            </div>
                            <div class="resultPaySmall">
                                (${d(ga).toLocaleString()}원)
                            </div>
                        </div>
                      

                    </div>

                    <div class="flexWrapBox">
                        <div class="leftBox">
                            <div class="payDetailList">
                                <div class="detailSector">
                                    지급
                                </div>

                                <div class="inflexWrap">
                                    <div class="inflexLeft">

                                        <div class="payDetailListBox">
                                            <div class="topContentList">
                                                <div class="leftTitle">
                                                    기본급
                                                </div>
                                                <div class="rightPay">
                                                    ${e.get(s,"gross_salary.base_salary")?parseFloat(e.get(s,"gross_salary.base_salary")).toLocaleString():0}원
                                                </div>
                                            </div>
                                            <div class="bottomInfo">
                                            └ 근로계약서 상에 표기된 기본급 반영
                                            </div>
                                        </div>

                                        <div class="payDetailListBox">
                                            <div class="topContentList">
                                                <div class="leftTitle">
                                                    상여
                                                </div>
                                                <div class="rightPay">
                                                    ${Number(e.get(s,"gross_salary.additional_bonus",0)).toLocaleString()}원
                                                </div>
                                            </div>
                                        </div>

                                        <div class="payDetailListBox">
                                            <div class="topContentList">
                                                <div class="leftTitle">
                                                    식대
                                                </div>
                                                <div class="rightPay">
                                                    ${de?parseFloat(de).toLocaleString():0}원
                                                </div>
                                            </div>
                                        </div>

                                        <div class="payDetailListBox">
                                            <div class="topContentList">
                                                <div class="leftTitle">
                                                    자가운전보조금
                                                </div>
                                                <div class="rightPay">
                                                    ${A?parseFloat(A).toLocaleString():0}원
                                                </div>
                                            </div>
                                        </div>


                                        <div class="payDetailListBox">
                                            <div class="topContentList">
                                                <div class="leftTitle">
                                                    연구보조비
                                                </div>
                                                <div class="rightPay">
                                                    ${z?parseFloat(z).toLocaleString():0}원
                                                </div>
                                            </div>
                                        </div>

                                        <div class="payDetailListBox">
                                            <div class="topContentList">
                                                <div class="leftTitle">
                                                    육아수당
                                                </div>
                                                <div class="rightPay">
                                                    ${Q?parseFloat(Q).toLocaleString():0}원
                                                </div>
                                            </div>
                                        </div>

                                        <div class="payDetailListBox">
                                            <div class="topContentList">
                                                <div class="leftTitle">
                                                    자기계발비
                                                </div>
                                                <div class="rightPay">
                                                    ${ne?parseFloat(ne).toLocaleString():0}원
                                                </div>
                                            </div>
                                        </div>

                                        <div class="payDetailListBox">
                                            <div class="topContentList">
                                                <div class="leftTitle">
                                                    통근교통비
                                                </div>
                                                <div class="rightPay">
                                                    ${W?parseFloat(W).toLocaleString():0}원
                                                </div>
                                            </div>
                                        </div>

                                        <div class="payDetailListBox">
                                            <div class="topContentList">
                                                <div className="leftTitle">
                                                    업무지원비
                                                </div>
                                                <div class="rightPay">
                                                ${oe?parseFloat(oe).toLocaleString():0}원
                                                </div>
                                            </div>
                                        </div>

                                        <div class="payDetailListBox">
                                            <div class="topContentList">
                                                <div class="leftTitle">
                                                    연장근로수당
                                                </div>
                                                <div class="rightPay">
                                                    ${gs.toLocaleString()}원
                                                </div>
                                            </div>
                                            <div class="bottomInfo">
                                            └ ${ha?Ve:(_?_.toLocaleString():0)+"원 * 1.5배수 * "+w(Ye-He)+"시간"}
                                            </div>
                                        </div>

                                        <div class="payDetailListBox">
                                            <div class="topContentList">
                                                <div class="leftTitle">
                                                    야간근로수당
                                                </div>
                                                <div class="rightPay">
                                                    ${ua.toLocaleString()}원
                                                </div>
                                            </div>
                                            <div class="bottomInfo">
                                                └ ${_?_.toLocaleString():0}원 * ${v?"1.5":"2"}배수 * ${w(ts-ls)}시간
                                            </div>
                                        </div>

                                        <div class="payDetailListBox">
                                            <div class="topContentList">
                                                <div class="leftTitle">
                                                    휴일근로수당
                                                </div>
                                                <div class="rightPay">
                                                    ${_a.toLocaleString()}원
                                                </div>
                                            </div>
                                            <div class="bottomInfo">
                                                └ ${_?_.toLocaleString():0}원 * 1.5배수 * ${w(ss-is)}시간
                                            </div>
                                        </div>


                                        <div class="payDetailListBox">
                                            <div class="topContentList">
                                                <div class="leftTitle">
                                                    휴일연장근로수당
                                                </div>
                                                <div class="rightPay">
                                                    ${xa.toLocaleString()}원
                                                </div>
                                            </div>
                                            <div class="bottomInfo">
                                                └ ${_?_.toLocaleString():0}원 * 2배수 * ${w(cs-ds)}시간
                                            </div>
                                        </div>

                                        ${v?`
                                            <div class="payDetailListBox">
                                                <div class="topContentList">
                                                    <div class="leftTitle">
                                                        출장, 파견 수당
                                                    </div>
                                                    <div class="rightPay">
                                                        ${Ke.toLocaleString()}원
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="payDetailListBox">
                                                <div class="topContentList">
                                                    <div class="leftTitle">
                                                        기타수당
                                                    </div>
                                                    <div class="rightPay">
                                                        ${ze.toLocaleString()}원
                                                    </div>
                                                </div>
                                            </div>
                                            

                                            <div class="payDetailListBox">
                                                <div class="topContentList">
                                                    <div class="leftTitle">
                                                        지출품의
                                                    </div>
                                                    <div class="rightPay">
                                                        ${qe.toLocaleString()}원 ${Le!=0?"("+Le+"건)":""}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            

                                            
                                            `:`
                                             <div class="payDetailListBox">
                                                <div class="topContentList">
                                                    <div class="leftTitle">
                                                        휴일야간근로수당
                                                    </div>
                                                    <div class="rightPay">
                                                        ${Ae.toLocaleString()}원
                                                    </div>
                                                </div>
                                                <div class="bottomInfo">
                                                    └ ${_?_.toLocaleString():0}원 * 2.5배수 * ${w(ns-os)}시간
                                                </div>
                                            </div>

                                             <div class="payDetailListBox">
                                                <div class="topContentList">
                                                    <div class="leftTitle">
                                                        출장, 파견 수당
                                                    </div>
                                                    <div class="rightPay">
                                                        ${Ke.toLocaleString()}원
                                                    </div>
                                                </div>
                                            </div>

                                            
                                            `}

                                       
                                       
                                    </div>

                                    <div class="inflexRight">

                                        ${v?"":`
                                                <div class="payDetailListBox">
                                                    <div class="topContentList">
                                                        <div class="leftTitle">
                                                            기타수당
                                                        </div>
                                                        <div class="rightPay">
                                                            ${ze.toLocaleString()}원
                                                        </div>
                                                    </div>
                                                </div>
                                                

                                                <div class="payDetailListBox">
                                                    <div class="topContentList">
                                                        <div class="leftTitle">
                                                            지출품의
                                                        </div>
                                                        <div class="rightPay">
                                                            ${qe.toLocaleString()}원 ${Le!=0?"("+Le+"건)":""}
                                                        </div>
                                                    </div>
                                                </div>
                                            
                                            `}


                                        <div class="payDetailListBox">
                                            <div class="topContentList">
                                                <div class="leftTitle">
                                                    무급휴가 차감
                                                </div>
                                                <div class="rightPay">
                                                    ${(Ue!=0?Ue*-1:0).toLocaleString()}원 ${pa!=0?"( "+pa+"시간 )":""}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="inResultPayBox">
                                            <div class="resultPayTitle">
                                                지급액 계
                                            </div>
                                            <div class="inResultPay">
                                                ${d(ms).toLocaleString()}원
                                            </div>
                                        </div>
                                    </div>
                                 </div>
                            </div>
                        </div>


                        <div class="rightBox">
                            <div class="payDataFlex">
                                <div class="payDetailList">
                                    <div class="detailSector">
                                        공제
                                    </div>

                                    <div class="payDetailListBox">
                                        <div class="topContentList">
                                            <div class="leftTitle">
                                                국민연금
                                            </div>
                                            <div class="rightPay">
                                                ${d(Ie).toLocaleString()}원
                                            </div>
                                        </div>
                                    </div>

                                    <div class="payDetailListBox">
                                        <div class="topContentList">
                                            <div class="leftTitle">
                                                건강보험
                                            </div>
                                            <div class="rightPay">
                                                ${d(Fe).toLocaleString()}원
                                            </div>
                                        </div>
                                    </div>

                                    <div class="payDetailListBox">
                                        <div class="topContentList">
                                            <div class="leftTitle">
                                                장기요양보험
                                            </div>
                                            <div class="rightPay">
                                                ${d(O).toLocaleString()}원
                                            </div>
                                        </div>
                                    </div>

                                    <div class="payDetailListBox">
                                        <div class="topContentList">
                                            <div class="leftTitle">
                                                고용보험
                                            </div>
                                            <div class="rightPay">
                                            ${d(fe).toLocaleString()}원
                                            </div>
                                        </div>
                                    </div>

                                    <div class="payDetailListBox">
                                        <div class="topContentList">
                                            <div class="leftTitle">
                                                소득세
                                            </div>
                                            <div class="rightPay">
                                            ${d(T).toLocaleString()}원
                                            </div>
                                        </div>
                                    </div>

                                    <div class="payDetailListBox">
                                        <div class="topContentList">
                                            <div class="leftTitle">
                                                지방소득세
                                            </div>
                                            <div class="rightPay">
                                            ${d(G).toLocaleString()}원
                                            </div>
                                        </div>
                                    </div>

                                    <div class="payDetailListBox">
                                        <div class="topContentList">
                                            <div class="leftTitle">
                                                선지급액
                                            </div>
                                            <div class="rightPay">
                                            ${d(je).toLocaleString()}원
                                            </div>
                                        </div>
                                    </div>

                                    <div class="payDetailListBox">
                                        <div class="topContentList">
                                            <div class="leftTitle">
                                                기타 공제액
                                            </div>
                                            <div class="rightPay">
                                            ${d(na).toLocaleString()}원
                                            </div>
                                        </div>
                                    </div>

                                    <div class="inResultPayBox">
                                        <div class="resultPayTitle">
                                            공제액 계
                                        </div>
                                        <div class="inResultPay">
                                            ${d(ga).toLocaleString()}원
                                        </div>
                                    </div>
                                </div>

                                <div class="payDetailList notMargin">
                                    <div class="detailSector">
                                       연말/중도퇴직 정산
                                    </div>

                                    <div class="payDetailListBox">
                                        <div class="topContentList">
                                            <div class="leftTitle">
                                                농특세 정산
                                            </div>
                                            <div class="rightPay">
                                                ${d(We).toLocaleString()}원
                                            </div>
                                        </div>
                                    </div>

                                    <div class="payDetailListBox">
                                        <div class="topContentList">
                                            <div class="leftTitle">
                                                건강보험 정산
                                            </div>
                                            <div class="rightPay">
                                                ${d(Oe).toLocaleString()}원
                                            </div>
                                        </div>
                                    </div>

                                    <div class="payDetailListBox">
                                        <div class="topContentList">
                                            <div class="leftTitle">
                                                장기요양 정산
                                            </div>
                                            <div class="rightPay">
                                                ${d(Me).toLocaleString()}원
                                            </div>
                                        </div>
                                    </div>

                                    <div class="payDetailListBox">
                                        <div class="topContentList">
                                            <div class="leftTitle">
                                                (지방)소득세 정산
                                            </div>
                                            <div class="rightPay">
                                            ${d(ra).toLocaleString()}원
                                            </div>
                                        </div>
                                    </div>

                                    <div class="payDetailListBox">
                                        <div class="topContentList">
                                            <div class="leftTitle">
                                                퇴직(연)금
                                            </div>
                                            <div class="rightPay">
                                            ${d(va).toLocaleString()}원
                                            </div>
                                        </div>
                                    </div>

                                    <div class="payDetailListBox">
                                        <div class="topContentList">
                                            <div class="leftTitle">
                                               연차환급금 정산
                                            </div>
                                            <div class="rightPay">
                                            ${d(xe).toLocaleString()}원
                                            </div>
                                        </div>
                                    </div>

                                    <div class="payDetailListBox">
                                        <div class="topContentList">
                                            <div class="leftTitle">
                                               연말정산
                                            </div>
                                            <div class="rightPay">
                                            ${d(oa).toLocaleString()}원
                                            </div>
                                        </div>
                                    </div>

                                
                                    <div class="inResultPayBox">
                                        <div class="resultPayTitle">
                                            정산액 계
                                        </div>
                                        <div class="inResultPay">
                                            ${d(as).toLocaleString()}원
                                        </div>
                                    </div>
                                </div>
                            
                            </div>




                            <div class="payDetailList">
                                <div class="detailSector">
                                    출퇴근 기록
                                </div>

                                <div class="payDetailListBox">
                                    <div class="topContentList">
                                        <div class="leftTitle widesSet">
                                            추가근무
                                        </div>
                                        <div class="rightPay rightSet rightOri">
                                            ${vs}시간 <span class="smalls">(연장 ${e.get(C,"week")}시간, 야간 ${e.get(C,"night")}시간, 휴일 ${e.get(C,"holi")}시간, 휴일연장 ${e.get(C,"holiOver")}시간, 휴일야간 ${e.get(C,"holiNight")}시간)  </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="payDetailListBox">
                                    <div class="topContentList">
                                        <div class="leftTitle widesSet">
                                            휴가
                                        </div>
                                        <div class="rightPay rightSet rightOri">
                                             ${e.get(c,"yearly")+e.get(c,"public")+e.get(c,"summer")}일  <span class="smalls">(연차 ${e.get(c,"yearly")}일, 공가 ${e.get(c,"public")}일, 여름휴가 ${e.get(c,"summer")}일)</span>
                                        </div>
                                    </div>
                                </div>

                               <div class="payDetailListBox">
                                <div class="topContentList widesSet">
                                    <div class="leftTitle">
                                    원격근무
                                    </div>
                                    <div class="rightPay rightSet rightOri">
                                    ${Object.values(l).reduce((j,N)=>j+N.length,0)}회
                                    <span class="smalls">
                                        (${Object.values(l).map((j,N,B)=>`${j.title} ${j.length}회${N<B.length-1?",":""}`).join(" ")})
                                    </span>
                                    </div>
                                </div>
                                </div>

                                <div class="payDetailListBox">
                                    <div class="topContentList widesSet">
                                        <div class="leftTitle">
                                            비고
                                        </div>
                                        <div class="rightPay rightSet leftTex rightOri">
                                            ${e.isEmpty(ma)?"-":ma}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    `;D(us)},[s,l]),a.jsx("div",{className:"hideButton",children:a.jsx("div",{ref:Y,style:{width:"210mm",padding:"5mm",margin:"20px auto",border:"0px solid #ddd"},dangerouslySetInnerHTML:{__html:n}})})}},[t,ae,R]);return a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"payrollDetail",children:[a.jsx("h3",{className:"payrollDetailTitle",children:`${y}년 ${u}월분 급여 명세서`}),a.jsxs("div",{className:"payrollInfo",children:[a.jsx("div",{className:"leftName",children:"회사명 :"}),a.jsx("div",{className:"rightInfos",children:e.get(t,"comp_data.0.departmentName")})]}),a.jsxs("div",{className:"payrollInfo",children:[a.jsx("div",{className:"leftName",children:"성명 :"}),a.jsx("div",{className:"rightInfos",children:e.get(t,"user.fullName")})]}),a.jsxs("div",{className:"payrollInfo",children:[a.jsx("div",{className:"leftName",children:"생년월일 (사번) :"}),a.jsxs("div",{className:"rightInfos",children:[Oa," (",e.get(t,"user.ref_employee_id"),")"]})]}),a.jsxs("div",{className:"payrollInfo",children:[a.jsx("div",{className:"leftName",children:"4대보험 가입일 :"}),a.jsx("div",{className:"rightInfos",children:S(e.get(t,"user.insure_acquisition_date")).format("YYYY-MM-DD")})]}),a.jsxs("div",{className:"payrollInfo",children:[a.jsx("div",{className:"leftName",children:"지급일 :"}),a.jsx("div",{className:"rightInfos",children:ae})]}),a.jsx("div",{className:"rightPos",children:e.get(t,"comp_data.0.departmentName")}),a.jsxs("div",{className:"rightPos margin_20",children:["대표이사 ",e.get(t,"comp_data.0.RepresentativeName"),a.jsx("div",{className:"seal",children:a.jsx("img",{src:e.get(t,"comp_data.0.corporateSealData.filePath")})})]}),"귀하의 노고에 감사드립니다."]}),a.jsxs("div",{className:"resultPayBox",children:[a.jsx("div",{className:"resultPayText",children:"공제후 실 수령액 계 (공제액)"}),a.jsxs("div",{className:"resultPay",children:[d(e.get(t,"net_pay")).toLocaleString(),"원"]}),a.jsxs("div",{className:"resultPaySmall",children:["(",d(_e).toLocaleString(),"원)"]})]}),a.jsxs("div",{className:"payDetailList",children:[a.jsx("div",{className:"detailSector",children:"지급"}),a.jsxs("div",{className:"payDetailListBox",children:[a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"기본급"}),a.jsxs("div",{className:"rightPay",children:[e.get(t,"gross_salary.base_salary")?parseFloat(e.get(t,"gross_salary.base_salary")).toLocaleString():0,"원"]})]}),a.jsx("div",{className:"bottomInfo",children:"└ 근로계약서 상에 표기된 기본급 반영"})]}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"상여"}),a.jsxs("div",{className:"rightPay",children:[Number(e.get(t,"gross_salary.additional_bonus",0)).toLocaleString(),"원"]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"식대"}),a.jsxs("div",{className:"rightPay",children:[H?parseFloat(H).toLocaleString():0,"원"]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"자가운전보조금"}),a.jsxs("div",{className:"rightPay",children:[se?parseFloat(se).toLocaleString():0,"원"]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"연구보조비"}),a.jsxs("div",{className:"rightPay",children:[K?parseFloat(K).toLocaleString():0,"원"]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"육아수당"}),a.jsxs("div",{className:"rightPay",children:[te?parseFloat(te).toLocaleString():0,"원"]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"자기계발비"}),a.jsxs("div",{className:"rightPay",children:[ie?parseFloat(ie).toLocaleString():0,"원"]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"통근교통비"}),a.jsxs("div",{className:"rightPay",children:[q?parseFloat(q).toLocaleString():0,"원"]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"업무지원비"}),a.jsxs("div",{className:"rightPay",children:[I?parseFloat(I).toLocaleString():0,"원"]})]})}),a.jsxs("div",{className:"payDetailListBox",children:[a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"연장근로수당"}),a.jsxs("div",{className:"rightPay",children:[Ma.toLocaleString(),"원"]})]}),a.jsxs("div",{className:"bottomInfo",children:["└ ",aa?Ee:(x?x.toLocaleString():0)+"원 * 1.5배수 * "+w(ke-Ce)+"시간"]})]}),a.jsxs("div",{className:"payDetailListBox",children:[a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"야간근로수당"}),a.jsxs("div",{className:"rightPay",children:[sa.toLocaleString(),"원"]})]}),a.jsxs("div",{className:"bottomInfo",children:["└ ",x?x.toLocaleString():0,"원 * ",E?"1.5":"2","배수 * ",w(Ca-Aa),"시간"]})]}),a.jsxs("div",{className:"payDetailListBox",children:[a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"휴일근로수당"}),a.jsxs("div",{className:"rightPay",children:[ta.toLocaleString(),"원"]})]}),a.jsxs("div",{className:"bottomInfo",children:["└ ",x?x.toLocaleString():0,"원 * 1.5배수 * ",w(ka-Ra),"시간"]})]}),a.jsxs("div",{className:"payDetailListBox",children:[a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"휴일연장근로수당"}),a.jsxs("div",{className:"rightPay",children:[ia.toLocaleString(),"원"]})]}),a.jsxs("div",{className:"bottomInfo",children:["└ ",x?x.toLocaleString():0,"원 * 2배수 * ",w(Ea-Ia),"시간"]})]}),!E&&a.jsxs("div",{className:"payDetailListBox",children:[a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"휴일야간근로수당"}),a.jsxs("div",{className:"rightPay",children:[Ae.toLocaleString(),"원"]})]}),a.jsxs("div",{className:"bottomInfo",children:["└ ",x?x.toLocaleString():0,"원 * 2.5배수 * ",w(Fa-Wa),"시간"]})]}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"출장, 파견 수당"}),a.jsxs("div",{className:"rightPay",children:[Xe.toLocaleString(),"원"]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"기타수당"}),a.jsxs("div",{className:"rightPay",children:[la.toLocaleString(),"원"]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"지출품의"}),a.jsxs("div",{className:"rightPay",children:[Ze.toLocaleString(),"원  ",ea!=0?a.jsxs(a.Fragment,{children:["(",ea,"건)"]}):""]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"무급휴가 차감"}),a.jsxs("div",{className:"rightPay",children:[(Re!=0?Re*-1:0).toLocaleString(),"원 ",Je!=0?a.jsxs(a.Fragment,{children:["(",Je,"시간)"]}):""]})]})}),a.jsxs("div",{className:"inResultPayBox",children:[a.jsx("div",{className:"resultPayTitle",children:"지급액 계"}),a.jsxs("div",{className:"inResultPay",children:[d(qa).toLocaleString(),"원"]})]})]}),a.jsxs("div",{className:"payDetailList",children:[a.jsx("div",{className:"detailSector",children:"공제"}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"국민연금"}),a.jsxs("div",{className:"rightPay",children:[d(Be).toLocaleString(),"원"]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"건강보험"}),a.jsxs("div",{className:"rightPay",children:[d(ye).toLocaleString(),"원"]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"장기요양보험"}),a.jsxs("div",{className:"rightPay",children:[d(he).toLocaleString(),"원"]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"고용보험"}),a.jsxs("div",{className:"rightPay",children:[d(le).toLocaleString(),"원"]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"소득세"}),a.jsxs("div",{className:"rightPay",children:[d(pe).toLocaleString(),"원"]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"지방소득세"}),a.jsxs("div",{className:"rightPay",children:[d(U).toLocaleString(),"원"]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"선지급액"}),a.jsxs("div",{className:"rightPay",children:[d(me).toLocaleString(),"원"]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"기타 공제액"}),a.jsxs("div",{className:"rightPay",children:[d(ue).toLocaleString(),"원"]})]})}),a.jsxs("div",{className:"inResultPayBox",children:[a.jsx("div",{className:"resultPayTitle",children:"공제액 계"}),a.jsxs("div",{className:"inResultPay",children:[d(_e).toLocaleString(),"원"]})]})]}),a.jsxs("div",{className:"payDetailList",children:[a.jsx("div",{className:"detailSector",children:"연말/중도퇴직 정산"}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"농특세 정산"}),a.jsxs("div",{className:"rightPay",children:[d(ce).toLocaleString(),"원"]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"건강보험 정산"}),a.jsxs("div",{className:"rightPay",children:[d(g).toLocaleString(),"원"]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"장기요양 정산"}),a.jsxs("div",{className:"rightPay",children:[d(r).toLocaleString(),"원"]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"(지방)소득세 정산"}),a.jsxs("div",{className:"rightPay",children:[d(f).toLocaleString(),"원"]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"연차환급금 정산"}),a.jsxs("div",{className:"rightPay",children:[d(De).toLocaleString(),"원"]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"퇴직(연)금 정산"}),a.jsxs("div",{className:"rightPay",children:[d(P).toLocaleString(),"원"]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"연말정산"}),a.jsxs("div",{className:"rightPay",children:[d(m).toLocaleString(),"원"]})]})}),a.jsxs("div",{className:"inResultPayBox",children:[a.jsx("div",{className:"resultPayTitle",children:"정산액 계"}),a.jsxs("div",{className:"inResultPay",children:[d($e).toLocaleString(),"원"]})]})]}),a.jsxs("div",{className:"payDetailList",children:[a.jsx("div",{className:"detailSector",children:"출퇴근 기록"}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"추가근무"}),a.jsxs("div",{className:"rightPay",children:[Ua,"시간 ",a.jsxs("span",{className:"smalls",children:["(연장 ",e.get(k,"week"),"시간, 야간 ",e.get(k,"night"),"시간, 휴일 ",e.get(k,"holi"),"시간, 휴일연장 ",e.get(k,"holiOver"),"시간, 휴일야간 ",e.get(k,"holiNight"),"시간)"]})]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"휴가"}),a.jsxs("div",{className:"rightPay",children:[e.get(i,"yearly")+e.get(i,"public")+e.get(i,"summer"),"일 ",a.jsxs("span",{className:"smalls",children:[" (연차 ",e.get(i,"yearly"),"일, 공가 ",e.get(i,"public"),"일, 여름휴가 ",e.get(i,"summer"),"일)"]})]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"원격근무"}),a.jsxs("div",{className:"rightPay",children:[Object.values(R).reduce((s,l)=>s+l.length,0),"회 ",a.jsxs("span",{className:"smalls",children:["(",Object.values(R).map(s=>`${s.title} ${s.length}회`).join(", "),")"]})]})]})}),a.jsx("div",{className:"payDetailListBox",children:a.jsxs("div",{className:"topContentList",children:[a.jsx("div",{className:"leftTitle",children:"비고"}),a.jsx("div",{className:"rightPay leftTex",children:e.isEmpty(ca)?"-":ca})]})})]}),a.jsxs("div",{className:"applyRemoteWorkButton payrollDownButton",onClick:()=>{Za()},children:[a.jsx("div",{className:"leftImage",children:a.jsx(re,{src:"/web/img/down_icons.svg",alt:"다음"})}),a.jsx("div",{className:"rightTitle",children:"급여명세서 다운로드"})]}),a.jsx(es,{item:t,totalRemote:R,salaryDay:ae,hideWeekNight:E})]})},[ee,Z,Se]);return o.useEffect(()=>{Pa(Ne)},[Ne]),o.useEffect(()=>{e.isEmpty(M)||(e.isEmpty(e.get(M,"privateKey.0"))?Pe(!1):Pe(!0))},[M]),o.useEffect(()=>{Ge()},[Z,ee]),o.useEffect(()=>{be||Ge()},[be,Ne]),a.jsx(a.Fragment,{children:Ta&&a.jsx(a.Fragment,{children:a.jsx("div",{className:"payroll",children:a.jsx("div",{className:"inContent",children:be?a.jsx(wa,{userData:M}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"translateButtonsBox",children:[a.jsx("div",{className:"leftTitles",children:"급여명세서"}),a.jsx("div",{className:"rightButtons",children:a.jsx("div",{className:"translateButtons",children:a.jsx(Qe,{to:e.get(M,"employment_status")=="quit"?"/dashboardQuitter":"/dashboard",className:"meslinks",children:a.jsxs("div",{className:"prevButton",children:[a.jsx("div",{className:"imgBox",children:a.jsx(re,{src:"/web/img/left_button.svg",alt:"이전"})}),a.jsx("div",{className:"rightTitle",children:"이전"})]})})})})]}),a.jsxs("div",{className:"remoteBox",children:[a.jsxs("div",{className:"payrollTopBox",children:[a.jsxs("div",{className:"dateSelectArrow",children:[a.jsx("div",{className:"nameSelect",children:a.jsx("select",{className:"custom_select_3",value:Z,onChange:Da,children:Array.from({length:S().year()-2024+2},(t,y)=>2024+y).map(t=>a.jsxs("option",{value:t,children:[t,"년"]},`header_${t}년`))})}),a.jsx("div",{className:"nameSelect narrow",children:a.jsx("select",{className:"custom_select_3",value:ee,onChange:Ba,children:Array.from({length:12},(t,y)=>(y+1).toString().padStart(2,"0")).map(t=>a.jsxs("option",{value:t,children:[t,"월"]},`payroll_month_${t}`))})})]}),a.jsx("button",{children:a.jsx(Qe,{to:"/payroll/qna",children:a.jsx("span",{children:"Q&A"})})})]}),e.isEmpty(Se)?a.jsx("div",{className:"payrollDetail",children:"당월 급여명세서가 없습니다."}):a.jsx($a,{item:Se,currentYear:Z,currentMonth:ee})]})]})})})})})}export{Rs as default};
