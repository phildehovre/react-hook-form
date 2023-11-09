import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import './App.css';

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

function PracticeFormBasic() {
  const form = useForm<FormValues>();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: any) => {
    console.log(data);
  };

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
          <p className="error">{errors.channel?.message}</p>
        </div>

        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default PracticeFormBasic;
