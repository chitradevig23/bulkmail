import { useState } from "react";
import axios from 'axios';
import * as XLSX from "xlsx"


function App(){
const [msg,setmsg] = useState("")
const [status,setstatus]= useState(false)
const [emaillist,setEmaillist]= useState([])



function handlemsg(evt)
{
  setmsg(evt.target.value)
}

function handlefile(evt){
  const file=evt.target.files[0]

  const reader = new FileReader();

  reader.onload=function(e){
      const data = e.target.result;
      const workbook= XLSX.read(data,{type:'binary'})
      const sheetname=workbook.SheetNames[0]
      const worksheet= workbook.Sheets[sheetname]
      const emaillist=XLSX.utils.sheet_to_json(worksheet,{header:'A'})
      const totalemail= emaillist.map(function(item){return item.A})
      console.log(totalemail)
      setEmaillist(totalemail)

  }

  reader.readAsBinaryString(file)

}

function send(){
  setstatus(true)
 axios.post("http://localhost:5000/sendemail",{msg:msg,emaillist:emaillist})
 .then(function(data)
 {
  if(data.data === true){
    alert("Email sent successfully....")
  }
  else{
    alert("Failed")
  }
 })
}
  return(
   <div>
    <div className="bg-blue-950 text-white text-center">
<h1 className="text-2xl font-medium px-5 py-3">BulkMail</h1>
    </div>
    <div className="bg-blue-800 text-white text-center">
<h1 className="font-medium px-5 py-3">We can help your buisness with sending multiple emails at once</h1>
    </div>
    <div className="bg-blue-600 text-white text-center">
<h1 className="font-medium px-5 py-3">Drag and Drop</h1>
    </div>
    <div className="bg-blue-400 flex flex-col items-center text-black px-5 py-3">
      <textarea onChange={handlemsg} value={msg} className="w-[80%] h-32 py-2 outline-none px-2 border border-black rounded-md" placeholder="Enter the email text....."></textarea>
      <div>
      <input type="file" onChange={handlefile} className="border-4 border-dashed py-4 px-4 mt-5 mb-5"></input>
      
    </div>
    <p>Total Emails in the file :{emaillist.length}</p>
    <button onClick={send} className="bg-blue-950 py-2 px-2 text-white font-medium rounded-md w-fit mt-2">{status?"Sending...":"Send"}</button>
    </div>
    
    <div className="bg-blue-300 text-white text-center p-8">
<h1 className="font-medium px-5 py-3"></h1>
    </div>
    <div className="bg-blue-200 text-white text-center p-8">
<h1 className="font-medium px-5 py-3"></h1>
    </div>
    
   </div>
  )
}
export default App;