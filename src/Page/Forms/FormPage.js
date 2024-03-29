// FormPage.js
import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { ProfileForm, CustomForm } from "./Form";
import "./FormPage.css";
import {
  handleAddCustomForm,
  handleListChange,
  handleRemoveCustomForm,
} from "./FormActions/Actions";
// import { addData } from "../../app/profileSlice";

const FormPage = () => {
  // const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    profile: { name: "", org: "", date: "", desc: "" },
    customForms: [{ title: "", desc: "", lists: [] }],
  });

  const handleProfileInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      profile: {
        ...prevFormData.profile,
        [name]: value,
      },
    }));
  };

  const handleCustomFormInputChange = (name, value, index) => {
    setFormData((prevFormData) => {
      const customForms = [...prevFormData.customForms];
      customForms[index] = {
        ...customForms[index],
        [name]: value,
      };
      return {
        ...prevFormData,
        customForms,
      };
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      name: formData.profile.title,
      org: formData.profile.org,
      date: formData.profile.date,
      desc: formData.profile.desc,
    };

    const customFormsData = formData.customForms.map((form) => ({
      title: form.title,
      desc: form.desc,
      lists: form.lists,
    }));

    const formDataJson = {
      profile: profileData,
      customForms: customFormsData,
    };
    console.log("Data Recieved = ", formDataJson);
    // dispatch(addData(formDataJson));
  };

  useEffect(() => {
    if (formData.customForms.length === 0) {
      handleAddCustomForm();
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <ProfileForm handleProfileInputChange={handleProfileInputChange} />
      {formData.customForms.map((form, index) => (
        <CustomForm
          key={index}
          index={index}
          form={form}
          handleCustomFormInputChange={(name, value) => handleCustomFormInputChange(name, value, index)}
          onListChange={(value) => handleListChange(index, value, setFormData)}
        />
      ))}
      
      <div className="form-button-container">
        <div className="button-container">
          <button
            type="button"
            onClick={() => handleAddCustomForm({ setFormData })}
          >
            Add Custom Form
          </button>
          <button
            type="button"
            onClick={() => handleRemoveCustomForm(formData, setFormData)}
          >
            Remove Custom Form
          </button>
        </div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default FormPage;
