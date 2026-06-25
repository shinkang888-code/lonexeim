const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/customPopUp-1j2cuYYo.js","assets/index-ak5BsCze.js","assets/vendor-react-DLmlTesg.js","assets/vendor-pdf-D5Eab7jE.js","assets/index-D3sbFfH5.css","assets/customDateCalendar-DqCZpPi7.js","assets/index-jnRmlWET.js","assets/isNativeReflectConstruct-XGLLvWSz.js","assets/createClass-BeTC7LXt.js","assets/toPropertyKey-Dg8hKEVS.js","assets/defineProperty-BKLqfx38.js","assets/index-8t4SYTBK.css","assets/moment-B-YVwB4U.js"])))=>i.map(i=>d[i]);
import{_ as w}from"./vendor-pdf-D5Eab7jE.js";import{u as Q,l as e,j as t,I as W,a as S,L as C,b as Y}from"./index-ak5BsCze.js";import{h as ee,b as l,L as se,R as M}from"./vendor-react-DLmlTesg.js";import{V as te,m as ae}from"./index-BNUiajTt.js";import{h as p}from"./moment-B-YVwB4U.js";import"./extends-CF3RwP-h.js";import"./objectWithoutPropertiesLoose-Dsqj8S3w.js";import"./index-Vcq4gwWv.js";const R=M.lazy(()=>w(()=>import("./customPopUp-1j2cuYYo.js"),__vite__mapDeps([0,1,2,3,4])));M.lazy(()=>w(()=>import("./customDateCalendar-DqCZpPi7.js"),__vite__mapDeps([5,3,1,2,4,6,7,8,9,10,11,12])));function ye(){const{id:ie=""}=ee(),[b,re]=l.useState(`
    <div class="templateBox">
    <h1 class="templateTitle">
          경력증명서</h1>
    
       <table class="sectionTable2 mt20">
              <col style="width:70px"/>
              <col/>
             <col style="width:70px"/>
           <col/>
              <tbody>
                <tr>
                  <td class="bolds"> 
                    성명
                  </td>
                  <td> 
                      $ref_employee_id
                  </td>
                    <td class="bolds"> 
                    생년월일
                  </td>
                  <td> 
                     $social_security_number
                  </td>
                </tr>
    
                  <tr>
                  <td class="bolds"> 
                   주소
                  </td>
                 <td colspan="3">
                     $user_address
                 </td>
                </tr>
    
                <tr>
                  <td class="bolds"> 
                   재직기간
                  </td>
                 <td colspan="3">
                     $work_time
                 </td>
                </tr>
    
                <tr>
                  <td class="bolds"> 
                     소속
                  </td>
                  <td>
                      $department
                 </td>
                   <td class="bolds"> 
                     담당업무
                  </td>
                  <td>
                      $work_role
                 </td>
                </tr>
              </tbody>
      </table>
    
        <div class="templateSection dateMargin">
            <div class="sectionContent centerLine">
              위 기재사항이 사실과 다름없음을 증명합니다.
            </div>
        </div>
    
    
       <div class="templateSection">
            <div class="sectionContent centerLine">
                $contract_date
            </div>
        </div>
    
    
    <div class="bottomCompBox">
      <div class="sectionStart">
        <div class="startLeft">
          상호
        </div>
        <div class="startRight">
          $company
        </div>
      </div>
    
      <div class="sectionStart">
        <div class="startLeft">
          전화
        </div>
        <div class="startRight">
           $MainPhoneNumber
        </div>
      </div>
    
       <div class="sectionStart">
        <div class="startLeft">
          사업자등록번호
        </div>
        <div class="startRight">
          $BusinessRegistrationNumber
        </div>
      </div>
    
      <div class="sectionStart">
        <div class="startLeft">
          주소
        </div>
        <div class="startRight">
          $address
        </div>
      </div>
    
        <div class="sectionStart signStart">
        <div class="startLeft">
          대표자
        </div>
        <div class="startRight flexSign">
          $RepresentativeName <span class="signZone">$sign(인)</span>
        </div>
      </div>
    
    </div>
    
    
    
    </div>
`),{register:h,handleSubmit:I,formState:{errors:v},setValue:le,watch:ne}=Q(),[k,f]=l.useState(!1),[_,E]=l.useState(!1),[T,D]=l.useState(!1),[q,L]=l.useState(""),[x,ce]=l.useState({}),[a,O]=l.useState({}),[u,U]=l.useState({}),[oe,de]=l.useState(!1),[P,z]=l.useState(""),[A,F]=l.useState([]),[$,V]=l.useState(!1),[B,y]=l.useState(""),[pe,me]=l.useState(!1);function G(i){return i.toString().length}const H=async()=>{try{const{data:i,status:c}=await S.get("/API/careerCertificate/getCertificate");let s=`${p(new Date).format("YYYYMMDD")}`;if(e.isEmpty(i))y(`경력증명-${s}-0001`);else{const o=i[i.length-1];if(!e.isEmpty(e.get(o,"document_serial"))){const n=e.get(o,"document_serial").split("-");if(!e.isEmpty(n[1]))if(s==n[1]){let r=e.cloneDeep(n[2]);if(r){r=parseInt(r)+1;const d=G(r);if(d){r="";for(let m=0;m<4-d;m++)r+="0";r+=parseInt(n[2])+1,y(`경력증명-${s}-${r}`)}}}else y(`경력증명-${s}-0001`)}}}catch(i){console.log(i)}},X=async()=>{try{const{data:i,status:c}=await S.get("/API/member/getAllUser");F(i)}catch(i){console.log(i)}},Z=async i=>{try{const{status:c,DescriptionrequestReason:g,DescriptionAudit:s,thisCode:o,requestComment:n}=i;let r={_hid:e.get(a,"_hid"),ref_applicant:e.get(a,"username"),document_serial:B,status:c,DescriptionrequestReason:`<p>${g}</p>`,requestComment:`<p>${n}</p>`,CareerCertificate:o,ref_directSuperior:"",DescriptionAudit:`<p>${s}</p>`};if(c=="approved"?r={...r,approvedDate:new Date}:r={...r,approvedDate:null},e.isEmpty(a)){D(!0);return}if(!e.isEmpty(r)){const{data:d,status:m}=await S.post("/API/careerCertificate/applyCertificate",{tempData:r});m===201?(f(!0),C({level:"INFO",message:"경력증명서 생성 완료",userId:Y.get("username"),action:"경력증명서 생성",status:"성공",additionalInfo:"경력증명서가 성공적으로 생성되었습니다.",page:"경력증명서"}),E(!1),e.isEmpty(d)||(L(e.get(d,"_id")),localStorage.setItem("reloadEmpCerti","active"))):(f(!0),C({level:"ERROR",message:"경력증명서 생성 실패",userId:Y.get("username"),action:"경력증명서 생성",status:"실패",additionalInfo:"경력증명서 생성에 실패하였습니다.",page:"경력증명서"}),E(!0))}}catch(c){console.log(c)}},J=l.useCallback(({prevTemplate:i,setThisCode:c})=>{if(!e.isEmpty(i)&&i!=null&&i!=null){const s=new DOMParser().parseFromString(i,"text/xml"),o=new XMLSerializer().serializeToString(s),[n,r]=l.useState(o);return l.useEffect(()=>{c&&c(o)},[o]),t.jsx(te,{value:n,height:"calc(100vh - 100vh/4)",extensions:[ae({jsx:!0})],onChange:d=>{r&&c&&(r(d),c(d))}})}},[b]),K=l.useCallback(({code:i})=>{const[c,g]=l.useState("");return l.useEffect(()=>{if(!e.isEmpty(i)&&typeof i=="string"){let s=e.cloneDeep(i),o="";if(e.isEmpty(u)||(o=e.get(u,"documents.0.road_address.address_name"),o+=`, ${e.get(u,"documents.0.extra_address")}`),s.includes("$company")&&(s=s.replaceAll("$company",e.isEmpty(e.get(a,"companyPlace"))?'<span class="light">$company</span>':`<span class="light">${e.get(a,"companyPlace.departmentName")}</span>`)),s.includes("$serviceArea")&&(s=s.replaceAll("$serviceArea",e.isEmpty(e.get(a,"companyPlace"))?'<span class="light">$serviceArea</span>':`<span class="light">${e.get(a,"companyPlace.ServiceArea")}</span>`)),s.includes("$RepresentativeName")&&(s=s.replaceAll("$RepresentativeName",e.isEmpty(e.get(a,"companyPlace"))?'<span class="light">$RepresentativeName</span>':`<span class="light">${e.get(a,"companyPlace.RepresentativeName")}</span>`)),s.includes("$MainPhoneNumber")&&(s=s.replaceAll("$MainPhoneNumber",e.isEmpty(e.get(a,"companyPlace"))?'<span class="light">$MainPhoneNumber</span>':`<span class="light">${e.get(a,"companyPlace.MainPhoneNumber")}</span>`)),s.includes("$BusinessRegistrationNumber")&&(s=s.replaceAll("$BusinessRegistrationNumber",e.isEmpty(e.get(a,"companyPlace"))?'<span class="light">$BusinessRegistrationNumber</span>':`<span class="light">${e.get(a,"companyPlace.BusinessRegistrationNumber")}</span>`)),s.includes("$address")&&(s=s.replaceAll("$address",e.isEmpty(e.get(a,"companyPlace"))?'<span class="light">$MainPhoneNumber</span>':`<span class="light">${e.get(a,"companyPlace.RepresentativeAddress.road_address")+", "+e.get(a,"companyPlace.RepresentativeAddress.extra_address")}</span>
                    ${e.isEmpty(e.get(a,"companyPlace.BranchAddress_1.road_address"))?"":`<br/><span class="light">${e.get(a,"companyPlace.BranchAddress_1.road_address")}, ${e.get(a,"companyPlace.BranchAddress_1.extra_address")}</span>`}
                    ${e.isEmpty(e.get(a,"companyPlace.BranchAddress_2.road_address"))?"":`<br/><span class="light">${e.get(a,"companyPlace.BranchAddress_2.road_address")}, ${e.get(a,"companyPlace.BranchAddress_2.extra_address")}</span>`}
                    `)),s.includes("$ref_employee_id")&&(s=s.replaceAll("$ref_employee_id",e.isEmpty(e.get(a,"fullName"))?'<span class="light">$ref_employee_id</span>':`<span class="light">${e.get(a,"fullName")}</span>`)),s.includes("$user_address")&&(s=s.replaceAll("$user_address",e.isEmpty(e.get(a,"address"))?'<span class="light">$user_address</span>':`<span class="light">${e.get(a,"address.road_address")+", "+e.get(a,"address.extra_address")}</span>`)),s.includes("$work_role")&&(s=s.replaceAll("$work_role",e.isEmpty(e.get(a,"work_role"))?'<span class="light">$work_role</span>':`<span class="light">${e.get(a,"work_role")}</span>`)),s.includes("$department")&&(s=s.replaceAll("$department",e.isEmpty(e.get(a,"division"))?'<span class="light">$department</span>':`<span class="light">${e.get(a,"division")}</span>`)),s.includes("$work_time")){let n="",r="";e.isEmpty(e.get(a,"employee_records"))||(e.get(a,"employee_records.0.entry_date")&&(n=e.get(a,"employee_records.0.entry_date","")),e.get(a,"employee_records.0.exit_date")&&(r=e.get(a,"employee_records.0.exit_date","")));const d=e.get(a,"insure_acquisition_date"),m=e.get(a,"quitdate");let N="",j="";d&&m&&(n&&r&&(N=`${p(n).format("YYYY.MM.DD")} ~ ${p(r).format("YYYY.MM.DD")}`),j=`${p(d).format("YYYY.MM.DD")} ~ ${p(m).format("YYYY.MM.DD")}`),s=s.replaceAll("$work_time",e.isEmpty(a)?'<span class="light">$work_time</span>':e.isEmpty(N)?`<span class="light">${j}</span>`:`<span class="light">${N}<br/>${j}</span>`)}if(s.includes("$organization_place")&&(s=s.replaceAll("$organization_place",e.isEmpty(u)?'<span class="light">$organization_place</span>':`<span class="light">${o}</span>`)),s.includes("$social_security_number")){let n=e.isEmpty(e.get(a,"social_security_number"))?"":e.get(a,"social_security_number").slice(0,-6)+"******";s=s.replaceAll("$social_security_number",e.isEmpty(n)?'<span class="light">$social_security_number</span>':`<span class="light">${n}</span>`)}if(s.includes("$start_date")){const n=e.get(a,"insure_acquisition_date"),r=e.get(a,"entry_date");r?s=s.replaceAll("$start_date",`<span class="light">${p(r).format("YYYY년 MM월 DD일")}</span>`):s=s.replaceAll("$start_date",`<span class="light">${p(n).format("YYYY년 MM월 DD일")}</span>`)}if(s.includes("$contract_date"))if(e.get(x,"status")=="approved"){const n=e.get(x,"approvedDate");s=s.replaceAll("$contract_date",`<span class="light">${p(n).format("YYYY년 MM월 DD일")}</span>`)}else{const n=new Date;s=s.replaceAll("$contract_date",`<span class="light">${p(n).format("YYYY년 MM월 DD일")}</span>`)}s.includes("$sign")&&(s=s.replaceAll("$sign",`<span class="stamp">
                                                                        <img src=/${e.get(a,"companyPlace.corporateSealData.filePath")} alt="인감"/>
                                                                        <span class="serial">${e.get(x,"document_serial")}</span>
                                                                    </span>`)),g(s)}},[i]),t.jsx("div",{dangerouslySetInnerHTML:{__html:c},style:{height:"calc(100vh - 100vh/4)"},className:"previewBox"})},[x,a,u,B]);return l.useEffect(()=>{X(),H()},[]),l.useEffect(()=>{e.isEmpty(a)||U(e.get(a,"officePlace"))},[a]),t.jsxs(t.Fragment,{children:[k&&t.jsx(l.Suspense,{fallback:t.jsx(t.Fragment,{}),children:t.jsx(R,{title:_?"경력증명서 생성이 되지 않았습니다.":"경력증명서 생성이 완료되었습니다.",text:_?"에러사항을 확인해주시기 바랍니다.":"해당 사용자에게 경력증명서 공문서가 전송되었습니다.",buttons:!0,closeState:f,buttonContent:{confirmValue:{text:"확인",link:`/operator/careerCertificate/${q}/edit`}},icon:!_})}),T&&t.jsx(l.Suspense,{fallback:t.jsx(t.Fragment,{}),children:t.jsx(R,{title:"경력증명서 생성이 불가능합니다.",text:"사원을 선택해주시기 바랍니다.",buttons:!0,closeState:D,buttonContent:{cancleValue:{text:"확인",link:"/"}},icon:!1})}),t.jsx("div",{className:"manageBox",children:t.jsxs("div",{className:"editBox wideBox",children:[t.jsx(se,{to:"/operator/careerCertificate",children:t.jsx("div",{className:"backButton",children:t.jsx(W,{src:"/web/img/prevButtons.svg",alt:""})})}),t.jsxs("form",{onSubmit:I(i=>Z({...i,thisCode:P})),children:[t.jsxs("div",{className:"editTitle",children:[t.jsx("div",{className:"leftText",children:"경력증명서 생성"}),t.jsx("div",{className:"rightButton",children:t.jsx("button",{type:"submit",className:"saveButton",children:"생성"})})]}),t.jsxs("div",{className:"editBottomBox",children:[t.jsxs("div",{className:"textBox",children:[t.jsx("div",{className:"textTitle required",children:"신청자"}),t.jsx("div",{className:"textInputBox",children:t.jsxs("div",{className:"flexInner certiFlex",children:[t.jsx("div",{className:$?"openSelect open":"openSelect",onClick:()=>{V(!$)},children:"사원선택"}),t.jsx("div",{className:"custom_divText",children:e.isEmpty(a)?"사원을 선택해주세요":`${e.get(a,"fullName")} (${e.get(a,"username")})`})]})}),$&&t.jsx("div",{className:"selectList",children:!e.isEmpty(A)&&A.map((i,c)=>t.jsxs("div",{className:"gtem",children:[t.jsx("div",{className:"selectLeft",onClick:()=>{O(i)},children:t.jsx("span",{className:e.get(a,"_id")==e.get(i,"_id")?"checked":""})}),t.jsxs("div",{className:"selectRight",children:[e.get(i,"fullName")," (",e.get(i,"username"),")"]})]},`operator_carrer_certificate_create_${c}`))})]}),t.jsxs("div",{className:"textBox",children:[t.jsx("div",{className:"textTitle required",children:"신청사유"}),t.jsxs("div",{className:"textInputBox",children:[t.jsx("textarea",{className:"custom_textarea_1",...h("DescriptionrequestReason",{required:!0}),placeholder:"신청사유를 적어주세요."}),!e.isEmpty(e.get(v,"DescriptionrequestReason"))&&t.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]})]}),t.jsxs("div",{className:"textBox",children:[t.jsx("div",{className:"textTitle",children:"추가요청사항"}),t.jsx("div",{className:"textInputBox",children:t.jsx("textarea",{className:"custom_textarea_1",...h("requestComment"),placeholder:"추가요청사항을 적어주세요."})})]}),t.jsxs("div",{className:"textBox",children:[t.jsx("div",{className:"textTitle required",children:"승인상태"}),t.jsxs("div",{className:"textInputBox",children:[t.jsxs("select",{className:"customSelect_2",...h("status",{required:!0}),children:[t.jsx("option",{value:"pending",children:"검토중"}),t.jsx("option",{value:"approved",children:"승인"}),t.jsx("option",{value:"denied",children:"거부"})]}),!e.isEmpty(e.get(v,"status"))&&t.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]})]}),t.jsxs("div",{className:"textBox",children:[t.jsx("div",{className:"textTitle required",children:"담당자의견"}),t.jsxs("div",{className:"textInputBox",children:[t.jsx("textarea",{className:"custom_textarea_1",...h("DescriptionAudit",{required:!0}),placeholder:"담당자의견을 적어주세요."}),!e.isEmpty(e.get(v,"DescriptionAudit"))&&t.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]})]}),t.jsxs("div",{className:"textBox",children:[t.jsx("div",{className:"textTitle flexTitle required",children:"내용"}),t.jsx("div",{className:"textInputBox",children:t.jsxs("div",{className:"editorBox",children:[t.jsx(J,{prevTemplate:b,setThisCode:z}),t.jsx(K,{code:P})]})})]})]})]})]})})]})}export{ye as default};
