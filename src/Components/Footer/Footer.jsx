import React from "react";

export default function Footer() {
  const handleReload = (e) => {
    e.preventDefault();
  };

  return (
    <div className="footer py-3 px-5">
      <h4>Get The FreshCart App</h4>
      <p>We Will Send You a Link,open it on Your Phone</p>
      <form>
        <div className="btn-div form-item d-flex gap-4 mx-4">
          <input
            type="email"
            className="form-control flex-grow-1"
            id="email"
            name="email"
            placeholder="Email..."
          />
          <button
            onClick={handleReload}
            className="main-btn px-3 flex-shrink-0"
          >
            Share App Link
          </button>
        </div>
        <hr className="hr border-secondary" />
        <div className="copy text-center p-3">
          <div>
            <span>Copyrights 2024. Designed by </span>
            <span className="name-span fst-italic">
              Nadia Thabet
              <span className="heart ms-1"></span>
            </span>
          </div>
          <div>
            <span>All rights reserved.</span>
          </div>
        </div>
      </form>
    </div>
  );
}
