import { useState, useCallback, useEffect } from "react";
import "antd/dist/antd.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button as MuiButton, TextField } from "@mui/material";
import {
  Menu as AntMenu,
  Dropdown as AntDropdown,
  Button as AntButton,
} from "antd";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { Form } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  DownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CalendarOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  HeartOutlined,
  LeftOutlined,
  LockOutlined,
  MailOutlined,
  PaperClipOutlined,
  PhoneOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
  RightOutlined,
  SearchOutlined,
  SendOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import AddService from "../components/AddService";
import PortalPopup from "../components/PortalPopup";
import AddField from "../components/AddField";
import AddCategory from "../components/AddCategory";
import styles from "./FormPage.module.css";
import { useLocation } from "react-router-dom";

// import {useHistory } from "react-router-dom";

// Inside your component
// const history = useHistory();

const handleLinkClick = () => {
  // Perform any necessary actions before navigation
  // ...

  // Reload the page after navigation
  window.location.reload();
};


const FormPage = () => {
  const [isAddServicePopupOpen, setAddServicePopupOpen] = useState(false);
  const [isAddFieldPopupOpen, setAddFieldPopupOpen] = useState(false);
  const [isAddCategoryPopupOpen, setAddCategoryPopupOpen] = useState(false);
  const [fields, setFields] = useState({});
  const [categories, setCategories] = useState([]);
  const openAddServicePopup = useCallback(() => {
    setAddServicePopupOpen(true);
  }, []);

  const closeAddServicePopup = useCallback(() => {
    setAddServicePopupOpen(false);
  }, []);

  const openAddFieldPopup = useCallback(() => {
    setAddFieldPopupOpen(true);
  }, []);

  const closeAddFieldPopup = useCallback(() => {
    setAddFieldPopupOpen(false);
  }, []);


  const openAddCategoryPopup = useCallback(() => {
    setAddCategoryPopupOpen(true);
  }, []);

  const closeAddCategoryPopup = useCallback(() => {
    setAddCategoryPopupOpen(false);
  }, []);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const service = searchParams.get("service");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/cat_service");
        const { sideNav } = response.data;
        setCategories(sideNav.categories);

        const response2 = await axios.get("http://127.0.0.1:5000/fields/"+category+"/"+service);
        const res = response2.data;
        // setCategories(res.categories);
        const fields = {};
        res.forEach((field) => {
          let processedFieldValues = field.value;
          if (field.type === "List of Strings") {
           
            processedFieldValues = field.value
              .split(",")
              .map((value) => value.trim())
              .filter((value) => value !== "");
          }
          Object.assign(fields, { [field.name]: processedFieldValues });
        });

        setFields(fields);

      } catch (error) {
        console.error("Error fetching DTO data:", error);
      }
    };

    fetchData();
  }, []);

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
        `http://127.0.0.1:5000/remove-service/${categoryName}/${serviceName}`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
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


  const handleDoneButton = useCallback(() => {
    // print(fields)
    axios
      .put("http://127.0.0.1:5000/update-fields", {
        "categoryName": category,
        "serviceName": service,
        "fields": fields
      })
      .then((response) => {
        // Handle success or do something with the response
        console.log(response.data);
        // window.location.reload();
      })
      .catch((error) => {
        // Handle error or display an error message
        console.error(error);
      });
  });
  const handleInputChange = (fieldName, value) => {
    setFields((prevFields) => ({ ...prevFields, [fieldName]: value }));
  };
  const handleDeleteField = (fieldName) => {
    axios
      .post("http://127.0.0.1:5000/remove-field", {
        
       "categoryName": category,
       "serviceName":service,
       "fieldName":fieldName
      })
      .then((response) => {
        // Handle success if needed
        window.location.reload()
      })
      .catch((error) => {
        // Handle error if needed
      });
  };
  const renderField = (fieldName, fieldValue) => {

    if (typeof fieldValue === "string") {
      return (
        <div type="row"
        className={styles.TextWrapper}>
<TextField
          
          key={
            fieldName}
          label={fieldName}
          value={fields[fieldName] || ""}
          onChange={(e) => setFields((prevFields) => ({ ...prevFields, [fieldName]: e.target.value }))}
          variant="outlined"
          type="text"
          placeholder="Placeholder"
          size="medium"
          margin="none"
          required
        />
        <IconButton
                        className={styles.deleteButton}
                        onClick={() => handleDeleteField(fieldName)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
        </div>
        
      );
    } else if (Array.isArray(fieldValue)) {
      return (
        <div type="row"
        className={styles.TextWrapper}
        >
        <AntDropdown
          key={fieldName}
          overlay={
            <AntMenu>
              {
              fieldValue.map((option, index) => (
                <AntMenu.Item key={index}>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setFields((prevFields) => ({ ...prevFields, [fieldName]: option }));
                    }}
                  >
                    {option || ""}
                  </a>
                </AntMenu.Item>
              ))}
            </AntMenu>
          }
          placement="bottom"
          trigger={["hover"]}
        >
          <AntButton onClick={(e) => e.preventDefault()}>
            {fieldName} <DownOutlined />
          </AntButton>
        </AntDropdown>
        <IconButton
                        className={styles.deleteButton}
                        onClick={() => handleDeleteField(fieldName)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
        </div>

      );
    }
  };

  return (
    <>
      <div className={styles.formPage}>
        <div className={styles.breadcrumb}>
          <div className={styles.home}>{category}</div>
          <div className={styles.div}>/</div>
          <div className={styles.home}>{service}</div>
          <div className={styles.installationAndSetup}>/</div>
          <div className={styles.installationAndSetup}>
            Installation and Setup
          </div>
        </div>
        <Form.Group className={styles.searchFormgroup}>
          <Form.Label>Search...</Form.Label>
          <Form.Control type="text" placeholder="Input placeholder" />
        </Form.Group>
        <div className={styles.profile}>
          <img className={styles.profileChild} alt="" src="/ellipse-1.svg" />
          <img className={styles.groupIcon} alt="" src="/group.svg" />
        </div>
        <MuiButton
          className={styles.formPageChild}
          sx={{ width: 257 }}
          variant="outlined"
          color="primary"
          onClick={openAddServicePopup}
        >
          Add Service
        </MuiButton>
        <MuiButton
          className={styles.formPageItem}
          sx={{ width: 970 }}
          variant="outlined"
          name="Add field"
          id="add_field"
          color="primary"
          onClick={openAddFieldPopup}
        >
          Add field
        </MuiButton>
        <form className={styles.form} method="get" >
          <div className={styles.addserviceFormChild}>
            {Object.entries(fields).map(([name, value]) =>
              renderField(name, value)
            )}
          </div>
          <div className={styles.buttoncontainedTextAndIco}>
            <MuiButton
              className={styles.buttoncontainedTextAndIco}
              variant="contained"
              color="primary"
              onClick={handleDoneButton}
            >
              Done
            </MuiButton>
            <MuiButton
              className={styles.buttonoutlinedTextAndIcon}
              variant="outlined"
              color="primary"
              onClick={() => window.location.reload()}
            >
              reload
            </MuiButton>
          </div>


        </form>
        <div className={styles.tableOfContentsParent}>
          <div className={styles.tableOfContents}>
            <MuiButton
              className={styles.tableOfContentsChild}
              sx={{ width: 250 }}
              variant="outlined"
              color="primary"
              onClick={openAddCategoryPopup}
            >
              Add Category
            </MuiButton>
            <div className={styles.search}>
              <div className={styles.searchChild} />
              <div className={styles.search1}>Search...</div>
              <img className={styles.frameIcon} alt="" src="/frame1.svg" />
            </div>
            <div className={styles.tableOfContentsParent}>
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
                        <DeleteIcon fontSize="small" />
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
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* ... */}
            </div>
          </div>
          <Link className={styles.image1Parent} to="/">
            <img className={styles.image1Icon} alt="" src="/image-1@2x.png" />
            <b className={styles.cloudService}>
              <p className={styles.cloudServicesManagement}>
                Cloud Services Management
              </p>
            </b>
          </Link>
        </div>
      </div>
      {isAddServicePopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeAddServicePopup}
        >
          <AddService onClose={closeAddServicePopup} />
        </PortalPopup>
      )}
      {isAddFieldPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeAddFieldPopup}
        >
          <AddField onClose={closeAddFieldPopup} />
        </PortalPopup>
      )}
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

export default FormPage;
