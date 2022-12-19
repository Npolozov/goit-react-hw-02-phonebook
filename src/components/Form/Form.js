import { Component } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { Wrapper, Button, Label, Input } from './Form.style';
import * as yup from 'yup';

const state = {
  name: '',
  number: '',
};

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.number().required(),
});

export class ContactForm extends Component {
  handleSubmit = (values, { resetForm }) => {
    console.log(values);
    this.props.onSubmit(values);
    resetForm();
  };

  render() {
    return (
      <Formik
        initialValues={state}
        validationSchema={schema}
        onSubmit={this.handleSubmit}
      >
        <Form>
          <Wrapper>
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" />
            <ErrorMessage name="name" />
          </Wrapper>
          <Wrapper>
            <Label htmlFor="number">Number</Label>
            <Input id="number" type="tel" name="number" />
            <ErrorMessage name="number" />
          </Wrapper>

          <Button type="submit">Add Contacs</Button>
        </Form>
      </Formik>
    );
  }
}
