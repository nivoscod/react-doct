import React, { Component } from 'react'
import FormUserDetails from "./FormUserDetails/FormUserDetails";
import FormMedicalDetails from "./FormMedicalDetails/FormMedicalDetails";
import FormChooseDate from "./FormChooseDate/FormChooseDate"
import Checkbox from './Checkbox';
import SelectBox from './FormChooseDate/SelectBox';
import {appointmentsData} from "../appointmentsData";
import { wait } from '@testing-library/react';


const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
const OPTIONS = ["High Blood-Pressure", "Glocuse", "Obesity", "Chronic illness"];

export class MeetingFormContainer extends Component {
  state= {
      step: 1,
      firstName: '',
      lastName: '',
      email: '',
      city: '',
      id: '',
      weight: '',
      height: '',
      checkboxes: OPTIONS.reduce(
        (options, option) => ({
          ...options,
          [option]: false,
        }),
        {}
      ),
      smoker: '',
      formErrors: {
        firstName: "", 
        lastName: "",
        city: "",
        id: "",
        email: "",
        weight: "",
        height: ""
      },
      appointmentsData: appointmentsData,
      appointment: {
        month: "",
        monthIndex: "",
        day: "",
        hour: ""
      }

  }

  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  createSelectbox = (type, items) => (
        <SelectBox
        appointment={this.state.appointment}
        items={items}
        handleSelectChange={this.handleSelectChange}
        type={type}
      />
  );

  createCheckboxes = () => OPTIONS.map(option => this.createCheckbox(option));


  handleSmokerChange = e => {
    this.setState({
      smoker: e.target.value
    })}

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  handleSelectChange = (type, item) => {
    console.log(type, item)
    switch(type) {
      case "month":
        this.setState(prevState => ({
          appointment: {
            ...prevState.appointment,
            ['month']: item.month,
            ['monthIndex']: item.id
          }
        }));
        break;
      case "day":
        this.setState(prevState => ({
          appointment: {
            ...prevState.appointment,
            ['day']: item,
          }
        }));
        break;
      default:
        break;
    }
  };


  // Procees to next step
  nextStep = () => {
      const { step }  = this.state;
      this.setState({
          step: step + 1
      });
  }

    // Go back to prev step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }

    // Handle fields change
    handleChange = () => e => {
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        switch (name) {
            case "firstName":
              formErrors.firstName =
                value.length < 3 ? "minimum 3 characaters required" : "";
              break;
            case "lastName":
              formErrors.lastName =
                value.length < 3 ? "minimum 3 characaters required" : "";
              break;
            case "email":
              formErrors.email = emailRegex.test(value)
                ? ""
                : "invalid email address";
              break;
            case "id":
              formErrors.id =
                value.length < 9 ? "minimum 9 numbers required" : "";
              break;
            case "weight":
              formErrors.weight = 
                value.length < 2 ? "minimum 2 numbers required" : "";
              break;
            case "height":
              formErrors.height = 
                value.length < 2 ? "minimum 2 numbers required" : "";
              break;
            default:
              break;
          }
      
          this.setState({ formErrors, [name]: value });
    }

    render() {
        const { step } = this.state;
        const { firstName, lastName, email, city, id, formErrors, checkboxes, weight, height, smoker, appointment } = this.state;
        const valuesform1 = { firstName, lastName, email, city, id }
        const valuesform2 = { checkboxes, weight, height, smoker }

        switch(step) {
            case 1:
                return (
                    <FormUserDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={valuesform1}
                        formErrors={formErrors}
                        />
                )
            case 2:
                return (
                  <FormMedicalDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={valuesform2}
                        formErrors={formErrors}
                        handleSmokerChange= {this.handleSmokerChange}
                        createCheckboxes={this.createCheckboxes} />
                )
            case 3:
                return (
                  <FormChooseDate 
                    appointmentDetails={appointment}
                    appointmentsData={appointmentsData}
                    createSelectBox={this.createSelectbox} />
                  )
            case 4:
                return <h1>Success</h1>
        }
    }
}

export default MeetingFormContainer
