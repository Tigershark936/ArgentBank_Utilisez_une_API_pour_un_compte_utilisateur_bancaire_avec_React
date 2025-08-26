


const UserWelcome = ({ firstName = "Tony", lastName = "Jarvis", onEdit }) => {
  return (
    <div className="header">
      <h1>
        Welcome back<br />
        {firstName} {lastName}!
      </h1>
      <button className="edit-button" onClick={onEdit}>Edit Name</button>
    </div>
  );
};

export default UserWelcome;
