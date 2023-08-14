import React, { useEffect } from 'react'
import './ProfileModal.css' // Import your CSS file
import { createList, getUserLists, saveForLater } from '../../Redux/useraction'
import { connect } from 'react-redux'

function ListModal (props) {

  useEffect(() => {
    props.getUserLists(props.user.id)
  }, []);
  return (
    <div className='profile-modal'>
      <div className='profile-content'>
        <div className='profile-header'>
          <div>
           
            <span>Your List</span>
          </div>

          <button className='close-button' onClick={props.onClose}>
            Close
          </button>
        </div>
        <div className='profile-details'>
            {
                props.userLists.map(list=>{
                    return(
                        <div className='user-list' onClick={()=>props.saveForLater(list.id,props.postId)}>
                            {list.list_name}
                        </div>
                    )
                }
                )
            }
        </div>
      </div>
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
        saveForLater: (data,postId) => dispatch(saveForLater(data,postId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListModal);
