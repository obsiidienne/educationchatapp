import React, { useEffect, useState } from "react";
import "../EtablissementHome/EtablissementHome.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setEtablissementDetails } from "../../redux/etablissementSlice";

const EtabHome = () => {
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies([]);
  const [alletab, setAllEtab] = useState([]);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!cookie.jwt) {
      navigate("/admin");
    }
    getEtabList();
  }, [cookie, navigate, removeCookie]);

  function getEtabList() {
    axios
      .get("/admin/etablissementlist", { withCredentials: true })
      .then((response) => {
        // console.log(response);
        setAllEtab(response.data.etablissements);
        // setFilterData(response.data.users)
      });
  }

  
  const filterData = (e) => {
    if (e.target.vlaue !== "") {
      setValue(e.target.value);
      const filterEtab = alletab.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setSearch([...filterEtab]);
    } else {
      setValue(e.target.value);
      setAllEtab([...alletab]);
    }
  };

  function deleteUser(etabId) {
    axios
      .delete(`/admin/delete/${etabId}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status) {
          toast.success(response.data.message, {
            position: "top-center",
          });
          getEtabList();
        } else {
          toast.error(response.data.message, {
            position: "top-center",
          });
        }
      });
  }

  return (
    <div>
      <h1 className="heading">list etablissement</h1>

      <div className="btnctr">
        <input
          type="text"
          id="search"
          value={value}
          name="search"
          onChange={filterData}
          className="form-control"
          placeholder="search.."
        />

        <button
          className="addBtn"
          onClick={() => {
            navigate("/admin/add");
          }}
        >
          Add etablissement
        </button>
      </div>

      <Table style={{ width:"78%",marginLeft:"15%",Bottom:"50%"}}>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>type</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {value.length > 0
            ? search.map((etablissement, key) => {
                return (
                  <tr key={key}>
                    <td scope="row">{key + 1}</td>
                    <td>{etablissement.nometab}</td>
                    <td>{etablissement.typetab}</td>
                       <td>
                      <button
                        className="editBtn"
                        onClick={() => {
                          dispatch(
                            setEtablissementDetails ({
                              name: etablissement.nometab,
                              typetab: etablissement.typetab,
                             id: etablissement._id,
                            })
                          );
                          navigate("/admin/edit");
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="deleteBtn"
                        onClick={() => {
                          deleteUser(etablissement._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : alletab.map((etablissement, key) => {
                return (
                  <tr key={key}>
                    <td scope="row">{key + 1}</td>
                    <td>{etablissement.nometab}</td>
                    <td>{etablissement.typetab}</td>
               
             
                    <td>
                      <button
                        className="editBtn"
                        onClick={() => {
                          dispatch(
                            setEtablissementDetails ({
                              name: etablissement.nometab,
                              typetab: etablissement.typetab,
                           
                         
                              id: etablissement._id,
                            })
                          );
                          navigate("/admin/edit");
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="deleteBtn"
                        onClick={() => {
                          deleteUser(etablissement._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
        <ToastContainer />
      </Table>
    </div>
  );
};

export default EtabHome;