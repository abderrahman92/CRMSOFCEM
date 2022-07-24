import React, { Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        champ ne doit pas étre vide !
      </div>
    );
  }
};

const vsiret = value => {
  if (isNaN(value)&&(value.length<9)&&(value.length>13)) {
    return (
      <div className="alert alert-danger" role="alert">
        siret invalide :(.
      </div>
    );
  }
};

const vsiren = value => {
 if (isNaN(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid siren.
      </div>
    );
  }
};

const vnom_soc = value => {
  if ((value.length<4)) {
    return (
      <div className="alert alert-danger" role="alert">
       nom socitété invalide !.
      </div>
    );
  }
};

const vnom_responsable = value => {
  if ((value.length<4)) {
    return (
      <div className="alert alert-danger" role="alert">
        nom responsable invalide !.
      </div>
    ); 
  }
};

const vdate_creation_soc = value => {
  if ((value.length<4)) {
    return (
      <div className="alert alert-danger" role="alert">
        date invalide !
      </div>
    );
  }
};

const vactivité = value => {
  if ((value.length<4)) {
    return (
      <div className="alert alert-danger" role="alert">
        activité invalide !
      </div>
    );
  }
};

const cville = value => {
  if (value.length < 4 || value.length > 10) {
    return (
      <div className="alert alert-danger" role="alert">
        ville invalide !
      </div>
    );
  }
};

const vcode_postal = value => {
  if ((value.length != 4) && (isNaN(value))) {
    return (
      <div className="alert alert-danger" role="alert">
        code postal invalide !
      </div>
    );
  }
};

const vopportunité = value => {
  if (value.length < 4) {
    return (
      <div className="alert alert-danger" role="alert">
         opportunité invalide !
      </div>
    );
  }
};

const vobservation = value => {
  if (value.length < 4) {
    return (
      <div className="alert alert-danger" role="alert">
         opportunité invalide !
      </div>
    );
  }
};

const vtel = value => {
  if (value.length < 4 || value.length > 10) {
    return (
      <div className="alert alert-danger" role="alert">
         télephone invalide !
      </div>
    );
  }
};

const vid_role = value => {
  if (isNaN(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        1 or 2.
      </div>
    );
  }
};

export default class Ajouter extends Component {
  constructor(props) {
      super(props);
      this.handleAjouter = this.handleAjouter.bind(this);
      this.onChangesiren = this.onChangesiren.bind(this);
      this.onChangesiret = this.onChangesiret.bind(this);
      this.onChangenom_soc = this.onChangenom_soc.bind(this);
      this.onChangenom_responsable_soc = this.onChangenom_responsable_soc.bind(this);
      this.onChangedate_creation_soc = this.onChangedate_creation_soc.bind(this);
      this.onChangeactivite_soc = this.onChangeactivite_soc.bind(this);
      this.onChangeville = this.onChangeville.bind(this);
      this.onChangecode_postal = this.onChangecode_postal.bind(this);
      this.onChangeopportunite = this.onChangeopportunite.bind(this);
      this.onChangeobservation = this.onChangeobservation.bind(this);
      this.onChangetel = this.onChangetel.bind(this);
      this.onChange_idrole = this.onChange_idrole.bind(this);

      this.state = {
        siren: "",
        siret: "",
        nom_soc: "",
        nom_responsable: "",
        date_creation_soc :"",
        activité_soc:"",
        ville:"",
        code_postal:"",
        opportunité:"",
        observation:"",
        tel:"",
        id_role:"",
        successful: false,
        message: ""
      };
  }

  onChangesiret(e) {
    this.setState({
      siret: e.target.value
    });
  }
  onChangesiren(e) {
    this.setState({
      siren: e.target.value
    });
  }
  onChangenom_soc(e) {
    this.setState({
      nom_soc: e.target.value
    });
  }
  onChangenom_responsable_soc(e) {
    this.setState({
      nom_responsable_soc: e.target.value
    });
  }
  onChangedate_creation_soc(e) {
    this.setState({
      date_creation_soc: e.target.value
    });
  }
  onChangeactivite_soc(e) {
    this.setState({
      activite_soc: e.target.value
    });
  }
  onChangeville(e) {
    this.setState({
      ville_soc: e.target.value
    });
  }
  onChangecode_postal(e) {
    this.setState({
      code_postal: e.target.value
    });
  }
  onChangeopportunite(e) {
    this.setState({
      opportunite: e.target.value
    });
  }
  onChangeobservation(e) {
    this.setState({
      observation: e.target.value
    });
  }
  onChangetel(e) {
    this.setState({
      tel: e.target.value
    });
  }
  onChange_idrole(e) {
    this.setState({
      id_role: e.target.value
    });
  }
  handleAjouter(e) {
    e.preventDefault();

    this.setState({
      message: "", 
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
  
      AuthService.create(
       
        this.state.siret,
        this.state.siren,
        this.state.nom_soc,
        this.state.nom_responsable,
        this.state.date_creation_soc,
        this.state.activite_soc,
        this.state.ville_soc,
        this.state.code_postal,
        this.state.opportunite,
        this.state.observation,
        this.state.tel,
        this.state.id_role
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
          
        },
        error => {
          console.log(  this.state.date_creation_soc)
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }
  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
         

          <Form
            onSubmit={this.handleAjouter}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="siret">siret</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="siret"
                    value={this.state.siret}
                    onChange={this.onChangesiret}
                    validations={[required, vsiret]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="siren">siren</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="siren"
                    value={this.state.siren}
                    onChange={this.onChangesiren}
                    validations={[required, vsiren]}
                  />
                </div>          
                <div className="form-group">
                  <label htmlFor="nom société">nom société</label>
                  <Input
                    type=""
                    className="form-control"
                    name="nom_soc"
                    value={this.state.nom_soc}
                    onChange={this.onChangenom_soc}
                    validations={[required, vnom_soc]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nom responsable">nom responsable</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="nom_responsable_soc"
                    value={this.state.nom_responsable_soc}
                    onChange={this.onChangenom_responsable_soc}
                    validations={[required, vnom_responsable]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date">date  création de la socitété</label>
                  <Input
                    type="date"
                    className="form-control"
                    name="date_creation_soc"
                    value={this.state.date_creation_soc}
                    onChange={this.onChangedate_creation_soc}
                    validations={[required, vdate_creation_soc]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="activité de la société">activité de la société</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="activite_soc"
                    value={this.state.activite_soc}
                    onChange={this.onChangeactivite_soc}
                    validations={[required, vactivité]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ville société">ville</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="ville_soc"
                    value={this.state.ville_soc}
                    onChange={this.onChangeville}
                    validations={[required, cville]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="code postal">code_postal</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="code_postal"
                    value={this.state.code_postal}
                    onChange={this.onChangecode_postal}
                    validations={[required, vcode_postal]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="code postal">opportunité</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="opportunite"
                    value={this.state.opportunite}
                    onChange={this.onChangeopportunite}
                    validations={[required, vopportunité]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="observation">observation</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="observation"
                    value={this.state.observation}
                    onChange={this.onChangeobservation}
                    validations={[required, vobservation]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">tel</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="tel"
                    value={this.state.tel}
                    onChange={this.onChangetel}
                    validations={[required, vtel]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">id_role</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="id_role"
                    value={this.state.id_role}
                    onChange={this.onChange_idrole}
                    validations={[required, vid_role]}
                  />
                </div> 
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Valider</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
