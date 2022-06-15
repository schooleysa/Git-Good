import './App.css';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {useState} from 'react';

function App() {
  const [user, setUser] = useState();
  const [userImg, setUserImg] = useState();
  const [userName, setUserName] = useState();
  const [userBio, setUserBio] = useState();
  const [userRepos, setUserRepos] = useState();
  const [search, setSearch] = useState(false);
  const [noRepos, setNoRepos] = useState(false)

function newSearch() {
  setSearch(false)
  setNoRepos(false)
  setUser("")
  setUserImg("")
  setUserName("")
  setUserBio("")
  setUserRepos("")
};


function getPublicRepos() {
    fetch(`https://api.github.com/users/${user}/repos`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.message === "Not Found"){
            // setUserRepos(noRepos);
            setNoRepos(true);
          }
          else{
          const list = result.map((item) => (
              <div className="repoList">
                <a target="_blank" rel="noreferrer" href={item.svn_url}>
                  {item.name}
                </a>
              </div>
          ));
          setUserRepos(list); 
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  const handleNameChange = (e) => { 
    setUser(e.target.value);
}

  function getUser () {

    fetch(`https://api.github.com/users/${user}`)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.message === "Not Found"){
            setSearch(true);
            setUserName("No user found.  Please try a new search");
          }
          else{
          setUserImg(result.avatar_url);
          setUserName(result.login);
          setUserBio(result.bio);
          setSearch(true);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div className="App">
      <h1 className="justify-content-center w-100 d-flex">Git G<span className="logo-o o1">o</span><span className="logo-o o2">o</span>d</h1>
      {search ?
      <div className="user-container justify-content-center align-items-center w-100 d-flex flex-column">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={userImg}/>
          <Card.Body>
            <Card.Title className="justify-content-center align-items-center w-100 d-flex">{userName}</Card.Title>
              <p>{userBio}</p>
            <div className="justify-content-center align-items-center w-100 d-flex flex-column">
            <Button variant="primary" onClick = {getPublicRepos} >Show Public Repos</Button>
            {noRepos ?
            <p className="noRepos">User has no public repos</p>
            :
            userRepos
            }
            </div>
          </Card.Body>
        </Card>
        <Button className="reset" onClick = {newSearch} >New Search</Button>
      </div>
      : 
      <div className="search-container justify-content-center align-items-center w-100 d-flex">
         <label className="sr-only">Enter GitHub Username</label>
         <input placeholder="Enter GitHub Username" type="text" onChange = {handleNameChange} />
         <Button variant="primary" onClick = {getUser} >Search</Button>
      </div>
      }
    </div>
  );
}

export default App;
