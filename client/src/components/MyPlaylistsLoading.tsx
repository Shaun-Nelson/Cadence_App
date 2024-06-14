const MyPlaylistsLoading = () => {
  return (
    <div
      role='status'
      className='flex flex-col my-4 p-2 mx-12 border shadow-md rounded hover:shadow-lg animate-pulse'
    >
      <div className='flex justify-start p-2 mt-2'>
        <div className='flex flex-col ml-6'>
          <div className='h-3 w-40 bg-gray-300 rounded mb-2'></div>
          <div className='h-3 w-24 bg-gray-300 rounded mb-2'></div>
        </div>
      </div>
    </div>
  );
};

export default MyPlaylistsLoading;
