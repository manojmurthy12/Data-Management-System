import React, { useState, useCallback } from "react";
import { Button as MuiButton, TextField } from "@mui/material";
import { Menu, Dropdown, Button, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";
import styles from "./AddField.module.css";

import { useLocation } from "react-router-dom";

const AddField = ({ onClose }) => {
  const [categoryName, setCategoryName] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [fieldValue, setFieldValue] = useState("");
  const [fieldType, setFieldType] = useState("");
  const handleAddField = useCallback(() => {
    if (!fieldName) {
      message.error("Please fill in the Field Name");
      return;
    }
    
    let processedFieldValues = fieldValue;
    // if (fieldType === "List of Strings") {
    //   if (!fieldValue) {
    //     message.error("Please fill in the Field Values");
    //     return;
    //   }
  
    //   processedFieldValues = fieldValue
    //     .split(",")
    //     .map((value) => value.trim())
    //     .filter((value) => value !== "");
    // }
  
    const payload = {
      categoryName: category,
      serviceName: service,
      fieldName: fieldName,
      fieldValue: processedFieldValues,
      fieldType: fieldType
    };
  

    axios
      .post("http://127.0.0.1:5000/add-field", payload)
      .then((response) => {
        // Handle success or do something with the response
        console.log(response.data);
        window.location.reload();
        onClose(); // Close the AddField popup
      })
      .catch((error) => {
        // Handle error or display an error message
        console.error(error);
      });
  }, [categoryName, serviceName, fieldName, fieldValue, onClose]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const service = searchParams.get("service");
  const handleFieldTypeChange = (value) => {
    setFieldType(value);
  };

  return (
    <div className={styles.addfield}>
      <div className={styles.addserviceForm}>
        <div className={styles.frameParent}>
          <div className={styles.frameGroup}>
            <div className={styles.fieldTypeParent}>
              <div className={styles.fieldType}>Field Type</div>
              <div className={styles.div}>*</div>
            </div>
            <div className={styles.div1}>31</div>
          </div>
          <Dropdown
            className={styles.dropdownbutton}
            overlay={
              <Menu>
                {[{ value: "String" }, { value: "List of Strings" }].map(
                  (option, index) => (
                    <Menu.Item key={index}
                    onClick={()=>handleFieldTypeChange(option.value)}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        {option.value || ""}
                      </a>
                    </Menu.Item>
                  )
                )}
              </Menu>
            }
            placement="bottomCenter"
            trigger={["hover"]}
          >
            <Button onClick={(e) => e.preventDefault()}>
              {`Type `}
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <MuiButton
          className={styles.buttoncontainedTextAndIco}
          variant="contained"
          color="primary"
          onClick={handleAddField}
        >
          Done
        </MuiButton>
        <MuiButton
          className={styles.buttonoutlinedTextAndIcon}
          variant="outlined"
          color="primary"
          onClick={onClose}
        >
          Cancel
        </MuiButton>
        
        <TextField
          className={styles.addserviceFormItem}
          sx={{ width: 511 }}
          color="primary"
          variant="outlined"
          type="text"
          label="Field Values"
          placeholder="Placeholder"
          size="medium"
          margin="none"
          required
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
        />
        
        <TextField
          className={styles.frameTextfield}
          sx={{ width: 511 }}
          color="primary"
          variant="outlined"
          type="text"
          label="Field Name"
          placeholder="Placeholder"
          size="medium"
          margin="none"
          required
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AddField;
