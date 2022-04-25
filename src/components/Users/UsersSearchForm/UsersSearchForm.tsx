import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { filterType } from '../../../redux/usersReducer';

type PropsType = {
  onFilterChanged: (filter: filterType) => void;
};

type FormType = {
  term: string;
  friend: 'true' | 'false' | 'null';
};

const usersSearchFormValidate = (values: FormType) => {
  //   const errors = {
  //     term: '',
  //   };
  //   if (!values.term) {
  //     errors.term = 'Required';
  //   }
  //   return errors;
};

const UsersSearchForm: React.FC<PropsType> = React.memo(({ onFilterChanged }) => {
  const submit = (
    values: FormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    const filter: filterType = {
      term: values.term,
      friend: values.friend === null ? null : values.friend === 'true' ? true : false,
    };
    onFilterChanged(filter);
    setSubmitting(false);
  };
  return (
    <div>
      <Formik
        initialValues={{ term: '', friend: 'null' }}
        validate={usersSearchFormValidate}
        onSubmit={submit}>
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <ErrorMessage name="term" component="div" />
            <Field as="select" name="friend">
              <option value="null">All</option>
              <option value="false">Only followed</option>
              <option value="true">Only unfollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default UsersSearchForm;
