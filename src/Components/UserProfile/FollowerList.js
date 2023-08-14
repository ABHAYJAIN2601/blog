import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getList, unFollowUser } from "../../Redux/useraction";
import BlogCard from "../Blog/BlogCard";
import axios from 'axios';
import '../Blog/Blog.css';
const FollowerList = (props) => {
    const [profiles, setProfiles] = useState([]);
    const [listLoding, setListLoading] = useState(false);
    useEffect(() => {
       
        
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/profiles',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : {ids:props.list}
          };
          if(props.list && props.list.length==0){
            setListLoading(true);
          }
          if(props.list && props.list.length!=0)
          axios.request(config)
          .then((response) => {
            
            setProfiles(response.data.profiles);
            setListLoading(true);
          })
          .catch((error) => {
            console.log(error);
          });
    }, [props.list,props.user.followed_user_ids.length,props.user.followed_user_ids.length]);
    return (
        <div>
            {listLoding ? (
                <div>
                    
                    {profiles.map(list => {
                        return (<div className="author-section">
                              <img
              className='author-avatar'
              src={'http://localhost:3001/blog1.webp'}
              alt={list.name}
            />
                            <span className="blog-author">{list.name}</span>
                            <span className="blog-date">{list.email}</span>
                           
                            <span className="blog-topic">{'Follower '+list.followed_user_ids.length}</span>
                            <button className="follow" onClick={()=>props.unFollowUser(list.id)}>unFollow</button>
                        </div>)
                    })}
                    </div>
            ):<h1>Loading...</h1>}
        </div>
    )
};
const mapStateToProps = state => {
    return {
        user: state.userDetails,
        userLists: state.listData,
        listLoding: state.listDataLoading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getList: data => dispatch(getList(data)),
        unFollowUser: id => dispatch(unFollowUser(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FollowerList);