import React, { useState, useEffect, useCallback } from "react";
import { Input, message, Select } from "antd";
import { Button as MuiButton} from "@mui/material";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";
import styles from "./AddService.module.css";

const AddService = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    // Fetch category options from the API
    axios
      .get("http://127.0.0.1:5000/cat_service")
      .then((response) => {
        const categories = response.data.sideNav.categories;
        const options = categories.map((category) => category.name);
        setCategoryOptions(options);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAddService = useCallback(() => {
    if (!selectedCategory || !serviceName) {
      message.error("Please select a category and enter a service name");
      return;
    }

    const payload = {
      categoryName: selectedCategory,
      serviceName: serviceName,
    };

    axios
      .post("http://127.0.0.1:5000/add-service", payload)
      .then((response) => {
        // Handle success or do something with the response
        console.log(response.data);
        window.location.reload();
        onClose(); // Close the AddService popup
      })
      .catch((error) => {
        // Handle error or display an error message
        console.error(error);
      });
  }, [selectedCategory, serviceName, onClose]);

  return (
    <div className={styles.addservice}>
      <div className={styles.addserviceForm}>
        <div className={styles.frameParent}>
          <div className={styles.frameGroup}>
            <div className={styles.chooseCategoryParent}>
              <div className={styles.chooseCategory}>Choose Category</div>
              <div className={styles.div}>*</div>
            </div>
            <div className={styles.div1}>31</div>
          </div>
          <Dropdown
            className={styles.dropdownbutton}
            overlay={
              <Menu>
                {categoryOptions.map((option, index) => (
                  <Menu.Item key={index}>
                    <a onClick={() => handleCategorySelect(option)}>{option}</a>
                  </Menu.Item>
                ))}
              </Menu>
            }
            placement="bottomCenter"
            trigger={["hover"]}
          >
            <MuiButton onClick={(e) => e.preventDefault()}>
              {selectedCategory ? `Category: ${selectedCategory}` : "Category"}
              <DownOutlined />
            </MuiButton>
          </Dropdown>
        </div>
        <div className={styles.component4Wrapper}>
          <div className={styles.component4}>
            <div className={styles.frameContainer}>
              <div className={styles.frameDiv}>
                <div className={styles.charFieldParent}>
                  <div className={styles.chooseCategory}>Add Category</div>
                  <div className={styles.div}>*</div>
                </div>
                <div className={styles.div1}>31</div>
              </div>
              <Input
                className={styles.frameChild}
                sx={{ width: 511 }}
                color="primary"
                variant="outlined"
               
                type="text"
                label="Service Title"
                placeholder="Placeholder"
                size="medium"
                margin="none"
                required
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                />
                </div>
                <div className={styles.enterFieldDescription}>
                Enter field description
                </div>
                </div>
                </div>
                <MuiButton
                       className={styles.buttoncontainedTextAndIco}
                       variant="contained"
                       color="primary"
                       onClick={handleAddService}
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
                </div>
                </div>
                );
                };
                
                export default AddService;