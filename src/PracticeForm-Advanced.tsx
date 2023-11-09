import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import './App.css';

type FormValues = {
  username: string;
  email: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
};

function PracticeFormAdvanced() {
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
    },
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  console.log();

  return (
    <div className="form-ctn">
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
              },
            })}
            type="email"
            id="email"
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        {/* <div className="form-control">
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
        </div> */}
        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register('social.twitter', {
              required: 'Twitter handle is required',
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

        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default PracticeFormAdvanced;
