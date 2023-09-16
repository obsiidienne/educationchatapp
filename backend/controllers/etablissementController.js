const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
const etablissementModel = require("../models/etablissementModel");

const createToken = (id) => {
  return jwt.sign({ id }, "mernAppSecret", {
    expiresIn: maxAge,
  });
};

const handleError = (err) => {
  let errors = { email: "", password: "", firstname: "",lastname:"",role:"",typetab:"" ,phonenumber: "",pic:"" };

  if (err.code === 11000) {
    errors.email = "Email already exists";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach((properties) => {
      errors["message"] = properties.message;
    });
    return errors;
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email });
    if (admin) {
      const validatePassword = await bcrypt.compare(password, admin.password);
      if (validatePassword) {
        const token = createToken(admin._id);
        res.cookie("jwt", token, {
          withCredentials: true,
          httpOnly: false,
          maxAge: maxAge * 1000,
        });
        res.status(200).json({ admin, token, created: true });
      } else {
        const errors = { email: "Incorrect email or password" };
        res.json({ errors, creted: false });
      }
    } else {
      const errors = { email: "No admin with this email" };
      res.json({ errors, created: false });
    }
  } catch (error) {
    console.log(error);
    const errors = { email: "Something gone wrong" };
    res.json({ errors, created: false });
  }
};

const allEtablissement = async (req, res) => {
 
  try {
    const etablissements = await etablissementModel.find({});
    res.json({ status: true, message: "success", etablissements });
  } catch (err) {
    console.log(err, "o");
    // res.json({message:"error"})
  }

};

const deleteEtablissement = (req, res) => {
  try {
    etablissementModel.deleteOne({ _id: req.params._id }).then((response) => {
      res.json({ message: " etablissement supprimer", status: true });
    });
  } catch (error) {
    res.json({ message: "error", status: false });
  }
};

const editEtablissement = (req, res) => {
  try {
    console.log(req.body, "ddd");

    etablissementModel
      .updateOne(
        { _id: req.body.id },
        {
          $set: {
            nometab: req.body.nometab,
        typetab: req.body.typetab,
       
          },
        }
      )
      .then(() => {
        res.status(200).json({ message: "etab data updated", status: true });
        return;
      });
  } catch (err) {
    res.json({ message: "Something gone wrong", status: false });
  }
};

const addEtablissement = (req, res) => {
  try {
    etablissementModel
      .create({
        nometab: req.body.nometab,
        typetab: req.body.typetab,
      })
      .then((response) => {
        res.json({
          message: "User Created Successfully",
          status: true,
          created: true,
        });
      })
      .catch((error) => {
        const errors = handleError(error);

        res.json({ errors, status: false, created: false });
      });
  } catch (error) {
    res.json({ errors: { message: "Something gone wrong" }, status: false });
  }
};

module.exports = {
  adminLogin,
  allEtablissement,
  deleteEtablissement,
  editEtablissement,
  addEtablissement,
};
