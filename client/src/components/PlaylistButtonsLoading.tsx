const PlaylistButtonsLoading = () => {
  return (
    <div className='container mx-auto px-3 my-10 animate-pulse'>
      <div className='flex justify-center'>
        <div className='flex flex-col p-6 w-full bg-gray-300 border shadow-md rounded-xl'>
          <div className='flex flex-col rounded'>
            <div className='h-10 w-1/3 mb-1 bg-gray-300 rounded'></div>
            <div className='flex mb-1'>
              <div className=' h-10 w-1/2 mr-1 bg-gray-300 rounded-xl shadow-inner'></div>
              <div className='h-10 w-1/2 bg-gray-300 rounded-xl shadow-inner'></div>
            </div>
            <div className='flex'>
              <div className='h-10 w-1/2 p-2 mr-1 bg-gray-300 rounded-xl shadow-md'></div>
              <div className='h-10 w-1/2 bg-gray-300 rounded-xl shadow-md'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto px-6 mt-20 mb-10'>
        <div className='h-24 lg:w-3/4 mb-6 mx-auto bg-gray-300 rounded-xl shadow-inner'></div>
      </div>
    </div>
  );
};

export default PlaylistButtonsLoading;
