const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/customPopUp-1j2cuYYo.js","assets/index-ak5BsCze.js","assets/vendor-react-DLmlTesg.js","assets/vendor-pdf-D5Eab7jE.js","assets/index-D3sbFfH5.css","assets/customDateCalendar-DqCZpPi7.js","assets/index-jnRmlWET.js","assets/isNativeReflectConstruct-XGLLvWSz.js","assets/createClass-BeTC7LXt.js","assets/toPropertyKey-Dg8hKEVS.js","assets/defineProperty-BKLqfx38.js","assets/index-8t4SYTBK.css","assets/moment-B-YVwB4U.js"])))=>i.map(i=>d[i]);
import{_ as I}from"./vendor-pdf-D5Eab7jE.js";import{u as Y,l as t,j as e,I as N,a as T,L as y,b as E}from"./index-ak5BsCze.js";import{h as G,b as a,L as X,R as q}from"./vendor-react-DLmlTesg.js";import{V as J,m as K}from"./index-BNUiajTt.js";import{h as Q}from"./moment-B-YVwB4U.js";import"./extends-CF3RwP-h.js";import"./objectWithoutPropertiesLoose-Dsqj8S3w.js";import"./index-Vcq4gwWv.js";const Z=q.lazy(()=>I(()=>import("./customPopUp-1j2cuYYo.js"),__vite__mapDeps([0,1,2,3,4])));q.lazy(()=>I(()=>import("./customDateCalendar-DqCZpPi7.js"),__vite__mapDeps([5,3,1,2,4,6,7,8,9,10,11,12])));function pe(){const{id:p=""}=G(),{register:m,handleSubmit:$,formState:{errors:x},setValue:d,watch:R}=Y(),[_,ee]=a.useState(`
    <div class="templateBox">
    
        <div class="templateTitle text-flex">
            <h1>
                개인정보 파기요청서
            </h1>
            <div class="serial">
                $document_serial
            </div>
        </div>


        <div class="templateSection">
                <h2 class="sectionTitle required">
                개인정보 파기요청 내용
                </h2>
                <div class="sectionContent greyBox">
                        $DescriptionrequestReason
                </div>
        </div>


        <div class="templateSection">
            <h2 class="sectionTitle required relativeTitle">
                전자서명
            <span class="verifiedTime">
                $verifiedTime
            </span>
            </h2>

        <div class="sectionInfo">
            <div class="infoInBox">
                본 전자서명을 포함한 전자문서는 문서로서의 법적 효력을 가지고 있습니다.
                <br/>
                문서의 형태가 전자적으로 되어 있다는 이유로 효력이 부인되지 않습니다.
            </div>

            <div class="inCheck">
                <div class="leftBox">
                    전자문서 및 전자거래기본법 제4조 제1항
                </div>

                <div class="rightBox">
                    <input type="checkbox" checked = "true"/>
                    <p>내용확인함</p>
                </div>
            </div>
        </div>


        <div class="sectionInfo">
                <div class="infoInBox reds">
                    아래 칸 가이드에 맞춰서 정자로 자기 이름을 작성해주세요.
                    불명확하게 기재 된 경우 승인거부 될 수 있습니다.
                </div>

                <div class="sectionContent greyBox">
                    $autimaticSign
            </div>
            
            </div>
        
            <div class="sectionInfo">
                <div class="infoInBox reds">
                    아래 칸에 서명을 해주세요.  이름을 쓰셔도 되고 싸인을 하셔도 됩니다.
                </div>

                <div class="sectionContent greyBox">
                    $autimaticStamp
                </div>
            </div>
        </div>


    </div>
    `),[P,v]=a.useState(!1),[g,B]=a.useState(!1),[r,C]=a.useState({}),[b,A]=a.useState({}),[L,w]=a.useState({}),[M,k]=a.useState(!1),[te,se]=a.useState(),[h,H]=a.useState(""),[f,F]=a.useState({}),[j,O]=a.useState({}),[ie,ae]=a.useState(!1),D=R("DescriptionrequestReason"),W=async({id:n})=>{try{const{data:s}=await T.get("/API/personalInformationDestructionRequest/get",{params:{id:n}});if(t.isEmpty(t.get(s,"result"))||C(t.get(s,"result")),t.isEmpty(t.get(s,"org_data"))||w(t.get(s,"org_data")),!t.isEmpty(t.get(s,"comp_data"))&&!t.isEmpty(t.get(s,"user"))){let c=t.cloneDeep(t.get(s,"user"));t.set(c,"companyPlace",t.get(s,"comp_data")),A(c)}t.isEmpty(t.get(s,"sign_data"))||F(t.get(s,"sign_data")),t.isEmpty(t.get(s,"stamp_data"))||O(t.get(s,"stamp_data"))}catch(s){console.log(s)}},V=async n=>{try{const{id:s,status:c,DescriptionrequestReason:i,DescriptionAudit:l}=n;let o={status:c,id:s,PersonalInformationDestructionRequest:h,DescriptionrequestReason:`<p>${i}</p>`,DescriptionAudit:`<p>${l}</p>`};if(c=="approved"?o={...o,approvedDate:new Date}:o={...o,approvedDate:null},!t.isEmpty(o)){const{status:u}=await T.post("/API/personalInformationDestructionRequest/audit",{saveData:o});u===201?(v(!0),y({level:"INFO",message:"개인정보파기요청 수정 완료",userId:E.get("username"),action:"개인정보파기요청 수정",status:"성공",additionalInfo:"개인정보파기요청가 성공적으로 수정되었습니다.",page:"개인정보파기요청"}),B(!1)):(v(!0),y({level:"ERROR",message:"개인정보파기요청 수정 실패",userId:E.get("username"),action:"개인정보파기요청 수정",status:"실패",additionalInfo:"개인정보파기요청 수정에 실패하였습니다.",page:"개인정보파기요청"}),B(!0))}}catch(s){console.log(s)}},z=a.useCallback(({prevTemplate:n,setThisCode:s})=>{if(!t.isEmpty(n)&&n!=null&&n!=null){const i=new DOMParser().parseFromString(n,"text/xml"),l=new XMLSerializer().serializeToString(i),[o,u]=a.useState(l);return a.useEffect(()=>{s&&s(l)},[l]),e.jsx(J,{value:o,height:"calc(100vh - 100vh/4)",extensions:[K({jsx:!0})],onChange:S=>{u&&s&&(u(S),s(S))}})}},[_]),U=a.useCallback(({code:n})=>{const[s,c]=a.useState("");return a.useEffect(()=>{if(!t.isEmpty(n)&&typeof n=="string"){let i=t.cloneDeep(n);if(i.includes("$document_serial")&&(i=i.replaceAll("$document_serial",t.isEmpty(t.get(r,"document_serial"))?'<span class="light">$document_serial</span>':`<span class="light">${t.get(r,"document_serial")}</span>`)),i.includes("$DescriptionrequestReason")&&(i=i.replaceAll("$DescriptionrequestReason",t.isEmpty(D)?'<span class="light">$DescriptionrequestReason</span>':`<span class="light">${D}</span>`)),i.includes("$verifiedTime")){let l=t.get(r,"sign_applicant.selfverification_timestamp.verfiedDate")?Q(t.get(r,"sign_applicant.selfverification_timestamp.verfiedDate")).format("YYYY-MM-DD HH:mm:ss"):"";i=i.replaceAll("$verifiedTime",t.isEmpty(l)?'<span class="light">$verifiedTime</span>':`<span class="light">본인확인 [${l}] 에 인증됨</span>`)}i.includes("$autimaticSign")&&(i=i.replaceAll("$autimaticSign",`<img src=/${t.get(f,"filePath")} alt="기명"/>`)),i.includes("$autimaticStamp")&&(i=i.replaceAll("$autimaticStamp",`<img src=/${t.get(j,"filePath")} alt="날인"/>`)),c(i)}},[n]),e.jsx("div",{dangerouslySetInnerHTML:{__html:s},style:{height:"calc(100vh - 100vh/4)"},className:"previewBox"})},[r,b,L,D,f,j]);return a.useEffect(()=>{W({id:p}),d("id",p)},[p]),a.useEffect(()=>{if(!t.isEmpty(r)){const n=t.get(r,"DescriptionrequestReason","");if(n){const i=n.replace(/<\/?p>/g,"");d("DescriptionrequestReason",i)}d("status",t.get(r,"status"));const s=t.get(r,"DescriptionAudit","");if(n){const i=s.replace(/<\/?p>/g,"");d("DescriptionAudit",i)}const c=t.get(r,"requestComment","");if(c){const i=c.replace(/<\/?p>/g,"");d("requestComment",i)}k(!0)}},[r]),e.jsxs(e.Fragment,{children:[P&&e.jsx(a.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(Z,{title:g?"개인정보파기요청 수정이 되지 않았습니다.":"개인정보파기요청 수정이 완료되었습니다.",text:g?"에러사항을 확인해주시기 바랍니다.":"수정한 내용으로 반영되었습니다.",buttons:!0,closeState:v,buttonContent:{cancleValue:{text:"확인",link:""}},icon:!g})}),e.jsx("div",{className:"manageBox",children:e.jsxs("div",{className:"editBox wideBox",children:[e.jsx(X,{to:"/operator/personalInformationDestructionRequest",children:e.jsx("div",{className:"backButton",children:e.jsx(N,{src:"/web/img/prevButtons.svg",alt:""})})}),e.jsxs("form",{onSubmit:$(n=>V({...n,thisCode:h})),children:[e.jsx("input",{type:"hidden",...m("id",{required:!0})}),e.jsxs("div",{className:"editTitle",children:[e.jsx("div",{className:"leftText",children:"개인정보파기요청 수정"}),e.jsx("div",{className:"rightButton",children:M&&e.jsx("button",{type:"submit",className:"saveButton",children:"수정"})})]}),e.jsxs("div",{className:"editBottomBox",children:[e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle",children:"신청자"}),e.jsx("div",{className:"textInputBox",children:e.jsxs("div",{className:"custom_divText",children:[t.get(r,"fullName")," (",t.get(r,"ref_applicant"),")"]})})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle required",children:"신청사유"}),e.jsxs("div",{className:"textInputBox",children:[e.jsx("textarea",{className:"custom_textarea_1",...m("DescriptionrequestReason",{required:!0}),placeholder:"신청사유를 적어주세요."}),!t.isEmpty(t.get(x,"DescriptionrequestReason"))&&e.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]})]}),e.jsxs("div",{className:"flexTextBox sideTwo",children:[e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle required",children:"신청자 기명"}),e.jsx("div",{className:"textInputBox",children:e.jsx("div",{className:"signBox",children:e.jsx(N,{src:`/${t.get(f,"filePath")}`,alt:""})})})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle required",children:"신청자 날인"}),e.jsx("div",{className:"textInputBox",children:e.jsx("div",{className:"signBox",children:e.jsx(N,{src:`/${t.get(j,"filePath")}`,alt:""})})})]})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle required",children:"승인상태"}),e.jsxs("div",{className:"textInputBox",children:[e.jsxs("select",{className:"customSelect_2",...m("status",{required:!0}),children:[e.jsx("option",{value:"pending",children:"검토중"}),e.jsx("option",{value:"approved",children:"승인"}),e.jsx("option",{value:"denied",children:"거부"})]}),!t.isEmpty(t.get(x,"status"))&&e.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle required",children:"담당자의견"}),e.jsxs("div",{className:"textInputBox",children:[e.jsx("textarea",{className:"custom_textarea_1",...m("DescriptionAudit",{required:!0}),placeholder:"담당자의견을 적어주세요."}),!t.isEmpty(t.get(x,"DescriptionAudit"))&&e.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]})]}),e.jsxs("div",{className:"textBox",children:[e.jsx("div",{className:"textTitle flexTitle required",children:"내용"}),e.jsx("div",{className:"textInputBox",children:e.jsxs("div",{className:"editorBox",children:[e.jsx(z,{prevTemplate:_,setThisCode:H}),e.jsx(U,{code:h})]})})]})]})]})]})})]})}export{pe as default};
