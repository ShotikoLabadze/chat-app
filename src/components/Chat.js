import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../context/AuthContext";

export default function Chat() {
  const history = useHistory();
  const { user } = useAuth();
  const [Loading, setLoading] = useState(true);

  async function handleLogout() {
    await auth.signOut();
    history.push("/");
  }

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };
  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formData = new FormData();
        formData.append("email", user.email);
        formData.append("username", user.email);
        formData.append("secret", user.uid);
        getFile(user.photoURL).then((avatar) => {
          formData.append("avatar", avatar, avatar.name);
        });
        axios
          .post("https://api.chatengine.io/users", formData, {
            headers: {
              "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
            },
          })
          .then(() => setLoading(false))
          .catch((error) => console.log(error));
      });
  }, [user, history]);

  if (!user || Loading) {
    return (
      <div id="loading-container">
        <div class="exponea-loading-backdrop">
          <div class="exponea-loading-icon"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Chat - App</div>

        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
}
