const Error = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full mt-12'>
      <h1 className='text-4xl font-bold text-primaryDark dark:text-primaryLight'>
        Error
      </h1>
      <p className='text-lg text-primaryDark dark:text-primaryLight'>
        An error occurred. Please try again.
      </p>
    </div>
  );
};

export default Error;
