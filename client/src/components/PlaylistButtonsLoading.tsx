const PlaylistButtonsLoading = () => {
  return (
    <>
      <div className='flex flex-col items-center w-full lg:w-1/3 mt-16 p-4 border shadow-md bg-transparent rounded-3xl animate-pulse'>
        <div className='flex flex-col w-full rounded-3xl'>
          <div className='h-10 w-1/3 mb-1 bg-transparent rounded-3xl'></div>
          <div className='flex mb-2'>
            <div className=' h-10 w-1/2 mr-1 bg-gray-300 rounded-3xl shadow-inner'></div>
            <div className='h-10 w-1/2 bg-gray-300 rounded-3xl shadow-inner'></div>
          </div>
          <div className='flex'>
            <div className='h-10 w-1/2 p-2 mr-1 bg-gray-300 rounded-3xl shadow-md'></div>
            <div className='h-10 w-1/2 bg-gray-300 rounded-3xl shadow-md'></div>
          </div>
        </div>
      </div>
      <div className='h-24 mx-auto w-full lg:w-3/5 my-16 bg-transparent rounded-xl border shadow-inner'></div>
    </>
  );
};

export default PlaylistButtonsLoading;
