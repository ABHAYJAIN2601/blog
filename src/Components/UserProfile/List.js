import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getList } from "../../Redux/useraction";
import BlogCard from "../Blog/BlogCard";

const List = (props) => {
    const params = useParams();
    useEffect(() => {
        props.getList(params.id);
    }, []);
    return (
        <div>
            {!props.listLoding ? (
                <div>
                    {props.userLists.map(list => {
                        return (<BlogCard post={list} />)
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
        getList: data => dispatch(getList(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(List);