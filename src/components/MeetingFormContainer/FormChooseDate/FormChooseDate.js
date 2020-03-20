import React, { PureComponent } from 'react'

export default class FormChooseDate extends PureComponent {
    render() {
        const {createSelectBox, createDaySelectBox, appointmentDetails} = this.props
        //<button disabled={this.disabledButton(formErrors, values)} type="submit" onClick={this.continute}>Continute</button>
        return (
          <div className="wrapper">
          <div className="form-wrapper">
          <h1>Pick a Date</h1>
            <form onSubmit={this.handleSubmit} noValidate>
                {console.log(appointmentDetails.monthIndex)}
                {createSelectBox("month", this.props.appointmentsData)}
                {appointmentDetails.monthIndex != "" && createSelectBox("day", this.props.appointmentsData[(appointmentDetails.monthIndex)-1]['month_dates'])}

            </form>
            </div>
        </div>
        );
    }
}
