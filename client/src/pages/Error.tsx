const Error = () => {
  return (
    <div className='flex flex-col justify center items-center mt-24 p-8 mx-24 border rounded shadow hover:shadow-lg'>
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
