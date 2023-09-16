import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../AddEtablissement/AddEtablissement.css";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";

const AddEtablissement = () => {
  const [EtablissementData, setEtablissementData] = useState();
  const [cookie] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!cookie.jwt) {
      navigate("/admin");
      return;
    }
  }, [navigate, cookie.token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!EtablissementData.nometab) {
      toast.error("Name is required");
      return;
    }
    if (!EtablissementData.typetab) {
      toast.error("Name is required");
      return;
    }

    axios
      .post(
        "/admin/add",
        { ...EtablissementData },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status) {
          console.log("1");
          toast.success(response.data.message, {
            position: "top-center",
          });
        } else if (response.data.codeName === "DuplicateKey") {
          console.log("2");

          toast.error("User with same email already exists", {
            position: "top-center",
          });
        } else {
          toast.error(response.data.errors.email, {
            position: "top-center",
          });
        }
      });
    navigate("/admin/list");
  };
  return (
    <div className="containerss">
      <div className="wrapper">
        <div className="title">
          <span>Ajouter un ETablissement</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="name">Nom Etablissement</label>
            <input
              type="text"
              name="firstname"
              placeholder="Nom"
              onChange={(e) => {
                setEtablissementData({ ...EtablissementData, nometab: e.target.value });
              }}
            />
          </div>
          <div className="row">
            <label htmlFor="name">typetab</label>
            <input
              type="text"
              name="typetab"
              placeholder="typetab"
              onChange={(e) => {
                setEtablissementData({ ...EtablissementData, typetab: e.target.value });
              }}
            />
          </div>

          <div className="row button">
            <input type="submit" value="ADD USER" />
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddEtablissement;
