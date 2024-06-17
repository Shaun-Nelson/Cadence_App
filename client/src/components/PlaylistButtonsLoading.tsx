const PlaylistButtonsLoading = () => {
  return (
    <>
      <div className='flex flex-col items-center w-full lg:w-1/3 mt-16 p-6 border shadow-md bg-transparent rounded-3xl animate-pulse'>
        <div className='flex flex-col w-full bg-transparent rounded-3xl'>
          <div className='h-8 w-1/3 mb-6 bg-gray-300 rounded-3xl'></div>
          <div className='flex flex-col mb-2 bg-transparent'>
            <div className='h-9 mb-2 bg-gray-300 rounded-3xl shadow-inner'></div>
            <div className='h-9 bg-gray-300 rounded-3xl shadow-inner'></div>
          </div>
          <div className='flex bg-transparent'>
            <div className='h-10 w-1/2 mr-1 bg-gray-300 rounded-3xl shadow-md'></div>
            <div className='h-10 w-1/2 bg-gray-300 rounded-3xl shadow-md'></div>
          </div>
        </div>
      </div>
      <div className='h-24 mx-auto w-full lg:w-3/5 my-16 bg-transparent rounded-xl border shadow-inner animate-pulse'></div>
    </>
  );
};

export default PlaylistButtonsLoading;
