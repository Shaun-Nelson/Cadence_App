const PlaylistButtonsLoading = () => {
  return (
    <div
      role='status'
      className='flex justify-center items-center mb-10 p-2 rounded animate-pulse'
    >
      <div className='h-8 w-2/5 ml-2 mr-1 p-2 bg-gray-300 rounded-xl'></div>
      <div className='h-8 w-1/2 p-2 bg-gray-300 rounded-xl'></div>
      <div className='h-8 w-10 ml-4 bg-gray-300 rounded-full'></div>
      <div className='h-8 w-10 mx-4 bg-gray-300 rounded-full'></div>
    </div>
  );
};

export default PlaylistButtonsLoading;
