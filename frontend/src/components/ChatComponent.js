import React, { useState, useEffect } from "react";
import { ChatEngine } from "react-chat-engine";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import "../styles/ChatComponent.css";

function ChatComponent() {
  const [loading, setLoading] = useState(true);

  // Get user info from Redux store
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  useEffect(() => {
    if (!userInfo) {
      setLoading(false);
      return;
    }

    // ChatEngine will automatically attempt to connect once rendered
    setLoading(false);
  }, [userInfo]);

  if (!userInfo) {
    return (
      <div className="chat-auth-message">
        <h2>Please login to access the chat</h2>
        <p>You need to be logged in to use our customer support chat.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="chat-loading">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Customer Support</h2>
      </div>

      <ChatEngine
        projectID="YOUR_CHAT_ENGINE_PROJECT_ID" // Replace with your project ID from chatengine.io
        userName={userInfo.username} // Using the logged-in user's username
        userSecret={userInfo.id.toString()} // Using the user ID as the secret (you might want to use something more secure)
        height="calc(100vh - 200px)"
      />

      <div className="chat-info">
        <p>
          Need help with your order? Our support team is here to assist you!
        </p>
      </div>
    </div>
  );
}

export default ChatComponent;
