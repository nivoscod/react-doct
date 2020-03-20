import React, { Component } from 'react'
import './FormMedicalDetails.scss';


export class FormMedicalDetails extends Component {
    continute = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    disabledButton = (formErrors, values) => {
      let hasErrors = Object.values(formErrors).some(element => element.length > 0);
      let isFormEmpty = Object.values(values).some(e => (e.length == 0))
      return hasErrors || isFormEmpty;
    }


    render() {
        const { values, handleChange, handleSmokerChange, createCheckboxes, formErrors  } = this.props;
        //<button type="submit" disabled={this.disabledButton(formErrors, values)} onClick={this.continute}>Continute</button>

        
        return (
          <div className="wrapper">
          <div className="form-wrapper">
          <h1>Medical Details</h1>
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="weight">
                <label htmlFor="weight">Weight</label>
                <input
                  className={formErrors.weight.length > 0 ? "error" : null}
                  defaultValue={values.weight}
                  placeholder="Weight"
                  type="text"
                  name="weight"
                  noValidate
                  onChange={handleChange('weight')}
                />
                {formErrors.weight.length > 0 && (
                  <span className="errorMessage">{formErrors.weight}</span>
                )}
              </div>

              <div className="height">
                <label htmlFor="height">Height</label>
                <input
                  className={formErrors.height.length > 0 ? "error" : null}
                  defaultValue={values.height}
                  placeholder="height"
                  type="text"
                  name="height"
                  onChange={handleChange('height')}
                  noValidate
                />
                {formErrors.height.length > 0 && (
                  <span className="errorMessage">{formErrors.height}</span>
                )}
              </div>

            <label htmlFor="medicalHis">Medical History Diagnosis:</label>
            <div className="medical-ckbox">{createCheckboxes()}</div>

            <label htmlFor="medicalHis">Are you a smoker?</label>
            <div className="medical-radio">
                <label>
                  <input type="radio" value="yes" checked={values.smoker == 'yes'} onChange={handleSmokerChange} />
                  {' Yes'}
                </label>
            </div>
            <div className="medical-radio">
                <label>
                  <input type="radio" value="no" checked={values.smoker == 'no'} onChange={handleSmokerChange} />
                  {' No'}
                </label>
            </div> 
      
              <div className="createAccount">
                <button type="submit" onClick={this.continute}>Continute</button>
                <button type="submit" onClick={this.back}>Go Back</button>
              </div>
            </form>
          </div>
        </div>
        );
    }
}

export default FormMedicalDetails
