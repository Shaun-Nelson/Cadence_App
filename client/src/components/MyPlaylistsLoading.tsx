const MyPlaylistsLoading = () => {
  return (
    <div
      role='status'
      className='flex flex-col mx-auto lg:w-1/2 mt-40 mb-4 h-fit bg-transparent p-6 border shadow-md rounded-3xl hover:shadow-lg animate-pulse'
    >
      <div className='mb-12'>
        <div className='flex justify-between items-center'>
          <div className='h-4 bg-gray-300 w-1/5 rounded-3xl'></div>
          <div className='h-4 bg-gray-300 w-1/4 rounded-3xl'></div>
        </div>
      </div>
      <div className='mb-12'>
        <div className='flex justify-between items-center'>
          <div className='h-4 bg-gray-300 w-1/3 rounded-3xl'></div>
          <div className='h-4 bg-gray-300 w-1/4 rounded-3xl'></div>
        </div>
      </div>
      <div className='mb-12'>
        <div className='flex justify-between items-center'>
          <div className='h-4 bg-gray-300 w-1/4 rounded-3xl'></div>
          <div className='h-4 bg-gray-300 w-1/5 rounded-3xl'></div>
        </div>
      </div>
      <div className='mb-12'>
        <div className='flex justify-between items-center'>
          <div className='h-4 bg-gray-300 w-1/2 rounded-3xl'></div>
          <div className='h-4 bg-gray-300 w-1/3 rounded-3xl'></div>
        </div>
      </div>
      <div className='mb-12'>
        <div className='flex justify-between items-center'>
          <div className='h-4 bg-gray-300 w-1/3 rounded-3xl'></div>
          <div className='h-4 bg-gray-300 w-1/4 rounded-3xl'></div>
        </div>
      </div>
      <div>
        <div className='mb-12'>
          <div className='flex justify-between items-center'>
            <div className='h-4 bg-gray-300 w-1/5 rounded-3xl'></div>
            <div className='h-4 bg-gray-300 w-1/4 rounded-3xl'></div>
          </div>
        </div>
        <div className='mb-12'>
          <div className='flex justify-between items-center'>
            <div className='h-4 bg-gray-300 w-1/3 rounded-3xl'></div>
            <div className='h-4 bg-gray-300 w-1/4 rounded-3xl'></div>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <div className='h-4 bg-gray-300 w-1/4 rounded-3xl'></div>
          <div className='h-4 bg-gray-300 w-1/3 rounded-3xl'></div>
        </div>
      </div>
    </div>
  );
};

export default MyPlaylistsLoading;
