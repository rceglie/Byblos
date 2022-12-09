import React, {useState, useEffect} from 'react'
import { useSelector } from "react-redux";
import Post from '../Groups/Post';
import "../../style/myinfo.css"
import {auth} from '../../actions/auth.js'
import { useNavigate } from "react-router-dom";
import * as api from "../../api";
import BetterTimeSelect from "../Util/BetterTimeSelect"
import BetterRoleSelect from "../Util/BetterRoleSelect"

const MyInfo = () => {

  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);
  const [group, setGroup] = useState([]);
  const [originalInfo, setOriginalInfo] = useState([]);
  const [discord, setDiscord] = useState("");
  const [originalDiscord, setOriginalDiscord] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const result = await auth();
      if (result){
        let userId = JSON.parse(localStorage.getItem("user"))._id
        const data = await api.fetchUser(userId);
        const groupdata = await api.getUserGroups({id: userId})
        console.log(groupdata.data)
        setDiscord(data.data.discord)
        setOriginalDiscord(data.data.discord)
        setInfo(data.data);
        setOriginalInfo(data.data)
        setUser(result)
        setGroup(groupdata.data)
      } else {
        setUser(null);
        //navigate("/myinfo");
      }
      setLoading(false);
    }
    fetchData();
  }, [])

  const handleSubmit = async () => {
    const result = await auth();
    if (result){
      
      if (originalDiscord.length > 10){
        let pack = {...info}
        pack.id = JSON.parse(localStorage.getItem("user"))._id
        console.log(pack)
        const ret = await api.setInfo(pack);
        const data = await api.fetchUser(JSON.parse(localStorage.getItem('user'))._id);
        setInfo(data.data)
        setOriginalInfo(data.data)
      } else {
        alert("Cannot update info without a Discord User ID. Please enter and save Discord User ID before saving info.")
      }
      
    } else {
      console.log("Error authenticating user")
    }
    
  }

  const handleRoleCallback = (childData) => {
    setInfo((prevState) => ({ ...prevState, roles: childData }));
};

const handleTimeCallback = (childData) => {
    console.log("callback:", childData)
    setInfo((prevState) => ({ ...prevState, times: childData }));
};

  return (
    <div>
      {loading ? <div className="my-info-wrapper"></div> : <>
        {!user ?
          <div className="my-info-wrapper">
            <p>Sign in to update your profile or make a group</p>
            <button onClick={() => navigate("/signin")} className="button-38">Sign In</button>
          </div>
          :
          <div className="my-info-wrapper">
            <div className="discord-link">
                <label htmlFor="discord">Insert Discord UserID. Click here to find out how to get it.</label>
                <input type="number" value={discord} name="discord" maxLength="50" onChange={(e) => setDiscord(e.target.value)}/>
                <span>{(discord == originalDiscord) ? "" : "Changes not saved"}</span>
                <button onClick={async () => {
                  const logg = await auth()
                  if (logg){
                    await api.setDiscord({discord, id: JSON.parse(localStorage.getItem("user"))._id});
                    setOriginalDiscord(discord);
                  } else {
                    console.log("login problem")
                  }
                }}>Save</button>
            </div>
            <div className="my-info">
            <span>My Information</span>
              <div className="fight">
                      <select value={info.fight} onChange={(e) =>
                          setInfo({
                              ...info,
                              fight: e.target.value
                          })}>
                          <option value="UWU">UWU</option>
                          <option value="UCOB">UCOB</option>
                          <option value="TEA">TEA</option>
                          <option value="DSU">DSU</option>
                          <option value="ANY">Any</option>
                      </select>
              </div>

              <div className="prog">
                  <select id="select-prog" value={info.prog} onChange={(e) =>
                      setInfo({ ...info, prog: e.target.value })}>
                      <option value="ANY">Any</option>
                      {info.fight == "ANY" && (
                          <>
                              <option disabled>Select Fight to Select Prog Point</option>
                          </>
                      )}
                      {info.fight == "UWU" && (
                          <>
                              <option>Fresh</option>
                              <option>Garuda</option>
                              <option>Ifrit</option>
                              <option>Titan</option>
                              <option>Predation</option>
                              <option>Annihilation</option>
                              <option>Suppression</option>
                              <option>Primal Roulette</option>
                          </>
                      )}
                      {info.fight == "UCOB" && (
                          <>
                              <option>Fresh</option>
                              <option>Twin</option>
                              <option>Nael</option>
                              <option>Quickmarch/Blackfire/Fellruin</option>
                              <option>Heavensfall</option>
                              <option>Tenstrike/Octet</option>
                              <option>Adds</option>
                              <option>Golden</option>
                          </>
                      )}
                      {info.fight == "TEA" && (
                          <>
                              <option>Fresh</option>
                              <option>Living Liquid</option>
                              <option>Brute Justice + Cruise Chaser</option>
                              <option>Inception</option>
                              <option>Wormhole</option>
                              <option>Perfect Alexander</option>
                          </>
                      )}
                      {info.fight == "DSU" && (
                          <>
                              <option>Fresh</option>
                              <option>Vault</option>
                              <option>Thordan 1</option>
                              <option>Nidstinien</option>
                              <option>Eyes</option>
                              <option>Thordan 2</option>
                              <option>Double Dragons</option>
                              <option>Dragon King</option>
                          </>
                      )}
                  </select>
              </div>

              <div className="exp">
                  <select id="exp-sel" value={info.exp} className="exp-sel" onChange={(e) => setInfo({ ...info, exp: e.target.value })}>
                      <option value="ANY">Any</option>
                      <option>First Ultimate Experience</option>
                      <option>Some Past Ultimate Prog</option>
                      <option>One Ultimate Clear</option>
                      <option>Double Legend</option>
                      <option>Triple Legend</option>
                  </select>
              </div> 

              <div className="ilvl">
                  <input type="number" value={info.ilvl} id="ilvl" name="ilvl" min="0" max="600" onChange={(e) => setInfo({ ...info, ilvl: e.target.value })}/>
              </div>

              <div className="times">
                  <BetterTimeSelect times={info.times} parentCallback={handleTimeCallback}/>
              </div>

              <div className='jobs'>
                <BetterRoleSelect roles={info.roles} parentCallback={handleRoleCallback} />
              </div>

              <div className="desc">
                <input  value={info.desc} id="desc" name="desc" onChange={(e) => setInfo({ ...info, desc: e.target.value })}/>
              </div>

              <label className="switch">
                <input type="checkbox" checked={info.active} onChange={(e) => setInfo({ ...info, active: !info.active })}/>
                <span className="slider round">Actively searching</span>
              </label>

              {JSON.stringify(originalInfo) == JSON.stringify(info) ? <></> : <span>Changes have not been saved</span>}
              <button onClick={() => handleSubmit()}>Save info</button>

            </div>



            <div className="my-posts">
              <div>
                <span>My Post</span>
                {group != null ? <Post post={group}/> : <>No Posts found</>}
              </div>
              <div>
                {group != null ?
                  <span>Max 1 group per user</span>
                  : 
                  <button onClick={() => navigate("/create")}>Create Post</button>
                }
              </div>
            </div>
          </div>
        }
        </>
      }
    </div>
  )
}

export default MyInfo