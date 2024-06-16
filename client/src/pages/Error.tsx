const Error = () => {
  return (
    <div className='flex flex-col mt-24 mx-auto p-8 w-fit bg-light-100 dark:bg-primaryDark border shadow-md rounded-3xl hover:shadow-lg dark:shadow-xl hover:dark:shadow-2xl active:shadow-inner border-opacity-50 active:border-opacity-100 transition items-center justify-center'>
      <h1 className='mb-4 text-4xl font-bold text-slate-600 dark:text-slate-300'>
        Error :(
      </h1>
      <p className='text-lg text-slate-500 dark:text-slate-400'>
        An error occurred. Please try again.
      </p>
    </div>
  );
};

export default Error;
