const PlaylistTrackLoading = () => {
  return (
    <div
      role='status'
      className='flex flex-col my-4 p-2 border shadow-md rounded hover:shadow-lg animate-pulse'
    >
      <div className='flex justify-start p-2 mt-2'>
        <div className='h-24 w-24 bg-gray-300 rounded-xl'></div>
        <div className='flex flex-col ml-6'>
          <div className='h-4 w-40 bg-gray-300 rounded mb-2'></div>
          <div className='h-4 w-24 bg-gray-300 rounded mb-2'></div>
          <div className='h-4 w-32 bg-gray-300 rounded mb-2'></div>
          <div className='h-4 w-16 bg-gray-300 rounded'></div>
        </div>
      </div>
      <div className='h-12 flex justify-center items-center my-4'>
        <div className='h-12 w-full bg-gray-300 rounded'></div>
      </div>
    </div>
  );
};

export default PlaylistTrackLoading;
