import React, { useEffect } from "react"
import { getUserLists } from "../../Redux/useraction"
import { Link  } from "react-router-dom";
import { connect } from "react-redux"

const UserList = (props)=>{
    useEffect(()=>{
        props.getUserLists(props.user.id);
    },[])
    return(
        <div>
            {!props.listLoding?props.userLists.map(list=>{
                return(
                    <div>
                        <Link to={`/user-list/${list.id}`}>{list.list_name}</Link>
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
        getUserLists: data => dispatch(getUserLists(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserList);