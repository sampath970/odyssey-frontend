import "./profile-image.scss";

const ProfileImage = ({ name, profileClick, status }) => {
  console.log(status);
  const getStatusColor = (status) =>{
    switch (status) {
        case "new":
            return "box-default";
        case "pending":
            return "box";
        case "review":
            return "box-review";
    }
  }
  return (
    <div
      className={getStatusColor(status)}
      onClick={profileClick}
      data-name={name}
    ></div>
  );
};
export default ProfileImage;
