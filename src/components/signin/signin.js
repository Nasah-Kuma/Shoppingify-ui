import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { login } from '../../app/authReducer/authReducer';

const Signin = () => {
  const state = useSelector(((state) => state.auth));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    toast.promise(dispatch(login(data)), {
      pending: 'Logging user',
      success: 'user logged in',
      error: 'error logging in user',
    });
    navigate('/home');
  };
  return (
    <div>
      {
        (state.isError) ? (<small className="text-danger"> incorrect password or email </small>) : ''
      }
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <input type="email" className="form-control form-control-lg" id="email" placeholder="Email: name@example.com" {...register('email', { required: true })} />
          <small>
            {errors.email && <span>This field is required</span>}
          </small>
        </div>
        <div className="mb-3">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <input type="password" className="form-control form-control-lg" id="password" placeholder="Enter password" {...register('password', { required: true })} />
          {errors.password && <span>This field is required</span>}
        </div>
        <div>
          <button type="submit" className={(state.isLoading) ? ('btn btn-lg btn-danger col-12 disabled') : ('btn btn-lg btn-danger col-12')}>
            { (state.isLoading) ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <span className="p-2">
                Login
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
