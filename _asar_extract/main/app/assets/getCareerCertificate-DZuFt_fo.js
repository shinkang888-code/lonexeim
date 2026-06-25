const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/customPopUp-1j2cuYYo.js","assets/index-ak5BsCze.js","assets/vendor-react-DLmlTesg.js","assets/vendor-pdf-D5Eab7jE.js","assets/index-D3sbFfH5.css","assets/calendar--0B3W6KM.js","assets/index-jnRmlWET.js","assets/isNativeReflectConstruct-XGLLvWSz.js","assets/createClass-BeTC7LXt.js","assets/toPropertyKey-Dg8hKEVS.js","assets/defineProperty-BKLqfx38.js","assets/index-8t4SYTBK.css","assets/moment-B-YVwB4U.js","assets/calendarPickOne-DVt-2j6P.js","assets/customPopUpForFunction-BNOnp2sE.js"])))=>i.map(i=>d[i]);
import{_ as v}from"./vendor-pdf-D5Eab7jE.js";import{j as e,I as n,l as a,b as c,a as g,L as u}from"./index-ak5BsCze.js";import{b as s,L as C,R as x}from"./vendor-react-DLmlTesg.js";import{h as O}from"./moment-B-YVwB4U.js";import"./ko-C39F15y_.js";import"./vendor-excel-CVVhhIhe.js";const T=x.lazy(()=>v(()=>import("./customPopUp-1j2cuYYo.js"),__vite__mapDeps([0,1,2,3,4])));x.lazy(()=>v(()=>import("./calendar--0B3W6KM.js"),__vite__mapDeps([5,3,1,2,4,6,7,8,9,10,11,12])));x.lazy(()=>v(()=>import("./calendarPickOne-DVt-2j6P.js"),__vite__mapDeps([13,3,1,2,4,6,7,8,9,10,11,12])));x.lazy(()=>v(()=>import("./customPopUpForFunction-BNOnp2sE.js"),__vite__mapDeps([14,1,2,3,4])));function W(){const[f,E]=s.useState(!1),[R,j]=s.useState(!1),[I,k]=s.useState(!1),[q,N]=s.useState(!1),[o,p]=s.useState(""),[d,$]=s.useState(""),[_,w]=s.useState(""),[z,M]=s.useState("hide"),[Y,F]=s.useState(!1),[L,Q]=s.useState(`
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
`),P=t=>{const l=t.target.value;$(l)},D=t=>{const l=t.target.value;w(l)};function V(t){return t.toString().length}const A=async()=>{try{const{data:t,status:l}=await g.get("/API/careerCertificate/getCertificate");let r=`${O(new Date).format("YYYYMMDD")}`;if(a.isEmpty(t))p(`경력증명-${r}-0001`);else{const S=t[t.length-1];if(!a.isEmpty(a.get(S,"document_serial"))){const m=a.get(S,"document_serial").split("-");if(!a.isEmpty(m[1]))if(r==m[1]){let i=a.cloneDeep(m[2]);if(i){i=parseInt(i)+1;const y=V(i);if(y){i="";for(let B=0;B<4-y;B++)i+="0";i+=parseInt(m[2])+1,p(`경력증명-${r}-${i}`)}}}else p(`경력증명-${r}-0001`)}}}catch(t){console.log(t)}},h=async()=>{N(!0);try{const t=c.get("username"),l=c.get("_hid");let b={username:t,_hid:l,document_serial:o,status:"pending",DescriptionrequestReason:`<p>${d}</p>`,DescriptionAudit:"",requestComment:`<p>${_}</p>`,CareerCertificate:L,ref_applicant:t,ref_directSuperior:""};const{status:r}=await g.post("/API/careerCertificate/applyCertificate",{tempData:b});r===201&&(j(!0),E(!1),u({level:"INFO",message:"경력증명서 신청 완료",userId:c.get("username"),action:"경력증명서 신청",status:"성공",additionalInfo:"경력증명서를 성공적으로 신청하였습니다.",page:"경력증명서"}),setTimeout(()=>{N(!1)},5e3))}catch(t){g.isAxiosError(t)&&t.response?t.response.status===403?(console.log("error 발생"),u({level:"ERROR",message:"경력증명서 신청 실패",userId:c.get("username"),action:"경력증명서 신청",status:"실패",additionalInfo:"경력증명서 신청에 실패하였습니다.",page:"경력증명서"})):(console.log("다른 HTTP 오류: ",t.response.status),u({level:"ERROR",message:"경력증명서 신청 실패",userId:c.get("username"),action:"경력증명서 신청",status:"실패",additionalInfo:"경력증명서 신청에 실패하였습니다.",page:"경력증명서"})):(console.error("네트워크 또는 알 수 없는 오류: ",t),u({level:"ERROR",message:"경력증명서 신청 실패",userId:c.get("username"),action:"경력증명서 신청",status:"실패",additionalInfo:"경력증명서 신청에 실패하였습니다.",page:"경력증명서"}))}};return s.useEffect(()=>{f&&h()},[f]),s.useEffect(()=>{A()},[]),e.jsxs("div",{className:"document",children:[R&&e.jsx(s.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(T,{title:"경력증명서 신청이 완료 되었습니다.",text:"담당 관리자가 검토 예정입니다.",buttons:!0,closeState:j,buttonContent:{confirmValue:{text:"확인",link:"/dashboardQuitter"}},icon:!0})}),I&&e.jsx(s.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(T,{title:"경력증명서를 신청할 수 없습니다.",text:"관리자에게 문의바랍니다.",buttons:!0,closeState:k,buttonContent:{cancleValue:{text:"확인",link:"/"}},icon:!1})}),e.jsxs("div",{className:"inContent",children:[e.jsxs("div",{className:"translateButtonsBox",children:[e.jsx("div",{className:"leftTitles",children:"경력증명서 발급 신청"}),e.jsx("div",{className:"rightButtons",children:e.jsxs("div",{className:"translateButtons",children:[e.jsx(C,{to:"/dashboardQuitter",className:"meslinks",children:e.jsxs("div",{className:"prevButton",children:[e.jsx("div",{className:"imgBox",children:e.jsx(n,{src:"/web/img/left_button.svg",alt:"이전"})}),e.jsx("div",{className:"rightTitle",children:"이전"})]})}),!a.isEmpty(o)&&!a.isEmpty(d)?e.jsx("button",{className:"meslinks",onClick:()=>{h()},children:e.jsxs("div",{className:"nextButton nextBlueButton",children:[e.jsx("div",{className:"leftTitle",children:"다음"}),e.jsx("div",{className:"imgBox",children:e.jsx(n,{src:"/web/img/right_button.svg",alt:"다음"})})]})}):e.jsx("div",{className:"meslinks",children:e.jsxs("div",{className:"nextButton",children:[e.jsx("div",{className:"leftTitle",children:"다음"}),e.jsx("div",{className:"imgBox",children:e.jsx(n,{src:"/web/img/right_button.svg",alt:"다음"})})]})})]})})]}),e.jsxs("div",{className:"applyCerti",children:[e.jsxs("div",{className:"applyBox",children:[e.jsx("div",{className:"applyCertiTitle required",children:"신청번호(자동발급)"}),e.jsx("div",{className:"selectDate",children:o})]}),e.jsxs("div",{className:"applyBox",children:[e.jsx("div",{className:"applyCertiTitle required",children:"신청내용"}),e.jsx("textarea",{className:"customTextarea_1",placeholder:"신청내용을 적어주세요",value:d,onChange:P})]}),e.jsxs("div",{className:"applyBox",children:[e.jsx("div",{className:"applyCertiTitle minTop",children:"추가정보 기재요청"}),e.jsx("div",{className:"miniText",children:"추가정보 기재 요청내용이 허위이거나 문서의 범위를 벗어나는 경우에는 발급거부될 수 있습니다."}),e.jsx("textarea",{className:"customTextarea_1",placeholder:"추가 요청사항을 적어주세요",value:_,onChange:D})]})]}),e.jsxs("div",{className:"translateButtonsBox fixedBottom",children:[e.jsx("div",{className:"leftTitles",children:" "}),e.jsx("div",{className:"rightButtons",children:e.jsxs("div",{className:"translateButtons",children:[e.jsx(C,{to:"/dashboardQuitter",className:"meslinks",children:e.jsxs("div",{className:"prevButton",children:[e.jsx("div",{className:"imgBox",children:e.jsx(n,{src:"/web/img/left_button.svg",alt:"이전"})}),e.jsx("div",{className:"rightTitle",children:"이전"})]})}),!a.isEmpty(o)&&!a.isEmpty(d)?e.jsx("button",{className:"meslinks",onClick:()=>{h()},children:e.jsxs("div",{className:"nextButton nextBlueButton",children:[e.jsx("div",{className:"leftTitle",children:"다음"}),e.jsx("div",{className:"imgBox",children:e.jsx(n,{src:"/web/img/right_button.svg",alt:"다음"})})]})}):e.jsx("div",{className:"meslinks",children:e.jsxs("div",{className:"nextButton",children:[e.jsx("div",{className:"leftTitle",children:"다음"}),e.jsx("div",{className:"imgBox",children:e.jsx(n,{src:"/web/img/right_button.svg",alt:"다음"})})]})})]})})]})]})]})}export{W as default};
