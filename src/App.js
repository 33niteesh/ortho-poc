import './App.css';
import {useState,useEffect} from "react";
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';
import ArrowDropUpTwoToneIcon from '@mui/icons-material/ArrowDropUpTwoTone';
import axios from 'axios';
import { connect } from "react-redux";
import {  SortFn,SortId, SortLn,SortFnDEC,SortIdDEC, SortLnDEC ,getData} from "./actions/index";

function App(props) {
  props.getData()
  const [data,setData]=useState();
  const [popup,setPopup]=useState(false);
  const box = [
    {  label: "S", checked: false },
    {  label: "M", checked: false },
    {  label: "L", checked: false },
  ]
  const [final, setFinal] = useState(box);
  const [newfruit,setNew]=useState();
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
    var table = [
         {
        "id":1,
        "first_name":"Arjun",
        "SIZE":"S",
        "last_name":"Kapoor"
    },
    {
        "id":2,
        "first_name":"Rajesh",
        "SIZE":"S",
        "last_name":"Kumar"
    },
    {
        "id":3,
        "first_name":"Nithin",
        "SIZE":"M",
        "last_name":"Ghatkari"
    },{
        "id":4,
        "first_name":"Ram",
        "SIZE":"M",
        "last_name":"Kaushik"
    },{
        "id":5,
        "first_name":"Bipin",
        "SIZE":"L",
        "last_name":"Patel"
    },{
        "id":6,
        "first_name":"Raju",
        "SIZE":"M",
        "last_name":"Singh"
    },
    {
        "id":7,
        "first_name":"Vickey",
        "SIZE":"S",
        "last_name":"Mudiraj"
    },
    {
        "id":8,
        "first_name":"Sai Kumar",
        "SIZE":"L",
        "last_name":"Naidu"
    },
    {
        "id":9,
        "first_name":"Madhu",
        "SIZE":"M",
        "last_name":"Roy"
    },{
        "id":10,
        "first_name":"Jaishwal",
        "SIZE":"L",
        "last_name":"Harith"
    }
    ]
    setData(table);
  };
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
    getDatafrom();
    setPopup(true);
  }
  return (
    <div className="App">
      <button className="filter" onClick={show}>Filter</button>
      {
        popup ?<div className="popup">
      {
        final?.map((checkbox,key) => {
          return (
            <p className="main" key={key}>
              <input type="checkbox" checked={checkbox.checked} className={checkbox.checked ? "input":"noinput"} onChange={() => setlist(checkbox)}  /><label className="label">{!checkbox.checked ? checkbox.label : <s>{checkbox.label}</s>}</label>
            </p>
          )
        })
      }
          <button className="filter-btn" onClick={() => { done() }}>Filter</button>
          <button className="filter-btn" onClick={closefilter}>close</button>

        </div>:<></>
      }
      <br></br>
        <table>
          <thead></thead>
          <tbody>
        <tr>
            <th><div className="sort"><p>Si no</p> <div className="sort-icons"><ArrowDropUpTwoToneIcon onClick={sortbyId}/><ArrowDropDownTwoToneIcon onClick={sortbyIdDEC}/></div></div></th>
            <th><div className="sort"><p>First name</p> <div className="sort-icons"><ArrowDropUpTwoToneIcon onClick={sortbyFn}/><ArrowDropDownTwoToneIcon onClick={sortbyFnDEC}/></div></div></th>
            <th><div className="sort"><p>Last name</p>  <div className="sort-icons"><ArrowDropUpTwoToneIcon onClick={sortbyLn}/><ArrowDropDownTwoToneIcon onClick={sortbyLnDEC}/></div></div></th>
            <th>SIZE</th>
        </tr>
        {data?.map((i,j)=>{
          return(
            <tr key={i?.id}>
              <td>{i?.id}</td>
              <td>{i?.first_name}</td>
              <td>{i?.last_name}</td>
              <td>{i?.SIZE}</td>
            </tr>
          )
        })
        }
        </tbody>
    </table>
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
