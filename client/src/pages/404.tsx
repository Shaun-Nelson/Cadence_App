const Page404 = () => {
  return (
    <div className='flex flex-col justify center items-center mt-24 p-8 mx-24 border rounded shadow hover:shadow-lg'>
      <h1 className='text-4xl font-bold text-primaryDark dark:text-primaryLight'>
        404
      </h1>
      <p className='text-lg text-primaryDark dark:text-primaryLight'>
        Page not found
      </p>
    </div>
  );
};

export default Page404;
