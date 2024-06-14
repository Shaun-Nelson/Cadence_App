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
  // const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

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

  // const handlePlaylistDelete = async (id: string) => {
  //   try {
  //     await deletePlaylist({ id }).unwrap();
  //     await getData();
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to delete playlist");
  //   }
  // };

  // const handleSpotfiySave = async (
  //   playlistName: string,
  //   playlistDescription: string,
  //   results: Track[]
  // ) => {
  //   try {
  //     await saveSpotifyPlaylist({
  //       name: playlistName,
  //       description: playlistDescription,
  //       songs: results,
  //     }).unwrap();
  //     toast.success("Playlist saved to Spotify!");
  //   } catch (error) {
  //     console.error(error);
  //     toast.error(
  //       "Error saving playlist to Spotify. Please connect via User Profile."
  //     );
  //   }
  // };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='contaier mx-auto mt-12'>
      <div className='flex flex-col items'>
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
