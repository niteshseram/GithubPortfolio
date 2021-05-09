import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "./../components/Link/Link";
import List from "../components/List/List";

const ProfileWrapper = styled.div`
  width: 50%;
  margin: 10px auto;
`;
const Avatar = styled.img`
  width: 150px;
  border-radius: 100px;
`;

const Profile = () => {
  const [data, setData] = useState({});
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await fetch("https://api.github.com/users/niteshseram");
        const profileJSON = await profile.json();
        const repos = await fetch(profileJSON.repos_url);
        const reposJSON = await repos.json();
        setData(profileJSON);
        setRepositories(reposJSON);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (loading || error) {
    return <div>{loading ? "Loading..." : error}.</div>;
  }

  const items = [
    {
      label: "Profile URL",
      value: <Link url={data.html_url} title="Github URL" />,
    },
    { label: "Repos URL", value: data.repos_url },
    { label: "Name", value: data.name },
    { label: "Location", value: data.location },
    { label: "Bio", value: data.bio },
  ];

  const projects = repositories.map((repository) => ({
    label: repository.name,
    value: <Link url={repository.html_url} title="Github URL" />,
  }));

  return (
    <ProfileWrapper>
      <Avatar src={data.avatar_url} alt="avatar" />
      <List title="Profile" items={items} />
      <List title="Projects" items={projects} />
    </ProfileWrapper>
  );
};
export default Profile;
