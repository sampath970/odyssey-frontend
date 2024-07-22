import React from 'react';
import "./avatar.scss";

interface AvatarProps {
  avatar_name: string;
}

const Avatar: React.FC<AvatarProps> = ({ avatar_name }: AvatarProps) => {
  const firstLetter = avatar_name ? avatar_name[0].toUpperCase() : '';
  
  return (
    <div data-testid="avatar">
      <button className="avatar" id="avatar-btn">
        <div className="avatar__image">{firstLetter}</div>
        <span className="avatar__name">{avatar_name}</span>
      </button>
    </div>
  );
};

export default Avatar;

