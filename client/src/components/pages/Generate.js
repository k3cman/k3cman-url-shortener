import React, { useState } from "react";
import * as yup from "yup";

export const Generate = () => {
  const [url, setUrl] = useState(123);
  const [handle, setHandle] = useState("");

  const schema = yup.object().shape({
    url: yup.string().trim().url().required(),
    handle: yup
      .string()
      .trim()
      .matches(/^[\w\-]+$/i)
      .nullable(),
  });

  const changeHandle = (e) => {
    setHandle(e.target.value);
  };

  const changeUrl = (e) => {
    setUrl(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log({
      url: url,
      handle: handle,
    });
    schema.validate({ url, handle }).then(
      () => {
        console.log("success");
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <div>
      <form>
        <label htmlFor="basic-url">Your URL *</label>
        <input
          type="text"
          className="form-control"
          id="basic-url"
          aria-describedby="basic-addon3"
          onChange={(e) => changeUrl(e)}
        />
        <label htmlFor="basic-url">Handle</label>
        <input name="basic-url" type="text" onChange={(e) => changeHandle(e)} />
        <button
          type="submit"
          id="submit"
          className="btn btn-primary"
          onClick={(e) => submitForm(e)}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
