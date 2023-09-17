import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { AiOutlineUser } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";

import { BsGenderAmbiguous, BsImage } from "react-icons/bs";
import PhoneDropdown from "./PhoneDropdown/PhoneDropdown"; 
import Toast from "../Toast";
import { ReactComponent as Loader } from "../../Images/buttonLoader.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  overflow-y: auto;
  scroll-behavior: smooth;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const InputWithText = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 12px;
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 20px;
  font-weight: 700;
  &:focus {
    outline: none;
  }
`;
const InputBox = styled.div`
  width: 100%;
  height: 100%;
  margin: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputBoxButton = styled.div`
  width: 100%;
  height: 50px;
  margin: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    margin: 25px;
  }
`;
const PhoneBox = styled.div`
  width: 100%;
  height: 50px;
  margin: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Ques = styled.div`
  width: 80%;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SubmitButton = styled.button`
  width: 25%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  line-height: 28pt;
  padding: 0 20px;
  background: #8db9dbb6;
  letter-spacing: 2px;
  transition: 0.2s all ease-in-out;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 1px 1px #3183cf, 3px 3px 1px 2px rgba(0, 0, 0, 1);
  &:hover {
    background: rgba(0, 0, 0, 1);
    color: white;
    border: 1px solid rgba(0, 0, 0, 1);
  }
  &:disabled {
    background: #ccc;
    box-shadow: 3px 3px 1px 1px #000, 3px 3px 1px 2px rgba(0, 0, 0, 1);
    color: #fff;
    border: 1px solid #ccc;
    cursor: not-allowed;
  }
`;
const Right = styled.div`
  position: relative;
  right: 11px;
`;
const Selectrole = styled.select`
  width: 80%;
  height: 50px;
  border-radius: 12px;
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 20px;
  font-weight: 700;
  &:focus {
    outline: none;
  }
`;
const Selectetab = styled.select`
  width: 80%;
  height: 50px;
  border-radius: 12px;
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 20px;
  font-weight: 700;
  &:focus {
    outline: none;
  }
`;
const Show = styled.div`
  width: 80%;
  height: 20px;
  display: flex;
  justify-content: right;
  align-items: center;
`;
const CenterDiv = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Text = styled.p`
  position: relative;
  left: 10px;
`;
const InputTextContainer = styled.div`
  width: 80%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SpanText = styled.span`
  width: 98%;
  color: red;
  font-size: 12px;
  display: flex;
  justify-content: left;
  align-items: center;
`;
const SpanTextPhone = styled.span`
  width: 75%;
  color: red;
  font-size: 12px;
  display: flex;
  justify-content: left;
  align-items: center;
`;
const Anchor = styled.a`
  color: blue;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;
const ImageBox = styled.input.attrs({ type: "file", accept: "image/*" })`
  width: 80%;
  height: 50px;
  padding: 10px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #ccc;
  font-size: 20px;
  font-weight: 700;
  &:focus {
    outline: none;
  }
  &::file-selector-button {
    margin-right: 20px;
    border: none;
    background: #ece8e8;
    border-radius: 5px;
    color: #000;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
  }
  &::file-selector-button:hover {
    background: #ccc;
  }
`;
const Spin = keyframes`
from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const LoadIcon = styled(Loader)`
  animation-name: ${Spin};
  animation-duration: 500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

