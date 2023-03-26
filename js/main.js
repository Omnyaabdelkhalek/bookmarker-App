// ------------global variable
var SitenameInput=document.getElementById('Sitename');
var SiteURLInput=document.getElementById('SiteURL');
var BtnAdd=document.getElementById('btnAdd');
var BtnUpdate=document.getElementById('btnUpdate');
var AlertName=document.getElementById('alertName');
var AlertUrl=document.getElementById('alertUrl');
var AlertExite=document.getElementById('alertExite');
var BookSearch=document.getElementById('booksearch');
var Books=[]
indexUpDate=0
// ---------------when start
BtnAdd.onclick=function showDate(){
      Addbook()
      displayDate()
      setLocal()
}
if(getLocal()!=null){
   Books= getLocal()
   displayDate()
}
// -------------------functions---------------
function Addbook(){
    if((nameValidation()==true)&(UrlValidation()==true)){
   var book={
    Name:SitenameInput.value,
    Url:SiteURLInput.value
   }
   Books.push(book);
   displayDate();
   setLocal();
   resetform();
   }
   
}
function displayDate(){
    var tableDate='';
    var word=BookSearch.value.toLowerCase();
    for (var i = 0; i < Books.length; i++) { 
    if(Books[i].Name.toLowerCase().includes(word)){
      tableDate+=`
      <tr>
         <td>
               ${Books[i].Name.toLowerCase().replaceAll(word,`<span class="bg-info">${word}</span>`)}
        </td>
        <td>
             <p class="small text-truncate" >${Books[i].Url}</p>
        </td>
        <td>
            <div class="hstack gap-3 justify-content-center">
                <a href="${Books[i].Url}"target="_blank"  class="btn btn-outline-dark">
                    <i class="fa-regular fa-eye"></i>
                </a>
                <button href="" target="_blank"  class="btn btn-outline-warning"  onclick="setUpdate(${i})">
                    <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button target="_blank"  class="btn btn-outline-danger" onclick="deletItem(${i})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </td>
    </tr>
        `
    
    }
}
document.getElementById('tableBody').innerHTML=tableDate;
}
function setLocal(){
    localStorage.setItem("bookscontainer",JSON.stringify(Books))
}
function getLocal(){
 return JSON.parse(localStorage.getItem("bookscontainer"))  ;
}
function resetform() {
    SitenameInput.value="";
    SiteURLInput.value=""
}
function deletItem(index){
  Books.splice(index,1)
 displayDate()
 setLocal()
}
function setUpdate(index){
 indexUpDate=index;
 var currentDate= Books[index];
 SitenameInput.value=currentDate.Name;
 SiteURLInput.value=currentDate.Url;
 BtnAdd.classList.add("d-none");
 BtnUpdate.classList.remove("d-none");
}
BtnUpdate.onclick= function(){
    upDate();
    resetform();
}
function upDate(){
    var book={
        Name:SitenameInput.value,
        Url:SiteURLInput.value
       }
    Books.splice(indexUpDate,1,book);
    displayDate();
    setLocal();
    BtnAdd.classList.remove("d-none");
    BtnUpdate.classList.add("d-none");
}
function searchDate(){
  displayDate();
}
BookSearch.oninput=function(){
    searchDate();
}
// ------------------validation
function nameValidation(){
    if(SitenameInput.value ===''){
        AlertName.classList.remove('d-none')
        return false;
    }
    else{      
          AlertName.classList.add('d-none')
          return true;
         }
}
function UrlValidation(){
    if(SiteURLInput.value ===''){
        AlertUrl.classList.remove('d-none')
        return false;
    }
    else{      
        var isExite=false;
         for (var i = 0; i < Books.length; i++) {
            if (Books[i].Url===SiteURLInput.value) {
                isExite=true;
                break;
            }
            
         }
         if (isExite===true) {
            AlertExite.classList.remove('d-none')
            return false;
         }
         else{
            AlertExite.classList.add('d-none')
        }
        AlertUrl.classList.add('d-none')
        return true;
        }
}