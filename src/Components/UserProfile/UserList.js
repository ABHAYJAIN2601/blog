import React, { useEffect , useState } from "react"
import { createList, deleteList, getUserLists } from "../../Redux/useraction"
import { Link  } from "react-router-dom";
import { connect } from "react-redux"

const UserList = (props)=>{
    useEffect(()=>{
        props.getUserLists(props.user.id);
    },[])
    const [listName,setListName]=useState('')
    return(
        <div className="user-list-wrapper">
            <div>

            
            <input type="text" placeholder="Create New List" value={listName} onChange={(e)=>setListName(e.target.value)}/>
            <button className="blog-topic" onClick={()=>{props.createList(listName); setListName('')}}>Create</button>
            </div>
            {!props.listLoding?props.userLists.map(list=>{
                return(
                    <div>
                           <Link className='user-list' to={`/user-list/${list.id}`}>{list.list_name}</Link>
                           <button className="blog-topic" onClick={()=>props.deleteList(list.id)}>Delete</button>
                    </div>
                    
                     
           
                )
            }):<h1>Loading...</h1>}
        </div>
    )

}
const mapStateToProps = state => {
    return {
      user: state.userDetails,
        userLists: state.userLists,
        listLoding: state.listLoding
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getUserLists: data => dispatch(getUserLists(data)),
        createList: data => dispatch(createList(data)),
        deleteList: data => dispatch(deleteList(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserList);