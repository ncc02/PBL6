import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./SpecialityInfo.scss";
import { IoIosSave } from "react-icons/io";
import { MdCancel } from "react-icons/md";

class SpecialityInfoDialogue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNew: true,
      data: {},
    };
  }

  componentDidMount() {
    const { data } = this.props;
    if (data !== null) {
      this.setState({
        isNew: false,
        data: { ...data },
      });
    }
  }

  handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  closeSpID = () => {
    const { close } = this.props;
    close("SpID");
  };

  render() {
    const initialValues = {
      name: this.state.data.name || "",
      image: this.state.data.image || null,
    };
    const validationSchema = Yup.object().shape({
      name: Yup.string().required("Tên chuyên khoa là bắt buộc"),
      image: Yup.mixed().required("Ảnh đại diện là bắt buộc"),
    });
    const onSubmit = (values) => {
      console.log(values);
    };
    return (
      <div className="OverlayContainer">
        <div className="Close"></div>
        <div className="OverlayContent">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="SpecialityInfoDialogueContainer">
                <header className="SpIDHeader">
                  <h3 className="bold">
                    {this.props.isNew
                      ? "Thêm chuyên khoa"
                      : "Sửa đổi chuyên khoa"}
                  </h3>
                </header>
                <div className="SpIDContent">
                  <div className="SpIDCols">
                    <div className="SpIDAvt SpIDField">
                      <div className="SpIDAvtLabel SpIDLabel">Ảnh đại diện</div>
                      <div className="SpIDAvtInput">
                        <div className="SpIDAvtDisplay">
                          {this.state.image && (
                            <img src={this.state.image} alt=""></img>
                          )}
                        </div>
                        <div className="SpIDAvtChangeInput">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              setFieldValue("image", e.currentTarget.files);
                              this.handleImageChange(e);
                            }}
                          />
                        </div>
                      </div>
                      <ErrorMessage
                        name="image"
                        component="div"
                        className="error"
                        style={{ color: "red" }}
                      />
                    </div>
                    <div className="SpIDAccount SpIDField">
                      <div className="SpIDAccountLabel SpIDLabel">
                        Tên chuyên khoa
                      </div>
                      <Field
                        type="text"
                        id="SpIDAccountInput"
                        name="name"
                      ></Field>
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="error"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="SpIDAction">
                  <button
                    id="CancelButton"
                    type="button"
                    onClick={this.closeSpID}
                  >
                    <MdCancel /> Huỷ
                  </button>
                  <button id="SaveButton" type="submit" disabled={isSubmitting}>
                    <IoIosSave /> Lưu
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default SpecialityInfoDialogue;
