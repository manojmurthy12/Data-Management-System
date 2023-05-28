import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "./AddCategory.module.css";
import axios from "axios";

const AddCategory = ({ onClose }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleAddCategory = () => {
    const payload = { categoryName: categoryName };
    axios.post("http://127.0.0.1:5000/add-category", payload)
      .then((response) => {
        // Handle success or do something with the response
        console.log(response.data);
        // window.location.reload
        window.location.reload();
        onClose(); // Close the AddCategory popup
      })
      .catch((error) => {
        // Handle error or display an error message
        console.error(error);
      });
  };

  return (
    <div className={styles.addcategory}>
      <div className={styles.categoryForm}>
        <div className={styles.component4Wrapper}>
          <div className={styles.component4}>
            <div className={styles.frameParent}>
              <div className={styles.frameGroup}>
                <div className={styles.charFieldParent}>
                  <div className={styles.charField}>Add Category</div>
                  <div className={styles.div}>*</div>
                </div>
                <div className={styles.div1}>31</div>
              </div>
              <TextField
                className={styles.frameChild}
                sx={{ width: 511 }}
                color="primary"
                variant="outlined"
                type="text"
                label="Category Title"
                size="medium"
                margin="none"
                required
                value={categoryName}
                onChange={handleCategoryNameChange}
              />
            </div>
            <div className={styles.enterFieldDescription}>
              Enter field description
            </div>
          </div>
        </div>
        <Button
          className={styles.buttoncontainedTextAndIco}
          variant="contained"
          color="primary"
          onClick={handleAddCategory}
        >
          Done
        </Button>
        <Button
          className={styles.buttonoutlinedTextAndIcon}
          variant="outlined"
          color="primary"
          onClick={onClose}
        >
          Cancel
        </Button>
        <form className={styles.component4Container}>
          <form className={styles.component4} method="post">
            <div className={styles.frameParent}>
              <div className={styles.frameDiv}>
                <div className={styles.charFieldParent}>
                  <div className={styles.charField1}>Add Category</div>
                  <div className={styles.div2}>*</div>
                </div>
                <div className={styles.div3}>31</div>
              </div>
              <TextField
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
              />
            </div>
            <div className={styles.enterFieldDescription1}>
              Enter field description
            </div>
          </form>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
