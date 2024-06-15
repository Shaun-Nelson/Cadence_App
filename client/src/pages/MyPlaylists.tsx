import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetPlaylistsMutation } from "../slices/playlistApiSlice";
import { toast } from "react-toastify";

// Components
import MyPlaylistsLoading from "../components/MyPlaylistsLoading";

//Types
import type { Playlist } from "../types";

const MyPlaylists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const [getPlaylists, { isLoading }] = useGetPlaylistsMutation();

  const getData = async () => {
    try {
      const data = await getPlaylists({}).unwrap();
      setPlaylists(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get playlists");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='container mx-auto px-3 mt-12'>
      <div className='flex flex-col w-full items-center'>
        {isLoading ? (
          playlists.length > 0 &&
          playlists.map((_, index) => {
            return <MyPlaylistsLoading key={index} />;
          })
        ) : (
          <div className='flex flex-col'>
            {playlists.map((playlist, index) => {
              return (
                <div className='flex flex-col my-4 mx-12 p-2 border shadow-md rounded hover:shadow-lg active:shadow-inner list-decimal list-inside'>
                  <Link
                    to={`/playlists/${playlist.id}`}
                    className='link dark:text-blue-400 dark:hover:text-blue-600'
                  >
                    <div key={index} className='flex justify-start ml-4 p-2'>
                      <div className='flex flex-col'>
                        {playlist.name}
                        <p className='text-primaryDark dark:text-primaryLight font-semibold'>
                          {playlist.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlaylists;
