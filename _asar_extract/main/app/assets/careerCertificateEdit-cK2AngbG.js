const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/customPopUp-1j2cuYYo.js","assets/index-ak5BsCze.js","assets/vendor-react-DLmlTesg.js","assets/vendor-pdf-D5Eab7jE.js","assets/index-D3sbFfH5.css","assets/customDateCalendar-DqCZpPi7.js","assets/index-jnRmlWET.js","assets/isNativeReflectConstruct-XGLLvWSz.js","assets/createClass-BeTC7LXt.js","assets/toPropertyKey-Dg8hKEVS.js","assets/defineProperty-BKLqfx38.js","assets/index-8t4SYTBK.css","assets/moment-B-YVwB4U.js"])))=>i.map(i=>d[i]);
import{_ as P}from"./vendor-pdf-D5Eab7jE.js";import{u as F,l as e,j as t,I as W,a as C,L as A,b as B}from"./index-ak5BsCze.js";import{h as U,b as c,L as G,R as k}from"./vendor-react-DLmlTesg.js";import{V as X,m as Z}from"./index-BNUiajTt.js";import{h as _}from"./moment-B-YVwB4U.js";import{k as J}from"./index-CySRtK6F.js";import"./extends-CF3RwP-h.js";import"./objectWithoutPropertiesLoose-Dsqj8S3w.js";import"./index-Vcq4gwWv.js";const K=k.lazy(()=>P(()=>import("./customPopUp-1j2cuYYo.js"),__vite__mapDeps([0,1,2,3,4])));k.lazy(()=>P(()=>import("./customDateCalendar-DqCZpPi7.js"),__vite__mapDeps([5,3,1,2,4,6,7,8,9,10,11,12])));function pe(){const{id:$=""}=U(),[E,S]=c.useState(`
   
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
`),{register:g,handleSubmit:M,formState:{errors:y},setValue:v,watch:Q}=F(),[R,N]=c.useState(!1),[j,b]=c.useState(!1),[l,Y]=c.useState({}),[a,w]=c.useState({}),[f,T]=c.useState({}),[L,q]=c.useState(!1),[D,I]=c.useState(""),[ee,se]=c.useState(!1),O=async({id:r})=>{try{const{data:i}=await C.get("/API/careerCertificate/get",{params:{id:r}});if(e.isEmpty(e.get(i,"result"))||Y(e.get(i,"result")),e.isEmpty(e.get(i,"org_data"))||T(e.get(i,"org_data")),!e.isEmpty(e.get(i,"comp_data"))&&!e.isEmpty(e.get(i,"user"))){let o=e.cloneDeep(e.get(i,"user"));e.set(o,"companyPlace",e.get(i,"comp_data")),w(o)}}catch(i){console.log(i)}},z=async r=>{try{const{id:i,status:o,DescriptionrequestReason:s,DescriptionAudit:m,requestComment:n,thisCode:p}=r;let d={status:o,id:i,DescriptionrequestReason:`<p>${s}</p>`,requestComment:`<p>${n}</p>`,CareerCertificate:p,DescriptionAudit:`<p>${m}</p>`};if(o=="approved"?d={...d,approvedDate:new Date}:d={...d,approvedDate:null},!e.isEmpty(d)){const{status:u}=await C.post("/API/careerCertificate/audit",{saveData:d});u===201?(N(!0),A({level:"INFO",message:"경력증명서 수정 완료",userId:B.get("username"),action:"경력증명서 수정",status:"성공",additionalInfo:"경력증명서가 성공적으로 수정되었습니다.",page:"경력증명서"}),b(!1)):(N(!0),A({level:"ERROR",message:"경력증명서 수정 실패",userId:B.get("username"),action:"경력증명서 수정",status:"실패",additionalInfo:"경력증명서 수정에 실패하였습니다.",page:"경력증명서"}),b(!0))}}catch(i){console.log(i)}},H=c.useCallback(({prevTemplate:r,setThisCode:i})=>{if(!e.isEmpty(r)&&r!=null&&r!=null){const s=new DOMParser().parseFromString(r,"text/xml"),m=new XMLSerializer().serializeToString(s),[n,p]=c.useState(m);return c.useEffect(()=>{i&&i(m)},[m]),t.jsx(X,{value:n,height:"calc(100vh - 100vh/4)",extensions:[Z({jsx:!0})],onChange:d=>{p&&i&&(p(d),i(d))}})}},[E]),V=c.useCallback(({code:r})=>{const[i,o]=c.useState("");return c.useEffect(()=>{if(!e.isEmpty(r)&&typeof r=="string"){let s=e.cloneDeep(r),m="";if(e.isEmpty(f)||(m=e.get(f,"documents.0.road_address.address_name"),m+=`, ${e.get(f,"documents.0.extra_address")}`),s.includes("$company")&&(s=s.replaceAll("$company",e.isEmpty(e.get(a,"companyPlace"))?'<span class="light">$company</span>':`<span class="light">${e.get(a,"companyPlace.departmentName")}</span>`)),s.includes("$serviceArea")&&(s=s.replaceAll("$serviceArea",e.isEmpty(e.get(a,"companyPlace"))?'<span class="light">$serviceArea</span>':`<span class="light">${e.get(a,"companyPlace.ServiceArea")}</span>`)),s.includes("$RepresentativeName")&&(s=s.replaceAll("$RepresentativeName",e.isEmpty(e.get(a,"companyPlace"))?'<span class="light">$RepresentativeName</span>':`<span class="light">${e.get(a,"companyPlace.RepresentativeName")}</span>`)),s.includes("$MainPhoneNumber")&&(s=s.replaceAll("$MainPhoneNumber",e.isEmpty(e.get(a,"companyPlace"))?'<span class="light">$MainPhoneNumber</span>':`<span class="light">${e.get(a,"companyPlace.MainPhoneNumber")}</span>`)),s.includes("$BusinessRegistrationNumber")&&(s=s.replaceAll("$BusinessRegistrationNumber",e.isEmpty(e.get(a,"companyPlace"))?'<span class="light">$BusinessRegistrationNumber</span>':`<span class="light">${e.get(a,"companyPlace.BusinessRegistrationNumber")}</span>`)),s.includes("$address")&&(s=s.replaceAll("$address",e.isEmpty(e.get(a,"companyPlace"))?'<span class="light">$MainPhoneNumber</span>':`<span class="light">${e.get(a,"companyPlace.RepresentativeAddress.road_address")+", "+e.get(a,"companyPlace.RepresentativeAddress.extra_address")}</span>
                    ${e.isEmpty(e.get(a,"companyPlace.BranchAddress_1.road_address"))?"":`<br/><span class="light">${e.get(a,"companyPlace.BranchAddress_1.road_address")}, ${e.get(a,"companyPlace.BranchAddress_1.extra_address")}</span>`}
                    ${e.isEmpty(e.get(a,"companyPlace.BranchAddress_2.road_address"))?"":`<br/><span class="light">${e.get(a,"companyPlace.BranchAddress_2.road_address")}, ${e.get(a,"companyPlace.BranchAddress_2.extra_address")}</span>`}
                    `)),s.includes("$ref_employee_id")&&(s=s.replaceAll("$ref_employee_id",e.isEmpty(e.get(a,"fullName"))?'<span class="light">$ref_employee_id</span>':`<span class="light">${e.get(a,"fullName")}</span>`)),s.includes("$user_address")&&(s=s.replaceAll("$user_address",e.isEmpty(e.get(a,"address"))?'<span class="light">$user_address</span>':`<span class="light">${e.get(a,"address.road_address")+", "+e.get(a,"address.extra_address")}</span>`)),s.includes("$work_role")&&(s=s.replaceAll("$work_role",e.isEmpty(e.get(a,"work_role"))?'<span class="light">$work_role</span>':`<span class="light">${e.get(a,"work_role")}</span>`)),s.includes("$department")&&(s=s.replaceAll("$department",e.isEmpty(e.get(a,"division"))?'<span class="light">$department</span>':`<span class="light">${e.get(a,"division")}</span>`)),s.includes("$work_time")){let n="",p="";e.isEmpty(e.get(a,"employee_records"))||(e.get(a,"employee_records.0.entry_date")&&(n=e.get(a,"employee_records.0.entry_date","")),e.get(a,"employee_records.0.exit_date")&&(p=e.get(a,"employee_records.0.exit_date","")));const d=e.get(a,"insure_acquisition_date"),u=e.get(a,"quitdate");let h="",x="";d&&u&&(n&&p&&(h=`${_(n).format("YYYY.MM.DD")} ~ ${_(p).format("YYYY.MM.DD")}`),x=`${_(d).format("YYYY.MM.DD")} ~ ${_(u).format("YYYY.MM.DD")}`),s=s.replaceAll("$work_time",e.isEmpty(a)?'<span class="light">$work_time</span>':e.isEmpty(h)?`<span class="light">${x}</span>`:`<span class="light">${h}<br/>${x}</span>`)}if(s.includes("$organization_place")&&(s=s.replaceAll("$organization_place",e.isEmpty(f)?'<span class="light">$organization_place</span>':`<span class="light">${m}</span>`)),s.includes("$social_security_number")){let n=e.isEmpty(e.get(a,"social_security_number"))?"":e.get(a,"social_security_number").slice(0,-6)+"******";s=s.replaceAll("$social_security_number",e.isEmpty(n)?'<span class="light">$social_security_number</span>':`<span class="light">${n}</span>`)}if(s.includes("$start_date")){const n=e.get(a,"insure_acquisition_date"),p=e.get(a,"entry_date");p?s=s.replaceAll("$start_date",`<span class="light">${_(p).format("YYYY년 MM월 DD일")}</span>`):s=s.replaceAll("$start_date",`<span class="light">${_(n).format("YYYY년 MM월 DD일")}</span>`)}if(s.includes("$contract_date"))if(e.get(l,"status")=="approved"){const n=e.get(l,"approvedDate");s=s.replaceAll("$contract_date",`<span class="light">${_(n).format("YYYY년 MM월 DD일")}</span>`)}else{const n=new Date;s=s.replaceAll("$contract_date",`<span class="light">${_(n).format("YYYY년 MM월 DD일")}</span>`)}s.includes("$sign")&&(s=s.replaceAll("$sign",`<span class="stamp">
                                                                        <img src=/${e.get(a,"companyPlace.corporateSealData.filePath")} alt="인감"/>
                                                                        <span class="serial">${e.get(l,"document_serial")}</span>
                                                                    </span>`)),o(s)}},[r]),t.jsx("div",{dangerouslySetInnerHTML:{__html:i},style:{height:"calc(100vh - 100vh/4)"},className:"previewBox"})},[l,a,f]);return c.useCallback(({idx:r,item:i,customCheck:o})=>{const s=o.length,[m,n]=c.useState(""),p=u=>{const h=e.cloneDeep(u),x={id:e.random(1e12,9999999999999)};h.push(x),setCustomCheck(h)},d=async u=>{e.set(i,"name_kor",u.target.value);const h=u.target.value.replace(/(\s*)/g,""),x=J.romanize(h);n(`$${x}`),e.set(i,"name_eng",`$${x}`)};return c.useEffect(()=>{e.isEmpty(e.get(i,"name_kor"))||(v(`use_custom_check[${r}].name_kor`,e.get(i,"name_kor")),v(`use_custom_check[${r}].name_eng`,`${e.get(i,"name_eng")}`))},[]),t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"addCheckArr",children:[t.jsxs("div",{className:"addLeft",children:[t.jsx("input",{type:"hidden",...g(`use_custom_check[${r}].id`),value:e.get(i,"id")}),t.jsx("input",{...g(`use_custom_check[${r}].name_kor`),placeholder:"변수명을 입력해주십시오",className:"inputText",onChange:u=>{d(u)}})]}),t.jsxs("div",{className:"addRight",children:[t.jsx("div",{className:"inLeftBox",children:"자동변수명"}),t.jsx("div",{className:"inRightBox",children:t.jsx("input",{value:m,...g(`use_custom_check[${r}].name_eng`)})})]})]}),r+1==s&&t.jsx("div",{className:"newAddCheckArrBox",children:t.jsx("div",{className:"newAddCheckArr",onClick:()=>{p(o)},children:"+ 추가"})})]})},[]),c.useEffect(()=>{O({id:$}),v("id",$)},[$]),c.useEffect(()=>{if(!e.isEmpty(l)){const r=e.get(l,"DescriptionrequestReason","");if(r){const s=r.replace(/<\/?p>/g,"");v("DescriptionrequestReason",s)}v("status",e.get(l,"status"));const i=e.get(l,"DescriptionAudit","");if(r){const s=i.replace(/<\/?p>/g,"");v("DescriptionAudit",s)}const o=e.get(l,"requestComment","");if(o){const s=o.replace(/<\/?p>/g,"");v("requestComment",s)}e.isEmpty(e.get(l,"CareerCertificate"))||S(e.get(l,"CareerCertificate")),q(!0)}},[l]),t.jsxs(t.Fragment,{children:[R&&t.jsx(c.Suspense,{fallback:t.jsx(t.Fragment,{}),children:t.jsx(K,{title:j?"경력증명서 수정이 되지 않았습니다.":"경력증명서 수정이 완료되었습니다.",text:j?"에러사항을 확인해주시기 바랍니다.":"수정한 내용으로 반영되었습니다.",buttons:!0,closeState:N,buttonContent:{cancleValue:{text:"확인",link:""}},icon:!j})}),t.jsx("div",{className:"manageBox",children:t.jsxs("div",{className:"editBox wideBox",children:[t.jsx(G,{to:"/operator/careerCertificate",children:t.jsx("div",{className:"backButton",children:t.jsx(W,{src:"/web/img/prevButtons.svg",alt:""})})}),t.jsxs("form",{onSubmit:M(r=>z({...r,thisCode:D})),children:[t.jsx("input",{type:"hidden",...g("id",{required:!0})}),t.jsxs("div",{className:"editTitle",children:[t.jsx("div",{className:"leftText",children:"경력증명서 수정"}),t.jsx("div",{className:"rightButton",children:L&&t.jsx("button",{type:"submit",className:"saveButton",children:"수정"})})]}),t.jsxs("div",{className:"editBottomBox",children:[t.jsxs("div",{className:"textBox",children:[t.jsx("div",{className:"textTitle",children:"신청자"}),t.jsx("div",{className:"textInputBox",children:t.jsxs("div",{className:"custom_divText",children:[e.get(l,"fullName")," (",e.get(l,"ref_applicant"),")"]})})]}),t.jsxs("div",{className:"textBox",children:[t.jsx("div",{className:"textTitle required",children:"신청사유"}),t.jsxs("div",{className:"textInputBox",children:[t.jsx("textarea",{className:"custom_textarea_1",...g("DescriptionrequestReason",{required:!0}),placeholder:"신청사유를 적어주세요."}),!e.isEmpty(e.get(y,"DescriptionrequestReason"))&&t.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]})]}),t.jsxs("div",{className:"textBox",children:[t.jsx("div",{className:"textTitle",children:"추가요청사항"}),t.jsx("div",{className:"textInputBox",children:t.jsx("textarea",{className:"custom_textarea_1",...g("requestComment"),placeholder:"추가요청사항을 적어주세요."})})]}),t.jsxs("div",{className:"textBox",children:[t.jsx("div",{className:"textTitle required",children:"승인상태"}),t.jsxs("div",{className:"textInputBox",children:[t.jsxs("select",{className:"customSelect_2",...g("status",{required:!0}),children:[t.jsx("option",{value:"pending",children:"검토중"}),t.jsx("option",{value:"approved",children:"승인"}),t.jsx("option",{value:"denied",children:"거부"})]}),!e.isEmpty(e.get(y,"status"))&&t.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]})]}),t.jsxs("div",{className:"textBox",children:[t.jsx("div",{className:"textTitle required",children:"담당자의견"}),t.jsxs("div",{className:"textInputBox",children:[t.jsx("textarea",{className:"custom_textarea_1",...g("DescriptionAudit",{required:!0}),placeholder:"담당자의견을 적어주세요."}),!e.isEmpty(e.get(y,"DescriptionAudit"))&&t.jsx("div",{className:"warningBox",children:"해당값은 필수값입니다."})]})]}),t.jsxs("div",{className:"textBox",children:[t.jsx("div",{className:"textTitle flexTitle required",children:"내용"}),t.jsx("div",{className:"textInputBox",children:t.jsxs("div",{className:"editorBox",children:[t.jsx(H,{prevTemplate:E,setThisCode:I}),t.jsx(V,{code:D})]})})]})]})]})]})})]})}export{pe as default};
