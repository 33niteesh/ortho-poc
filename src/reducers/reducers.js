import { SORTFN, SORTID, SORTLN,SORTFNDEC, SORTIDDEC, SORTLNDEC ,DATA} from "../actions/actionType";
import axios from "axios";
const InitialData =[
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

const data = axios.get("http://localhost:3001/data");
console.log(data)

const IncReducers = (state = InitialData, action) => {
  switch (action.type) {
    case SORTID:
      return {
        ...state,
        count: [...InitialData?.sort((a, b) => (a.id > b.id) ? 1 : -1)]
      };
      case SORTFN:
        return {
          ...state,
          count: [...InitialData?.sort((a, b) => (a.first_name > b.first_name) ? 1 : -1)]
        };
        case SORTLN:
      return {
        ...state,
        count: [...InitialData?.sort((a, b) => (a.last_name > b.last_name) ? 1 : -1)]
      };
      case SORTIDDEC:
      return {
        ...state,
        count: [...InitialData?.sort((a, b) => (a.id > b.id) ? -1 : 1)]
      };
      case SORTFNDEC:
        return {
          ...state,
          count: [...InitialData?.sort((a, b) => (a.first_name > b.first_name) ? -1 : 1)]
        };
        case SORTLNDEC:
      return {
        ...state,
        count: [...InitialData?.sort((a, b) => (a.last_name > b.last_name) ? -1 : 1)]
      };
      case DATA:
      return {
        ...state,
        count: InitialData
      };
    default:
      return state;
  }
};

export default IncReducers;
