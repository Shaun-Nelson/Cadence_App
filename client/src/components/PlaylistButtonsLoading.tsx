const PlaylistButtonsLoading = () => {
  return (
    <div className='container mx-auto px-6 mt-16 animate-pulse'>
      <div className='flex justify-center'>
        <div className='flex flex-col p-6 w-screen lg:w-1/3 bg-gray-300 border shadow-md rounded-3xl'>
          <div className='flex flex-col rounded-3xl'>
            <div className='h-12 w-1/3 lg:w-full mb-1 bg-transparent rounded-3xl'></div>
            <div className='flex mb-1'>
              <div className=' h-10 w-1/2 mr-1 bg-gray-300 rounded-3xl shadow-inner'></div>
              <div className='h-10 w-1/2 bg-gray-300 rounded-3xl shadow-inner'></div>
            </div>
            <div className='flex'>
              <div className='h-10 w-1/2 p-2 mr-1 bg-gray-300 rounded-3xl shadow-md'></div>
              <div className='h-10 w-1/2 bg-gray-300 rounded-3xl shadow-md'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto px-3 my-16'>
        <div className='h-24 mx-auto lg:w-3/5 bg-gray-300 rounded-xl shadow-inner'></div>
      </div>
    </div>
  );
};

export default PlaylistButtonsLoading;
