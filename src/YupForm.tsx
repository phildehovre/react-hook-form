import React from 'react';
import { FieldErrors, useFieldArray, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

type FormValues = {
  username: string;
  email: string;
  channel: string;
  testF: {
    test: string;
  }[];
};

function YupForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isDirty, errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: '',
      email: '',
      channel: '',
      testF: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  console.log(isDirty);

  const onError = (errors: FieldErrors) => {
    console.log(errors);
  };

  const { fields, append, remove } = useFieldArray({
    name: 'testF',
    control,
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="form-control">
          <label htmlFor="username">Name</label>
          <input type="text" id="username" {...register('username')} />
          <p>{errors?.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" {...register('email')} />
          <p>{errors?.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register('channel')} />
          <p>{errors?.channel?.message}</p>
        </div>
        <span>
          {fields.map((field, index) => {
            return (
              <div className="form-control" key={field.id}>
                <label htmlFor="testF">TestF</label>
                <input type="text" id="testF" {...register(`testF.${index}.test` as const)} />
                <p>{errors?.channel?.message}</p>
                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              </div>
            );
          })}
          <button type="button" onClick={() => append({ test: '' })}>
            Add
          </button>
        </span>
        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default YupForm;
