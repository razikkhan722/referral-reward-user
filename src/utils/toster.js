import { toast, Bounce } from 'react-toastify';

const defaultOptions = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  transition: Bounce,
};

export const toastSuccess = (message = 'Success!') =>
  toast.success(message, { ...defaultOptions });

export const toastError = (message = 'Something went wrong!') =>
  toast.error(message, { ...defaultOptions });

export const toastInfo = (message = 'Note') =>
  toast.info(message, { ...defaultOptions });