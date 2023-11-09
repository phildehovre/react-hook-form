import { FieldErrors, useFieldArray, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import './App.css';
import { useEffect } from 'react';

type FormValues = {
  username: string;
  email: string;
  social: {
    twitter: string;
    facebook: string;
  };
  channel: string;
  phoneNumbers: string[];
  // ====== IMPORTANT =====
  // useFieldArray only works with arrays of objects !!!
  items: {
    number: string;
  }[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

function PracticeFormAdvancedWithDynamicFields() {
  let renderCount = 0;

  renderCount++;
  const form = useForm<FormValues>({
    // When using default values, it is not strictly necessary to specify the type of useForm. It will infer the values and "type" itself.
    // Use cases for default values are: setting a date picker to today's date, setting a selected country, setting a checkbox to true(Subrscribe to newsletter!), etc.
    defaultValues: {
      username: '',
      email: '',
      social: {
        twitter: '',
        facebook: '',
      },
      phoneNumbers: ['', ''],
      phNumbers: [],
      items: [],
      age: 0,
      dob: new Date(),
      channel: '',
    },

    // ====== Mode ======= determines when validation is triggered:

    mode: 'onBlur',
    // mode: "onChange" // potentially triggering validation on every keystroke can impact performance as it might trigger re-renders
    // mode: "all"
  });

  const {
    register,
    control,
    handleSubmit,
    formState: {
      errors,

      // ======== Field States =========
      // dirtyFields,
      // touchedFields,

      // ======== Form States =========
      isDirty,
      isValid,
      isSubmitting,
      isSubmitted,
      isSubmitSuccessful,
      submitCount,
    },
    // Watch is great for subscribing to changes in the form
    // without triggering a re-render
    watch,
    // getValues is great for getting the values
    // when a specific action is performed
    // such as a button click
    getValues,
    setValue,
    reset,

    // ======== Trigger =========
    // used to manually trigger validation,
    // Optionally takes an array of fields or simply an individual field string.
    trigger,
  } = form;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  useEffect(() => {
    // Subscribe to field update/change without triggering re-render
    const subscription = watch((value) => {
      // console.log(value.username);
      // console.log(value.dob);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: FormValues) => {
    // console.log(data);
  };

  const {
    fields: phNumberFields,
    append: phNumberAppend,
    remove: phNumberRemove,
  } = useFieldArray({
    name: 'phNumbers',
    control,
  });

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    name: 'items',
    control,
  });

  const handleGetValues = () => {
    console.log(getValues());
    console.log(getValues('items'));
    console.log(getValues(['items', 'username']));
  };
  const handleSetValues = () => {
    // Set value does not affect the state of the field, i.e. "dirty" or "touched"
    // unless specified in the options object
    setValue('username', 'John Doe', {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
    setValue('items', [{ number: '123' }, { number: '456' }]);
  };

  const onError = (errors: FieldErrors, e: any) => {
    console.log(errors, e);
  };

  return (
    <div className="form-ctn">
      {/* <h2>How about this: {JSON.stringify(watchForm)}</h2> */}
      <form className="form" onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
            })}
            type="text"
            id="username"
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            {...register('email', {
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please enter a valid email address',
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return fieldValue !== 'admin@example.com' || 'Nice try!';
                },
                notBlacklisted: (fieldValue) => {
                  return !fieldValue.endsWith('.xyz') || "We don't accept this type of email address";
                },
                // Basic email availability check
                emailAvailable: async (fieldValue) => {
                  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${fieldValue}`);
                  const data = await response.json();
                  return data.length == 0 || 'This email is already taken';
                },
              },
            })}
            type="email"
            id="email"
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="text"
            id="age"
            {...register('age', {
              valueAsNumber: true,
              required: 'Age is required',
              min: {
                value: 18,
                message: 'You must be at least 18 years old',
              },
            })}
          />
        </div>
        <div className="form-control">
          <label htmlFor="dob">Date of birth</label>
          <input
            type="date"
            id="dob"
            {...register('dob', {
              valueAsDate: true,
              required: {
                value: true,
                message: 'Date of birth is required',
              },
            })}
          />
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register('channel', {
              required: 'Channel is required',
              minLength: {
                value: 3,
                message: 'Channel must be at least 3 characters',
              },
            })}
          />
        </div>
        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register('social.twitter', {
              required: 'Twitter handle is required',
              // Disabled will mean that field will not be validated and the value will be set to undefined
              disabled: true,
              minLength: {
                value: 3,
                message: 'Twitter handle must be at least 3 characters',
              },
            })}
          />
          <p className="error">{errors.social?.twitter?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="facebook">facebook</label>
          <input
            type="text"
            id="facebook"
            {...register('social.facebook', {
              required: 'Facebook handle is required',
              minLength: {
                value: 3,
                message: 'Facebook handle must be at least 3 characters',
              },
            })}
          />
          <p className="error">{errors.social?.facebook?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="primary-phone">primary-phone</label>
          {/* This odd dot notation targets the first item in the phoneNumbers array */}
          <input
            type="text"
            id="primary-phone"
            {...register('phoneNumbers.0', {
              required: 'Phone number is required',
              minLength: {
                value: 3,
                message: 'Phone number must be at least 3 characters',
              },
            })}
          />
          <p className="error">{errors.phoneNumbers?.[0]?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="secondary-phone">secondary-phone</label>
          <input
            type="text"
            id="secondary-phone"
            {...register('phoneNumbers.1', {
              required: {
                value: true,
                message: 'Phone number is required',
              },
              pattern: {
                value: /\d+/,
                message: 'Please enter a valid phone number',
              },
              minLength: {
                value: 3,
                message: 'Phone number must be at least 3 characters',
              },
            })}
          />
          <p className="error">{errors.phoneNumbers?.[1]?.message}</p>
        </div>
        <div>
          <label htmlFor="">List of phone numbers</label>
          {phNumberFields.map((field, index) => {
            return (
              <div className="form-control" key={field.id}>
                <input type="text" {...register(`phNumbers.${index}.number` as const)} />
                {index > 0 && (
                  <button type="button" onClick={() => phNumberRemove(index)}>
                    Remove
                  </button>
                )}
              </div>
            );
          })}
          <button type="button" onClick={() => phNumberAppend({ number: '' })}>
            Add phone number{' '}
          </button>
        </div>

        {/* Second use of dynamic fields in component to demonstrate how */}

        <div>
          <label htmlFor="">List of Items</label>
          {itemFields.map((field, index) => {
            return (
              <div className="form-control" key={field.id}>
                <input type="text" {...register(`items.${index}.number` as const)} />
                {index > 0 && (
                  <button type="button" onClick={() => removeItem(index)}>
                    Remove
                  </button>
                )}
              </div>
            );
          })}
          <button type="button" onClick={() => appendItem({ number: '' })}>
            Add phone number{' '}
          </button>
        </div>
        <span style={{ display: 'flex' }}>
          <button type="button" onClick={handleGetValues}>
            Get values
          </button>
          <button type="button" onClick={handleSetValues}>
            Set value
          </button>
        </span>
        <button type="button" onClick={() => trigger(['username', 'email'])}>
          Trigger validation
        </button>
        <button disabled={!isDirty || !isValid || isSubmitting} type="submit">
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default PracticeFormAdvancedWithDynamicFields;
