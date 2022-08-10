import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { filterType } from '../../../redux/usersReducer';
import { useSelector } from 'react-redux';
import { getUsersFilter } from '../../../redux/usersSelectors';

type PropsType = {
  onFilterChanged: (filter: filterType) => void;
};

type FriendFormType = 'true' | 'false' | 'null';

type FormType = {
  term: string;
  friend: FriendFormType;
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
  const filter = useSelector(getUsersFilter);

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
        enableReinitialize={true}
        initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
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
