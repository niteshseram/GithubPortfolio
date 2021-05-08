import React, { useState, useEffect } from "react";

const Profile = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const profile = await fetch("https://api.github.com/users/niteshseram");
      const profileJSON = await profile.json();
      setData(profileJSON);
      setLoading(false);
    };
    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ul>
        <li>avatar_url: {data.avatar_url}</li>
        <li>html_url: {data.html_url}</li>
        <li>repos_url: {data.repos_url}</li>
        <li>name: {data.name}</li>
        <li>company: {data.company}</li>
        <li>location: {data.location}</li>
        <li>email: {data.email}</li>
        <li>bio: {data.bio}</li>
      </ul>
    </div>
  );
};
export default Profile;