const Signup = ({ handleSignup }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus(); //focus on first input field
  }, []);

  const [toastShow, setToastShow] = useState(false);
  const [toastText, setToastText] = useState("");
  const [toastIcon, setToastIcon] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [color, setColor] = useState("black");
  const [showLoader, setShowLoader] = useState(false);
  const [phone, setPhone] = useState("");
  const [pic, setPic] = useState("");
  const history = useNavigate();
  const [phoneError, setPhoneError] = useState("");
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    role: "",
    typetab: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    role: "",
    typetab: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "firstName":
          if (!value) {
            stateObj[name] = "veuillez entrer votre nom.";
          }
          break;
        case "lastName":
          if (!value) {
            stateObj[name] = "veuillez entrer votre prénom.";
          }
          break;
        case "email":
          if (!value) {
            stateObj[name] = "veuillez entrer votre email.";
          } else if (
            value &&
            !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
          ) {
            stateObj[name] = "veuillez entrer votre email valide.";
          }
          break;

        case "typetab":
          if (!value) {
            stateObj[name] = "veuillez choisir votre type d'etablissement.";
          }
          break;

        case "role":
          if (!value) {
            stateObj[name] = "veuillez choisir le poste que vous occuper.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "veuillez entrer votre mot de pass.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
            setColor("black");
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
            setColor("black");
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "veuillez entrer le mot de pass de confirmation.";
            setColor("black");
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
            setColor("black");
          } else if (value === input.password) {
            setColor("green");
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const validatePhone = (number) => {
    let regex = /^\+\d{12}$/g;
    if (!number) {
      setPhoneError("veuillez entrer votre numero de telephone.");
    } else if (!regex.test(number)) {
      setPhoneError("veuillez entrer votre numero de telephone valide.");
    } else {
      setPhoneError("");
    }
  };

  const handleClick = () => {
    setShow(!show);
  };
  const handleClick1 = () => {
    setShow1(!show1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    const {
      firstName,
      lastName,
      role,
      typetab,
      email,
      password,
      confirmPassword,
    } = input;

    if (
      !firstName ||
      !lastName ||
      !role||
      !typetab ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      if (!firstName)
        setError((prev) => ({
          ...prev,
          firstName: "veuillez entrer votre nom.",
        }));
      if (!lastName)
        setError((prev) => ({ ...prev, lastName: "veuillez entrer votre prénom." }));
      if (!role)
        setError((prev) => ({ ...prev, gender: "veuillez choisir votre poste." }));
      if (!typetab)
        setError((prev) => ({ ...prev, country: "veuillez choisir le type de votre etablissement." }));
      if (!email)
        setError((prev) => ({ ...prev, email: "veuillez entrer votre email." }));
      if (!phone) validatePhone(phone);
      if (!password)
        setError((prev) => ({
          ...prev,
          password: "veuillez entrer votre mot de pass.",
        }));
      if (!confirmPassword)
        setError((prev) => ({
          ...prev,
          confirmPassword: "veuillez entrer votre mot de pass de confirmation.",
        }));
      setToastShow(true);
      setToastText("Fill All The fields.");
      setToastIcon("failed");
      setTimeout(() => {
        setToastShow(false);
        setToastText("");
        setToastIcon("");
      }, 1500);
      setShowLoader(false);
    } else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setToastShow(true);
      setToastText("Invalid email Address.");
      setToastIcon("failed");
      setTimeout(() => {
        setToastShow(false);
        setToastText("");
        setToastIcon("");
      }, 1500);
      setShowLoader(false);
    } else if (!phone.match(/^\+\d{12}$/g)) {
      setToastShow(true);
      setToastText("Invalid Phone Number.");
      setToastIcon("failed");
      setTimeout(() => {
        setToastShow(false);
        setToastText("");
        setToastIcon("");
      }, 1500);
      setShowLoader(false);
    } else if (password !== confirmPassword) {
      setToastShow(true);
      setToastText("Password MisMatch.");
      setToastIcon("failed");
      setTimeout(() => {
        setToastShow(false);
        setToastText("");
        setToastIcon("");
      }, 1500);
      setShowLoader(false);
    } else if (
      firstName &&
      lastName &&
      role &&
      typetab &&
      email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) &&
      phone.match(/^\+\d{12}$/g) &&
      password &&
      confirmPassword
    ) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const firstname = firstName;
        const lastname = lastName;
        const phonenumber = phone;
        const { data } = await axios.post(
          "/api/user",
          {
            firstname,
            lastname,
            role,
            typetab,
            email,
            phonenumber,
            pic,
            password,
          },
          config
        );

        localStorage.setItem("userInfo", JSON.stringify(data));
        setToastShow(true);
        setToastText("Signup Successful.");
        setToastIcon("success");

        setTimeout(() => {
          setToastShow(false);
          setToastText("");
          setToastIcon("");
        }, 1500);
        setTimeout(() => {
          history("/auth");
        }, 1700);

        setInput({
          firstName: "",
          lastName: "",
          role: "",
          typetab: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setPic("");
        setPhone("");
        setColor("black");
        setShowLoader(false);
      } catch (error) {
        setToastShow(true);
        setToastText(error.response.data.message || "Signup Failed.");
        setToastIcon("failed");

        setTimeout(() => {
          setToastShow(false);
          setToastText("");
          setToastIcon("");
        }, 1500);
        setShowLoader(false);
      }
    } else {
      setToastShow(true);
      setToastText("Signup Failed.");
      setToastIcon("failed");

      setTimeout(() => {
        setToastShow(false);
        setToastText("");
        setToastIcon("");
      }, 1500);
      setShowLoader(false);
    }
  };

  const postDetails = (pics) => {
    setShowLoader(true);
    if (pics === undefined) {
      setToastShow(true);
      setToastText("Select a Picture.");
      setToastIcon("failed");
      setTimeout(() => {
        setToastShow(false);
        setToastText("");
        setToastIcon("");
      }, 1500);
      setShowLoader(false);
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Chat-App-Mern");
      data.append("cloud_name", "dtaelfyxv");
      fetch("https://api.cloudinary.com/v1_1/dtaelfyxv/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setShowLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setShowLoader(false);
        });
    } else {
      setToastShow(true);
      setToastText("Invalid Picture.");
      setToastIcon("failed");
      setTimeout(() => {
        setToastShow(false);
        setToastText("");
        setToastIcon("");
      }, 1500);
      setShowLoader(false);
      return;
    }
  };

  return (
    <>
      <LoginForm>
        <InputBox>
          <Right>
            <AiOutlineUser color="black" size="20px" />
          </Right>
          <InputTextContainer>
            <InputWithText
              value={input.firstName}
              onChange={onInputChange}
              name="firstName"
              type="text"
              placeholder="Nom"
              ref={inputRef}
              required
            />
            {error.firstName && <SpanText>{error.firstName}</SpanText>}
          </InputTextContainer>
        </InputBox>
        <InputBox>
          <Right>
            <AiOutlineUser color="black" size="20px" />
          </Right>
          <InputTextContainer>
            <InputWithText
              onChange={onInputChange}
              value={input.lastName}
              name="lastName"
              type="text"
              placeholder="Prénom"
              required
            />
            {error.lastName && <SpanText>{error.lastName}</SpanText>}
          </InputTextContainer>
        </InputBox>
        <InputBox>

          <Selectrole
            value={input.role}
            name="role"
            onChange={onInputChange}
            required
          >
            <option value="" disabled hidden>
              Selectionner un post
            </option>
            <option value="Directeur">Directeur</option>
            <option value="Econome">Econome</option>
            <option value="Chef de service">Chef de service</option>
            <option value="Inspecteur">Inspecteur</option>
          </Selectrole>
        </InputBox>
        <InputBox>
          <Selectetab
            value={input.typetab}
            name="typetab"
            onChange={onInputChange}
            required
          >
            <option value="" disabled hidden>
              Selectionner un etablissement
            </option>
            <option value="Lycee">Lycee</option>
            <option value="Collége">Collége</option>
            <option value="Primaire">Primaire</option>
            <option value="Ecole Prive">Ecole Prive</option>
            <option value="Education">Education</option>
          </Selectetab>
        </InputBox>
        <InputBox>
          <Right>
            <MdAlternateEmail color="black" size="20px" />
          </Right>
          <InputTextContainer>
            <InputWithText
              onChange={onInputChange}
              value={input.email}
              name="email"
              type="text"
              placeholder="Email"
              onBlur={validateInput}
              pattern="^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$"
              required
            />
            {error.email && <SpanText>{error.email}</SpanText>}
          </InputTextContainer>
        </InputBox>
        <PhoneBox>
          <PhoneDropdown setPhone={setPhone} validatePhone={validatePhone} />
          {phoneError && <SpanTextPhone>{phoneError}</SpanTextPhone>}
        </PhoneBox>
        <InputBox>
          <Right>
            <BsImage color="black" size="20px" />
          </Right>
          <ImageBox onChange={(e) => postDetails(e.target.files[0])}></ImageBox>
        </InputBox>
        <InputBox>
          <Right>
            <RiLockPasswordLine color="black" size="20px" />
          </Right>
          <InputTextContainer>
            <InputWithText
              onChange={onInputChange}
              value={input.password}
              type={show ? "text" : "password"}
              name="password"
              placeholder="Password"
              autoComplete="off"
              onBlur={validateInput}
              required
            />
            {error.password && <SpanText>{error.password}</SpanText>}
          </InputTextContainer>
        </InputBox>
        <CenterDiv>
          <Show>
            <input type="checkbox" checked={show} onChange={handleClick} />
            <Text>Show Password</Text>
          </Show>
        </CenterDiv>
        <InputBox>
          <Right>
            <GiConfirmed color={color} size="20px" />
          </Right>
          <InputTextContainer>
            <InputWithText
              onChange={onInputChange}
              value={input.confirmPassword}
              type={show1 ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="off"
              onBlur={validateInput}
              required
            />
            {error.confirmPassword && (
              <SpanText>{error.confirmPassword}</SpanText>
            )}
          </InputTextContainer>
        </InputBox>
        <CenterDiv>
          <Show>
            <input type="checkbox" checked={show1} onChange={handleClick1} />
            <Text>Show Password</Text>
          </Show>
        </CenterDiv>
        <br />
        <CenterDiv>
          <Ques>
            <Text>
              Already Have a account?
              <Anchor onClick={() => handleSignup()}>Login</Anchor>
            </Text>
          </Ques>
        </CenterDiv>
        <InputBoxButton>
          <SubmitButton
            type="submit"
            onClick={handleSubmit}
            disabled={showLoader}
          >
            {!showLoader ? "Signup" : <LoadIcon />}
          </SubmitButton>
        </InputBoxButton>
      </LoginForm>
      <Toast toast={toastShow} toastText={toastText} icon={toastIcon} />
    </>
  );
};

export default Signup;
