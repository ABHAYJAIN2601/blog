import React from 'react';
import './ProfileModal.css'; // Import your CSS file
import FollowerList from '../UserProfile/FollowerList';

function ProfileModal({ user, onClose }) {
  
  return (
    <div className="profile-modal">
      <div className="profile-content">
       
        <div className="profile-header">
            <div>
            <img src={'http://localhost:3001/man.png'} alt="User Avatar" className="avatar" />
          <span>{user.name}</span>
            </div>
         
          <button className="close-button" onClick={onClose}>
          Close
        </button>
        </div>
        <div className="profile-details">
          <p>Email: {user.email}</p>
    
          <p>Follower</p>
                  <FollowerList list={user.followed_user_ids} />
                  <p>Following</p>
                  <FollowerList list={user.followed_by_user_ids} />
          {/* Additional user details */}
        </div>
       
      </div>
    </div>
  );
}

export default ProfileModal;
