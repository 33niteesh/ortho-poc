import './App.css';
import {useState,useEffect} from "react";
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';
import ArrowDropUpTwoToneIcon from '@mui/icons-material/ArrowDropUpTwoTone';
import { connect } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {  SortFn,SortId, SortLn,SortFnDEC,SortIdDEC, SortLnDEC ,getData} from "./actions/index";
function App(props) {
  props.getData()
  const [data,setData]=useState();
  const [popup,setPopup]=useState(false);
  const [searchdata,setSearch]=useState([]);
  const box = [
    {  label: "S", checked: false },
    {  label: "M", checked: false },
    {  label: "L", checked: false },
  ]
  const [final, setFinal] = useState(box);
  const setlist = (e) => {
    let label = e?.label;
    var checked = e?.checked;
    let arr = final
    arr.map((ele) => {
      if (ele.label === label) {
        ele.checked = !checked
      }
    })
    setFinal([...arr])
  }
  const done = () =>{
        setFinal(box)
    const array = []
    final.map(ele=>{
      if(ele.checked===true){
        array.push(ele.label)
      }
    })
    var common =[];
    for(var i=0 ; i<data.length ; ++i) {
      for(var j=0 ; j<array.length ; ++j) {
        if(data[i].SIZE == array[j]) {       // If element is in both the arrays
          common.push(data[i]);        // Push to common array
        }
      }
    }
     setData(common); 
     setPopup(false)
  }
  const getDatafrom=()=>{
    const table = [
      {
          "id":1,
          "first_name":"Arjun",
          "SIZE":"S",
          "last_name":"Kapoor",
          "city":"Guntur",
          "pincode":93244
      },
      {
          "id":2,
          "first_name":"Rajesh",
          "SIZE":"S",
          "last_name":"Kumar",
          "city":"Chennai",
          "pincode":934824
      },
      {
          "id":3,
          "first_name":"Nithin",
          "SIZE":"M",
          "last_name":"Ghatkari",
          "city":"Pune",
          "pincode":892434
      },{
          "id":4,
          "first_name":"Ram",
          "SIZE":"M",
          "last_name":"Kaushik",
          "city":"Mumbai",
          "pincode":985235
      },{
          "id":5,
          "first_name":"Bipin",
          "SIZE":"L",
          "last_name":"Patel",
          "city":"Delhi",
          "pincode":908234
      },{
          "id":6,
          "first_name":"Raju",
          "SIZE":"M",
          "last_name":"Singh",
          "city":"Kolkata",
          "pincode":890032
      },
      {
          "id":7,
          "first_name":"Vickey",
          "SIZE":"S",
          "last_name":"Mudiraj",
          "city":"Indore",
          "pincode":100032
      },
      {
          "id":8,
          "first_name":"Sai Kumar",
          "SIZE":"L",
          "last_name":"Naidu",
          "city":"Banglore",
          "pincode":200032
      },
      {
          "id":9,
          "first_name":"Madhu",
          "SIZE":"M",
          "last_name":"Roy",
          "city":"Hyderabad",
          "pincode":500039
      },{
          "id":10,
          "first_name":"Jaishwal",
          "SIZE":"L",
          "last_name":"Harith",
          "city":"Hyderabad",
          "pincode":500032
      }
  ]
    setData(table);
  }
  useEffect(()=>{
    getDatafrom();
  },[])
  const sortbyId=()=>{
    props.SortId()
    setData(props.data)
  }
  const sortbyFn=()=>{
    props.SortFn()
    setData(props.data)
  }
  const sortbyLn=()=>{
    props.SortLn()
    setData(props.data)
  }
  const sortbyIdDEC=()=>{
    props.SortIdDEC();
    setData(props.data)
  }
  const sortbyFnDEC=()=>{
    props.SortFnDEC();
    setData(props.data)
  }
  const sortbyLnDEC=()=>{
    props.SortLnDEC()
    setData(props.data)
  }
  const closefilter=()=>{
    getDatafrom();
    setPopup(false);
  }
  const show=()=>{
    setFinal(box)
    getDatafrom();
    setPopup(true);
  }
  const search=(e)=>{
    getDatafrom();
    const search=data.filter((ele)=>ele.first_name.toLowerCase().includes(e.target.value)||ele.last_name.toLowerCase().includes(e.target.value))
    setSearch(search)

  }
  const searchresult=()=>{
    setData(searchdata)
  }
  return (
    <div className="App">
      <nav><p>Niteesh Satyapu   .</p></nav>
      <div className='division'>
      <input className='searchbar' placeholder='search' onChange={(e)=>search(e)}></input>
      <button className='filter-go' onClick={searchresult}> Go</button>
      <button className="filter" onClick={show}>Filter</button>
      </div>
      {
        popup ?<div className="popup">
      {
        final?.map((checkbox,key) => {
          return (
            <p className="main" key={key}>
              <input type="checkbox" className="checkbox" checked={checkbox.checked} className={checkbox.checked ? "input":"noinput"} onChange={() => setlist(checkbox)}  /><label className="label">{!checkbox.checked ? checkbox.label : <s>{checkbox.label}</s>}</label>
            </p>
          )
        })
      }
          <button className="filter-btn" onClick={() => { done() }}>Filter</button>
          <button className="filter-btn" onClick={closefilter}>close</button>

        </div>:<></>
      }
      <br></br>
        <Table className='table' sx={{ maxWidth: 950,maxHeight:600 }}>
          <TableHead className='th'>
          <TableRow>
            <TableCell className='td' sx={{padding:1,color: 'white'}}><div className="sort"><p>Si no</p> <div className="sort-icons"><ArrowDropUpTwoToneIcon onClick={sortbyId}/><ArrowDropDownTwoToneIcon onClick={sortbyIdDEC}/></div></div></TableCell>
            <TableCell className='td' sx={{padding:1,color: 'white'}}><div className="sort"><p>First name</p> <div className="sort-icons"><ArrowDropUpTwoToneIcon onClick={sortbyFn}/><ArrowDropDownTwoToneIcon onClick={sortbyFnDEC}/></div></div></TableCell>
            <TableCell className='td' sx={{padding:1,color: 'white'}}><div className="sort"><p>Last name</p>  <div className="sort-icons"><ArrowDropUpTwoToneIcon onClick={sortbyLn}/><ArrowDropDownTwoToneIcon onClick={sortbyLnDEC}/></div></div></TableCell>
            <TableCell className='td' sx={{padding:1,color: 'white'}}>SIZE</TableCell>
            <TableCell className='td' sx={{padding:1,color: 'white'}}>City</TableCell>
            <TableCell className='td' sx={{padding:1,color: 'white'}}>Pin</TableCell>
        </TableRow>
          </TableHead>
          <TableBody>
        {data?.map((i,j)=>{
          return(
            <TableRow key={i?.id}>
              <TableCell className='td' sx={{padding:1}}>{i?.id}</TableCell>
              <TableCell className='td' sx={{padding:1}}>{i?.first_name}</TableCell>
              <TableCell className='td' sx={{padding:1}}>{i?.last_name}</TableCell>
              <TableCell className='td' sx={{padding:1}}>{i?.SIZE}</TableCell>
              <TableCell className='td' sx={{padding:1}}>{i?.city}</TableCell>
              <TableCell className='td' sx={{padding:1}}>{i?.pincode}</TableCell>
            </TableRow>
          )
        })
        }
        </TableBody>
    </Table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.count
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SortId: () => dispatch(SortId()),
    SortFn: () => dispatch(SortFn()),
    SortLn:() => dispatch(SortLn()),
    getData:()=>dispatch(getData()),
    SortIdDEC: () => dispatch(SortIdDEC()),
    SortFnDEC: () => dispatch(SortFnDEC()),
    SortLnDEC:() => dispatch(SortLnDEC()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
