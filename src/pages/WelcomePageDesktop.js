import React, { useState, useCallback, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import AddService from "../components/AddService";
import PortalPopup from "../components/PortalPopup";
import AddCategory from "../components/AddCategory";
import styles from "./WelcomePageDesktop.module.css";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

const WelcomePageDesktop = () => {
  const [isAddServicePopupOpen, setAddServicePopupOpen] = useState(false);
  const [isAddCategoryPopupOpen, setAddCategoryPopupOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const handleDeleteCategory = (categoryName) => {
    axios
      .delete(`http://127.0.0.1:5000/remove-category/${categoryName}`)
      .then((response) => {
        // Handle success or do something with the response
        console.log(response.data);
        // Refresh the categories after deletion
        window.location.reload()
      })
      .catch((error) => {
        // Handle error or display an error message
        console.error(error);
      });
  };
  
  const handleDeleteService = (categoryName, serviceName) => {
    axios
      .delete(
        `http://127.0.0.1:5000/remove-service/${categoryName}/${serviceName}`
      )
      .then((response) => {
        // Handle success or do something with the response
        console.log(response.data);
        // Refresh the categories after deletion
        window.location.reload()
      })
      .catch((error) => {
        // Handle error or display an error message
        console.error(error);
      });
  };

  const openAddServicePopup = useCallback(() => {
    setAddServicePopupOpen(true);
  }, []);

  const closeAddServicePopup = useCallback(() => {
    setAddServicePopupOpen(false);
    // window.location.reload
  }, []);

  const openAddCategoryPopup = useCallback(() => {
    setAddCategoryPopupOpen(true);
  }, []);

  const closeAddCategoryPopup = useCallback(() => {
    setAddCategoryPopupOpen(false);
    // window.location.reload
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/cat_service");
        const { sideNav } = response.data;
        setCategories(sideNav.categories);
      } catch (error) {
        console.error("Error fetching DTO data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className={styles.welcomePageDesktop}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <div className={styles.home}>Home</div>
          <div className={styles.div}>/</div>
          <div className={styles.home}>Knowledge Base</div>
          <div className={styles.installationAndSetup}>/</div>
          <div className={styles.installationAndSetup}>
            Installation and Setup
          </div>
        </div>

        {/* Search field */}
        <TextField
          className={styles.search}
          sx={{ width: 250 }}
          color="primary"
          variant="standard"
          type="text"
          id="search"
          label="Search..."
          placeholder="Placeholder"
          size="medium"
          margin="none"
        />

        {/* Logo */}
        <div className={styles.home1}>
          <div className={styles.div2} />
          <img className={styles.icon} alt="" src="/4103157-1026-2@2x.png" />
        </div>

        {/* Add Service button */}
        <Button
          className={styles.welcomePageDesktopChild}
          sx={{ width: 250 }}
          variant="outlined"
          color="primary"
          onClick={openAddServicePopup}
        >
          Add Service
        </Button>

        {/* Table of Contents */}
        <div className={styles.tableOfContentsParent}>
          <div className={styles.tableOfContents}>
            {/* Add Category button */}
            <Button
              className={styles.tableOfContentsChild}
              sx={{ width: 250 }}
              variant="outlined"
              color="primary"
              onClick={openAddCategoryPopup}
            >
              Add Category
            </Button>

            {/* Search */}
            <div className={styles.search1}>
              <div className={styles.searchChild} />
              <div className={styles.search2}>Search...</div>
              <img className={styles.frameIcon} alt="" src="/frame2.svg" />
            </div>

            {/* Categories and services */}
          
            <div className={styles.tableOfContents1}>
        {/* Add delete icon for category */}
        {categories.map((category, index) => (
          <div key={index} className={styles.t01}>
            <div className={styles.computeServicesParent}>
              <div className={styles.computeServices}>{category.name}</div>
              {/* <img
                className={styles.frameIcon1}
                alt=""
                src="/frame.svg"
              /> */}
              {/* Delete category button */}
              <IconButton
                className={styles.deleteButton}
                onClick={() => handleDeleteCategory(category.name)}
              >
                <DeleteIcon fontSize="small"/>
              </IconButton>
            </div>

            <div className={styles.introductionWrapper}>
              {/* Add delete icon for service */}
              {category.services.map((service, serviceIndex) => (
                <div key={serviceIndex} className={styles.serviceWrapper}>
                  <Link
                    className={styles.introduction}
                    to={`/form-page?category=${category.name}&service=${service.name}`}
                  >
                    {service.name}
                  </Link>
                  {/* Delete service button */}
                  <IconButton
                    className={styles.deleteButton}
                    onClick={() =>
                      handleDeleteService(category.name, service.name)
                    }
                  >
                    <DeleteIcon fontSize="small"/>
                  </IconButton>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>


  </div>
  
      {/* Cloud Services Management */}
      <div className={styles.image1Parent}>
        <img
          className={styles.image1Icon}
          alt=""
          src="/image-1@2x.png"
        />
        <b className={styles.cloudService}>
          <p className={styles.cloudServicesManagement}>
            Cloud Services Management
          </p>
        </b>
      </div>
    </div>

    {/* Profile */}
    <div className={styles.profile}>
      <img
        className={styles.profileChild}
        alt=""
        src="/ellipse-1.svg"
      />
      <img className={styles.groupIcon} alt="" src="/group.svg" />
    </div>
  </div>

  {/* Add Service Popup */}
  {isAddServicePopupOpen && (
    <PortalPopup
      overlayColor="rgba(113, 113, 113, 0.3)"
      placement="Centered"
    >
      <AddService onClose={closeAddServicePopup} />
    </PortalPopup>
  )}

  {/* Add Category Popup */}
  {isAddCategoryPopupOpen && (
    <PortalPopup
      overlayColor="rgba(113, 113, 113, 0.3)"
      placement="Centered"
      onOutsideClick={closeAddCategoryPopup}
    >
      <AddCategory onClose={closeAddCategoryPopup} />
    </PortalPopup>
  )}
</>
);
};

export default WelcomePageDesktop;  