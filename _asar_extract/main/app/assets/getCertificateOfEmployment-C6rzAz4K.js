const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/customPopUp-1j2cuYYo.js","assets/index-ak5BsCze.js","assets/vendor-react-DLmlTesg.js","assets/vendor-pdf-D5Eab7jE.js","assets/index-D3sbFfH5.css","assets/calendar--0B3W6KM.js","assets/index-jnRmlWET.js","assets/isNativeReflectConstruct-XGLLvWSz.js","assets/createClass-BeTC7LXt.js","assets/toPropertyKey-Dg8hKEVS.js","assets/defineProperty-BKLqfx38.js","assets/index-8t4SYTBK.css","assets/moment-B-YVwB4U.js","assets/calendarPickOne-DVt-2j6P.js","assets/customPopUpForFunction-BNOnp2sE.js"])))=>i.map(i=>d[i]);
import{_ as p}from"./vendor-pdf-D5Eab7jE.js";import{j as e,I as n,l as a,b as c,a as g,L as u}from"./index-ak5BsCze.js";import{b as s,L as B,R as x}from"./vendor-react-DLmlTesg.js";import{h as V}from"./moment-B-YVwB4U.js";import"./ko-C39F15y_.js";import"./vendor-excel-CVVhhIhe.js";const C=x.lazy(()=>p(()=>import("./customPopUp-1j2cuYYo.js"),__vite__mapDeps([0,1,2,3,4])));x.lazy(()=>p(()=>import("./calendar--0B3W6KM.js"),__vite__mapDeps([5,3,1,2,4,6,7,8,9,10,11,12])));x.lazy(()=>p(()=>import("./calendarPickOne-DVt-2j6P.js"),__vite__mapDeps([13,3,1,2,4,6,7,8,9,10,11,12])));x.lazy(()=>p(()=>import("./customPopUpForFunction-BNOnp2sE.js"),__vite__mapDeps([14,1,2,3,4])));function K(){const[j,E]=s.useState(!1),[T,f]=s.useState(!1),[I,R]=s.useState(!1),[z,N]=s.useState(!1),[o,v]=s.useState(""),[d,k]=s.useState(""),[w,$]=s.useState("hide"),[M,q]=s.useState(!1),[P,Y]=s.useState(`
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
          주식회사 오베네프 <span class="signZone">$sign(인)</span>
      </div>
  
  </div>
`),D=t=>{const r=t.target.value;k(r)},L=t=>{$(t.target.value)};function A(t){return t.toString().length}const O=async()=>{try{const{data:t,status:r}=await g.get("/API/employmentCertificate/getCertificate");let l=`${V(new Date).format("YYYYMMDD")}`;if(a.isEmpty(t))v(`재직증명-${l}-0001`);else{const b=t[t.length-1];if(!a.isEmpty(a.get(b,"document_serial"))){const m=a.get(b,"document_serial").split("-");if(!a.isEmpty(m[1]))if(l==m[1]){let i=a.cloneDeep(m[2]);if(i){i=parseInt(i)+1;const y=A(i);if(y){i="";for(let S=0;S<4-y;S++)i+="0";i+=parseInt(m[2])+1,v(`재직증명-${l}-${i}`)}}}else v(`재직증명-${l}-0001`)}}}catch(t){console.log(t)}},h=async()=>{N(!0);try{const t=c.get("username"),r=c.get("_hid");let _={username:t,_hid:r,document_serial:o,status:"pending",DescriptionrequestReason:`<p>${d}</p>`,DescriptionAudit:"",EmploymentCertificate:P,ref_applicant:t,ref_directSuperior:"",showAddress:w};const{status:l}=await g.post("/API/employmentCertificate/applyCertificate",{tempData:_});l===201&&(f(!0),E(!1),u({level:"INFO",message:"재직증명서 신청 완료",userId:c.get("username"),action:"재직증명서 신청",status:"성공",additionalInfo:"재직증명서를 성공적으로 신청하였습니다.",page:"재직증명서"}),setTimeout(()=>{N(!1)},5e3))}catch(t){g.isAxiosError(t)&&t.response?t.response.status===403?(console.log("error 발생"),u({level:"ERROR",message:"재직증명서 신청 실패",userId:c.get("username"),action:"재직증명서 신청",status:"실패",additionalInfo:"재직증명서 신청에 실패하였습니다.",page:"재직증명서"})):(console.log("다른 HTTP 오류: ",t.response.status),u({level:"ERROR",message:"재직증명서 신청 실패",userId:c.get("username"),action:"재직증명서 신청",status:"실패",additionalInfo:"재직증명서 신청에 실패하였습니다.",page:"재직증명서"})):(console.error("네트워크 또는 알 수 없는 오류: ",t),u({level:"ERROR",message:"재직증명서 신청 실패",userId:c.get("username"),action:"재직증명서 신청",status:"실패",additionalInfo:"재직증명서 신청에 실패하였습니다.",page:"재직증명서"}))}};return s.useEffect(()=>{j&&h()},[j]),s.useEffect(()=>{O()},[]),e.jsxs("div",{className:"document",children:[T&&e.jsx(s.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(C,{title:"재직증명서 신청이 완료 되었습니다.",text:"담당 관리자가 검토 예정입니다.",buttons:!0,closeState:f,buttonContent:{confirmValue:{text:"확인",link:"/document"}},icon:!0})}),I&&e.jsx(s.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(C,{title:"재직증명서를 신청할 수 없습니다.",text:"관리자에게 문의바랍니다.",buttons:!0,closeState:R,buttonContent:{cancleValue:{text:"확인",link:"/"}},icon:!1})}),e.jsxs("div",{className:"inContent",children:[e.jsxs("div",{className:"translateButtonsBox",children:[e.jsx("div",{className:"leftTitles",children:"재직증명서 발급 신청"}),e.jsx("div",{className:"rightButtons",children:e.jsxs("div",{className:"translateButtons",children:[e.jsx(B,{to:"/document",className:"meslinks",children:e.jsxs("div",{className:"prevButton",children:[e.jsx("div",{className:"imgBox",children:e.jsx(n,{src:"/web/img/left_button.svg",alt:"이전"})}),e.jsx("div",{className:"rightTitle",children:"이전"})]})}),!a.isEmpty(o)&&!a.isEmpty(d)?e.jsx("button",{className:"meslinks",onClick:()=>{h()},children:e.jsxs("div",{className:"nextButton nextBlueButton",children:[e.jsx("div",{className:"leftTitle",children:"다음"}),e.jsx("div",{className:"imgBox",children:e.jsx(n,{src:"/web/img/right_button.svg",alt:"다음"})})]})}):e.jsx("div",{className:"meslinks",children:e.jsxs("div",{className:"nextButton",children:[e.jsx("div",{className:"leftTitle",children:"다음"}),e.jsx("div",{className:"imgBox",children:e.jsx(n,{src:"/web/img/right_button.svg",alt:"다음"})})]})})]})})]}),e.jsxs("div",{className:"applyCerti",children:[e.jsxs("div",{className:"applyBox",children:[e.jsx("div",{className:"applyCertiTitle required",children:"신청번호(자동발급)"}),e.jsx("div",{className:"selectDate",children:o})]}),e.jsxs("div",{className:"applyBox",children:[e.jsx("div",{className:"applyCertiTitle required",children:"세부근무지 표시여부"}),e.jsxs("select",{className:"customSelect_2",onChange:t=>{L(t)},children:[e.jsx("option",{value:"hide",children:"미표시"}),e.jsx("option",{value:"show",children:"표시"})]})]}),e.jsxs("div",{className:"applyBox",children:[e.jsx("div",{className:"applyCertiTitle required",children:"신청내용"}),e.jsx("textarea",{className:"customTextarea_1",placeholder:"신청내용을 적어주세요",value:d,onChange:D})]})]}),e.jsxs("div",{className:"translateButtonsBox fixedBottom",children:[e.jsx("div",{className:"leftTitles",children:" "}),e.jsx("div",{className:"rightButtons",children:e.jsxs("div",{className:"translateButtons",children:[e.jsx(B,{to:"/overtime",className:"meslinks",children:e.jsxs("div",{className:"prevButton",children:[e.jsx("div",{className:"imgBox",children:e.jsx(n,{src:"/web/img/left_button.svg",alt:"이전"})}),e.jsx("div",{className:"rightTitle",children:"이전"})]})}),!a.isEmpty(o)&&!a.isEmpty(d)?e.jsx("button",{className:"meslinks",onClick:()=>{h()},children:e.jsxs("div",{className:"nextButton nextBlueButton",children:[e.jsx("div",{className:"leftTitle",children:"다음"}),e.jsx("div",{className:"imgBox",children:e.jsx(n,{src:"/web/img/right_button.svg",alt:"다음"})})]})}):e.jsx("div",{className:"meslinks",children:e.jsxs("div",{className:"nextButton",children:[e.jsx("div",{className:"leftTitle",children:"다음"}),e.jsx("div",{className:"imgBox",children:e.jsx(n,{src:"/web/img/right_button.svg",alt:"다음"})})]})})]})})]})]})]})}export{K as default};
