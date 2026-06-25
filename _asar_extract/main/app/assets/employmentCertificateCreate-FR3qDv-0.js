const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/customPopUp-1j2cuYYo.js","assets/index-ak5BsCze.js","assets/vendor-react-DLmlTesg.js","assets/vendor-pdf-D5Eab7jE.js","assets/index-D3sbFfH5.css","assets/customDateCalendar-DqCZpPi7.js","assets/index-jnRmlWET.js","assets/isNativeReflectConstruct-XGLLvWSz.js","assets/createClass-BeTC7LXt.js","assets/toPropertyKey-Dg8hKEVS.js","assets/defineProperty-BKLqfx38.js","assets/index-8t4SYTBK.css","assets/moment-B-YVwB4U.js"])))=>i.map(i=>d[i]);
import{_ as C}from"./vendor-pdf-D5Eab7jE.js";import{u as Q,l as e,j as s,I as W,a as N,L as B,b as D}from"./index-ak5BsCze.js";import{h as ee,b as l,L as se,R as I}from"./vendor-react-DLmlTesg.js";import{V as te,m as ae}from"./index-BNUiajTt.js";import{h as x}from"./moment-B-YVwB4U.js";import"./extends-CF3RwP-h.js";import"./objectWithoutPropertiesLoose-Dsqj8S3w.js";import"./index-Vcq4gwWv.js";const w=I.lazy(()=>C(()=>import("./customPopUp-1j2cuYYo.js"),__vite__mapDeps([0,1,2,3,4])));I.lazy(()=>C(()=>import("./customDateCalendar-DqCZpPi7.js"),__vite__mapDeps([5,3,1,2,4,6,7,8,9,10,11,12])));function ye(){const{id:ie=""}=ee(),[j,le]=l.useState(`
    <div class="templateBox">
  <h1 class="templateTitle">
        재직증명서</h1>

     <table class="sectionTable2 mt20">
            <col style="width:70px"/>
            <col/>
           <col style="width:70px"/>
         <col/>
            <tbody>
              <tr>
                <td class="bolds"> 
                  회사명
                </td>
                <td> 
                    $company
                </td>
                  <td class="bolds"> 
                  업종
                </td>
                <td> 
                    $serviceArea
                </td>
              </tr>

                <tr>
                <td class="bolds"> 
                 주소
                </td>
               <td colspan="3">
                   $address
               </td>
              </tr>

              <tr><td class="bolds">근무지주소</td><td colspan="3">$organization_place</td></tr>

              <tr>
                <td class="bolds"> 
                   대표자
                </td>
                <td>
                    $RepresentativeName
               </td>
                 <td class="bolds"> 
                   대표번호
                </td>
                <td>
                    $MainPhoneNumber
               </td>
              </tr>
            </tbody>
    </table>
	  <div class="templateSection">
              <div class="sectionContent wideText">
              
                
                <div class="number">
                  <div class="numberLeft titleBold nameTag">
                       성 명
</div>
                  <div class="numberRight">
                     $ref_employee_id
                  </div>
               </div>

              <div class="number">
                  <div class="numberLeft titleBold">
                       주민등록번호 :
                      </div>
                  <div class="numberRight">
                      $social_security_number
                  </div>
               </div>
                
              </div>
    </div>

      <div class="templateSection dateMargin">
          <div class="sectionContent centerLine">
            위 사람은 $start_date 부터 현재까지 재직하고 있음을 증명합니다.
          </div>
      </div>

  
     <div class="templateSection dateMargin">
          <div class="sectionContent rightLine">
              $contract_date
          </div>
      </div>
  
   <div class="sectionEnd martop40">
          $officeName <span class="signZone">$sign(인)</span>
      </div>
  
  </div>
`),{register:u,handleSubmit:R,formState:{errors:h},setValue:ne,watch:T}=Q(),[M,v]=l.useState(!1),[f,b]=l.useState(!1),[q,S]=l.useState(!1),[L,Y]=l.useState(""),[k,ce]=l.useState({}),[a,U]=l.useState({}),[p,z]=l.useState({}),[re,oe]=l.useState(!1),[E,O]=l.useState(""),[A,F]=l.useState([]),[_,V]=l.useState(!1),[y,$]=l.useState(""),[de,pe]=l.useState(!1),P=T("showAddress");function G(i){return i.toString().length}const H=async()=>{try{const{data:i,status:c}=await N.get("/API/employmentCertificate/getCertificate");let t=`${x(new Date).format("YYYYMMDD")}`;if(e.isEmpty(i))$(`재직증명-${t}-0001`);else{const o=i[i.length-1];if(!e.isEmpty(e.get(o,"document_serial"))){const r=e.get(o,"document_serial").split("-");if(!e.isEmpty(r[1]))if(t==r[1]){let n=e.cloneDeep(r[2]);if(n){n=parseInt(n)+1;const d=G(n);if(d){n="";for(let g=0;g<4-d;g++)n+="0";n+=parseInt(r[2])+1,$(`재직증명-${t}-${n}`)}}}else $(`재직증명-${t}-0001`)}}}catch(i){console.log(i)}},X=async()=>{try{const{data:i,status:c}=await N.get("/API/member/getAllUser");F(i)}catch(i){console.log(i)}},Z=async i=>{try{const{status:c,DescriptionrequestReason:m,DescriptionAudit:t,showAddress:o,thisCode:r}=i;let n={_hid:e.get(a,"_hid"),ref_applicant:e.get(a,"username"),document_serial:y,status:c,DescriptionrequestReason:`<p>${m}</p>`,EmploymentCertificate:r,ref_directSuperior:"",DescriptionAudit:`<p>${t}</p>`,showAddress:o};if(c=="approved"?n={...n,approvedDate:new Date}:n={...n,approvedDate:null},e.isEmpty(a)){S(!0);return}if(!e.isEmpty(n)){const{data:d,status:g}=await N.post("/API/employmentCertificate/applyCertificate",{tempData:n});g===201?(v(!0),B({level:"INFO",message:"재직증명서 생성 완료",userId:D.get("username"),action:"재직증명서 생성",status:"성공",additionalInfo:"재직증명서가 성공적으로 생성되었습니다.",page:"재직증명서"}),b(!1),e.isEmpty(d)||(Y(e.get(d,"_id")),localStorage.setItem("reloadEmpCerti","active"))):(v(!0),B({level:"ERROR",message:"재직증명서 생성 실패",userId:D.get("username"),action:"재직증명서 생성",status:"실패",additionalInfo:"재직증명서 생성에 실패하였습니다.",page:"재직증명서"}),b(!0))}}catch(c){console.log(c)}},J=l.useCallback(({prevTemplate:i,setThisCode:c})=>{if(!e.isEmpty(i)&&i!=null&&i!=null){const t=new DOMParser().parseFromString(i,"text/xml"),o=new XMLSerializer().serializeToString(t),[r,n]=l.useState(o);return l.useEffect(()=>{c&&c(o)},[o]),s.jsx(te,{value:r,height:"calc(100vh - 100vh/4)",extensions:[ae({jsx:!0})],onChange:d=>{n&&c&&(n(d),c(d))}})}},[j]),K=l.useCallback(({code:i})=>{const[c,m]=l.useState("");return l.useEffect(()=>{if(!e.isEmpty(i)&&typeof i=="string"){let t=e.cloneDeep(i),o="";if(e.isEmpty(p)||(o=e.get(p,"address_name.address_name"),o+=`, ${e.get(p,"branchlocation.extra_address")}`),t.includes("$company")&&(t=t.replaceAll("$company",e.isEmpty(e.get(a,"companyPlace"))?'<span class="light">$company</span>':`<span class="light">${e.get(a,"companyPlace.departmentName")}</span>`)),t.includes("$officeName")&&(t=t.replaceAll("$officeName",e.isEmpty(e.get(a,"companyPlace"))?"$officeName":`${e.get(a,"companyPlace.departmentName")==="(주)아리아나스"?"주식회사 아리아나스":"주식회사 오베네프"}`)),t.includes("$serviceArea")&&(t=t.replaceAll("$serviceArea",e.isEmpty(e.get(a,"companyPlace"))?'<span class="light">$serviceArea</span>':`<span class="light">${e.get(a,"companyPlace.ServiceArea")}</span>`)),t.includes("$RepresentativeName")&&(t=t.replaceAll("$RepresentativeName",e.isEmpty(e.get(a,"companyPlace"))?'<span class="light">$RepresentativeName</span>':`<span class="light">${e.get(a,"companyPlace.RepresentativeName")}</span>`)),t.includes("$MainPhoneNumber")&&(t=t.replaceAll("$MainPhoneNumber",e.isEmpty(e.get(a,"companyPlace"))?'<span class="light">$MainPhoneNumber</span>':`<span class="light">${e.get(a,"companyPlace.MainPhoneNumber")}</span>`)),t.includes("$address")&&(t=t.replaceAll("$address",e.isEmpty(e.get(a,"companyPlace"))?'<span class="light">$MainPhoneNumber</span>':`<span class="light">${e.get(a,"companyPlace.RepresentativeAddress.road_address")+", "+e.get(a,"companyPlace.RepresentativeAddress.extra_address")}</span>
                    ${e.isEmpty(e.get(a,"companyPlace.BranchAddress_1.road_address"))?"":`<br/><span class="light">${e.get(a,"companyPlace.BranchAddress_1.road_address")}, ${e.get(a,"companyPlace.BranchAddress_1.extra_address")}</span>`}
                    ${e.isEmpty(e.get(a,"companyPlace.BranchAddress_2.road_address"))?"":`<br/><span class="light">${e.get(a,"companyPlace.BranchAddress_2.road_address")}, ${e.get(a,"companyPlace.BranchAddress_2.extra_address")}</span>`}
                    `)),t.includes("$ref_employee_id")&&(t=t.replaceAll("$ref_employee_id",e.isEmpty(e.get(a,"fullName"))?'<span class="light">$ref_employee_id</span>':`<span class="light">${e.get(a,"fullName")}</span>`)),t.includes("$work_role")&&(t=t.replaceAll("$work_role",e.isEmpty(a)?'<span class="light">$work_role</span>':'<span class="light">종사업종 입력필요</span>')),t.includes("$organization_place")&&(P=="show"?t=t.replaceAll("$organization_place",e.isEmpty(p)?'<span class="light">$organization_place</span>':`<span class="light">${o}</span>`):t=t.replaceAll('<tr><td class="bolds">근무지주소</td><td colspan="3">$organization_place</td></tr>',"")),t.includes("$social_security_number")){let r=e.isEmpty(e.get(a,"social_security_number"))?"":e.get(a,"social_security_number").slice(0,-6)+"******";t=t.replaceAll("$social_security_number",e.isEmpty(r)?'<span class="light">$social_security_number</span>':`<span class="light">${r}</span>`)}if(t.includes("$contract_date")){const r=new Date;t=t.replaceAll("$contract_date",`<span class="light">${x(r).format("YYYY년 MM월 DD일")}</span>`)}if(t.includes("$start_date")){const r=e.get(a,"insure_acquisition_date"),n=e.get(a,"entry_date");n?t=t.replaceAll("$start_date",`<span class="light">${x(n).format("YYYY년 MM월 DD일")}</span>`):t=t.replaceAll("$start_date",`<span class="light">${x(r).format("YYYY년 MM월 DD일")}</span>`)}t.includes("$sign")&&(t=t.replaceAll("$sign",`<span class="stamp"> <img src=/${e.get(a,"companyPlace.corporateSealData.filePath")} alt="인감"/>
                                                                     <span class="serial">${y}</span>
                                                                    </span>`)),m(t)}},[i]),s.jsx("div",{dangerouslySetInnerHTML:{__html:c},style:{height:"calc(100vh - 100vh/4)"},className:"previewBox"})},[k,a,p,P,y]);return l.useEffect(()=>{X(),H()},[]),l.useEffect(()=>{e.isEmpty(a)||z(e.get(a,"officePlace"))},[a]),s.jsxs(s.Fragment,{children:[M&&s.jsx(l.Suspense,{fallback:s.jsx(s.Fragment,{}),children:s.jsx(w,{title:f?"재직증명서 생성이 되지 않았습니다.":"재직증명서 생성이 완료되었습니다.",text:f?"에러사항을 확인해주시기 바랍니다.":"해당 사용자에게 재직증명서 공문서가 전송되었습니다.",buttons:!0,closeState:v,buttonContent:{confirmValue:{text:"확인",link:`/operator/employmentCertificate/${L}/edit`}},icon:!f})}),q&&s.jsx(l.Suspense,{fallback:s.jsx(s.Fragment,{}),children:s.jsx(w,{title:"재직증명서 생성이 불가능합니다.",text:"사원을 선택해주시기 바랍니다.",buttons:!0,closeState:S,buttonContent:{cancleValue:{text:"확인",link:"/"}},icon:!1})}),s.jsx("div",{className:"manageBox",children:s.jsxs("div",{className:"editBox wideBox",children:[s.jsx(se,{to:"/operator/employmentCertificate",children:s.jsx("div",{className:"backButton",children:s.jsx(W,{src:"/web/img/prevButtons.svg",alt:""})})}),s.jsxs("form",{onSubmit:R(i=>Z({...i,thisCode:E})),children:[s.jsxs("div",{className:"editTitle",children:[s.jsx("div",{className:"leftText",children:"재직증명서 생성"}),s.jsx("div",{className:"rightButton",children:s.jsx("button",{type:"submit",className:"saveButton",children:"생성"})})]}),s.jsxs("div",{className:"editBottomBox",children:[s.jsxs("div",{className:"textBox",children:[s.jsx("div",{className:"textTitle required",children:"신청자"}),s.jsx("div",{className:"textInputBox",children:s.jsxs("div",{className:"flexInner certiFlex",children:[s.jsx("div",{className:_?"openSelect open":"openSelect",onClick:()=>{V(!_)},children:"사원선택"}),s.jsx("div",{className:"custom_divText",children:e.isEmpty(a)?"사원을 선택해주세요":`${e.get(a,"fullName")} (${e.get(a,"username")})`})]})}),_&&s.jsx("div",{className:"selectList",children:!e.isEmpty(A)&&A.map((i,c)=>s.jsxs("div",{className:"gtem",children:[s.jsx("div",{className:"selectLeft",onClick:()=>{U(i)},children:s.jsx("span",{className:e.get(a,"_id")==e.get(i,"_id")?"checked":""})}),s.jsxs("div",{className:"selectRight",children:[e.get(i,"fullName")," (",e.get(i,"username"),")"]})]},`operator_earned_income_tax_create_${c}`))})]}),s.jsxs("div",{className:"textBox",children:[s.jsx("div",{className:"textTitle required",children:"세부근무지 표시여부"}),s.jsxs("div",{className:"textInputBox",children:[s.jsxs("select",{className:"customSelect_2",...u("showAddress",{required:!0}),children:[s.jsx("option",{value:"hide",children:"미표시"}),s.jsx("option",{value:"show",children:"표시"})]}),!e.isEmpty(e.get(h,"showAddress"))&&s.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]})]}),s.jsxs("div",{className:"textBox",children:[s.jsx("div",{className:"textTitle required",children:"신청사유"}),s.jsxs("div",{className:"textInputBox",children:[s.jsx("textarea",{className:"custom_textarea_1",...u("DescriptionrequestReason",{required:!0}),placeholder:"신청사유를 적어주세요."}),!e.isEmpty(e.get(h,"DescriptionrequestReason"))&&s.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]})]}),s.jsxs("div",{className:"textBox",children:[s.jsx("div",{className:"textTitle required",children:"승인상태"}),s.jsxs("div",{className:"textInputBox",children:[s.jsxs("select",{className:"customSelect_2",...u("status",{required:!0}),children:[s.jsx("option",{value:"pending",children:"검토중"}),s.jsx("option",{value:"approved",children:"승인"}),s.jsx("option",{value:"denied",children:"거부"})]}),!e.isEmpty(e.get(h,"status"))&&s.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]})]}),s.jsxs("div",{className:"textBox",children:[s.jsx("div",{className:"textTitle required",children:"담당자의견"}),s.jsxs("div",{className:"textInputBox",children:[s.jsx("textarea",{className:"custom_textarea_1",...u("DescriptionAudit",{required:!0}),placeholder:"담당자의견을 적어주세요."}),!e.isEmpty(e.get(h,"DescriptionAudit"))&&s.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]})]}),s.jsxs("div",{className:"textBox",children:[s.jsx("div",{className:"textTitle flexTitle required",children:"내용"}),s.jsx("div",{className:"textInputBox",children:s.jsxs("div",{className:"editorBox",children:[s.jsx(J,{prevTemplate:j,setThisCode:O}),s.jsx(K,{code:E})]})})]})]})]})]})})]})}export{ye as default};
