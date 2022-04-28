import "./Signup.css";
import React, { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  const handleFileChange = (e) => {
    // reset thumbnail back to null.
    setThumbnail(null);
    // select the first file.
    let selected = e.target.files[0];
    // check if file is jpg
    if (!selected) {
      setThumbnailError("Please Select a File.");
      return;
    }
    if (!selected.type.includes("image")) {
      // if type property doesn't include 'image' -> error
      setThumbnailError("Please choose an Image file.");
      return;
    }
    if (selected.size > 300000) {
      // if file is greater than 300,000 bytes -> error
      setThumbnailError("Image file size must be less than 300kb.");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
    console.log("thumbnail updated!");
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Create an account</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        <span>nickname:</span>
        <input
          type="text"
          required
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>
      <label>
        <span>profile pic: </span>
        <input type="file" required onChange={handleFileChange} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {isPending ? (
        <button disabled className="btn">
          loading..
        </button>
      ) : (
        <button className="btn">sign up</button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
