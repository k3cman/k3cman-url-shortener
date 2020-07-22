import React from "react";

export const Generate = () => {
  return (
    <div>
      <form>
        <label for="basic-url">Your URL *</label>
        <input
          type="text"
          class="form-control"
          id="basic-url"
          aria-describedby="basic-addon3"
        />
        <label for="basic-url">Handle</label>
        <input
          type="text"
          class="form-control"
          id="handle"
          aria-describedby="basic-addon3"
        />
        <button type="submit" id="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
