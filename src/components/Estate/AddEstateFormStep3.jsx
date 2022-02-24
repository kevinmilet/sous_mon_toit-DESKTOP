import React, { useContext} from "react";
import { Formik, Form} from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import colors from '../../utils/styles/colors';
import axios from 'axios';
import ApiRoutes from "../../utils/const/ApiRoutes";
import { Context } from "../../utils/context/Context";
import { StyledBtnPrimary } from "../../utils/styles/Atoms";
import { useParams } from 'react-router-dom';

// Style du container
const AddEstateContainer = styled.div`

    margin-top: -100px;
    background-color: ${colors.backgroundPrimary};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    -webkit-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    -moz-box-shadow:    0px 3px 6px rgba(0, 0, 0, 0.16);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
`
const ScrollDiv = styled.div`
    height:70vh;
    padding:20px;
    overflow:auto
`
const AddEstateH1 = styled.h1`
    color: ${colors.secondary};
`
const AddEstateH4 = styled.h4`
    color: ${colors.secondaryBtn};
`
const AddEstateLabel = styled.label`
    color: ${colors.secondary};
`
// const MyTextInput = ({ label, ...props }) => {
//     // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
//     // which we can spread on <input> and alse replace ErrorMessage entirely.
//     const [field, meta] = useField(props);
//     return (
//         <>
//             <div className="mb-3">
//                 <AddEstateLabel className="form-label">{label}</AddEstateLabel>
//                 <StyledInput className="text-input form-control" {...field} {...props} />
//                 {meta.touched && meta.error ? (
//                     <div className="error" style={{ color: "#E85A70", fontStyle: 'italic' }}>{meta.error}</div>
//                 ) : null}
//             </div>
//         </>
//     );
// };
// // const MyImageInput = ({ index, ...props }) => {
// //     return (
// //         <div className="row">
// //             <div className="col-4 d-flex justify-content-center align-items-center">
// //                 <img height="150" width="150" id={"file" + index} src="2" alt="Image Preview" />
// //             </div>
// //             <div className="col-6 d-flex justify-content-center align-items-center">
// //                 <input
// //                     accept="image/*"
// //                     type='file'
// //                     name={"file" + index}
// // onChange={(e) => {
// //     handleChange(e);
// //     setFieldValue("file"+ index , e.currentTarget.files[0]);
// //     ChangeImg(e.target);
// // }}
// //                 />
// //             </div>
// //         </div>
// //     );
// // };

const AddEstateFormStep3 = () => {

    const { id } = useParams();
    const API_URL = useContext(Context).apiUrl;

    // Insertion en bdd
    const InsertImg = (values) => {

        let formData = new FormData();
        formData.append('fileCover', values.fileCover);
        formData.append('file1', values.file1);
        formData.append('file2', values.file2);
        formData.append('file3', values.file3);

        // axios.post(API_URL + ApiRoutes.upload_pictures + "/" + id, formData)
        axios.post("http://localhost:8000/estates_pictures/upload/" + id, formData)
            .then(res => {
                console.log(res);
                window.location.href = '/detail-biens/' + id;

            }).catch(error => {
                console.log(error.response);
            })
    }

    //Changement de l'aperçu de l'image
    const ChangeImg = (target) => {
        var imagePreview = document.getElementById(target.name);
        const [file] = target.files
        if (file) {
            imagePreview.src = URL.createObjectURL(file)
        }
    }

    return (
        <>
            <AddEstateContainer className="container col-12 mx-auto p-3">
                <AddEstateH1 className="mx-auto p-2"> Ajouter des photos </AddEstateH1>
                <Formik
                    initialValues={{
                        fileCover: null,
                        file1: null,
                        file2: null,
                        file3: null
                    }}
                    validationSchema={Yup.object({
                        fileCover: Yup.mixed().required('La photo de couverture est obligatoire'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        await new Promise(r => setTimeout(r, 500));
                        setSubmitting(false);
                        InsertImg(values);
                    }}
                >
                    {({ handleChange, setFieldValue, errors }) => (
                        <ScrollDiv>
                            <Form id="pictureForm" encType="multipart/form-data">
                                <p>Les informations ont étaient enregistrés, vous pouvez ajouter les photos ultérieurement.</p>
                                <div className="p-3 border border-primary rounded">
                                    <AddEstateH4>Image de couverture</AddEstateH4>
                                    <div className="row">
                                        <div className="col-4 d-flex justify-content-center align-items-center">
                                            <img height="150" width="150" id="fileCover" src={ApiRoutes.COVER_ESTATE_BASE_URL + "estate_default.jpg"} alt="Image Preview" />
                                        </div>
                                        <div className="col-6 d-flex flex-column justify-content-center align-items-center">
                                            <input
                                                accept="image/*"
                                                type='file'
                                                name="fileCover"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setFieldValue("fileCover", e.currentTarget.files[0]);
                                                    ChangeImg(e.target);
                                                }}
                                            />
                                            <p className="error" style={{ color: "#E85A70", fontStyle: 'italic' }}>{errors.fileCover ?? null}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 border border-primary rounded">
                                    <AddEstateH4>Image supplémentaire</AddEstateH4>
                                    <div className="row">
                                        <div className="col-4 d-flex justify-content-center align-items-center">
                                            <img height="150" width="150" id="file1" src={ApiRoutes.COVER_ESTATE_BASE_URL + "estate_default.jpg"} alt="Image Preview" />
                                        </div>
                                        <div className="col-6 d-flex justify-content-center align-items-center">
                                            <input
                                                accept="image/*"
                                                type='file'
                                                name="file1"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setFieldValue("file1", e.currentTarget.files[0]);
                                                    ChangeImg(e.target);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4 d-flex justify-content-center align-items-center">
                                            <img height="150" width="150" id="file2" src={ApiRoutes.COVER_ESTATE_BASE_URL + "estate_default.jpg"} alt="Image Preview" />
                                        </div>
                                        <div className="col-6 d-flex justify-content-center align-items-center">
                                            <input
                                                accept="image/*"
                                                type='file'
                                                name="file2"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setFieldValue("file2", e.currentTarget.files[0]);
                                                    ChangeImg(e.target);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4 d-flex justify-content-center align-items-center">
                                            <img height="150" width="150" id="file3" src={ApiRoutes.COVER_ESTATE_BASE_URL + "estate_default.jpg"} alt="Image Preview" />
                                        </div>
                                        <div className="col-6 d-flex justify-content-center align-items-center">
                                            <input
                                                accept="image/*"
                                                type='file'
                                                name="file3"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setFieldValue("file3", e.currentTarget.files[0]);
                                                    ChangeImg(e.target);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <StyledBtnPrimary type="submit" className="btn m-3">Enregistrer les photos</StyledBtnPrimary>
                            </Form>
                        </ScrollDiv>
                    )}
                </Formik>
            </AddEstateContainer>
        </>
    );
};

export default AddEstateFormStep3;
