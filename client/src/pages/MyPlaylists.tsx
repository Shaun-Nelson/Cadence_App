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
    <>
      {isLoading ? (
        playlists.length > 0 && <MyPlaylistsLoading />
      ) : (
        <div className='container mx-auto px-3 mt-12'>
          <h1 className='text-3xl font-semibold text-center dark:text-slate-300'>
            Playlists
          </h1>
          <table className='table-auto w-full mt-8 bg-light-100 dark:bg-dark-500 shadow-xl dark:shadow-2xl border-collapse rounded-3xl'>
            <thead>
              <tr>
                <th className='px-6 py-6 text-slate-400 text-left'>Name</th>
                <th className='px-6 py-6 text-slate-400 text-left'>
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <>
                {playlists.map((playlist, index) => {
                  return (
                    <tr key={index}>
                      <td className='px-6 py-4'>
                        <Link
                          to={`/playlists/${playlist.id}`}
                          className='link dark:text-blue-400 dark:hover:text-blue-600'
                        >
                          {playlist.name}
                        </Link>
                      </td>
                      <td className='px-6 py-4  text-slate-600 dark:text-slate-500'>
                        {playlist.description}
                      </td>
                    </tr>
                  );
                })}
              </>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default MyPlaylists;
