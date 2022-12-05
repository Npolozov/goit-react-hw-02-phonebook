import { Component } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { Wrapper, Button, Label, Input } from './Form.style';
import * as yup from 'yup';

export class ContactForm extends Component {
  state = {
    name: ' ',
    number: ' ',
  };

  schema = yup.object().shape({
    name: yup.string().required(),
    number: yup.number().required(),
  });

  handleSubmit = (values, { resetForm }) => {
    this.props.onSubmit(this.state);
    console.log(values);
    resetForm();
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  // reset = () => {
  //   this.setState({ name: '', number: '' });
  // };

  render() {
    return (
      <Formik
        initialValues={this.state}
        // validationSchema={this.schema}
        onSubmit={this.handleSubmit}
      >
        <Form>
          <Wrapper>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              value={this.state.name}
              onChange={this.handleChange}
              name="name"
            />
            <ErrorMessage name="name" />
          </Wrapper>
          <Wrapper>
            <Label htmlFor="number">Number</Label>
            <Input
              id="number"
              type="tel"
              name="number"
              value={this.state.number}
              onChange={this.handleChange}
            />
            <ErrorMessage name="number" />
          </Wrapper>

          <Button type="submit">Add Contacs</Button>
        </Form>
      </Formik>
    );
  }
}
