import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getList } from "../../Redux/useraction";
import BlogCard from "../Blog/BlogCard";

const UserDraft = (props) => {
    // const params = useParams();
    // useEffect(() => {
    //     props.getList(params.id);
    // }, []);
    return (
        <div>
    
                <div>
                    {props.drafts.map(list => {
                        return (<BlogCard post={list} draft={true}/>)
                    })}
                    </div>
            
        </div>
    )
};
const mapStateToProps = state => {
    return {
        user: state.userDetails,
        drafts: state.drafts,
        listLoding: state.listDataLoading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getList: data => dispatch(getList(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserDraft);