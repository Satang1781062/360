import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchRuducers";
import { cartReducer } from "./cartRuducers";
import { drawerReducer } from "./drawerRuducer";
const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    cart:cartReducer,
    drawer:drawerReducer,
  });
  
  export default rootReducer
  