const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/customPopUp-1j2cuYYo.js","assets/index-ak5BsCze.js","assets/vendor-react-DLmlTesg.js","assets/vendor-pdf-D5Eab7jE.js","assets/index-D3sbFfH5.css","assets/customDateCalendar-DqCZpPi7.js","assets/index-jnRmlWET.js","assets/isNativeReflectConstruct-XGLLvWSz.js","assets/createClass-BeTC7LXt.js","assets/toPropertyKey-Dg8hKEVS.js","assets/defineProperty-BKLqfx38.js","assets/index-8t4SYTBK.css","assets/moment-B-YVwB4U.js"])))=>i.map(i=>d[i]);
import{_ as w}from"./vendor-pdf-D5Eab7jE.js";import{u as W,l as e,j as s,I as G,a as B,L as C,b as D}from"./index-ak5BsCze.js";import{h as X,b as n,L as Z,R as S}from"./vendor-react-DLmlTesg.js";import{V as J,m as K}from"./index-BNUiajTt.js";import{h as y}from"./moment-B-YVwB4U.js";import{k as Q}from"./index-CySRtK6F.js";import"./extends-CF3RwP-h.js";import"./objectWithoutPropertiesLoose-Dsqj8S3w.js";import"./index-Vcq4gwWv.js";const ee=S.lazy(()=>w(()=>import("./customPopUp-1j2cuYYo.js"),__vite__mapDeps([0,1,2,3,4])));S.lazy(()=>w(()=>import("./customDateCalendar-DqCZpPi7.js"),__vite__mapDeps([5,3,1,2,4,6,7,8,9,10,11,12])));function me(){const{id:$=""}=X(),[A,k]=n.useState(`
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
`),{register:u,handleSubmit:T,formState:{errors:v},setValue:g,watch:R}=W(),[M,N]=n.useState(!1),[j,E]=n.useState(!1),[r,I]=n.useState({}),[i,L]=n.useState({}),[x,q]=n.useState({}),[Y,z]=n.useState(!1),[b,O]=n.useState(""),[se,te]=n.useState(!1),P=R("showAddress"),V=async({id:c})=>{try{const{data:a}=await B.get("/API/employmentCertificate/get",{params:{id:c}});if(e.isEmpty(e.get(a,"result"))||I(e.get(a,"result")),e.isEmpty(e.get(a,"org_data"))||q(e.get(a,"org_data")),!e.isEmpty(e.get(a,"comp_data"))&&!e.isEmpty(e.get(a,"user"))){let l=e.cloneDeep(e.get(a,"user"));e.set(l,"companyPlace",e.get(a,"comp_data")),L(l)}}catch(a){console.log(a)}},F=async c=>{try{const{id:a,status:l,DescriptionrequestReason:t,DescriptionAudit:d,showAddress:o,thisCode:m}=c;let p={status:l,id:a,DescriptionrequestReason:`<p>${t}</p>`,EmploymentCertificate:m,DescriptionAudit:`<p>${d}</p>`,showAddress:o};if(l=="approved"?p={...p,approvedDate:new Date}:p={...p,approvedDate:null},!e.isEmpty(p)){const{status:h}=await B.post("/API/employmentCertificate/audit",{saveData:p});h===201?(N(!0),C({level:"INFO",message:"재직증명서 수정 완료",userId:D.get("username"),action:"재직증명서 수정",status:"성공",additionalInfo:"재직증명서가 성공적으로 수정되었습니다.",page:"재직증명서"}),E(!1)):(N(!0),C({level:"ERROR",message:"재직증명서 수정 실패",userId:D.get("username"),action:"재직증명서 수정",status:"실패",additionalInfo:"재직증명서 수정에 실패하였습니다.",page:"재직증명서"}),E(!0))}}catch(a){console.log(a)}},H=n.useCallback(({prevTemplate:c,setThisCode:a})=>{if(!e.isEmpty(c)&&c!=null&&c!=null){const t=new DOMParser().parseFromString(c,"text/xml"),d=new XMLSerializer().serializeToString(t),[o,m]=n.useState(d);return n.useEffect(()=>{a&&a(d)},[d]),s.jsx(J,{value:o,height:"calc(100vh - 100vh/4)",extensions:[K({jsx:!0})],onChange:p=>{m&&a&&(m(p),a(p))}})}},[A]),U=n.useCallback(({code:c})=>{const[a,l]=n.useState("");return n.useEffect(()=>{if(!e.isEmpty(c)&&typeof c=="string"){let t=e.cloneDeep(c),d="";if(e.isEmpty(x)||(d=e.get(x,"documents.0.road_address.address_name"),d+=`, ${e.get(x,"documents.0.extra_address")}`),t.includes("$company")&&(t=t.replaceAll("$company",e.isEmpty(e.get(i,"companyPlace"))?'<span class="light">$company</span>':`<span class="light">${e.get(i,"companyPlace.departmentName")}</span>`)),t.includes("$officeName")&&(t=t.replaceAll("$officeName",e.isEmpty(e.get(i,"companyPlace"))?"$officeName":`${e.get(i,"companyPlace.departmentName")==="(주)아리아나스"?"주식회사 아리아나스":"주식회사 오베네프"}`)),t.includes("$serviceArea")&&(t=t.replaceAll("$serviceArea",e.isEmpty(e.get(i,"companyPlace"))?'<span class="light">$serviceArea</span>':`<span class="light">${e.get(i,"companyPlace.ServiceArea")}</span>`)),t.includes("$RepresentativeName")&&(t=t.replaceAll("$RepresentativeName",e.isEmpty(e.get(i,"companyPlace"))?'<span class="light">$RepresentativeName</span>':`<span class="light">${e.get(i,"companyPlace.RepresentativeName")}</span>`)),t.includes("$MainPhoneNumber")&&(t=t.replaceAll("$MainPhoneNumber",e.isEmpty(e.get(i,"companyPlace"))?'<span class="light">$MainPhoneNumber</span>':`<span class="light">${e.get(i,"companyPlace.MainPhoneNumber")}</span>`)),t.includes("$address")&&(t=t.replaceAll("$address",e.isEmpty(e.get(i,"companyPlace"))?'<span class="light">$MainPhoneNumber</span>':`<span class="light">${e.get(i,"companyPlace.RepresentativeAddress.road_address")+", "+e.get(i,"companyPlace.RepresentativeAddress.extra_address")}</span>
                    ${e.isEmpty(e.get(i,"companyPlace.BranchAddress_1.road_address"))?"":`<br/><span class="light">${e.get(i,"companyPlace.BranchAddress_1.road_address")}, ${e.get(i,"companyPlace.BranchAddress_1.extra_address")}</span>`}
                    ${e.isEmpty(e.get(i,"companyPlace.BranchAddress_2.road_address"))?"":`<br/><span class="light">${e.get(i,"companyPlace.BranchAddress_2.road_address")}, ${e.get(i,"companyPlace.BranchAddress_2.extra_address")}</span>`}
                    `)),t.includes("$ref_employee_id")&&(t=t.replaceAll("$ref_employee_id",e.isEmpty(e.get(i,"fullName"))?'<span class="light">$ref_employee_id</span>':`<span class="light">${e.get(i,"fullName")}</span>`)),t.includes("$work_role")&&(t=t.replaceAll("$work_role",e.isEmpty(i)?'<span class="light">$work_role</span>':'<span class="light">종사업종 입력필요</span>')),t.includes("$organization_place")&&(P=="show"?t=t.replaceAll("$organization_place",e.isEmpty(x)?'<span class="light">$organization_place</span>':`<span class="light">${d}</span>`):t=t.replaceAll('<tr><td class="bolds">근무지주소</td><td colspan="3">$organization_place</td></tr>',"")),t.includes("$social_security_number")){let o=e.isEmpty(e.get(i,"social_security_number"))?"":e.get(i,"social_security_number").slice(0,-6)+"******";t=t.replaceAll("$social_security_number",e.isEmpty(o)?'<span class="light">$social_security_number</span>':`<span class="light">${o}</span>`)}if(t.includes("$start_date")){const o=e.get(i,"insure_acquisition_date"),m=e.get(i,"entry_date");m?t=t.replaceAll("$start_date",`<span class="light">${y(m).format("YYYY년 MM월 DD일")}</span>`):t=t.replaceAll("$start_date",`<span class="light">${y(o).format("YYYY년 MM월 DD일")}</span>`)}if(t.includes("$contract_date"))if(e.get(r,"status")=="approved"){const o=e.get(r,"approvedDate");t=t.replaceAll("$contract_date",`<span class="light">${y(o).format("YYYY년 MM월 DD일")}</span>`)}else{const o=new Date;t=t.replaceAll("$contract_date",`<span class="light">${y(o).format("YYYY년 MM월 DD일")}</span>`)}t.includes("$sign")&&(t=t.replaceAll("$sign",`<span class="stamp">
                                                                        <img src=/${e.get(i,"companyPlace.corporateSealData.filePath")} alt="인감"/>
                                                                        <span class="serial">${e.get(r,"document_serial")}</span>
                                                                    </span>`)),l(t)}},[c]),s.jsx("div",{dangerouslySetInnerHTML:{__html:a},style:{height:"calc(100vh - 100vh/4)"},className:"previewBox"})},[r,i,x,P]);return n.useCallback(({idx:c,item:a,customCheck:l})=>{const t=l.length,[d,o]=n.useState(""),m=h=>{const _=e.cloneDeep(h),f={id:e.random(1e12,9999999999999)};_.push(f),setCustomCheck(_)},p=async h=>{e.set(a,"name_kor",h.target.value);const _=h.target.value.replace(/(\s*)/g,""),f=Q.romanize(_);o(`$${f}`),e.set(a,"name_eng",`$${f}`)};return n.useEffect(()=>{e.isEmpty(e.get(a,"name_kor"))||(g(`use_custom_check[${c}].name_kor`,e.get(a,"name_kor")),g(`use_custom_check[${c}].name_eng`,`${e.get(a,"name_eng")}`))},[]),s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"addCheckArr",children:[s.jsxs("div",{className:"addLeft",children:[s.jsx("input",{type:"hidden",...u(`use_custom_check[${c}].id`),value:e.get(a,"id")}),s.jsx("input",{...u(`use_custom_check[${c}].name_kor`),placeholder:"변수명을 입력해주십시오",className:"inputText",onChange:h=>{p(h)}})]}),s.jsxs("div",{className:"addRight",children:[s.jsx("div",{className:"inLeftBox",children:"자동변수명"}),s.jsx("div",{className:"inRightBox",children:s.jsx("input",{value:d,...u(`use_custom_check[${c}].name_eng`)})})]})]}),c+1==t&&s.jsx("div",{className:"newAddCheckArrBox",children:s.jsx("div",{className:"newAddCheckArr",onClick:()=>{m(l)},children:"+ 추가"})})]})},[]),n.useEffect(()=>{V({id:$}),g("id",$)},[$]),n.useEffect(()=>{if(!e.isEmpty(r)){g("showAddress",e.get(r,"showAddress"));const c=e.get(r,"DescriptionrequestReason","");if(c){const l=c.replace(/<\/?p>/g,"");g("DescriptionrequestReason",l)}g("status",e.get(r,"status"));const a=e.get(r,"DescriptionAudit","");if(c){const l=a.replace(/<\/?p>/g,"");g("DescriptionAudit",l)}e.isEmpty(e.get(r,"EmploymentCertificate"))||k(e.get(r,"EmploymentCertificate")),z(!0)}},[r]),s.jsxs(s.Fragment,{children:[M&&s.jsx(n.Suspense,{fallback:s.jsx(s.Fragment,{}),children:s.jsx(ee,{title:j?"재직증명서 수정이 되지 않았습니다.":"재직증명서 수정이 완료되었습니다.",text:j?"에러사항을 확인해주시기 바랍니다.":"수정한 내용으로 반영되었습니다.",buttons:!0,closeState:N,buttonContent:{cancleValue:{text:"확인",link:""}},icon:!j})}),s.jsx("div",{className:"manageBox",children:s.jsxs("div",{className:"editBox wideBox",children:[s.jsx(Z,{to:"/operator/employmentCertificate",children:s.jsx("div",{className:"backButton",children:s.jsx(G,{src:"/web/img/prevButtons.svg",alt:""})})}),s.jsxs("form",{onSubmit:T(c=>F({...c,thisCode:b})),children:[s.jsx("input",{type:"hidden",...u("id",{required:!0})}),s.jsxs("div",{className:"editTitle",children:[s.jsx("div",{className:"leftText",children:"재직증명서 수정"}),s.jsx("div",{className:"rightButton",children:Y&&s.jsx("button",{type:"submit",className:"saveButton",children:"수정"})})]}),s.jsxs("div",{className:"editBottomBox",children:[s.jsxs("div",{className:"textBox",children:[s.jsx("div",{className:"textTitle",children:"신청자"}),s.jsx("div",{className:"textInputBox",children:s.jsxs("div",{className:"custom_divText",children:[e.get(r,"fullName")," (",e.get(r,"ref_applicant"),")"]})})]}),s.jsxs("div",{className:"textBox",children:[s.jsx("div",{className:"textTitle required",children:"세부근무지 표시여부"}),s.jsxs("div",{className:"textInputBox",children:[s.jsxs("select",{className:"customSelect_2",...u("showAddress",{required:!0}),children:[s.jsx("option",{value:"hide",children:"미표시"}),s.jsx("option",{value:"show",children:"표시"})]}),!e.isEmpty(e.get(v,"showAddress"))&&s.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]})]}),s.jsxs("div",{className:"textBox",children:[s.jsx("div",{className:"textTitle required",children:"신청사유"}),s.jsxs("div",{className:"textInputBox",children:[s.jsx("textarea",{className:"custom_textarea_1",...u("DescriptionrequestReason",{required:!0}),placeholder:"신청사유를 적어주세요."}),!e.isEmpty(e.get(v,"DescriptionrequestReason"))&&s.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]})]}),s.jsxs("div",{className:"textBox",children:[s.jsx("div",{className:"textTitle required",children:"승인상태"}),s.jsxs("div",{className:"textInputBox",children:[s.jsxs("select",{className:"customSelect_2",...u("status",{required:!0}),children:[s.jsx("option",{value:"pending",children:"검토중"}),s.jsx("option",{value:"approved",children:"승인"}),s.jsx("option",{value:"denied",children:"거부"})]}),!e.isEmpty(e.get(v,"status"))&&s.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]})]}),s.jsxs("div",{className:"textBox",children:[s.jsx("div",{className:"textTitle required",children:"담당자의견"}),s.jsxs("div",{className:"textInputBox",children:[s.jsx("textarea",{className:"custom_textarea_1",...u("DescriptionAudit",{required:!0}),placeholder:"담당자의견을 적어주세요."}),!e.isEmpty(e.get(v,"DescriptionAudit"))&&s.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]})]}),s.jsxs("div",{className:"textBox",children:[s.jsx("div",{className:"textTitle flexTitle required",children:"내용"}),s.jsx("div",{className:"textInputBox",children:s.jsxs("div",{className:"editorBox",children:[s.jsx(H,{prevTemplate:A,setThisCode:O}),s.jsx(U,{code:b})]})})]})]})]})]})})]})}export{me as default};
